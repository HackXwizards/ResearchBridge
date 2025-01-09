import { useState, useEffect } from "react";
import SearchBar from "@/components/Search/SearchBar";
import SearchResults from "@/components/Search/SearchResults";
import { publicationService } from "@/services/publicationService";
import FilterSection from "@/components/Search/FilterSection";
import { Publication } from "@/hooks/search.types";
import { useNavigate } from "react-router-dom";

const PublicationsPage = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    field: "",
    year: "",
    sortBy: "relevance",
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const data = await publicationService.getAllPublications();
      setPublications(data);
    } catch (err) {
      setError("Failed to fetch publications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await publicationService.searchPublications({
        query,
        field: filters.field,
        year: filters.year,
      });
      setPublications(data);
    } catch (err) {
      setError("Search failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filterType: string, value: string) => {
    try {
      setLoading(true);
      const newFilters = { ...filters, [filterType]: value };
      setFilters(newFilters);

      // Only include non-empty filter values
      const searchParams = {
        ...(newFilters.field && { field: newFilters.field }),
        ...(newFilters.year && { year: newFilters.year }),
        ...(newFilters.sortBy && { sortBy: newFilters.sortBy }),
      };

      console.log("Applying filters:", searchParams); // Debug log

      const data = await publicationService.searchPublications(searchParams);
      setPublications(data);
    } catch (err) {
      setError("Filter application failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold">Publications</h1>
        <button
          onClick={() => navigate("/publications/new")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Publication
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FilterSection
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <SearchResults results={publications} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
