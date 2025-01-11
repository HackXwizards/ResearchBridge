package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get API keys from environment variables
	geminiKey := os.Getenv("MODUS_GEMINI_API_KEY")
	if geminiKey == "" {
		log.Fatal("MODUS_GEMINI_API_KEY environment variable is required")
	}

	serpApiKey := os.Getenv("SERP_API_KEY")
	if serpApiKey == "" {
		log.Fatal("SERP_API_KEY environment variable is required")
	}

	// Initialize the service
	if err := InitializeService(geminiKey, serpApiKey); err != nil {
		log.Fatalf("Failed to initialize service: %v", err)
	}
	defer Close()

	// Set up HTTP server
	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Add analyze-research endpoint
	r.POST("/analyze-research", func(c *gin.Context) {
		var request struct {
			Content string `json:"content"`
		}

		if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Printf("Analyzing research content: %s", request.Content)

		insights, err := AnalyzeResearch(c.Request.Context(), request.Content)
		if err != nil {
			log.Printf("Error analyzing research: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, insights)
	})

	log.Printf("Starting server on :8080")
	r.Run(":8080")
}
