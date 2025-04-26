import React from 'react';
import { Bold, Italic, Underline, List, Link as LinkIcon, Image } from "lucide-react";

interface SimpleEditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onBulletList: () => void;
  onOrderedList: () => void;
  onLink: () => void;
  onAddImage: () => void;
  onUploadImage: () => void;
  onHeading1: () => void;
  onHeading2: () => void;
  onHeading3: () => void;
}

export default function SimpleEditorToolbar({
  onBold,
  onItalic,
  onUnderline,
  onBulletList,
  onOrderedList,
  onLink,
  onAddImage,
  onUploadImage,
  onHeading1,
  onHeading2,
  onHeading3
}: SimpleEditorToolbarProps) {
  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 mb-2">
      <button
        type="button"
        onClick={onHeading1}
        className="p-1 rounded hover:bg-gray-200"
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={onHeading2}
        className="p-1 rounded hover:bg-gray-200"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={onHeading3}
        className="p-1 rounded hover:bg-gray-200"
        title="Heading 3"
      >
        H3
      </button>
      <button
        type="button"
        onClick={onBold}
        className="p-1 rounded hover:bg-gray-200"
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onItalic}
        className="p-1 rounded hover:bg-gray-200"
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onUnderline}
        className="p-1 rounded hover:bg-gray-200"
        title="Underline"
      >
        <Underline className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onBulletList}
        className="p-1 rounded hover:bg-gray-200"
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onOrderedList}
        className="p-1 rounded hover:bg-gray-200"
        title="Ordered List"
      >
        <ol className="h-4 w-4 flex items-center justify-center text-xs">1.</ol>
      </button>
      <button
        type="button"
        onClick={onLink}
        className="p-1 rounded hover:bg-gray-200"
        title="Add Link"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onAddImage}
        className="p-1 rounded hover:bg-gray-200"
        title="Insert Image URL"
      >
        URL
      </button>
      <button
        type="button"
        onClick={onUploadImage}
        className="p-1 rounded hover:bg-gray-200"
        title="Upload Image"
      >
        <Image className="h-4 w-4" />
      </button>
    </div>
  );
} 