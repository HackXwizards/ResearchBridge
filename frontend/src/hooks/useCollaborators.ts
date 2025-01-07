import { useRef, useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Awareness } from 'y-protocols/awareness';
import { CollaboratorInfo } from '../types';

export const useCollaboration = (documentId: string, currentUser: CollaboratorInfo) => {
  const ydocRef = useRef(new Y.Doc());
  const providerRef = useRef(
    new WebsocketProvider('ws://localhost:1234', documentId, ydocRef.current, {
      connect: true,
      awareness: new Awareness(ydocRef.current),
      maxBackoffTime: 10000,
      disableBc: true,
    })
  );
  const [collaborators, setCollaborators] = useState<CollaboratorInfo[]>([]);

  useEffect(() => {
    const provider = providerRef.current;
    provider.awareness.setLocalState({
      user: {
        name: currentUser.name,
        fullName: currentUser.fullName,
        color: currentUser.color,
        role: currentUser.role,
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
        }));
      setCollaborators(activeUsers);
    };

    updateCollaborators();
    provider.awareness.on('change', updateCollaborators);

    return () => {
      provider.awareness.off('change', updateCollaborators);
      provider.disconnect();
    };
  }, [currentUser]);

  return { ydocRef, providerRef, collaborators };
};