"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Delta } from "quill";

interface EditorComponentProps {
  onContentChange: (delta: Delta) => void;
}

export default function EditorComponent({ onContentChange }: EditorComponentProps) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ 'header': ['Normal', '1', '2', '3', '4', '5'] }],
        ['bold', 'italic', 'underline'],
        ['clean']
      ]
    }
  });

  // Set initial content from sessionStorage
  useEffect(() => {
    if (quill) {
      const savedDelta = sessionStorage.getItem('editor-content');
      if (savedDelta) {
        quill.setContents(JSON.parse(savedDelta), 'silent');
      }
    }
  }, [quill]);

  // Listen for changes and update sessionStorage
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const delta = quill.getContents();
        sessionStorage.setItem('editor-content', JSON.stringify(delta));
        onContentChange(delta);
      });
    }
  }, [quill, onContentChange]);

  return (
    <div className="editor-container">
      <div ref={quillRef} />
    </div>
  );
}

