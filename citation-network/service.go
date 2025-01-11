package main

import (
    "context"
    "fmt"
)

var assistant *ResearchAssistant

func InitializeService(geminiKey string, scholarApiKey string) error {
    var err error
    assistant, err = NewResearchAssistant(geminiKey, scholarApiKey)
    if err != nil {
        return err
    }
    return nil
}

func AnalyzeResearch(ctx context.Context, content string) (*ResearchInsights, error) {
    if assistant == nil {
        return nil, fmt.Errorf("research assistant not initialized")
    }
    return assistant.AnalyzeResearch(ctx, content)
}

func Close() {
    if assistant != nil {
        assistant.Close()
    }
}