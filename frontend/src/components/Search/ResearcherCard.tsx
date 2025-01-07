import { Researcher } from '@/hooks/search.types';

const ResearcherCard = ({ researcher }: { researcher: Researcher }) => {
  return (
    <div className="p-3 sm:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={researcher.avatar || '/default-avatar.png'}
          alt={researcher.name}
          className="w-20 h-20 sm:w-16 sm:h-16 rounded-full"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">{researcher.name}</h3>
          <p className="text-gray-600">{researcher.field}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium">Research Interests</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {researcher.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button className="w-full sm:w-auto px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
          View Profile
        </button>
        <button className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Connect
        </button>
      </div>
    </div>
  );
};

export default ResearcherCard;