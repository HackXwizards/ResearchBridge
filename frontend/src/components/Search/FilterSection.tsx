import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterSectionProps } from '@/hooks/search.types';

const filterItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filterType: string, value: string) => {
    console.log(`Changing ${filterType} to:`, value, 'Type:', typeof value); // Debug log
    onFilterChange(filterType, value);
  };

  return (
    <motion.div className="space-y-6">
      <button 
        className="w-full flex items-center justify-between md:hidden p-2 bg-gray-50 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">Filters</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Field Filter */}
        <motion.div variants={filterItemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Research Field
          </label>
          <select
            value={filters.field}
            onChange={(e) => handleFilterChange('field', e.target.value)}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All Fields</option>
            <option value="AI">AI</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </motion.div>

        {/* Year Filter */}
        <motion.div variants={filterItemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publication Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => {
              console.log('Year selected:', e.target.value); // Debug log
              handleFilterChange('year', e.target.value);
            }}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select> 
        </motion.div>

        {/* Sort By */}
        <motion.div variants={filterItemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="relevance">Relevance</option>
            <option value="recent">Most Recent</option>
            <option value="cited">Most Cited</option>
          </select>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FilterSection;