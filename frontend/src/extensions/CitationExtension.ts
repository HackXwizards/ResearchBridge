import { Node, mergeAttributes } from '@tiptap/core'

export interface Citation {
  id: string;
  title: string;
  authors: string[];
  year: number;
  doi?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

export const Citation = Node.create({
  name: 'citation',
  
  group: 'inline',
  
  inline: true,
  
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      reference: { default: '' },
      doi: { default: null },
      title: { default: '' },
      authors: { default: [] },
      year: { default: null },
      journal: { default: '' }
    }
  },

  parseHTML() {
    return [
      { tag: 'span[data-type="citation"]' }
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const authors = node.attrs.authors[0] || '';
    const year = node.attrs.year || '';
    const displayText = `${authors} et al., ${year}`;

    return ['span', mergeAttributes(
      HTMLAttributes,
      { 
        'data-type': 'citation',
        'class': 'citation inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-800 rounded hover:bg-blue-100 cursor-pointer',
        'data-tooltip': node.attrs.title
      }
    ), displayText];
  },
})