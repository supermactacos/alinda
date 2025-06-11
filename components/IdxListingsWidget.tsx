"use client";

import { useEffect, useRef } from "react";

interface IdxListingsWidgetProps {
  widgetId: string;
  widgetUrl?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function IdxListingsWidget({ 
  widgetId, 
  widgetUrl = "//mlspalmbeach.lindaolsson.com/idx/widgets", 
  columns = 3 
}: IdxListingsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only proceed if the container ref exists
    if (!containerRef.current) return;
    
    // Add the IDX script directly to our container
    const existingScript = document.getElementById(`idxwidgetsrc-${widgetId}`);
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = `idxwidgetsrc-${widgetId}`;
    script.src = `${widgetUrl}/${widgetId}`;
    
    // Append to our specific container
    containerRef.current.appendChild(script);
    
    // Add styling to better integrate the widget
    const style = document.createElement('style');
    style.textContent = `
      /* Styles for the IDX widget integration */
      #idx-widget-container-${widgetId} {
        width: 100%;
        margin: 0 auto;
        max-width: 100% !important; /* Ensure it can expand fully */
        font-family: 'Instrument Serif', serif !important;
        font-size: 18px !important; /* Base font size */
      }
      
      /* Ensure the listings display in a grid */
      idx-listings-showcase {
        display: block !important;
        width: 100% !important;
        font-family: 'Instrument Serif', serif !important;
      }
      
      /* Force column layout - try multiple selectors */
      idx-listings-showcase .idx-listing-grid,
      idx-listings-showcase [class*="listing-grid"],
      idx-listings-showcase .idx-listings-container {
        display: grid !important;
        grid-template-columns: repeat(${columns}, 1fr) !important;
        gap: 20px !important;
        width: 100% !important;
      }
      
      /* Try additional selector for the grid container */
      idx-listings-showcase > div {
        display: grid !important;
        grid-template-columns: repeat(${columns}, 1fr) !important;
        gap: 20px !important;
      }
      
      /* Adjust card width for columns */
      idx-listings-showcase .idx-listing-card,
      idx-listings-showcase [class*="listing-card"] {
        width: 100% !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        font-family: 'Instrument Serif', serif !important;
      }
      
      /* Apply Instrument Serif font to ALL text elements */
      idx-listings-showcase h1,
      idx-listings-showcase h2,
      idx-listings-showcase h3,
      idx-listings-showcase h4,
      idx-listings-showcase h5,
      idx-listings-showcase h6,
      idx-listings-showcase p,
      idx-listings-showcase span,
      idx-listings-showcase div,
      idx-listings-showcase a,
      idx-listings-showcase button,
      idx-listings-showcase label,
      idx-listings-showcase [class*="address"],
      idx-listings-showcase [class*="price"],
      idx-listings-showcase [class*="location"],
      idx-listings-showcase [class*="text"],
      idx-listings-showcase [class*="title"],
      idx-listings-showcase [class*="property"],
      idx-listings-showcase [class*="listing"] {
        font-family: 'Instrument Serif', serif !important;
      }
      
      /* Most aggressive selector to target all elements */
      * {
        font-family: 'Instrument Serif', serif !important;
      }
      
      /* Increase font sizes for specific elements */
      idx-listings-showcase [class*="address"],
      idx-listings-showcase [class*="street"],
      idx-listings-showcase h3 {
        font-size: 22px !important;
        line-height: 1.3 !important;
        margin-bottom: 6px !important;
      }
      
      idx-listings-showcase [class*="price"],
      idx-listings-showcase .price,
      idx-listings-showcase [class*="Price"] {
        font-size: 26px !important;
        font-weight: 600 !important;
        line-height: 1.2 !important;
        margin: 8px 0 !important;
      }
      
      idx-listings-showcase [class*="city"],
      idx-listings-showcase [class*="location"],
      idx-listings-showcase [class*="Location"],
      idx-listings-showcase [class*="state"],
      idx-listings-showcase [class*="zip"] {
        font-size: 20px !important;
        line-height: 1.3 !important;
      }
      
      idx-listings-showcase [class*="bed"],
      idx-listings-showcase [class*="bath"],
      idx-listings-showcase [class*="sqft"],
      idx-listings-showcase [class*="details"],
      idx-listings-showcase [class*="status"] {
        font-size: 18px !important;
        line-height: 1.5 !important;
        margin: 6px 0 !important;
      }
      
      idx-listings-showcase p,
      idx-listings-showcase span,
      idx-listings-showcase div,
      idx-listings-showcase a {
        font-size: 18px !important;
        line-height: 1.5 !important;
      }
      
      /* Penetrate shadow DOM if possible */
      :host, :root {
        --idx-font-family: 'Instrument Serif', serif !important;
        font-family: 'Instrument Serif', serif !important;
        --idx-font-size-base: 18px !important;
        --idx-font-size-large: 22px !important;
        --idx-font-size-xlarge: 26px !important;
      }
      
      /* Make sure to load the font */
      @font-face {
        font-family: 'Instrument Serif';
        font-style: normal;
        font-weight: 400;
        src: url(https://fonts.gstatic.com/s/instrumentserif/v2/W1XEJLIQXanL6t9Z7z1nkgLPV8iRCOdkrw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* Improve image aspect ratios */
      idx-listings-showcase img {
        aspect-ratio: 3/2;
        object-fit: cover;
        width: 100% !important;
      }
      
      /* Responsive adjustments */
      @media (max-width: 1024px) {
        idx-listings-showcase .idx-listing-grid,
        idx-listings-showcase [class*="listing-grid"],
        idx-listings-showcase .idx-listings-container,
        idx-listings-showcase > div {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      
      @media (max-width: 768px) {
        idx-listings-showcase .idx-listing-grid,
        idx-listings-showcase [class*="listing-grid"],
        idx-listings-showcase .idx-listings-container,
        idx-listings-showcase > div {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Use JavaScript to force the font after the widget loads
    const forceFont = () => {
      // Target all elements within the IDX widget container
      const container = document.getElementById(`idx-widget-container-${widgetId}`);
      if (!container) return;
      
      // Apply font to all elements recursively
      const applyFontToAllElements = (element: HTMLElement | Element) => {
        if ((element as HTMLElement).style) {
          (element as HTMLElement).style.fontFamily = "'Instrument Serif', serif";
          
          // Increase font size based on element type
          const tagName = element.tagName?.toLowerCase();
          const className = element.className || '';
          const elementText = element.textContent || '';
          
          // Apply different font sizes based on content or element type
          if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
            (element as HTMLElement).style.fontSize = '22px';
          } else if (tagName === 'p' || tagName === 'span' || tagName === 'div') {
            (element as HTMLElement).style.fontSize = '18px';
          }
          
          // Price elements often contain currency symbols
          if (className.includes('price') || className.includes('Price') || 
              (elementText.includes('$') && elementText.length < 15)) {
            (element as HTMLElement).style.fontSize = '26px';
            (element as HTMLElement).style.fontWeight = '600';
          }
          
          // Address or location elements
          if (className.includes('address') || className.includes('location') || 
              className.includes('Address') || className.includes('Location')) {
            (element as HTMLElement).style.fontSize = '22px';
          }
        }
        
        // Apply to all children
        Array.from(element.children).forEach(child => {
          applyFontToAllElements(child);
        });
        
        // Try to access shadow DOM if it exists
        if (element.shadowRoot) {
          Array.from(element.shadowRoot.children).forEach(child => {
            applyFontToAllElements(child);
          });
        }
      };
      
      // Apply to all elements in the container
      applyFontToAllElements(container);
      
      // Try to find IDX iframe if it exists
      const iframes = container.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        try {
          if (iframe.contentDocument) {
            // Create style element for iframe document
            const iframeStyle = document.createElement('style');
            iframeStyle.textContent = `
              * { font-family: 'Instrument Serif', serif !important; }
            `;
            iframe.contentDocument.head.appendChild(iframeStyle);
            
            // Apply to all elements in iframe
            applyFontToAllElements(iframe.contentDocument.body);
          }
        } catch (e) {
          console.log('Could not access iframe content:', e);
        }
      });
    };
    
    // Run initially after a delay to ensure widget is loaded
    setTimeout(forceFont, 2000);
    
    // Set up an interval to keep checking and applying the font
    const fontInterval = setInterval(forceFont, 3000);
    
    // Cleanup
    return () => {
      clearInterval(fontInterval);
      
      const existingScriptToRemove = document.getElementById(`idxwidgetsrc-${widgetId}`);
      if (existingScriptToRemove) {
        existingScriptToRemove.remove();
      }
      if (style.parentNode) {
        style.remove();
      }
    };
  }, [widgetId, widgetUrl, columns]);

  return (
    <div className="w-full">
      <div 
        ref={containerRef} 
        id={`idx-widget-container-${widgetId}`} 
        className="w-full"
      >
        {/* Script will be injected here */}
      </div>
    </div>
  );
} 