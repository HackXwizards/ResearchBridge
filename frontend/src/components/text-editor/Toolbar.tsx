import { BookOpen, FileText, Image, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import { useState } from "react";

interface ToolbarProps {
  editor: Editor | null;
  onShowReferenceManager: () => void;
  onExport: (format: "pdf" | "latex") => Promise<void>;
}

export const Toolbar = ({
  editor,
  onShowReferenceManager,
  onExport,
}: ToolbarProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportClick = async (format: "pdf" | "latex") => {
    try {
      setIsExporting(true);
      await onExport(format);
    } catch (error) {
      console.error(`Failed to export as ${format}:`, error);
      // You might want to show an error toast here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="border-b p-2 flex justify-between items-center bg-gray-50">
      <div className="flex gap-2">
        {/* Document Structure */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor?.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
            }
          >
            <FileText className="w-4 h-4 mr-1" />
            Title
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }
          >
            Section
          </Button>
        </div>

        {/* Formatting */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "bg-gray-200" : ""}
          >
            Bold
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "bg-gray-200" : ""}
          >
            Italic
          </Button>
        </div>

        {/* Research Tools */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onShowReferenceManager}>
                <BookOpen className="w-4 h-4 mr-1" />
                Add Citation
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert citation from library</TooltipContent>
          </Tooltip>

          <Button variant="ghost" size="sm">
            <TableIcon className="w-4 h-4 mr-1" />
            Table
          </Button>
          <Button variant="ghost" size="sm">
            <Image className="w-4 h-4 mr-1" />
            Figure
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportClick("pdf")}
            disabled={isExporting}
          >
            {isExporting ? "Exporting..." : "Export PDF"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport("latex")}
        >
          Export LaTeX
        </Button>
      </div>
    </div>
  </div>
);
};
