import React, { useEffect, useRef, useState } from 'react';
import SimpleEditorToolbar from './SimpleEditorToolbar';
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
});

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SimpleEditor({
  value,
  onChange,
  className = "prose max-w-none min-h-[230px] focus:outline-none",
  placeholder = "Start writing your content here..."
}: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initial setup and content
  useEffect(() => {
    if (editorRef.current) {
      // Only set content if empty (to preserve cursor)
      if (!editorRef.current.innerHTML || editorRef.current.innerHTML === '<p><br></p>') {
        editorRef.current.innerHTML = value || '<p><br></p>';
      }
    }
  }, []);

  // Update content from value prop
  useEffect(() => {
    if (editorRef.current && value && !editorRef.current.isSameNode(document.activeElement)) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Apply styles to headings when content changes
  useEffect(() => {
    if (editorRef.current) {
      const headings = editorRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        heading.classList.add(instrumentSerif.className);
        (heading as HTMLElement).style.color = 'rgb(22 101 52)'; // text-green-800
        (heading as HTMLElement).style.fontWeight = '300';
      });
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      // Fix styling on headings
      const headings = editorRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        heading.classList.add(instrumentSerif.className);
        (heading as HTMLElement).style.color = 'rgb(22 101 52)'; // text-green-800
        (heading as HTMLElement).style.fontWeight = '300';
      });
      
      onChange(editorRef.current.innerHTML);
    }
  };

  // Handle paste event to preserve images but strip other formatting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    // Check if HTML content is available
    const html = e.clipboardData.getData('text/html');
    
    if (html) {
      // Create temporary element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Remove styles from all elements
      const allElements = tempDiv.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.hasAttribute('style')) {
          el.removeAttribute('style');
        }
        if (el.hasAttribute('class')) {
          // Keep the instrument serif class if it exists
          if (!el.classList.contains(instrumentSerif.className)) {
            el.removeAttribute('class');
          }
        }
      });
      
      // Apply styling to headings
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        heading.classList.add(instrumentSerif.className);
        (heading as HTMLElement).style.color = 'rgb(22 101 52)'; // text-green-800
        (heading as HTMLElement).style.fontWeight = '300';
      });
      
      // Get the cleaned HTML content
      const cleanedHtml = tempDiv.innerHTML;
      
      // Insert at cursor position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        // Create a document fragment from our cleaned HTML
        const fragment = document.createDocumentFragment();
        const temp = document.createElement('div');
        temp.innerHTML = cleanedHtml;
        
        // Move all nodes from temp to fragment
        while (temp.firstChild) {
          fragment.appendChild(temp.firstChild);
        }
        
        range.insertNode(fragment);
        
        // Move cursor to end of inserted content
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      // Fall back to plain text for non-HTML content
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    }
    
    handleInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Implement toolbar functionality with keyboard shortcuts
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.execCommand('bold', false);
      handleInput();
    } else if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.execCommand('italic', false);
      handleInput();
    } else if (e.key === 'u' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.execCommand('underline', false);
      handleInput();
    }
  };

  // Formatting functions
  const handleBold = () => {
    document.execCommand('bold', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleItalic = () => {
    document.execCommand('italic', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleUnderline = () => {
    document.execCommand('underline', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleBulletList = () => {
    document.execCommand('insertUnorderedList', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleOrderedList = () => {
    document.execCommand('insertOrderedList', false);
    editorRef.current?.focus();
    handleInput();
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
      editorRef.current?.focus();
      handleInput();
    }
  };

  const handleAddImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
      editorRef.current?.focus();
      handleInput();
    }
  };

  const handleUploadImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);
        
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          const result = await response.json();
          if (result.success) {
            document.execCommand('insertImage', false, result.data.url);
            editorRef.current?.focus();
            handleInput();
          } else {
            alert('Image upload failed. Please try again.');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Error uploading image. Please try again.');
        }
      }
    };
  };

  const handleHeading1 = () => {
    document.execCommand('formatBlock', false, '<h1>');
    
    // Apply instrument serif class to new heading
    setTimeout(() => {
      if (editorRef.current) {
        const headings = editorRef.current.querySelectorAll('h1');
        headings.forEach(heading => {
          heading.classList.add(instrumentSerif.className);
          (heading as HTMLElement).style.color = 'rgb(22 101 52)'; // text-green-800
          (heading as HTMLElement).style.fontWeight = '300';
        });
      }
    }, 0);
    
    editorRef.current?.focus();
    handleInput();
  };

  const handleHeading2 = () => {
    document.execCommand('formatBlock', false, '<h2>');
    
    // Apply instrument serif class to new heading
    setTimeout(() => {
      if (editorRef.current) {
        const headings = editorRef.current.querySelectorAll('h2');
        headings.forEach(heading => {
          heading.classList.add(instrumentSerif.className);
          (heading as HTMLElement).style.color = 'rgb(22 101 52)'; // text-green-800
          (heading as HTMLElement).style.fontWeight = '300';
        });
      }
    }, 0);
    
    editorRef.current?.focus();
    handleInput();
  };

  const handleHeading3 = () => {
    document.execCommand('formatBlock', false, '<h3>');
    
    // Apply instrument serif class to new heading
    setTimeout(() => {
      if (editorRef.current) {
        const headings = editorRef.current.querySelectorAll('h3');
        headings.forEach(heading => {
          heading.classList.add(instrumentSerif.className);
          (heading as HTMLElement).style.color = 'rgb(22 101 52)'; // text-green-800
          (heading as HTMLElement).style.fontWeight = '300';
        });
      }
    }, 0);
    
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className="border border-gray-300 rounded min-h-[300px]">
      <SimpleEditorToolbar 
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onBulletList={handleBulletList}
        onOrderedList={handleOrderedList}
        onLink={handleLink}
        onAddImage={handleAddImage}
        onUploadImage={handleUploadImage}
        onHeading1={handleHeading1}
        onHeading2={handleHeading2}
        onHeading3={handleHeading3}
      />
      <div 
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleInput}
        className={`p-4 ${className}`}
        style={{ 
          minHeight: '230px',
          cursor: 'text',
          whiteSpace: 'pre-wrap',
        }}
        data-placeholder={placeholder}
      />
    </div>
  );
} 