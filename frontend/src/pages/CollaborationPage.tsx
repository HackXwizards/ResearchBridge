import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CollaborativeEditor from '@/components/text-editor/CollaborativeEditor';
import { getNextDummyUser } from '@/utils/dummyUsers';

const CollaborationPage = () => {
  const [view, setView] = useState<'personal' | 'shared' | 'organization'>('personal');
  const [currentUser, setCurrentUser] = useState(() => getNextDummyUser());

  useEffect(() => {
    // Only update user if there isn't one already stored
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser' && e.newValue) {
        setCurrentUser(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="container mx-auto p-10 mt-20 ">
      <Card className="border rounded-lg shadow-lg">
        <div className="grid grid-cols-[300px_1fr] h-[80vh]">
          {/* Left Sidebar */}
          <div className="border-r p-4 space-y-4">
            <div>
              <h2 className="font-semibold mb-2">Research Papers</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">Edit</Button>
                <Button variant="outline" className="w-full justify-start">Share with Researchers</Button>
                <Button variant="outline" className="w-full justify-start">Export as PDF</Button>
                <Button variant="outline" className="w-full justify-start">Discussion Board</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setView('personal')}
              >
                My Papers
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setView('shared')}
              >
                Collaborative Papers
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setView('organization')}
              >
                Institution Papers
              </Button>
            </div>

            <div className="absolute bottom-4">
              <Button variant="outline" className="w-full">
                New Research Paper
              </Button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="p-4 flex flex-col h-full w-full">
            <div className="border-b pb-2 mb-4">
              <input
                type="text"
                placeholder="Research Paper Title"
                className="w-full text-xl font-semibold focus:outline-none"
              />
            </div>

            <CollaborativeEditor 
              documentId="research-paper-1"
              currentUser={currentUser}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CollaborationPage;