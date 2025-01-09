import axios from 'axios';
import { Publication, PublicationFormData } from '@/types/publication';

const API_URL = 'http://localhost:5000/api/research';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const publicationService = {
  getAllPublications: async (): Promise<Publication[]> => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching publications:', error);
      throw error;
    }
  },

  searchPublications: async (searchParams: {
    query?: string;
    field?: string;
    year?: string;
    sortBy?: string;
  }): Promise<Publication[]> => {
    try {
      const response = await apiClient.get('/search', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching publications:', error);
      throw error;
    }
  },

  getPublicationDetails: async (id: string): Promise<Publication> => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching publication details:', error);
      throw error;
    }
  },

  createPublication: async (publication: PublicationFormData): Promise<Publication> => {
    try {
      // Validate required fields
      if (!publication.title || !publication.authors || !publication.journal) {
        throw new Error('Missing required fields');
      }

      // Format data for backend
      const formattedData = {
        ...publication,
        year: Number(publication.year),
        citations: Number(publication.citations),
        // Ensure arrays are not empty
        authors: publication.authors.filter(author => author.trim() !== ''),
        tags: publication.tags.filter(tag => tag.trim() !== ''),
        references: publication.references.filter(ref => ref.trim() !== '')
      };

      const response = await apiClient.post('/', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating publication:', error);
      throw error;
    }
  },

  // New functions for collaboration features
  requestCollaboration: async (publicationId: string, message: string): Promise<void> => {
    try {
      await apiClient.post(`/collaborate/${publicationId}`, { message });
    } catch (error) {
      console.error('Error requesting collaboration:', error);
      throw error;
    }
  },

  uploadPublication: async (publicationData: FormData): Promise<Publication> => {
    try {
      const response = await apiClient.post('/upload', publicationData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading publication:', error);
      throw error;
    }
  },

  getSimilarResearchers: async (publicationId: string): Promise<any[]> => {
    try {
      const response = await apiClient.get(`/${publicationId}/similar-researchers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching similar researchers:', error);
      throw error;
    }
  }
}; 