import {
  BookOpen,
  Image,
  Table as TableIcon,
  List,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { Code } from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
  onShowResearchAssistant: () => void;
  onExport: () => void;
}

export function Toolbar({
  editor,
  onShowResearchAssistant,
  onExport,
}: ToolbarProps) {
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

  const handleImageClick = () => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="border-b p-2 flex justify-between items-center bg-slate-50">
      <div className="flex gap-2">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={onShowResearchAssistant}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Add Citation
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert citation from library</TooltipContent>
          </Tooltip>

          <Button variant="ghost" size="sm" onClick={handleImageClick}>
            <Image className="w-4 h-4 mr-1" />
            Figure
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={editor?.isActive("codeBlock") ? "bg-gray-200" : ""}
          >
            <Code className="w-4 h-4 mr-1" />
            Code Block
          </Button>
        </div>

        {/* Table Controls */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <Button variant="ghost" size="sm" onClick={addTable}>
            <TableIcon className="w-4 h-4 mr-1" />
            Insert Table
          </Button>

          {editor?.isActive("table") && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
              >
                Add Column
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().addRowAfter().run()}
              >
                Add Row
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().deleteTable().run()}
              >
                Delete Table
              </Button>
            </>
          )}
        </div>

        {/* List Controls */}
        <div className="flex items-center space-x-1 border-r pr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={editor?.isActive("bulletList") ? "bg-gray-200" : ""}
          >
            <List className="w-4 h-4 mr-1" />
            Bullet List
          </Button>

          {editor?.isActive("listItem") && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().sinkListItem("listItem").run()
                }
                disabled={!editor?.can().sinkListItem("listItem")}
              >
                Indent
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor?.chain().focus().liftListItem("listItem").run()
                }
                disabled={!editor?.can().liftListItem("listItem")}
              >
                Outdent
              </Button>
            </>
          )}
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
          <Button variant="outline" size="sm" onClick={() => onExport("latex")}>
            Export LaTeX
          </Button>
        </div>

        <div className="flex items-center space-x-1 border-r pr-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={onShowResearchAssistant}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Research Assistant
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
