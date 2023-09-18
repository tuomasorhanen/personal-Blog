"use client";
import React, { useState } from "react";
import EditorComponent from "@/components/Editor";
import { Delta } from "quill";
import { updateProjectContent } from "@/sanity/sanity-utils";
import { v4 as uuidv4 } from 'uuid';

const Editor = () => {
  const [content, setContent] = useState<any[]>([]);
  const [publishStatus, setPublishStatus] = useState("publish");
  const [name, setName] = useState("");

  const handleContentChange = (delta: Delta) => {
    const portableText = quillToPortableText(delta);
    setContent(portableText);
  };

  const publish = async () => {
    setPublishStatus("publishing");
    await updateProjectContent({ content, name });
    setPublishStatus("published");
    setTimeout(() => {
      setPublishStatus("publish");
    }, 3000);
  };

  const getButtonColor = () => {
    switch (publishStatus) {
      case "publish":
        return "bg-gray-700";
      case "publishing":
        return "bg-yellow-500";
      case "published":
        return "bg-green-500";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={publish}
        className={`border border-black px-4 py-2 text-white rounded-full ${getButtonColor()}`}
      >
        {publishStatus.charAt(0).toUpperCase() + publishStatus.slice(1)}
      </button>
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border-2 rounded-full w-full focus:outline-none focus:border-blue-400"
      />
      <EditorComponent onContentChange={handleContentChange} />
    </div>
  );
};

export default Editor;


interface PortableTextSpan {
  _type: 'span';
  text: string;
  marks: string[];
  _key: string;
  markDefs?: any[];
  style?: any;

}

interface PortableTextBlock {
  _type: 'block';
  children: PortableTextSpan[];
  _key: string;
  markDefs?: any[];
  style?: any;
}

interface MarkDef {
  _type: 'link';
  _key: string;
  href: string;
}

function quillToPortableText(delta: Delta): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  let currentText = '';
  let currentMarks: string[] = [];
  let markDefs: MarkDef[] = [];
  let style = 'normal';

  if (!delta.ops) return blocks;

  delta.ops.forEach((op, index) => {
    if (typeof op.insert === 'string') {
      if (op.attributes && op.attributes.header) {
        style = `h${op.attributes.header}`;
      }

      currentText += op.insert;

      if (op.attributes) {
        if (op.attributes.bold) currentMarks.push('strong');
        if (op.attributes.italic) currentMarks.push('em');
        if (op.attributes.underline) currentMarks.push('underline');
        if (op.attributes.link) {
          const linkKey = uuidv4();
          currentMarks.push(linkKey);
          markDefs.push({
            _type: 'link',
            _key: linkKey,
            href: op.attributes.link,
          });
        }
      }

      if (op.insert.endsWith('\n') || index === delta.ops!.length - 1) {
        const block: PortableTextBlock = {
          _type: 'block',
          _key: uuidv4(),
          style,
          children: [
            {
              _type: 'span',
              _key: uuidv4(),
              text: currentText.trim(),
              marks: currentMarks,
            },
          ],
          markDefs,
        };

        blocks.push(block);
        currentText = '';
        currentMarks = [];
        markDefs = [];
        style = 'normal';
      }
    }
  });

  return blocks;
}