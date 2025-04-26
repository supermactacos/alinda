import React, { useState, useRef, useEffect } from 'react';

interface CustomTextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

export default function CustomTextArea({ 
  name, 
  value, 
  onChange, 
  className = "w-full p-2 border border-gray-300 rounded", 
  placeholder = "" 
}: CustomTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Log the key event for debugging
    console.log('Key event:', e.key, e.code, e.keyCode);
    
    // Special handling for spacebar - directly insert a space without relying on the default behavior
    if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) {
      e.preventDefault();
      
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Create a new value with a space inserted at the cursor position
      const newValue = value.substring(0, start) + ' ' + value.substring(end);
      
      // Create a synthetic event
      const syntheticEvent = {
        target: {
          name,
          value: newValue
        }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      
      // Call the original onChange with our synthetic event
      onChange(syntheticEvent);
      
      // Set the cursor position after our modification
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
      }, 0);
    }
  };
  
  return (
    <textarea
      ref={textareaRef}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      className={className}
      placeholder={placeholder}
    />
  );
} 