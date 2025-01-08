import { useMemo } from 'react';
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { Citation } from "../extensions/CitationExtension";
import {CollaboratorInfo} from '../types'


export const useEditorConfig = (
  ydoc: Y.Doc, 
  provider: WebsocketProvider, 
  currentUser: CollaboratorInfo
) => {
  return useMemo(
    () => ({
      extensions: [
        StarterKit.configure({
          history: false,
          heading: false,
        }),
        Heading.configure({
          levels: [1, 2, 3, 4],
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TableHeader,
        Collaboration.configure({
          document: ydoc,
          fragmentSize: 800,
          child: false,
        }),
        CollaborationCursor.configure({
          provider: provider,
          user: currentUser,
          render: (user) => {
            const cursor = document.createElement("div");
            cursor.classList.add("collaboration-cursor");
            cursor.style.backgroundColor = user.color;
            return cursor;
          },
        }),
        Citation.configure({
          HTMLAttributes: {
            class: "citation-text",
          },
        }),
      ],
      editorProps: {
        attributes: {
          class: "prose prose-lg max-w-none focus:outline-none min-h-[800px] px-8 py-6",
        },
      },
      content: `
        <h1>Research Paper Title</h1>
        <p><em>Authors: ${currentUser.fullName}</em></p>
        <h2>Abstract</h2>
        <p>Enter your abstract here...</p>
        <h2>1. Introduction</h2>
        <p>Start your introduction here...</p>
      `,
    }),
    [currentUser]
  );
};