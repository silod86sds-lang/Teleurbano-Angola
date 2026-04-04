import { useEffect } from 'react';

export function useTVNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
      if (!keys.includes(e.key)) return;

      const focusables = Array.from(document.querySelectorAll('.tv-focusable')) as HTMLElement[];
      if (focusables.length === 0) return;

      const activeElement = document.activeElement as HTMLElement;
      const isActiveFocusable = focusables.includes(activeElement);

      // Allow native interactions for inputs (typing, moving cursor left/right)
      if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          return; 
        }
      }

      if (e.key === 'Enter') {
        if (isActiveFocusable && activeElement.tagName !== 'INPUT') {
          activeElement.click();
          e.preventDefault();
        }
        return;
      }

      // Prevent default scrolling with arrows
      e.preventDefault(); 

      if (!isActiveFocusable) {
        focusables[0].focus();
        return;
      }

      const currentRect = activeElement.getBoundingClientRect();
      let bestMatch: HTMLElement | null = null;
      let minDistance = Infinity;

      focusables.forEach((el) => {
        if (el === activeElement) return;
        
        // Skip hidden elements
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || el.offsetParent === null) return;

        const rect = el.getBoundingClientRect();
        
        const dx = (rect.left + rect.width / 2) - (currentRect.left + currentRect.width / 2);
        const dy = (rect.top + rect.height / 2) - (currentRect.top + currentRect.height / 2);
        
        let isDirectionMatch = false;
        
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        if (e.key === 'ArrowRight' && angle > -45 && angle <= 45) isDirectionMatch = true;
        else if (e.key === 'ArrowLeft' && (angle > 135 || angle <= -135)) isDirectionMatch = true;
        else if (e.key === 'ArrowDown' && angle > 45 && angle <= 135) isDirectionMatch = true;
        else if (e.key === 'ArrowUp' && angle > -135 && angle <= -45) isDirectionMatch = true;

        if (isDirectionMatch) {
          // Weight orthogonal distance more heavily to prefer straight lines
          const distance = e.key === 'ArrowLeft' || e.key === 'ArrowRight' 
            ? Math.abs(dx) + Math.abs(dy) * 3 
            : Math.abs(dy) + Math.abs(dx) * 3;

          if (distance < minDistance) {
            minDistance = distance;
            bestMatch = el;
          }
        }
      });

      if (bestMatch) {
        (bestMatch as HTMLElement).focus();
        (bestMatch as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
