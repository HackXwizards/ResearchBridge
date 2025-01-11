package main

import (
    "context"
    "encoding/json"
    "fmt"
    "strings"

    "github.com/google/generative-ai-go/genai"
    "google.golang.org/api/option"
)

type Citation struct {
    Author    string   `json:"author"`
    Title     string   `json:"title"`
    Year      string   `json:"year"`
    Reference string   `json:"reference"`
    Keywords  []string `json:"keywords"`
}

type CitationAnalyzer struct {
    client *genai.Client
    model  *genai.GenerativeModel
}

func NewCitationAnalyzer(apiKey string) (*CitationAnalyzer, error) {
    ctx := context.Background()
    client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
    if err != nil {
        return nil, fmt.Errorf("failed to create client: %v", err)
    }

    model := client.GenerativeModel("gemini-pro")
    return &CitationAnalyzer{
        client: client,
        model:  model,
    }, nil
}

func (ca *CitationAnalyzer) AnalyzePaper(ctx context.Context, paperContent string) ([]Citation, error) {
    prompt := `Extract citations from the following text and return them in valid JSON array format. 
Each citation should include:
- author: string (main author's name)
- title: string (paper title)
- year: string (publication year)
- reference: string (full citation)
- keywords: array of strings (relevant topics)

Example format:
[
    {
        "author": "Author Name",
        "title": "Paper Title",
        "year": "2024",
        "reference": "Full citation text",
        "keywords": ["keyword1", "keyword2"]
    }
]

Text to analyze:
%s`

    resp, err := ca.model.GenerateContent(ctx, genai.Text(fmt.Sprintf(prompt, paperContent)))
    if err != nil {
        return nil, fmt.Errorf("failed to generate content: %v", err)
    }

    if len(resp.Candidates) == 0 {
        return nil, fmt.Errorf("no response generated")
    }

    // Extract text from response
    var responseText string
    for _, part := range resp.Candidates[0].Content.Parts {
        if textPart, ok := part.(genai.Text); ok {
            responseText += string(textPart)
        }
    }

    // Find JSON content within the response
    jsonStart := strings.Index(responseText, "[")
    jsonEnd := strings.LastIndex(responseText, "]") + 1
    if jsonStart == -1 || jsonEnd == 0 || jsonStart >= jsonEnd {
        return nil, fmt.Errorf("no valid JSON array found in response: %s", responseText)
    }

    jsonContent := responseText[jsonStart:jsonEnd]

    // Parse citations
    var citations []Citation
    err = json.Unmarshal([]byte(jsonContent), &citations)
    if err != nil {
        return nil, fmt.Errorf("failed to parse citations JSON: %v\nResponse was: %s", err, jsonContent)
    }

    return citations, nil
}

func (ca *CitationAnalyzer) ModusAnalyzePaper(ctx context.Context, paperContent string) ([]Citation, error) {
    return ca.AnalyzePaper(ctx, paperContent)
}

func (ca *CitationAnalyzer) Close() {
    if ca.client != nil {
        ca.client.Close()
    }
}

func (ca *CitationAnalyzer) ModusClose() {
    ca.Close()
}