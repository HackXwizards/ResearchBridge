import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  tags: string[];
  description: string;
  doi?: string;
}

const PublicationCard = ({ publication }: { publication: Publication }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/publications/${publication.id}`);
  };

  return (
    <Card 
      className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
      onClick={handleLearnMore}
    >
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-poppins font-semibold text-gray-900">
              {publication.title}
            </h3>
            <p className="text-sm text-gray-600 italic font-poppins">
              {publication.authors.join(', ')}
            </p>
            <p className="text-sm text-gray-700 font-poppins">
              {publication.journal} • {publication.year}
            </p>
            <p className="text-gray-700 mt-2 line-clamp-3 font-poppins leading-relaxed">
              {publication.description}
            </p>
            {publication.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {publication.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {publication.doi && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 sm:mt-0 sm:ml-4 font-poppins"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(publication.doi, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Paper
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              className="mt-4 sm:mt-0 sm:ml-4 font-poppins"
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationCard;