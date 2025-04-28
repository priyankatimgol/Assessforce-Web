import { useEffect, useRef } from "react";

const StickyHeaders = ({ containerRef, topOffset = 0 }) => {
  const headerRef = useRef(null);
  const originalPositionRef = useRef(null);
  const originalStylesRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const topContainer = container.querySelector('.MuiDataGrid-topContainer');
    const virtualScroller = container.querySelector('.MuiDataGrid-virtualScroller');

    if (!topContainer || !virtualScroller) return;

    // Store references
    headerRef.current = topContainer;

    // Store original position and styles for restoration
    originalPositionRef.current = {
      top: topContainer.offsetTop,
      left: topContainer.offsetLeft
    };

    originalStylesRef.current = {
      position: topContainer.style.position,
      top: topContainer.style.top,
      left: topContainer.style.left,
    };

    // Handle horizontal scroll of the virtual scroller
    const handleHorizontalScroll = () => {
      if (topContainer.style.position === 'fixed') {
        // If in sticky mode, adjust the left position to match horizontal scroll
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = virtualScroller.scrollLeft;
        topContainer.style.left = `${Math.round(containerRect.left - scrollLeft)}px`;
      }
    };

    virtualScroller.addEventListener('scroll', handleHorizontalScroll, { passive: true });

    // Instead of IntersectionObserver, use scroll event with proper bounds checking
    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const scrollerRect = virtualScroller.getBoundingClientRect();
      const headerHeight = topContainer.offsetHeight;

      // Get the bottom boundary of the grid
      const containerBottom = containerRect.top + containerRect.height;
      // Check if we're within the valid sticky range
      if (
        scrollerRect.top <= topOffset &&
        containerBottom >= (topOffset + headerHeight)
      ) {
        // Apply sticky positioning
        topContainer.style.position = 'fixed';
        topContainer.style.top = `${Math.round(topOffset)}px`;

        // Account for horizontal scroll position
        const scrollLeft = virtualScroller.scrollLeft;
        topContainer.style.left = `${Math.round(containerRect.left - scrollLeft)}px`;

        // Add padding to prevent row loss
        virtualScroller.style.paddingTop = `${headerHeight}px`;
      } else if (scrollerRect.top > topOffset) {

        // Scrolled above the sticky point - reset to normal flow
        topContainer.style.position = originalStylesRef.current.position;
        topContainer.style.top = originalStylesRef.current.top;
        topContainer.style.left = originalStylesRef.current.left;

        // Remove added padding
        virtualScroller.style.paddingTop = "0px";
      } else {

        // Scrolled past the bottom - let header stay at bottom of container
        topContainer.style.position = 'absolute';
        topContainer.style.top = `${scrollerRect.height - headerHeight}px`;
        topContainer.style.left = '0px';
      }
    };

    // Initial call to set correct state
    handleScroll();

    // Attach scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      virtualScroller.removeEventListener('scroll', handleHorizontalScroll);

      // Reset styles on cleanup
      if (topContainer) {
        Object.assign(topContainer.style, originalStylesRef.current);
      }
    };
  }, [containerRef, topOffset]);

  return null;
};

export default StickyHeaders;
