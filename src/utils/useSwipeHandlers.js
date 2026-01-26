import { useRef } from 'react';

export const useHorizontalSwipe = (onSwipeEnd, sensitivity = 2) => {
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const containerRef = useRef(null);
  const isSwipingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);

  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    startXRef.current = touch.pageX;
    startYRef.current = touch.pageY;
    scrollLeftRef.current = containerRef.current.scrollLeft;
    lastXRef.current = touch.pageX;
    lastTimeRef.current = Date.now();
    isSwipingRef.current = false;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const currentX = touch.pageX;
    const currentY = touch.pageY;
    const deltaX = currentX - startXRef.current;
    const deltaY = Math.abs(currentY - startYRef.current);
    const absDeltaX = Math.abs(deltaX);
    
    // Calculate velocity for momentum scrolling
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const distanceDelta = currentX - lastXRef.current;
      velocityRef.current = distanceDelta / timeDelta;
    }
    lastXRef.current = currentX;
    lastTimeRef.current = now;
    
    // Only handle horizontal swipes if the movement is primarily horizontal
    // Lower threshold (5px) for better responsiveness
    if (absDeltaX > deltaY && absDeltaX > 5) {
      if (!isSwipingRef.current) {
        isSwipingRef.current = true;
      }
      e.preventDefault(); // Prevent default scrolling behavior
      const walk = deltaX * sensitivity;
      containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleTouchEnd = () => {
    if (!containerRef.current || !onSwipeEnd) return;
    
    // Wait for scroll to settle, then calculate final position
    const checkScroll = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth === 0) return;
      
      let scrollLeft = containerRef.current.scrollLeft;
      
      // Apply momentum based on velocity (more conservative)
      if (Math.abs(velocityRef.current) > 0.3 && isSwipingRef.current) {
        const momentum = velocityRef.current * 50; // Reduced multiplier for smoother snapping
        scrollLeft += momentum;
        // Clamp to valid scroll range
        scrollLeft = Math.max(0, Math.min(scrollLeft, containerRef.current.scrollWidth - containerWidth));
      }
      
      // Calculate target index with better snapping
      // Use a threshold to determine which profile we're closest to
      const rawIndex = scrollLeft / containerWidth;
      let newIndex;
      
      // Determine direction of swipe for better snapping
      const currentIndex = Math.round(containerRef.current.scrollLeft / containerWidth);
      if (velocityRef.current > 0.3) {
        // Swiping right (next profile)
        newIndex = Math.ceil(rawIndex);
      } else if (velocityRef.current < -0.3) {
        // Swiping left (previous profile)
        newIndex = Math.floor(rawIndex);
      } else {
        // Slow swipe or no velocity - snap to nearest
        newIndex = Math.round(rawIndex);
      }
      
      // Clamp to valid range
      const maxIndex = Math.floor((containerRef.current.scrollWidth - containerWidth) / containerWidth);
      const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
      
      // Only update if we actually swiped or if we're significantly off
      const currentRoundedIndex = Math.round(containerRef.current.scrollLeft / containerWidth);
      if (isSwipingRef.current || Math.abs(clampedIndex - currentRoundedIndex) > 0.2) {
        onSwipeEnd(clampedIndex);
      }
      
      isSwipingRef.current = false;
      velocityRef.current = 0;
    };
    
    // Use double RAF to ensure scroll position is accurate after momentum
    requestAnimationFrame(() => {
      requestAnimationFrame(checkScroll);
    });
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    startXRef.current = e.pageX;
    scrollLeftRef.current = containerRef.current.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    isSwipingRef.current = false;
    velocityRef.current = 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || startXRef.current === 0) return;
    e.preventDefault();
    
    const currentX = e.pageX;
    const deltaX = currentX - startXRef.current;
    
    // Calculate velocity
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const distanceDelta = currentX - lastXRef.current;
      velocityRef.current = distanceDelta / timeDelta;
    }
    lastXRef.current = currentX;
    lastTimeRef.current = now;
    
    if (!isSwipingRef.current && Math.abs(deltaX) > 5) {
      isSwipingRef.current = true;
    }
    
    const walk = deltaX * sensitivity;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    if (onSwipeEnd && isSwipingRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth > 0) {
        let scrollLeft = containerRef.current.scrollLeft;
        
        // Apply momentum (more conservative for mouse)
        if (Math.abs(velocityRef.current) > 0.3) {
          const momentum = velocityRef.current * 50;
          scrollLeft += momentum;
          scrollLeft = Math.max(0, Math.min(scrollLeft, containerRef.current.scrollWidth - containerWidth));
        }
        
        const rawIndex = scrollLeft / containerWidth;
        let newIndex;
        
        // Determine direction
        if (velocityRef.current > 0.3) {
          newIndex = Math.ceil(rawIndex);
        } else if (velocityRef.current < -0.3) {
          newIndex = Math.floor(rawIndex);
        } else {
          newIndex = Math.round(rawIndex);
        }
        
        const maxIndex = Math.floor((containerRef.current.scrollWidth - containerWidth) / containerWidth);
        const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
        onSwipeEnd(clampedIndex);
      }
    }
    startXRef.current = 0;
    isSwipingRef.current = false;
    velocityRef.current = 0;
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

