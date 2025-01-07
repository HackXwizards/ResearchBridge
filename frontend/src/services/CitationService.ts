import axios from 'axios';
import { Citation } from '../extensions/CitationExtension';

export class CitationService {
  private citations: Map<string, Citation> = new Map();
  private cache: Map<string, Citation[]> = new Map();
  private cacheTimestamps: Map<string, number> = new Map();

  clearCache() {
    this.cache.clear();
    this.cacheTimestamps.clear();
  }

  async searchGoogleScholar(query: string): Promise<Citation[]> {
    try {
      // Check cache first
      const cacheKey = `scholar:${query}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      const response = await axios.get(`/api/scholar`, {
        params: { q: query },
        timeout: 5000
      });

      const results = response.data.map(this.normalizeCitation);
      this.cache.set(cacheKey, results);
      return results;
    } catch (error) {
      console.error('Google Scholar search failed:', error);
      throw new Error('Failed to search Google Scholar');
    }
  }

  private normalizeCitation(raw: any): Citation {
    return {
      id: raw.id || crypto.randomUUID(),
      title: raw.title,
      authors: Array.isArray(raw.authors) ? raw.authors : [raw.authors],
      year: parseInt(raw.year) || new Date().getFullYear(),
      doi: raw.doi,
      journal: raw.journal,
      volume: raw.volume,
      issue: raw.issue,
      pages: raw.pages
    };
  }

  addCitation(citation: Citation) {
    this.citations.set(citation.id, citation);
  }

  getCitation(id: string): Citation | undefined {
    return this.citations.get(id);
  }

  getAllCitations(): Citation[] {
    return Array.from(this.citations.values());
  }

  exportBibTeX(): string {
    return Array.from(this.citations.values())
      .map(this.formatBibTeX)
      .join('\n\n');
  }

  private formatBibTeX(citation: Citation): string {
    return `@article{${citation.id},
  title={${citation.title}},
  author={${citation.authors.join(' and ')}},
  year={${citation.year}},
  journal={${citation.journal || ''}},
  volume={${citation.volume || ''}},
  number={${citation.issue || ''}},
  pages={${citation.pages || ''}},
  doi={${citation.doi || ''}}
}`;
  }
}