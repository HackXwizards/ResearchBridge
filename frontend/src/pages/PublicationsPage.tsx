import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/Search/SearchBar";
import FilterSection from "../components/Search/FilterSection";
import SearchResults from "../components/Search/SearchResults";
import { SearchFilters, Researcher } from "@/hooks/search.types";
import { mockPublications, mockFilters } from "@/mocks/searchData";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const PublicationsPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState(mockPublications);
  const [filters, setFilters] = useState(mockFilters);

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(mockPublications);
      return;
    }

    const filtered = mockPublications.filter(
      (publication) =>
        publication.title.toLowerCase().includes(query.toLowerCase()) ||
        publication.abstract.toLowerCase().includes(query.toLowerCase()) ||
        publication.authors.some((author) =>
          author.toLowerCase().includes(query.toLowerCase())
        ) ||
        publication.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase())
        )
    );
    setSearchResults(filtered);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    let filtered = [...mockPublications];

    if (newFilters.field) {
      filtered = filtered.filter(
        (p) => p.field.toLowerCase() === newFilters.field.toLowerCase()
      );
    }
    if (newFilters.year) {
      filtered = filtered.filter((p) => p.year.toString() === newFilters.year);
    }
    if (newFilters.sortBy === "recent") {
      filtered.sort((a, b) => b.year - a.year);
    } else if (newFilters.sortBy === "cited") {
      filtered.sort((a, b) => b.citations - a.citations);
    }

    setSearchResults(filtered);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen  mt-20 "
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div
            className="col-span-1 md:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <FilterSection
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 md:col-span-9"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <SearchResults results={searchResults} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PublicationsPage;
