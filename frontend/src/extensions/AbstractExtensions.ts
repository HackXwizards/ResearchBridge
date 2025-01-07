import { Node, mergeAttributes } from '@tiptap/core'

export const Abstract = Node.create({
  name: 'abstract',
  
  group: 'block',
  
  content: 'block+',
  
  defining: true,

  parseHTML() {
    return [
      { tag: 'div[data-type="abstract"]' }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'abstract', class: 'abstract-section' }), 0]
  },
})