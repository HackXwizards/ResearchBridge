import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { mockProjects, mockCollaborators, mockDocuments } from '@/mocks/researchData';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors cursor-pointer"
              >
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'team':
        return (
          <div className="space-y-4">
            {mockCollaborators.map((collaborator) => (
              <motion.div
                key={collaborator.id}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
              >
                <span className="text-2xl mr-3">{collaborator.avatar}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{collaborator.name}</h3>
                  <p className="text-sm text-gray-600">{collaborator.role}</p>
                </div>
                <div className={`ml-auto w-2 h-2 rounded-full ${
                  collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </motion.div>
            ))}
          </div>
        );

      case 'files':
        return (
          <div className="space-y-4">
            {mockDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
              >
                {doc.type === 'folder' ? (
                  <div className="space-y-2">
                    <div className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
                      <span className="text-xl mr-2">📁</span>
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {doc.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-colors cursor-pointer"
                        >
                          <span className="text-xl mr-2">📄</span>
                          <span className="text-gray-800">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
                    <span className="text-xl mr-2">📄</span>
                    <span className="text-gray-900">{doc.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-80 h-screen bg-gray-50/80 backdrop-blur-sm border-r border-gray-200/50 p-4 overflow-y-auto">
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'projects' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('projects')}
          className="flex-1"
        >
          Projects
        </Button>
        <Button
          variant={activeTab === 'team' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('team')}
          className="flex-1"
        >
          Team
        </Button>
        <Button
          variant={activeTab === 'files' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('files')}
          className="flex-1"
        >
          Files
        </Button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Sidebar;
