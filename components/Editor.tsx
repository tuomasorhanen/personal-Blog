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
        ['link'],
        ['clean']
      ]
    }
  });

  useEffect(() => {
    const storedContent = localStorage.getItem("editorContent");
    if (quill && storedContent) {
      const delta = JSON.parse(storedContent);
      quill.setContents(delta);
    }
  }, [quill]);

  if (quill) {
    quill.on('text-change', () => {
      const delta = quill.getContents();
      onContentChange(delta);
      localStorage.setItem("editorContent", JSON.stringify(delta));
    });
  }

  return (
    <div className="editor-container">
      <div ref={quillRef} />
    </div>
  );
}
