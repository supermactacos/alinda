"use client";

import { useEffect, useRef } from "react";

export function IdxFeaturedProperties() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create and append the script to our container
    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = "idxwidgetsrc-43959";
    script.src = "//mlspalmbeach.lindaolsson.com/idx/customshowcasejs.php?widgetid=43959";
    containerRef.current.appendChild(script);

    // Create a wrapper that will contain our custom layout
    const customContainer = document.createElement('div');
    customContainer.id = 'custom-property-container';
    customContainer.className = 'flex overflow-x-auto space-x-4 py-2 w-full';
    customContainer.style.scrollbarWidth = 'none'; // Hide scrollbar in Firefox
    (customContainer.style as any).msOverflowStyle = 'none'; // Hide scrollbar in IE/Edge
    
    // Add styles to hide scrollbar in Chrome/Safari
    const hideScrollbarStyle = document.createElement('style');
    hideScrollbarStyle.textContent = `
      #custom-property-container::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(hideScrollbarStyle);

    // Add it to the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(customContainer);
    }

    // Add custom styles for the IDX widget
    const style = document.createElement('style');
    style.textContent = `
      /* Hide the original widget completely */
      #IDX-showcaseGallery-43959 {
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        visibility: hidden !important;
        pointer-events: none !important;
        display: none !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
      }
      
      /* Ensure the widget container doesn't take up space */
      .idx-featured-properties {
        height: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Style for our custom property cards */
      .custom-property-card {
        width: 380px;
        flex: 0 0 auto;
        border-radius: 8px;
        overflow: hidden;
        background-color: white;
        transition: transform 0.2s;
      }
      
      .custom-property-card:hover {
        transform: translateY(-5px);
      }
      
      .custom-property-img {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        border-radius: 8px 8px 0 0;
      }
      
      .custom-property-info {
        padding: 1rem;
      }
      
      .custom-property-address {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1b4e1f;
        margin: 0 0 0.5rem 0;
        line-height: 1.2;
      }
      
      .custom-property-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 0.5rem 0;
        line-height: 1.2;
      }
      
      .custom-property-location {
        font-size: 1rem;
        color: #666;
        margin: 0;
        line-height: 1.2;
      }
      
      /* Navigation buttons */
      .idx-nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #1b4e1f;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .idx-prev {
        left: 10px;
      }
      
      .idx-next {
        right: 10px;
      }
      
      .idx-nav-button:hover {
        background: rgba(255, 255, 255, 1);
      }
    `;
    document.head.appendChild(style);

    // Function to extract properties from IDX widget and create our custom layout
    const extractPropertiesAndCreateLayout = () => {
      const idxWidget = document.getElementById('IDX-showcaseGallery-43959');
      const customContainer = document.getElementById('custom-property-container');
      
      if (!idxWidget || !customContainer) return;
      
      // Clear current custom container
      customContainer.innerHTML = '';
      
      // Find all cells from all rows
      const cells = idxWidget.querySelectorAll('.IDX-showcaseCell');
      if (cells.length === 0) return;
      
      console.log(`Found ${cells.length} properties`);
      
      // Create custom cards for each property
      cells.forEach(cell => {
        // Extract property data
        const imgElement = cell.querySelector('.IDX-showcasePhoto') as HTMLImageElement;
        const addressElement = cell.querySelector('.IDX-showcaseAddress');
        const priceElement = cell.querySelector('.IDX-showcasePrice');
        const locationElement = cell.querySelector('.IDX-showcaseCityStateZip');
        const linkElement = cell.querySelector('a') as HTMLAnchorElement;
        
        if (!imgElement || !addressElement || !priceElement || !linkElement) return;
        
        // Create custom card
        const card = document.createElement('a');
        card.href = linkElement.href;
        card.className = 'custom-property-card';
        card.target = '_blank';
        
        // Add image
        const img = document.createElement('img');
        img.src = imgElement.src;
        img.alt = addressElement.textContent || 'Property';
        img.className = 'custom-property-img';
        card.appendChild(img);
        
        // Add property info
        const info = document.createElement('div');
        info.className = 'custom-property-info';
        
        const address = document.createElement('h3');
        address.className = 'custom-property-address';
        address.textContent = addressElement.textContent || '';
        info.appendChild(address);
        
        const price = document.createElement('p');
        price.className = 'custom-property-price';
        price.textContent = priceElement.textContent || '';
        info.appendChild(price);
        
        if (locationElement) {
          const location = document.createElement('p');
          location.className = 'custom-property-location';
          location.textContent = locationElement.textContent || '';
          info.appendChild(location);
        }
        
        card.appendChild(info);
        customContainer.appendChild(card);
      });
      
      // Add navigation buttons
      const wrapper = customContainer.parentElement;
      if (!wrapper) return;
      
      // Remove existing buttons first
      const existingButtons = wrapper.querySelectorAll('.idx-nav-button');
      existingButtons.forEach(button => button.remove());
      
      // Create and add buttons
      const prevButton = document.createElement('button');
      prevButton.className = 'idx-nav-button idx-prev';
      prevButton.innerHTML = '←';
      prevButton.onclick = () => {
        const cards = Array.from(customContainer.querySelectorAll('.custom-property-card'));
        if (cards.length > 0) {
          // Find the current scroll position
          const scrollPosition = customContainer.scrollLeft;
          const containerLeft = customContainer.getBoundingClientRect().left;
          
          // Find the previous card to snap to
          let targetCard = null;
          let closestDistance = Infinity;
          
          for (let i = cards.length - 1; i >= 0; i--) {
            const card = cards[i];
            const cardLeft = card.getBoundingClientRect().left - containerLeft + customContainer.scrollLeft;
            // Look for the closest card to the left of the current view
            if (cardLeft < scrollPosition - 10) { // 10px buffer
              if (scrollPosition - cardLeft < closestDistance) {
                closestDistance = scrollPosition - cardLeft;
                targetCard = card;
              }
            }
          }
          
          // If we found a card, scroll to it
          if (targetCard) {
            const targetPosition = targetCard.getBoundingClientRect().left - containerLeft + customContainer.scrollLeft;
            customContainer.scrollTo({ left: targetPosition, behavior: 'smooth' });
          } else {
            // If no previous card found, go to the first card
            const firstCard = cards[0];
            const firstCardPosition = firstCard.getBoundingClientRect().left - containerLeft + customContainer.scrollLeft;
            customContainer.scrollTo({ left: firstCardPosition, behavior: 'smooth' });
          }
        }
      };
      
      const nextButton = document.createElement('button');
      nextButton.className = 'idx-nav-button idx-next';
      nextButton.innerHTML = '→';
      nextButton.onclick = () => {
        const cards = Array.from(customContainer.querySelectorAll('.custom-property-card'));
        if (cards.length > 0) {
          // Find the current scroll position
          const scrollPosition = customContainer.scrollLeft;
          const containerWidth = customContainer.clientWidth;
          const containerLeft = customContainer.getBoundingClientRect().left;
          
          // Find the next card to snap to
          let targetCard = null;
          let closestDistance = Infinity;
          
          for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const cardLeft = card.getBoundingClientRect().left - containerLeft + customContainer.scrollLeft;
            // Look for the closest card to the right of the current view
            if (cardLeft > scrollPosition + 10) { // 10px buffer
              if (cardLeft - scrollPosition < closestDistance) {
                closestDistance = cardLeft - scrollPosition;
                targetCard = card;
              }
            }
          }
          
          // If we found a card, scroll to it
          if (targetCard) {
            const targetPosition = targetCard.getBoundingClientRect().left - containerLeft + customContainer.scrollLeft;
            customContainer.scrollTo({ left: targetPosition, behavior: 'smooth' });
          } else {
            // If no next card found, go to the last card
            const lastCard = cards[cards.length - 1];
            const lastCardPosition = lastCard.getBoundingClientRect().left - containerLeft + customContainer.scrollLeft;
            customContainer.scrollTo({ left: lastCardPosition, behavior: 'smooth' });
          }
        }
      };
      
      wrapper.appendChild(prevButton);
      wrapper.appendChild(nextButton);
      
      // Make wrapper position relative for button positioning
      wrapper.style.position = 'relative';
      wrapper.style.paddingLeft = '20px';
      wrapper.style.paddingRight = '20px';
      
      // Remove the IDX widget from DOM completely after we've extracted the data
      // This ensures it doesn't affect page layout at all
      const originalWidget = document.querySelector('.idx-featured-properties');
      if (originalWidget && originalWidget.parentNode) {
        originalWidget.innerHTML = ''; // Clear content first
        (originalWidget as HTMLElement).style.display = 'none';
        (originalWidget as HTMLElement).style.height = '0';
      }
    };

    // Try to create layout at regular intervals
    let checkCount = 0;
    const maxChecks = 20; // Try for 20 seconds max
    
    const checkInterval = setInterval(() => {
      const idxWidget = document.getElementById('IDX-showcaseGallery-43959');
      const cells = idxWidget?.querySelectorAll('.IDX-showcaseCell');
      
      if (cells && cells.length > 0) {
        extractPropertiesAndCreateLayout();
        clearInterval(checkInterval);
      } else if (++checkCount >= maxChecks) {
        console.log('Timed out waiting for IDX properties');
        clearInterval(checkInterval);
      }
    }, 1000);

    // Set up a MutationObserver to watch for changes and update our custom layout
    const observer = new MutationObserver((mutations) => {
      // Delay to ensure the IDX widget has fully rendered
      setTimeout(extractPropertiesAndCreateLayout, 300);
    });

    // Start observing the document body for the IDX widget
    setTimeout(() => {
      const idxWidget = document.getElementById('IDX-showcaseGallery-43959');
      if (idxWidget) {
        observer.observe(idxWidget, {
          childList: true,
          subtree: true,
          attributes: true
        });
        extractPropertiesAndCreateLayout();
      }
    }, 2000);

    // Cleanup on unmount
    return () => {
      clearInterval(checkInterval);
      observer.disconnect();
      
      const existingScript = document.getElementById("idxwidgetsrc-43959");
      if (existingScript) {
        existingScript.remove();
      }
      
      if (style.parentNode) {
        style.remove();
      }
      
      if (hideScrollbarStyle.parentNode) {
        hideScrollbarStyle.remove();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full relative">
        <div id="idx-featured-widget" className="idx-featured-properties" style={{ height: 0, overflow: 'hidden' }}></div>
      </div>
    </div>
  );
} 