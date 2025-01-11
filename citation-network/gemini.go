package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "strings"

    "github.com/google/generative-ai-go/genai"
    "google.golang.org/api/option"
)

type ResearchInsights struct {
    Summary       string          `json:"summary"`
    Suggestions   []string        `json:"suggestions"`
    RelatedTopics []string        `json:"relatedTopics"`
    Methodology   []string        `json:"methodology"`
    Gaps          []string        `json:"gaps"`
    Citations     []string        `json:"citations"`
    Impact        string          `json:"impact"`
    Limitations   []string        `json:"limitations"`
    FutureWork    []string        `json:"futureWork"`
    ScholarCitations []ScholarResult `json:"scholarCitations"`
}

type ScholarResult struct {
    Title         string   `json:"title"`
    Authors       []string `json:"authors"`
    Year          int      `json:"year"`
    Journal       string   `json:"journal"`
    Volume        string   `json:"volume"`
    Pages         string   `json:"pages"`
    Publisher     string   `json:"publisher"`
    DOI           string   `json:"doi"`
    URL           string   `json:"url"`
    CitationCount int      `json:"citationCount"`
}

type ResearchAssistant struct {
    client  *genai.Client
    model   *genai.GenerativeModel
    scholar *ScholarService
}

func NewResearchAssistant(apiKey string, scholarApiKey string) (*ResearchAssistant, error) {
    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
    if err != nil {
        return nil, fmt.Errorf("failed to create client: %v", err)
    }

    model := client.GenerativeModel("gemini-pro")
    model.SetTemperature(0.3)
    model.SetMaxOutputTokens(2048)
    
    scholarService := NewScholarService(scholarApiKey)
    
    return &ResearchAssistant{
        client:  client,
        model:   model,
        scholar: scholarService,
    }, nil
}

func (ra *ResearchAssistant) AnalyzeResearch(ctx context.Context, content string) (*ResearchInsights, error) {
    if content == "" {
        return nil, fmt.Errorf("empty content provided")
    }

    insights, err := ra.getGeminiAnalysis(ctx, content)
    if err != nil {
        return nil, err
    }

    scholarResults, err := ra.scholar.SearchScholar(content)
    if err != nil {
        log.Printf("Warning: Failed to fetch scholar citations: %v", err)
    } else {
        insights.ScholarCitations = scholarResults
    }

    return insights, nil
}

func (ra *ResearchAssistant) getGeminiAnalysis(ctx context.Context, content string) (*ResearchInsights, error) {
    prompt := fmt.Sprintf(`Analyze the text and return a JSON object. IMPORTANT RULES:
1. Return ONLY a raw JSON object
2. DO NOT use any markdown formatting or code blocks
3. DO NOT add any explanatory text
4. Every field must be present and populated
5. Use "Not available" for empty string fields
6. Use empty arrays [] for empty array fields

Text to analyze: %s

Return this exact structure (exclude these instructions):
{
    "summary": "...",
    "suggestions": ["...", "..."],
    "relatedTopics": ["...", "..."],
    "methodology": ["...", "..."],
    "gaps": ["...", "..."],
    "citations": ["...", "..."],
    "impact": "...",
    "limitations": ["...", "..."],
    "futureWork": ["...", "..."]
}`, content)

    resp, err := ra.model.GenerateContent(ctx, genai.Text(prompt))
    if err != nil {
        return nil, fmt.Errorf("failed to generate content: %v", err)
    }

    if len(resp.Candidates) == 0 {
        return nil, fmt.Errorf("no response generated")
    }

    var responseText string
    for _, part := range resp.Candidates[0].Content.Parts {
        if textPart, ok := part.(genai.Text); ok {
            responseText += string(textPart)
        }
    }

    responseText = strings.TrimSpace(responseText)

    responseText = strings.ReplaceAll(responseText, "```json", "")
    responseText = strings.ReplaceAll(responseText, "```", "")
    responseText = strings.ReplaceAll(responseText, "`", "")
    
    startIdx := strings.Index(responseText, "{")
    endIdx := strings.LastIndex(responseText, "}")
    
    if startIdx == -1 || endIdx == -1 || startIdx > endIdx {
        log.Printf("Invalid JSON structure. Raw response: %s", responseText)
        return nil, fmt.Errorf("invalid JSON structure in response")
    }
    
    responseText = responseText[startIdx:endIdx+1]
    responseText = strings.TrimSpace(responseText)
    
    log.Printf("Cleaned JSON: %s", responseText)

    if !strings.HasPrefix(responseText, "{") || !strings.HasSuffix(responseText, "}") {
        log.Printf("Malformed JSON. Cleaned response: %s", responseText)
        return nil, fmt.Errorf("malformed JSON structure")
    }

    var insights ResearchInsights
    err = json.Unmarshal([]byte(responseText), &insights)
    if err != nil {
        log.Printf("JSON parsing error. Cleaned response: %s", responseText)
        return nil, fmt.Errorf("failed to parse response: %v", err)
    }

    missingFields := []string{}
    
    if insights.Summary == "" {
        missingFields = append(missingFields, "summary")
    }
    if insights.Impact == "" {
        missingFields = append(missingFields, "impact")
    }
    if len(insights.Suggestions) == 0 {
        missingFields = append(missingFields, "suggestions")
    }
    if len(insights.RelatedTopics) == 0 {
        missingFields = append(missingFields, "relatedTopics")
    }
    if len(insights.Methodology) == 0 {
        missingFields = append(missingFields, "methodology")
    }
    if len(insights.Gaps) == 0 {
        missingFields = append(missingFields, "gaps")
    }
    if len(insights.Citations) == 0 {
        missingFields = append(missingFields, "citations")
    }
    if len(insights.Limitations) == 0 {
        missingFields = append(missingFields, "limitations")
    }
    if len(insights.FutureWork) == 0 {
        missingFields = append(missingFields, "futureWork")
    }

    if len(missingFields) > 0 {
        log.Printf("Missing fields in response: %v", missingFields)
        return ra.retryAnalysis(ctx, content)
    }

    return &insights, nil
}

