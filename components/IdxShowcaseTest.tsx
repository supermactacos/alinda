"use client";

import { useEffect, useRef } from "react";

export function IdxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create and append the script to our container
    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = "idxwidgetsrc-65988";
    script.src = "//mlspalmbeach.lindaolsson.com/idx/customshowcasejs.php?widgetid=65988";
    containerRef.current.appendChild(script);

    // Add custom styles to control IDX widget layout
    const style = document.createElement('style');
    style.textContent = `
      /* Target the specific showcase gallery */
      #IDX-showcaseGallery-65988 {
        table-layout: fixed !important;
        border-spacing: 0 !important;
        font-size: 14px !important;
        width: 100% !important;
        max-width: 1400px !important;
        margin: 0 auto !important;
      }

      /* Table structure */
      #IDX-showcaseGallery-65988 .IDX-showcaseTable {
        width: 100% !important;
        display: table !important;
        border-collapse: separate !important;
        border-spacing: 2rem 2rem !important;
        table-layout: fixed !important;
      }

      /* Row and cell modifications */
      #IDX-showcaseGallery-65988 .IDX-showcaseRow {
        display: table-row !important;
      }

      #IDX-showcaseGallery-65988 .IDX-showcaseCell {
        display: table-cell !important;
        width: 33.333% !important;
        padding: 0 !important;
        vertical-align: top !important;
      }

      /* Container modifications */
      #IDX-showcaseGallery-65988 .IDX-showcaseContainer {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        position: relative !important;
      }

      /* Content spacing */
      #IDX-showcaseGallery-65988 .IDX-showcaseContent {
        padding: 0 !important;
        margin: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        text-align: left !important;
      }

      #IDX-showcaseGallery-65988 .IDX-showcaseAddress {
        margin: 0 !important;
        padding-top: 0.75rem !important;
        line-height: 1 !important;
        height: auto !important;
        min-height: 0 !important;
        font-size: 24px !important;
        font-weight: 600 !important;
        color: #1b4e1f !important;
        text-align: left !important;
      }

      #IDX-showcaseGallery-65988 .IDX-showcasePrice {
        margin: 0.25rem 0 !important;
        padding: 0 !important;
        line-height: 1.2 !important;
        height: auto !important;
        min-height: 0 !important;
        font-size: 28px !important;
        font-weight: 700 !important;
        color: #333 !important;
        text-align: left !important;
      }

      #IDX-showcaseGallery-65988 .IDX-showcaseCityStateZip {
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1.2 !important;
        height: auto !important;
        min-height: 0 !important;
        font-size: 18px !important;
        color: #666 !important;
        text-align: left !important;
      }

      /* Force image size and aspect ratio */
      #IDX-showcaseGallery-65988 .IDX-showcasePhoto {
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 3/2 !important;
        object-fit: cover !important;
        display: block !important;
        max-width: 100% !important;
        border-radius: 4px !important;
      }

      /* Make container match image size */
      #IDX-showcaseGallery-65988 .IDX-showcaseLink {
        width: 100% !important;
        height: auto !important;
        display: block !important;
        font-size: initial !important;
      }

      /* Hide unwanted elements */
      #IDX-showcaseGallery-65988 .IDX-showcaseListingID,
      #IDX-showcaseGallery-65988 .IDX-showcaseBeds,
      #IDX-showcaseGallery-65988 .IDX-showcaseBaths,
      #IDX-showcaseGallery-65988 .IDX-showcaseFull,
      #IDX-showcaseGallery-65988 .IDX-showcasePartial,
      #IDX-showcaseGallery-65988 .IDX-showcaseRemarks,
      #IDX-showcaseGallery-65988 .IDX-showcaseDisclaimerLink,
      #IDX-showcaseGallery-65988 .IDX-showcaseStatus,
      #IDX-showcaseGallery-65988 .IDX-showcaseStateAbrv {
        display: none !important;
      }

      /* Responsive adjustments */
      @media (max-width: 1024px) {
        #IDX-showcaseGallery-65988 .IDX-showcaseTable {
          border-spacing: 1.5rem 1.5rem !important;
        }
        #IDX-showcaseGallery-65988 .IDX-showcaseCell {
          width: 50% !important;
        }
      }

      @media (max-width: 640px) {
        #IDX-showcaseGallery-65988 .IDX-showcaseTable {
          border-spacing: 1rem 1rem !important;
        }
        #IDX-showcaseGallery-65988 .IDX-showcaseCell {
          width: 100% !important;
          display: block !important;
        }
        #IDX-showcaseGallery-65988 .IDX-showcaseRow {
          display: block !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Function to clean up the widget
    const cleanupWidget = () => {
      const widget = document.getElementById('idx-showcase-widget');
      if (!widget) {
        console.log('Widget not found');
        return;
      }

      // Debug: Log the widget's HTML to see its structure
      console.log('Widget HTML:', widget.innerHTML);

      // Remove all <br> elements
      const brs = widget.getElementsByTagName('br');
      while (brs.length > 0) {
        brs[0].remove();
      }

      // Clean up empty divs and force min-height
      const divs = widget.getElementsByTagName('div');
      Array.from(divs).forEach(div => {
        if (div.textContent?.trim() === '' && !div.querySelector('img')) {
          div.remove();
        }
        // Force min-height on all divs
        (div as HTMLElement).style.minHeight = '0';
      });

      // Try multiple class variations
      const addressSelectors = [
        '.IDX-showcaseAddress',
        '.showcaseAddress',
        '[class*="showcaseAddress"]'
      ];

      const priceSelectors = [
        '.IDX-showcasePrice',
        '.showcasePrice',
        '[class*="showcasePrice"]'
      ];

      const cityStateSelectors = [
        '.IDX-showcaseCityStateZip',
        '.showcaseCityStateZip',
        '[class*="showcaseCityStateZip"]'
      ];

      // Function to apply styles with logging
      const applyStyles = (element: HTMLElement, type: string, fontSize: string) => {
        console.log(`Applying styles to ${type}:`, element);
        element.style.setProperty('font-size', fontSize, 'important');
        element.style.setProperty('font-family', 'system-ui, -apple-system, sans-serif', 'important');
        
        // Add inline styles as a backup
        element.setAttribute('style', `
          font-size: ${fontSize} !important;
          font-family: system-ui, -apple-system, sans-serif !important;
          ${type === 'address' ? 'color: #1b4e1f !important; font-weight: 600 !important;' : ''}
          ${type === 'price' ? 'color: #333 !important; font-weight: 700 !important;' : ''}
          ${type === 'cityState' ? 'color: #666 !important;' : ''}
        `);
      };

      // Try to find and style elements using multiple selectors
      addressSelectors.forEach(selector => {
        const elements = widget.querySelectorAll(selector);
        console.log(`Found ${elements.length} elements with selector ${selector}`);
        elements.forEach(el => applyStyles(el as HTMLElement, 'address', '24px'));
      });

      priceSelectors.forEach(selector => {
        const elements = widget.querySelectorAll(selector);
        console.log(`Found ${elements.length} elements with selector ${selector}`);
        elements.forEach(el => applyStyles(el as HTMLElement, 'price', '28px'));
      });

      cityStateSelectors.forEach(selector => {
        const elements = widget.querySelectorAll(selector);
        console.log(`Found ${elements.length} elements with selector ${selector}`);
        elements.forEach(el => applyStyles(el as HTMLElement, 'cityState', '18px'));
      });
    };

    // Set up a MutationObserver to watch for changes
    const observer = new MutationObserver((mutations) => {
      console.log('Widget updated, reapplying styles');
      mutations.forEach(() => {
        cleanupWidget();
      });
    });

    // Start observing the widget container
    const startObserving = () => {
      const widget = document.getElementById('idx-showcase-widget');
      if (widget) {
        observer.observe(widget, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });
        cleanupWidget();
      } else {
        setTimeout(startObserving, 100);
      }
    };

    // Initial setup
    startObserving();

    // Cleanup
    return () => {
      observer.disconnect();
      const existingScript = document.getElementById("idxwidgetsrc-65988");
      if (existingScript) {
        existingScript.remove();
      }
      if (style.parentNode) {
        style.remove();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full">
        <div id="idx-showcase-widget" className="w-full"></div>
      </div>
    </div>
  );
} 