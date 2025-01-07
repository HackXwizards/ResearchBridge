import { Publication } from '@/hooks/search.types';

const PublicationCard = ({ publication }: { publication: Publication }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">
          {publication.title}
        </h3>
        
        <div className="text-sm text-gray-600">
          {publication.authors.join(', ')}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{publication.journal}</span>
          <span>•</span>
          <span>{publication.year}</span>
          <span>•</span>
          <span>{publication.citations} citations</span>
        </div>

        <p className="text-gray-700 line-clamp-2">
          {publication.abstract}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {publication.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <button className="text-blue-600 hover:text-blue-800">
            View Full Paper
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            Download PDF
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            Cite
          </button>
          <span className="text-gray-500">
            DOI: {publication.doi}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;