func (ra *ResearchAssistant) retryAnalysis(ctx context.Context, content string) (*ResearchInsights, error) {
    prompt := fmt.Sprintf(`IMPORTANT: Previous response was incomplete. Analyze the text and return a JSON object with ALL fields populated. Every single field MUST have content:

Text: %s

Return this exact structure with all fields populated (no instructions in response):
{
    "summary": "...",
    "suggestions": ["...", "..."],
    "relatedTopics": ["...", "..."],
    "methodology": ["...", "..."],
    "gaps": ["...", "..."],
    "citations": ["...", "..."],
    "impact": "...",
    "limitations": ["...", "..."],
    "futureWork": ["...", "..."]
}`, content)

    resp, err := ra.model.GenerateContent(ctx, genai.Text(prompt))
    if err != nil {
        return nil, fmt.Errorf("failed to generate content in retry: %v", err)
    }

    var responseText string
    for _, part := range resp.Candidates[0].Content.Parts {
        if textPart, ok := part.(genai.Text); ok {
            responseText += string(textPart)
        }
    }

    responseText = strings.TrimSpace(responseText)

    responseText = strings.ReplaceAll(responseText, "```json", "")
    responseText = strings.ReplaceAll(responseText, "```", "")
    responseText = strings.ReplaceAll(responseText, "`", "")
    
    startIdx := strings.Index(responseText, "{")
    endIdx := strings.LastIndex(responseText, "}")
    
    if startIdx == -1 || endIdx == -1 || startIdx > endIdx {
        log.Printf("Invalid JSON structure. Raw response: %s", responseText)
        return nil, fmt.Errorf("invalid JSON structure in response")
    }
    
    responseText = responseText[startIdx:endIdx+1]
    responseText = strings.TrimSpace(responseText)
    
    log.Printf("Cleaned JSON: %s", responseText)

    if !strings.HasPrefix(responseText, "{") || !strings.HasSuffix(responseText, "}") {
        log.Printf("Malformed JSON. Cleaned response: %s", responseText)
        return nil, fmt.Errorf("malformed JSON structure")
    }

    var insights ResearchInsights
    err = json.Unmarshal([]byte(responseText), &insights)
    if err != nil {
        log.Printf("JSON parsing error. Cleaned response: %s", responseText)
        return nil, fmt.Errorf("failed to parse response: %v", err)
    }

    if insights.Summary == "" {
        insights.Summary = "Not available"
    }
    if insights.Impact == "" {
        insights.Impact = "Not available"
    }
    if insights.Suggestions == nil {
        insights.Suggestions = []string{"No suggestions available"}
    }
    if insights.RelatedTopics == nil {
        insights.RelatedTopics = []string{"No related topics available"}
    }
    if insights.Methodology == nil {
        insights.Methodology = []string{"No methodology available"}
    }
    if insights.Gaps == nil {
        insights.Gaps = []string{"No gaps identified"}
    }
    if insights.Citations == nil {
        insights.Citations = []string{"No citations available"}
    }
    if insights.Limitations == nil {
        insights.Limitations = []string{"No limitations identified"}
    }
    if insights.FutureWork == nil {
        insights.FutureWork = []string{"No future work suggestions available"}
    }

    return &insights, nil
}

func (ra *ResearchAssistant) Close() {
    if ra.client != nil {
        ra.client.Close()
    }
}