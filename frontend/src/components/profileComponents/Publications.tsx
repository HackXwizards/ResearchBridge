import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { Publication } from "@/hooks/useProfileData";

interface PublicationsProps {
  publications: Publication[];
}

export const Publications = ({ publications }: PublicationsProps) => {
  return (
    <div className="space-y-6">
      {publications.map((pub) => (
        <Card key={pub.id} className="hover:bg-gray-50 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-poppins font-semibold text-gray-900">
                  {pub.title}
                </h3>
                <p className="text-sm text-gray-600 italic font-poppins">
                  {pub.authors.join(', ')}
                </p>
                <p className="text-sm text-gray-700 font-poppins">
                  {pub.journal} • {pub.year} • {pub.citations} citations
                </p>
                <p className="text-gray-700 mt-2 line-clamp-3 font-poppins leading-relaxed">
                  {pub.abstract}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 sm:mt-0 sm:ml-4 font-poppins"
                onClick={() => window.open(pub.doi, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Paper
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

