export interface AnalyzedCitation {
    author: string;
    title: string;
    year: string;
    reference: string;
    keywords: string[];
}

export class CitationAnalyzerService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080';
    }

    async analyzePaper(content: string): Promise<AnalyzedCitation[]> {
        if (!content?.trim()) {
            return []; // Return empty array for empty content
        }

        try {
            const response = await fetch(`${this.baseUrl}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to analyze paper');
            }

            const citations = await response.json();
            return Array.isArray(citations) ? citations : [];

        } catch (error) {
            console.error('Error analyzing paper:', error);
            throw error;
        }
    }
}