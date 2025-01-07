export const mockPublications = [
  {
    id: '1',
    title: 'Advances in Deep Learning Architecture',
    authors: ['Dr. Jane Smith', 'Prof. Michael Chen'],
    field: 'Computer Science',
    abstract: 'This paper presents novel approaches to deep learning architectures...',
    journal: 'Journal of Machine Learning',
    year: 2024,
    citations: 45,
    keywords: ['Deep Learning', 'Neural Networks', 'AI'],
    doi: '10.1234/ml.2024.1234'
  },
  {
    id: '2',
    title: 'Quantum Computing: A New Paradigm',
    authors: ['Dr. Sarah Johnson', 'Prof. John Doe'],
    field: 'Physics',
    abstract: 'An exploration of quantum computing principles and applications...',
    journal: 'Physical Review Letters',
    year: 2023,
    citations: 72,
    keywords: ['Quantum Computing', 'Quantum Physics', 'Computing'],
    doi: '10.1234/prl.2023.5678'
  },
  {
    id: '3',
    title: 'Gene Editing: CRISPR Applications',
    authors: ['Dr. Emily Brown'],
    field: 'Biology',
    abstract: 'A comprehensive review of CRISPR gene editing applications...',
    journal: 'Nature Genetics',
    year: 2024,
    citations: 28,
    keywords: ['CRISPR', 'Gene Editing', 'Molecular Biology'],
    doi: '10.1234/ng.2024.9012'
  }
];

export const mockFilters = {
  field: '',
  year: '',
  sortBy: 'relevance'
};