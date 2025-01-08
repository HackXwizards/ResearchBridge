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
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

// Create lowlight instance with specific languages
const lowlight = createLowlight();
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

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
        }),
        Heading.configure({
          levels: [1, 2, 3, 4],
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'prose-table',
          },
        }),
        TableRow.configure({
          HTMLAttributes: {
            class: 'prose-tr',
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class: 'prose-th',
          },
        }),
        TableCell.configure({
          HTMLAttributes: {
            class: 'prose-td',
          },
        }),
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
        Image.configure({
          HTMLAttributes: {
            class: 'editor-image',
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'prose-list-disc list-disc',
          },
        }),
        ListItem.configure({
          HTMLAttributes: {
            class: 'prose-li',
          },
        }),
        Dropcursor,
        CodeBlockLowlight.configure({
          lowlight,
          HTMLAttributes: {
            class: 'prose-pre',
          },
        }),
      ],
      editorProps: {
        attributes: {
          class: "prose prose-sm max-w-none focus:outline-none",
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