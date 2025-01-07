import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { ExportService } from '../services/ExportService';

export const useExport = (editor: Editor | null) => {
  return useCallback(
    async (format: "pdf" | "latex") => {
      if (!editor) return;

      const exportService = new ExportService(editor);
      try {
        if (format === "pdf") {
          await exportService.exportToPDF();
        } else {
          const latex = exportService.exportToLaTeX();
          const blob = new Blob([latex], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "research-paper.tex";
          a.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error(`Failed to export as ${format}:`, error);
      }
    },
    [editor]
  );
};