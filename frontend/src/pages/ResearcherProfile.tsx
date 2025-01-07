  import { useState } from 'react';
  import { motion } from 'framer-motion';
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
  import { Card, CardContent } from "@/components/ui/card";
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  import { Badge } from "@/components/ui/badge";
  import { useCollaborationsData, usePublicationsData, useResearcherData } from "@/hooks/useProfileData";
  import { Overview } from "@/components/profileComponents/Overview";
  import { Publications } from "@/components/profileComponents/Publications";
  import { Collaborations } from "@/components/profileComponents/Collaborations";

  // Import icons
  import { 
    FaGraduationCap, 
    FaResearchgate, 
    FaOrcid, 
    FaLinkedin, 
    FaTwitter, 
    FaGithub 
  } from 'react-icons/fa';

  const ResearcherProfile = () => {
    const { data: researcher } = useResearcherData();
    const { data: publications } = usePublicationsData();
    const { data: collaborations } = useCollaborationsData();
    const [activeTab, setActiveTab] = useState('overview');

    const tabVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
      <div className="min-h-screen bg-gradient-to-b mt-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Avatar className="w-40 h-40 border-4 border-gray-200 shadow-lg">
                    <AvatarImage src={researcher.avatar} alt={researcher.name} />
                    <AvatarFallback>{researcher.name[0]}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="text-center lg:text-left space-y-4 flex-1">
                  <motion.h1 
                    className="text-4xl font-poppins font-bold text-gray-900"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {researcher.name}
                  </motion.h1>
                  <motion.p 
                    className="text-2xl text-gray-700 font-poppins"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2  }}
                  >
                    {researcher.title}
                  </motion.p>
                  
                  {/* Social Links */}
                  <motion.div 
                    className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {researcher.socialLinks.googleScholar && (
                      <a href={researcher.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-blue-700 transition-colors p-2 rounded-md hover:bg-gray-100">
                        <FaGraduationCap className="text-2xl" />
                        <span className="text-sm font-poppins">Google Scholar</span>
                      </a>
                    )}
                    {researcher.socialLinks.researchGate && (
                      <a href={researcher.socialLinks.researchGate} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#289388] transition-colors p-2 rounded-md hover:bg-gray-100">
                        <FaResearchgate className="text-2xl" />
                        <span className="text-sm font-poppins">ResearchGate</span>
                      </a>
                    )}
                    {researcher.socialLinks.orcid && (
                      <a href={researcher.socialLinks.orcid} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-700 transition-colors p-2 rounded-md hover:bg-gray-100">
                        <FaOrcid className="text-2xl" />
                        <span className="text-sm font-poppins">ORCID</span>
                      </a>
                    )}
                    {researcher.socialLinks.linkedin && (
                      <a href={researcher.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 transition-colors p-2 rounded-md hover:bg-gray-100">
                        <FaLinkedin className="text-2xl" />
                        <span className="text-sm font-poppins">LinkedIn</span>
                      </a>
                    )}
                    {researcher.socialLinks.twitter && (
                      <a href={researcher.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 transition-colors p-2 rounded-md hover:bg-gray-100">
                        <FaTwitter className="text-2xl" />
                        <span className="text-sm font-poppins">Twitter</span>
                      </a>
                    )}
                    {researcher.socialLinks.github && (
                      <a href={researcher.socialLinks.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-800 transition-colors p-2 rounded-md hover:bg-gray-100">
                        <FaGithub className="text-2xl" />
                        <span className="text-sm font-poppins">GitHub</span>
                      </a>
                    )}
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {researcher.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-poppins px-3 py-1 text-sm"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </motion.div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="mt-12" onValueChange={setActiveTab}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsList className="flex font-poppins w-full mb-8 bg-transparent justify-center pl-10 pr-10">
                    {[
                      { value: 'overview', label: 'Profile Overview' },
                      { value: 'publications', label: 'My Publications' },
                      { value: 'collaborations', label: 'My Collaborations' },
                    ].map((tab) => (
                      <motion.div
                        key={tab.value}
                        // whileHover={{ scale: 1.02 }}
                        // whileTap={{ scale: 0.98 }} 
                        className="flex-1   "
                      >
                        <TabsTrigger
                          value={tab.value}
                          className="w-full  text-[10px] sm:text-lg px-1 sm:px-6 py-2 sm:py-3 data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-none data-[state=inactive]:bg-gray-50 data-[state=inactive]:text-gray-600 rounded-none"
                        >
                          {tab.label}
                        </TabsTrigger>
                      </motion.div>
                    ))}
                  </TabsList>
                </motion.div>

                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  variants={tabVariants}
                >
                  <TabsContent value="overview">
                    <Overview researcher={researcher} />
                  </TabsContent>

                  <TabsContent value="publications">
                    <Publications publications={publications} />
                  </TabsContent>

                  <TabsContent value="collaborations">
                    <Collaborations collaborations={collaborations} />
                  </TabsContent>
                </motion.div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  export default ResearcherProfile;

