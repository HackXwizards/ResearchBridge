import { useState } from "react";

export interface ResearcherData {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  interests: string[];
  socialLinks: {
    googleScholar?: string;
    researchGate?: string;
    orcid?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  recentActivities: Array<{
    id: string;
    title: string;
    date: string;
    type: "publication" | "collaboration" | "research";
  }>;
}

export interface Publication {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  citations: number;
}

export interface Collaboration {
  id: string;
  institution: string;
  project: string;
  description: string;
  status: "active" | "completed";
  period: string;
  topics: string[];
}

export const useResearcherData = () => {
  const [data] = useState<ResearcherData>({
    name: "Dr. Anuj Kumar",
    title: "Senior Research Scientist in AI & Machine Learning",
    avatar: "https://avatars.githubusercontent.com/u/136173245?v=4", // Placeholder avatar
    bio: "Research scientist with 10+ years of experience in machine learning and artificial intelligence. Currently focused on developing novel approaches to knowledge graph construction and analysis.",
    interests: [
      "Machine Learning",
      "Knowledge Graphs",
      "Data Science",
      "AI Ethics",
    ],
    socialLinks: {
      googleScholar: "https://scholar.google.com/citations?user=example",
      researchGate: "https://www.researchgate.net/profile/Jane-Smith",
      orcid: "https://orcid.org/0000-0002-1234-5678",
      linkedin: "https://www.linkedin.com/in/anuj-kumar-6aa13b264/",
      twitter: "https://twitter.com/anuj846kk",
      github: "https://github.com/anuj846k"
    },
    recentActivities: [
      {
        id: "1",
        title: "Published: 'Novel Approaches to Knowledge Graph Construction'",
        date: "2024-03-15",
        type: "publication",
      },
      {
        id: "2",
        title: "Started collaboration with Stanford AI Lab",
        date: "2024-03-01",
        type: "collaboration",
      },
      {
        id: "3",
        title: "Research Grant Awarded: AI for Scientific Discovery",
        date: "2024-02-15",
        type: "research",
      },
    ],
  });

  // In the future, you can add API calls here
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/researcher-profile');
  //     const data = await response.json();
  //     setData(data);
  //   };
  //   fetchData();
  // }, []);

  return { data };
};

export const usePublicationsData = () => {
  const [data] = useState<Publication[]>([
    {
      id: "1",
      title:
        "Novel Approaches to Knowledge Graph Construction in Scientific Literature",
      abstract:
        "This paper presents innovative methods for automatically constructing knowledge graphs from scientific literature, utilizing advanced natural language processing techniques and machine learning algorithms.",
      authors: ["Jane Smith", "John Doe", "Sarah Johnson"],
      journal: "Journal of Artificial Intelligence Research",
      year: 2024,
      doi: "https://doi.org/10.1234/example",
      citations: 45,
    },
  ]);

  return { data };
};

export const useCollaborationsData=()=>{
  const [data] = useState<Collaboration[]>([
    {
      id: "1",
      institution: "Stanford AI Lab",
      project: "Deep Learning for Scientific Knowledge Discovery",
      description: "Collaborative research on applying deep learning models to accelerate scientific discoveries through automated literature analysis and hypothesis generation.",
      status: "active",
      period: "2024-present",
      topics: ["Deep Learning", "Scientific Discovery", "NLP"]
    },
    {
      id: "2",
      institution: "MIT Media Lab",
      project: "Ethical AI Systems Development",
      description: "Joint initiative to develop frameworks and tools for ensuring ethical considerations in AI system development and deployment.",
      status: "active",
      period: "2023-present",
      topics: ["AI Ethics", "Responsible AI", "Governance"]
    },
    {
      id: "3",
      institution: "Oxford University",
      project: "Knowledge Graph Applications in Healthcare",
      description: "Research collaboration focused on applying knowledge graph technologies to improve healthcare data integration and analysis.",
      status: "completed",
      period: "2022-2023",
      topics: ["Healthcare AI", "Knowledge Graphs", "Data Integration"]
    }
  ]);

  return { data };
};