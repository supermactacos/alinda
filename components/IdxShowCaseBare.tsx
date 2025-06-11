"use client";

import { useEffect, useState } from "react";

export function IdxShowCaseBare() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Check if script already exists to avoid duplicates
    const existingScript = document.getElementById("idxwidgetsrc-103608");
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create and append the script
    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = "idxwidgetsrc-103608";
    script.src = "//mlspalmbeach.lindaolsson.com/idx/widgets/103608";
    
    // Append to body as recommended in IDX documentation
    document.body.appendChild(script);
    
    // Additional styling to ensure the widget is visible
    const style = document.createElement('style');
    style.textContent = `
      idx-listings-showcase {
        display: block !important;
        width: 100% !important;
        min-height: 500px !important;
        margin: 0 auto !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Add a border so we can see the container */
      #idx-widget-container {
        min-height: 800px;
        border: 1px dashed #ccc;
        padding: 20px;
        position: relative;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      const scriptToRemove = document.getElementById("idxwidgetsrc-103608");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      if (style.parentNode) {
        style.remove();
      }
    };
  }, []);
  
  if (!isClient) {
    return <div className="w-full min-h-[300px]">Loading listings...</div>;
  }

  return (
    <div className="w-full">
      {/* Add specific width and height to ensure widget has space to render */}
      <div className="w-full min-h-[800px]" id="idx-widget-container">
        {/* The widget will render here */}
        <div className="text-center py-4 text-gray-500">
          IDX Broker listings should appear below
        </div>
      </div>
    </div>
  );
} 