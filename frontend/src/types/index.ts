export interface CollaboratorInfo {
    name: string;
    fullName: string;
    color: string;
    avatar?: string;
    role?: string;
  }
  
  export interface CollaborativeEditorProps {
    documentId: string;
    currentUser: CollaboratorInfo;
  }
  
  export interface EditorConfig {
    extensions: Extension[];
    editorProps: EditorProps;
    content: string;
  }