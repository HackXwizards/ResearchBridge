import { useEffect, useState, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import { Citation } from "../../extensions/CitationExtension";
// import {Abstract} from '../extensions/AbstractExtension'
import { CitationService } from "../../services/CitationService";
import { ReferenceManager } from "./ReferenceManager";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import { Toolbar } from "./Toolbar";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import debounce from "lodash/debounce";
import { Awareness } from "y-protocols/awareness";
import { useEditorConfig } from "@/hooks/useEditorConfig";
import { useExport } from "@/hooks/useExport";
import { CollaboratorsList } from "./CollaboratorsList";

interface CollaboratorInfo {
  name: string;
  fullName: string;
  color: string;
  avatar?: string;
  role?: string;
}

interface CollaborativeEditorProps {
  documentId: string;
  currentUser: CollaboratorInfo;
}

const CollaborativeEditor = ({
  documentId,
  currentUser,
}: CollaborativeEditorProps) => {
  // Use useRef for values that shouldn't trigger re-renders
  const ydocRef = useRef(new Y.Doc());
  const providerRef = useRef(
    new WebsocketProvider("ws://localhost:1234", documentId, ydocRef.current, {
      connect: true,
      awareness: new Awareness(ydocRef.current),
      maxBackoffTime: 10000,
      disableBc: true,
    })
  );
  const citationServiceRef = useRef(new CitationService());

  const [showReferenceManager, setShowReferenceManager] = useState(false);
  const [collaborators, setCollaborators] = useState<CollaboratorInfo[]>([]);

  // Memoize the editor configuration
  const editorConfig = useEditorConfig(
    ydocRef.current,
    providerRef.current,
    currentUser
  );

  const editor = useEditor(editorConfig);
  const handleExport = useExport(editor);

  // Memoize handlers
  const handleCitationSelect = useCallback(
    (citation: Citation) => {
      editor
        ?.chain()
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

  // Add memory cleanup for Y.js and WebSocket
  useEffect(() => {
    const cleanup = () => {
      // Clear awareness states
      providerRef.current.awareness.setLocalState(null);

      // Disconnect and cleanup websocket
      providerRef.current.disconnect();
      providerRef.current.destroy();

      // Clear Y.js document
      ydocRef.current.destroy();

      // Clear any cached data
      citationServiceRef.current.clearCache();

      // Remove global.gc check since it's not available in browser
    };

    // Periodic cleanup of unused data
    const periodicCleanup = debounce(() => {
      if (editor) {
        // Normalize DOM to remove empty nodes
        editor.view.dom.normalize();

        // Clear any stored marks
        editor.commands.clearNodes();

        // Force redraw to clear any hanging decorations
        editor.view.updateState(editor.state);
      }
    }, 30000); // Run every 30 seconds

    editor?.on("update", periodicCleanup);

    return () => {
      editor?.off("update", periodicCleanup);
      periodicCleanup.cancel();
      cleanup();
    };
  }, [editor]);

  // Add connection status monitoring
  useEffect(() => {
    const provider = providerRef.current;

    const handleConnect = () => {
      console.log("Connected to collaboration server");
    };

    const handleDisconnect = () => {
      console.log("Disconnected from collaboration server");
    };

    provider.on("sync", handleConnect);
    provider.on("disconnect", handleDisconnect);

    return () => {
      provider.off("sync", handleConnect);
      provider.off("disconnect", handleDisconnect);
    };
  }, []);

  // Update collaborators
  useEffect(() => {
    const provider = providerRef.current;

    // Set the current user's state when connecting
    provider.awareness.setLocalState({
      user: {
        name: currentUser.name,
        fullName: currentUser.fullName,
        color: currentUser.color,
        role: currentUser.role,
        // Add a unique session ID to distinguish between tabs
        sessionId: Math.random().toString(36).substr(2, 9),
      },
    });

    const updateCollaborators = () => {
      const states = Array.from(provider.awareness.getStates().values());
      const activeUsers = states
        .filter((state) => state?.user)
        .map((state) => ({
          name: state.user.name,
          fullName: state.user.fullName,
          color: state.user.color,
          avatar: state.user.avatar,
          role: state.user.role,
          sessionId: state.user.sessionId,
        }));

      // Remove duplicates based on sessionId
      const uniqueUsers = Array.from(
        new Map(activeUsers.map(user => [user.sessionId, user])).values()
      );
      
      setCollaborators(uniqueUsers);
    };

    // Update collaborators immediately and on changes
    updateCollaborators();
    provider.awareness.on("change", updateCollaborators);
    // Handle tab/window close or visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        provider.awareness.setLocalState(null);
      } else {
        // Restore state when tab becomes visible again
        provider.awareness.setLocalState({
          user: {
            name: currentUser.name,
            fullName: currentUser.fullName,
            color: currentUser.color,
            role: currentUser.role,
            sessionId: Math.random().toString(36).substr(2, 9),
          },
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function
    return () => {
      provider.awareness.off("change", updateCollaborators);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      provider.awareness.setLocalState(null);
    };
  }, [currentUser]);

  // Add content size monitoring and limiting
  const MAX_CONTENT_SIZE = 1000000; // 1MB limit

  const handleContentUpdate = useCallback(() => {
    if (!editor) return;

    const content = editor.getHTML();
    if (content.length > MAX_CONTENT_SIZE) {
      console.warn("Content size exceeds limit");
      // Optionally notify user
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.on("update", handleContentUpdate);
    return () => {
      editor.off("update", handleContentUpdate);
    };
  }, [editor, handleContentUpdate]);

  // Add image size limits and optimization
  const handleImageUpload = useCallback(async (file: File) => {
    const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

    if (file.size > MAX_IMAGE_SIZE) {
      // Compress image before inserting
      try {
        const compressedFile = await compressImage(file);
        // Insert compressed image
      } catch (error) {
        console.error("Failed to compress image:", error);
      }
    }
  }, []);

  // Add this effect to configure awareness settings
  useEffect(() => {
    if (providerRef.current.awareness) {
      providerRef.current.awareness.setLocalStateField("timeout", 30000);
      providerRef.current.awareness.setLocalStateField(
        "cleanupInterval",
        60000
      );
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <Toolbar
        editor={editor}
        onShowReferenceManager={() => setShowReferenceManager(true)}
        onExport={handleExport}
      />
      <div className="border-b p-2 flex justify-between items-center bg-gray-50">
        <CollaboratorsList collaborators={collaborators} />
      </div>
      

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto bg-amber-50">
        <div>
          
        </div>
        <EditorContent editor={editor} />
      </div>

      {/* Reference Manager Modal */}
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