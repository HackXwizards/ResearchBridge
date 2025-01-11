package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func main() {
	// Get API key from environment variable
	apiKey := os.Getenv("MODUS_GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("MODUS_GEMINI_API_KEY environment variable is required")
	}

	// Initialize the citation analyzer
	analyzer, err := NewCitationAnalyzer(apiKey)
	if err != nil {
		log.Fatalf("Failed to create citation analyzer: %v", err)
	}
	defer analyzer.ModusClose()

	// Example usage with a sample paper
	ctx := context.Background()
	paperContent := `In their groundbreaking work, Smith et al. (2020) demonstrated that neural networks can effectively process citation graphs. 
	This builds upon the earlier findings of Johnson and Brown (2018) regarding network analysis in academic literature. 
	Recent developments by Zhang (2022) have shown promising results in automated citation analysis.`
	
	citations, err := analyzer.ModusAnalyzePaper(ctx, paperContent)
	if err != nil {
		log.Fatalf("Failed to analyze paper: %v", err)
	}

	// Pretty print the results
	prettyJSON, err := json.MarshalIndent(citations, "", "    ")
	if err != nil {
		log.Fatalf("Failed to format results: %v", err)
	}
	fmt.Printf("Found %d citations:\n%s\n", len(citations), string(prettyJSON))
}
