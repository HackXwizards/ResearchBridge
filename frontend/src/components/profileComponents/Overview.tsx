import { Card } from "@/components/ui/card";
import type { ResearcherData } from "@/hooks/useProfileData";

interface OverviewProps {
  researcher: ResearcherData;
}

export const Overview = ({ researcher }: OverviewProps) => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-poppins mb-4 text-gray-900 border-b pb-2">About</h2>
        <p className="text-gray-700 font-poppins leading-relaxed">{researcher.bio}</p>
      </div>

      <div>
        <h2 className="text-2xl font-poppins mb-4 text-gray-900 border-b pb-2">Recent Activities</h2>
        <div className="space-y-4">
          {researcher.recentActivities.map((activity) => (
            <Card key={activity.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <h3 className="font-medium font-poppins text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600 font-poppins mt-1">{activity.date}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

