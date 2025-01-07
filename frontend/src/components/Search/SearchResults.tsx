import PublicationCard from './PublicationCard';
import { Publication } from '@/hooks/search.types';

const SearchResults = ({ results }: { results: Publication[] }) => {
  return (
    <div className="space-y-4">
      {results.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
};

export default SearchResults;