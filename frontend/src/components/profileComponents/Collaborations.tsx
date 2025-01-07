import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Collaboration } from "@/hooks/useProfileData";

interface CollaborationsProps {
  collaborations: Collaboration[];
}   

export const Collaborations = ({ collaborations }: CollaborationsProps) => {
  return (
    <div className="space-y-6">
      {collaborations.map((collab) => (
        <Card key={collab.id} className="hover:bg-gray-50 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h3 className="text-xl font-poppins font-semibold text-gray-900">
                  {collab.institution}
                </h3>
                <Badge
                  variant={collab.status === 'active' ? 'default' : 'secondary'}
                  className={`${
                    collab.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  } font-poppins mt-2 sm:mt-0`}
                >
                  {collab.status}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 font-poppins">
                {collab.period}
              </p>
              
              <h4 className="font-medium text-gray-900 font-poppins">
                {collab.project}
              </h4>
              
              <p className="text-gray-700 font-poppins leading-relaxed">
                {collab.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {collab.topics.map((topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="bg-gray-50 text-gray-700 border-gray-200 font-poppins"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

