export interface Publication {
  id: string;
  title: string;
  authors: string[];
  field: string;
  abstract: string;
  journal: string;
  year: number;
  citations: number;
  keywords: string[];
  doi: string;
}

export interface FilterSectionProps {
  filters: {
    field: string;
    year: string;
    sortBy: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}