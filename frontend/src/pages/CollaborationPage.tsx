import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CollaborativeEditor from "@/components/text-editor/CollaborativeEditor";

const CollaborationPage = () => {
  const [view, setView] = useState<"personal" | "shared" | "organization">(
    "personal"
  );

  return (
    <div className="container mx-auto p-10 mt-20 overflow-hidden">
      <Card className="border rounded-lg shadow-lg">
        <div className="grid grid-cols-[300px_1fr] h-[80vh]">
          {/* Left Sidebar */}
          <div className="border-r p-4 space-y-4">
            <div>
              <h2 className="font-semibold mb-2">Research Papers</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Edit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Share with Researchers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Export as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Discussion Board
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setView("personal")}
              >
                My Papers
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setView("shared")}
              >
                Collaborative Papers
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setView("organization")}
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
          <div className="p-4 flex flex-col h-full">
            <div className="border-b pb-2 mb-4">
              <input
                type="text"
                placeholder="Research Paper Title"
                className="w-full text-xl font-semibold focus:outline-none"
              />
            </div>

            <CollaborativeEditor documentId="research-paper-1" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CollaborationPage;
