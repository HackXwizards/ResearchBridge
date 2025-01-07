import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterSectionProps } from '@/hooks/search.types';

const filterItemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <button 
        className="w-full flex items-center justify-between md:hidden p-2 bg-gray-50 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-800">Filters</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Filter Content - Hidden on mobile unless opened */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <motion.h3 
          variants={filterItemVariants}
          className="text-lg font-semibold text-gray-800"
        >
          Filter
        </motion.h3>
        
        <motion.div variants={filterItemVariants}>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Category</h4>
          <div className="space-y-2">
            {['All', 'Research Papers', 'Datasets', 'Researchers'].map((category) => (
              <motion.div
                key={category}
                className="flex items-center"
                whileHover={{ x: 2 }}
              >
                <input
                  type="checkbox"
                  id={category}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={category} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Field Filter */}
        <motion.div variants={filterItemVariants}>
          <label className="block mb-2">Field</label>
          <select
            value={filters.field}
            onChange={(e) => onFilterChange('field', e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Fields</option>
            <option value="computer_science">Computer Science</option>
            <option value="biology">Biology</option>
            <option value="physics">Physics</option>
            {/* Add more fields as needed */}
          </select>
        </motion.div>

        {/* Year Filter */}
        <motion.div variants={filterItemVariants}>
          <label className="block mb-2">Publication Year</label>
          <select
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Add more years as needed */}
          </select>
        </motion.div>

        {/* Sort By */}
        <motion.div variants={filterItemVariants}>
          <label className="block mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="w-full p-2 border rounded-lg"
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