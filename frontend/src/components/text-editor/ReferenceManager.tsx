import React, { useState } from 'react';
import { CitationService } from '../../services/CitationService';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Citation } from '../../extensions/CitationExtension';

interface ReferenceManagerProps {
  onCitationSelect: (citation: Citation) => void;
  citationService: CitationService;
  onClose: () => void;
}

export const ReferenceManager: React.FC<ReferenceManagerProps> = ({
  onCitationSelect,
  citationService,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Citation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await Promise.all([
        citationService.searchGoogleScholar(searchQuery),
        citationService.searchPubMed(searchQuery)
      ]);
      
      const combinedResults = [...results[0], ...results[1]];
      setSearchResults(combinedResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Reference Manager</h2>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </div>

      <Tabs defaultValue={activeTab} className="flex-1">
        <TabsList className="border-b px-4">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="library">My Library</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="flex-1 p-4">
          <div className="flex gap-2 mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers..."
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            {searchResults.map((citation) => (
              <div
                key={citation.id}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => onCitationSelect(citation)}
              >
                <h3 className="font-medium">{citation.title}</h3>
                <p className="text-sm text-gray-600">
                  {citation.authors.join(', ')} ({citation.year})
                </p>
                {citation.journal && (
                  <p className="text-sm text-gray-500">{citation.journal}</p>
                )}
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};