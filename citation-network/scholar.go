package main

import (
	"fmt"
	"log"
	g "github.com/serpapi/google-search-results-golang"
)


type ScholarService struct {
	apiKey string
}

func NewScholarService(apiKey string) *ScholarService {
	return &ScholarService{
		apiKey: apiKey,
	}
}

func (s *ScholarService) SearchScholar(query string) ([]ScholarResult, error) {
	parameter := map[string]string{
		"engine":  "google_scholar",
		"q":       query,
		"hl":      "en",
		"num":     "5",
	}

	search := g.NewGoogleSearch(parameter, s.apiKey)
	results, err := search.GetJSON()
	if err != nil {
		return nil, fmt.Errorf("failed to fetch scholar results: %v", err)
	}

	// Extract organic results
	organicResults, ok := results["organic_results"].([]interface{})
	if !ok {
		log.Printf("Warning: No scholar results found for query: %s", query)
		return []ScholarResult{}, nil
	}

	var scholarResults []ScholarResult
	for _, r := range organicResults {
		result, ok := r.(map[string]interface{})
		if !ok {
			continue
		}

		var authors []string
		if authorsData, ok := result["authors"].([]interface{}); ok {
			for _, author := range authorsData {
				if authorMap, ok := author.(map[string]interface{}); ok {
					if name, ok := authorMap["name"].(string); ok {
						authors = append(authors, name)
					}
				}
			}
		}

		var journal, publisher string
		if pubInfo, ok := result["publication_info"].(map[string]interface{}); ok {
			if summary, ok := pubInfo["summary"].(string); ok {
				journal = summary
				publisher = summary
			}
		}

		year := 0
		if yearStr, ok := result["year"].(string); ok {
			fmt.Sscanf(yearStr, "%d", &year)
		}

		scholarResult := ScholarResult{
			Title:         getStringValue(result, "title"),
			Authors:       authors,
			Year:          year,
			Journal:       journal,
			Publisher:     publisher,
			URL:           getStringValue(result, "link"),
			CitationCount: getIntValue(result, "cited_by_count"),
			DOI:           getStringValue(result, "doi"),
		}

		if scholarResult.Title != "" {
			scholarResults = append(scholarResults, scholarResult)
		}
	}

	return scholarResults, nil
}

func getStringValue(data map[string]interface{}, key string) string {
	if val, ok := data[key].(string); ok {
		return val
	}
	return ""
}

func getIntValue(data map[string]interface{}, key string) int {
	switch v := data[key].(type) {
	case float64:
		return int(v)
	case int:
		return v
	case string:
		var i int
		fmt.Sscanf(v, "%d", &i)
		return i
	default:
		return 0
	}
}
