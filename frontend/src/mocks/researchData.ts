export const mockProjects = [
  {
    id: '1',
    title: 'AI in Healthcare Research',
    description: 'Investigating applications of AI in medical diagnosis',
    collaborators: ['John Doe', 'Jane Smith'],
    tags: ['AI', 'Healthcare', 'Machine Learning'],
    lastModified: '2024-01-09',
  },
  {
    id: '2',
    title: 'Climate Change Analysis',
    description: 'Study of global climate patterns',
    collaborators: ['Alice Johnson', 'Bob Wilson'],
    tags: ['Climate', 'Environment', 'Data Analysis'],
    lastModified: '2024-01-08',
  },
  {
    id: '3',
    title: 'Quantum Computing Research',
    description: 'Exploring quantum algorithms',
    collaborators: ['Sarah Brown', 'Mike Davis'],
    tags: ['Quantum', 'Computing', 'Physics'],
    lastModified: '2024-01-07',
  },
];

export const mockCollaborators = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Lead Researcher',
    avatar: '👨‍🔬',
    status: 'online',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Data Scientist',
    avatar: '👩‍💻',
    status: 'offline',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    role: 'Research Assistant',
    avatar: '👩‍🔬',
    status: 'online',
  },
];

export const mockDocuments = [
  {
    id: '1',
    name: 'Research Proposal.md',
    type: 'document',
    lastModified: '2024-01-09',
  },
  {
    id: '2',
    name: 'Literature Review',
    type: 'folder',
    items: [
      { id: '2-1', name: 'Paper Analysis.md', type: 'document' },
      { id: '2-2', name: 'References.md', type: 'document' },
    ],
  },
  {
    id: '3',
    name: 'Data Analysis',
    type: 'folder',
    items: [
      { id: '3-1', name: 'Results.md', type: 'document' },
      { id: '3-2', name: 'Graphs.md', type: 'document' },
    ],
  },
];
