import { useState, useCallback } from 'react';

interface SwipeGestureProps {
  onSwipe: () => void;
  onTap?: () => void;
  swipeThreshold?: number;
}

export const useSwipeGesture = ({
  onSwipe,
  onTap,
  swipeThreshold = 50
}: SwipeGestureProps) => {
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setStartX(e.changedTouches[0].clientX);
    setIsSwiping(false);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const touchX = e.changedTouches[0].clientX;
    if (Math.abs(touchX - startX) > swipeThreshold) {
      setIsSwiping(true);
    }
  }, [startX, swipeThreshold]);

  const onTouchEnd = useCallback(() => {
    if (isSwiping) {
      onSwipe();
    } else if (onTap) {
      onTap();
    }
  }, [isSwiping, onSwipe, onTap]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};