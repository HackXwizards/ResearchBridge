import { useEffect, useState, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { WebsocketProvider } from "y-websocket";
import { Awareness } from "y-protocols/awareness";
import * as Y from "yjs";

import { useCollaborators } from "@/hooks/useCollaborators";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { useExport } from "@/hooks/useExport";
import { CollaboratorInfo } from "@/types";
import { CitationService } from "@/services/CitationService";

import { Toolbar } from "./Toolbar";
import { ReferenceManager } from "./ReferenceManager";
import { CollaboratorAvatars } from "./CollaboratorAvatars";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Citation } from "@/extensions/CitationExtension";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface CollaborativeEditorProps {
  documentId: string;
}

const CollaborativeEditor = ({ documentId }: CollaborativeEditorProps) => {
  // Initialize core services and refs
  const ydocRef = useRef(new Y.Doc());
  const providerRef = useRef(
    new WebsocketProvider("ws://localhost:1234", documentId, ydocRef.current, {
      connect: true,
      awareness: new Awareness(ydocRef.current),
      maxBackoffTime: 5000,
      disableBc: false,
      params: {
        clientId: Math.random().toString(36).substr(2, 9),
        tabId: `tab-${Math.random().toString(36).substr(2, 9)}`
      }
    })
  );
  const citationServiceRef = useRef(new CitationService());

  // State management
  const [showReferenceManager, setShowReferenceManager] = useState(false);
  const { collaborators, localUser, isConnected } = useCollaborators(providerRef.current);

  // Editor setup
  const editorConfig = useEditorConfig(ydocRef.current, providerRef.current, localUser as CollaboratorInfo);
  const editor = useEditor(editorConfig);
  const handleExport = useExport(editor);

  // Citation handling
  const handleCitationSelect = useCallback(
    (citation: Citation) => {
      editor?.chain()
        .focus()
        .insertContent({
          type: "citation",
          attrs: {
            id: citation.id,
            reference: `${citation.authors[0]} et al., ${citation.year}`,
            doi: citation.doi,
          },
        })
        .run();

      citationServiceRef.current.addCitation(citation);
      setShowReferenceManager(false);
    },
    [editor]
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <Toolbar
        editor={editor}
        onShowReferenceManager={() => setShowReferenceManager(true)}
        onExport={handleExport}
      />

      <div className="border-b p-2 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <CollaboratorAvatars collaborators={collaborators} />
          {!isConnected && (
            <div className="flex items-center gap-2 text-yellow-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Reconnecting...</span>
            </div>
          )}
        </div>
      </div>

      {!isConnected && (
        <Alert className="m-2" variant="destructive">
          <AlertDescription>
            Connection lost. Trying to reconnect...
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>

      {showReferenceManager && (
        <Dialog
          open={showReferenceManager}
          onOpenChange={setShowReferenceManager}
        >
          <DialogContent className="sm:max-w-[900px] sm:h-[80vh]">
            <ReferenceManager
              onCitationSelect={handleCitationSelect}
              citationService={citationServiceRef.current}
              onClose={() => setShowReferenceManager(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CollaborativeEditor;
