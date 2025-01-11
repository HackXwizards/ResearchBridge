import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cross2Icon as XMarkIcon,
  UpdateIcon as Spinner,
} from "@radix-ui/react-icons";
import { Lightbulb } from "lucide-react";

interface ResearchAssistantProps {
  selectedText: string;
  onClose: () => void;
}

interface ScholarCitation {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volume: string;
  pages: string;
  publisher: string;
  doi: string;
  url: string;
  citationCount: number;
}

interface ResearchInsights {
  summary: string;
  suggestions: string[];
  relatedTopics: string[];
  methodology: string[];
  gaps: string[];
  citations: string[];
  impact: string;
  limitations: string[];
  futureWork: string[];
  scholarCitations: ScholarCitation[];
}

const defaultInsights: ResearchInsights = {
  summary: "",
  suggestions: [],
  relatedTopics: [],
  methodology: [],
  gaps: [],
  citations: [],
  impact: "",
  limitations: [],
  futureWork: [],
  scholarCitations: [],
};

export function ResearchAssistant({
  selectedText,
  onClose,
}: ResearchAssistantProps) {
  const [insights, setInsights] = useState<ResearchInsights>(defaultInsights);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeText = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/analyze-research", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: selectedText }),
        });

        if (!response.ok) {
          throw new Error("Failed to analyze text");
        }

        const data = await response.json();
        setInsights({
          summary: data.summary || "",
          suggestions: data.suggestions || [],
          relatedTopics: data.relatedTopics || [],
          methodology: data.methodology || [],
          gaps: data.gaps || [],
          citations: data.citations || [],
          impact: data.impact || "",
          limitations: data.limitations || [],
          futureWork: data.futureWork || [],
          scholarCitations: data.scholarCitations || [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (selectedText) {
      analyzeText();
    }
  }, [selectedText]);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[100] backdrop-blur-sm">
      <div className="w-[800px] h-[90vh] bg-white shadow-2xl rounded-xl flex flex-col">
        <div className="flex justify-between items-center p-6 border-b bg-blue-700 rounded-t-xl">
          <div className="flex flex-row items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-300" />
            <h2 className="text-xl font-semibold text-white">
              Research Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Spinner className="h-8 w-8 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-600">Analyzing your research...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <Tabs defaultValue="summary" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl">
                <TabsTrigger
                  value="summary"
                  className="rounded-lg px-6 py-3 text-md data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[border-gray-200  border-2]"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="rounded-lg px-6 py-2 text-md data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="citations"
                  className="rounded-lg px-6 py-2 text-md data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  Citations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {insights.summary}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                    Impact
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {insights.impact}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analysis">
                <div className="space-y-6">
                  {insights.suggestions?.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Suggestions
                      </h3>
                      <ul className="space-y-2">
                        {insights.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {insights.methodology?.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Methodology
                      </h3>
                      <ul className="space-y-2">
                        {insights.methodology.map((method, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-700">{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {insights.gaps?.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Research Gaps
                      </h3>
                      <ul className="space-y-2">
                        {insights.gaps.map((gap, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-700">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="citations">
                <div className="space-y-6">
                  {insights.scholarCitations?.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Related Papers
                      </h3>
                      <div className="space-y-4">
                        {insights.scholarCitations.map((citation, index) => (
                          <div
                            key={index}
                            className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                          >
                            <a
                              href={citation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium block mb-1 hover:underline"
                            >
                              {citation.title}
                            </a>
                            <p className="text-sm text-gray-600 mb-1">
                              {citation.authors?.join(", ") || "Unknown Authors"}{" "}
                              ({citation.year})
                            </p>
                            {citation.journal && (
                              <p className="text-sm text-gray-500 italic mb-1">
                                {citation.journal}
                              </p>
                            )}
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                                Citations: {citation.citationCount}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {insights.citations?.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Suggested Citations
                      </h3>
                      <ul className="space-y-2">
                        {insights.citations.map((citation, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="text-gray-700">{citation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResearchAssistant;
