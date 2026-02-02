import { useState, useRef, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { Cat } from '../types';

interface SwipeCardProps {
  cat: Cat;
  onSwipe: (liked: boolean) => void;
  isTop: boolean;
}

export const SwipeCard = ({ cat, onSwipe, isTop }: SwipeCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(position.x) > threshold) {
      const liked = position.x > 0;
      animateSwipeOff(liked);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const animateSwipeOff = (liked: boolean) => {
    const direction = liked ? 1 : -1;
    setPosition({ x: direction * 1000, y: position.y });
    setTimeout(() => {
      onSwipe(liked);
      setPosition({ x: 0, y: 0 });
    }, 300);
  };

  const handleButtonClick = (liked: boolean) => {
    if (!isTop) return;
    animateSwipeOff(liked);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleEnd();
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startPos]);

  const rotation = position.x * 0.03;
  const opacity = Math.abs(position.x) / 100;
  const likeOpacity = position.x > 0 ? opacity : 0;
  const dislikeOpacity = position.x < 0 ? opacity : 0;

  return (
    <div
      ref={cardRef}
      className={`absolute w-full max-w-sm ${isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        zIndex: isTop ? 10 : 5,
      }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div
          className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-bold text-3xl px-4 py-2 rounded-lg rotate-12 z-10"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </div>
        <div
          className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-bold text-3xl px-4 py-2 rounded-lg -rotate-12 z-10"
          style={{ opacity: dislikeOpacity }}
        >
          NOPE
        </div>

        <img
          src={cat.imageUrl}
          alt="Cat"
          className="w-full h-[500px] object-cover select-none"
          draggable={false}
        />

        {isTop && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleButtonClick(false)}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <X className="w-8 h-8 text-red-500" />
              </button>
              <button
                onClick={() => handleButtonClick(true)}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
              >
                <Heart className="w-8 h-8 text-green-500 fill-green-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
