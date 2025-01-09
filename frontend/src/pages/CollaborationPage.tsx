import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import CollaborativeEditor from '@/components/text-editor/CollaborativeEditor';
import { getNextDummyUser } from '@/utils/dummyUsers';
import Sidebar from '@/components/Sidebar';

const CollaborationPage = () => {
  const [currentUser, setCurrentUser] = useState(() => getNextDummyUser());

  useEffect(() => {
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
    <div className="h-screen flex p-10 mt-10">
      {/* New Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <Card className="h-full border rounded-lg shadow-lg overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="border-b p-4">
              <input
                type="text"
                placeholder="Research Paper Title"
                className="w-full text-xl font-semibold focus:outline-none"
              />
            </div>

            <div className="flex-1 overflow-auto hidden md:block">
              <CollaborativeEditor 
                documentId="research-paper-1"
                currentUser={currentUser}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CollaborationPage;