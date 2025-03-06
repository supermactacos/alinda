'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Declare the IDX type for TypeScript
declare global {
  interface Window {
    IDX: {
      queryParameters: {
        pt: string
        ccz: string
        'city[]': string[]
        lp: string
        per: string
        srt: string
      }
    }
  }
}

export function FeaturedProperties() {
  useEffect(() => {
    // Initialize IDX after scripts are loaded
    const initIDX = () => {
      if (window.IDX) {
        window.IDX.queryParameters = {
          'pt': 'sfr',  // Single Family Residential
          'ccz': 'city',
          'city[]': ['Palm Beach'],
          'lp': '50000000-',
          'per': '3',
          'srt': 'prd'
        };
      }
    };

    // Check if IDX is already loaded
    if (document.querySelector('#idx-script')) {
      initIDX();
    }
  }, []);

  return (
    <div className="relative">
      {/* Load IDX Scripts */}
      <Script
        id="idx-script"
        src="https://mlspalmbeach.lindaolsson.com/idx/js/api.js"
        onLoad={() => {
          console.log('IDX API script loaded');
        }}
      />
      <Script
        id="idx-widget-script"
        src="https://mlspalmbeach.lindaolsson.com/idx/js/widget.js"
        onLoad={() => {
          console.log('IDX Widget script loaded');
        }}
      />

      {/* IDX Content */}
      <div 
        id="IDX-main"
        className="IDX-wrapper-standard"
      >
        <div className="IDX-wrapper-standard">
          <div id="IDX-resultsActiveListings" className="IDX-resultsListings">
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.IDX = window.IDX || {};
                  IDX.queryParameters = {
                    'pt': 'sfr',
                    'ccz': 'city',
                    'city[]': ['Palm Beach'],
                    'lp': '50000000-',
                    'per': '3',
                    'srt': 'prd'
                  };
                `
              }}
            />
          </div>
        </div>
      </div>

      {/* Direct iframe fallback */}
      <iframe
        src="https://mlspalmbeach.lindaolsson.com/i/results?pt=sfr&ccz=city&city[]=Palm%20Beach&lp=50000000-&per=3&srt=prd"
        style={{
          width: '100%',
          height: '800px',
          border: 'none',
          overflow: 'hidden'
        }}
        title="Featured Properties"
      />

      <style jsx global>{`
        /* Hide unwanted IDX elements */
        .IDX-wrapper-standard .IDX-navbar,
        .IDX-wrapper-standard .IDX-pagination,
        .IDX-wrapper-standard .IDX-resultsCount,
        .IDX-wrapper-standard .IDX-resultsSeparator {
          display: none !important;
        }

        /* Style the property cards */
        .IDX-wrapper-standard .IDX-propertyTypeHeader {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .IDX-wrapper-standard .IDX-propertyTypeHeader {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .IDX-wrapper-standard .IDX-propertyTypeHeader {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
} 