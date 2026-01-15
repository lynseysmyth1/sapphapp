import { useRef } from 'react';

export const useHorizontalSwipe = (onSwipeEnd, sensitivity = 2) => {
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    startXRef.current = e.touches[0].pageX - containerRef.current.offsetLeft;
    startYRef.current = e.touches[0].pageY;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const y = e.touches[0].pageY;
    const deltaX = Math.abs(x - startXRef.current);
    const deltaY = Math.abs(y - startYRef.current);
    
    // Only handle horizontal swipes if the movement is primarily horizontal
    // This allows vertical scrolling to work normally
    if (deltaX > deltaY && deltaX > 10) {
      const walk = (x - startXRef.current) * sensitivity;
      containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleTouchEnd = () => {
    if (!containerRef.current || !onSwipeEnd) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const containerWidth = containerRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    onSwipeEnd(newIndex);
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || startXRef.current === 0) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * sensitivity;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    if (onSwipeEnd) {
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      onSwipeEnd(newIndex);
    }
    startXRef.current = 0;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    startXRef.current = 0;
  };

  return {
    containerRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave
    }
  };
};

export const useVerticalSwipe = (onSwipeEnd, sensitivity = 2) => {
  const startYRef = useRef(0);
  const scrollTopRef = useRef(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    startYRef.current = e.touches[0].pageY - containerRef.current.offsetTop;
    scrollTopRef.current = containerRef.current.scrollTop;
  };

  const handleTouchMove = (e) => {
    // Allow native scrolling on mobile - don't prevent default
    // Native scrolling works better for vertical carousels on touch devices
    // The scroll event listener in the component will handle updating the index
    if (!containerRef.current) return;
    // Don't interfere with native scrolling
  };

  const handleTouchEnd = () => {
    if (!containerRef.current || !onSwipeEnd) return;
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.offsetHeight;
    const newIndex = Math.round(scrollTop / containerHeight);
    onSwipeEnd(newIndex);
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    startYRef.current = e.pageY - containerRef.current.offsetTop;
    scrollTopRef.current = containerRef.current.scrollTop;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || startYRef.current === 0) return;
    e.preventDefault();
    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startYRef.current) * sensitivity;
    containerRef.current.scrollTop = scrollTopRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    if (onSwipeEnd) {
      const scrollTop = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.offsetHeight;
      const newIndex = Math.round(scrollTop / containerHeight);
      onSwipeEnd(newIndex);
    }
    startYRef.current = 0;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    startYRef.current = 0;
  };

  return {
    containerRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave
    }
  };
};

