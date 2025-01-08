import { useState, useEffect, useRef } from 'react';
import { WebsocketProvider } from 'y-websocket';
import { CollaboratorInfo } from '@/types';
import { getNextDummyUser } from '@/utils/dummyUsers';

export const useCollaborators = (provider: WebsocketProvider) => {
  const [collaborators, setCollaborators] = useState<CollaboratorInfo[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const localUserRef = useRef(getNextDummyUser());
  const tabIdRef = useRef(`tab-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!provider.awareness) return;

    const updateConnectionStatus = ({ status }: { status: string }) => {
      setIsConnected(status === 'connected');
    };

    const updateCollaborators = () => {
      if (!provider.wsconnected) return;

      const states = Array.from(provider.awareness.getStates());
      const currentClientId = provider.awareness.clientID;
      
      const userConnections = new Map<string, CollaboratorInfo>();

      states.forEach(([clientId, state]) => {
        if (state?.user) {
          const { name, tabId, ...userData } = state.user;
          const existing = userConnections.get(name);
          
          if (!existing || clientId > existing.clientId) {
            userConnections.set(name, {
              ...userData,
              name,
              tabId,
              clientId
            });
          }
        }
      });

      userConnections.delete(localUserRef.current.name);

      userConnections.set(localUserRef.current.name, {
        ...localUserRef.current,
        tabId: tabIdRef.current,
        clientId: currentClientId,
      });

      setCollaborators(Array.from(userConnections.values()));
    };

    const cleanup = () => {
      provider.awareness.setLocalState(null);
    };

    provider.awareness.setLocalState({
      user: {
        ...localUserRef.current,
        tabId: tabIdRef.current,
        clientId: provider.awareness.clientID,
      }
    });

    provider.awareness.on('change', updateCollaborators);
    provider.on('status', updateConnectionStatus);

    updateConnectionStatus({ status: provider.wsconnected ? 'connected' : 'disconnected' });
    updateCollaborators();

    return () => {
      cleanup();
      provider.awareness.off('change', updateCollaborators);
      provider.off('status', updateConnectionStatus);
    };
  }, [provider]);

  return {
    collaborators,
    localUser: localUserRef.current,
    isConnected
  };
};