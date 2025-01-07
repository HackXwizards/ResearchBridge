import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchBarProps } from '@/hooks/search.types';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex gap-2"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search researchers, publications..."
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button
        type="submit"
        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
