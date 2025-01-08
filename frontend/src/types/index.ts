export interface CollaboratorInfo {
    name: string;
    fullName: string;
    color: string;
    role: string;
    sessionId: string;
  }
  
  export interface CollaborativeEditorProps {
    documentId: string;
  }
  
  export interface EditorConfig {
    extensions: Extension[];
    editorProps: EditorProps;
    content: string;
  }