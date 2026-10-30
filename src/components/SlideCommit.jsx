import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check, Loader2, Mail } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

/**
 * SlideCommit Component (React Bits inspired)
 * https://reactbits.dev/micro/slide-commit
 *
 * Slide-to-confirm handle interaction that morphs into a loading spinner
 * and unfurls into a success state pill with confetti.
 */
export default function SlideCommit({
  label = 'Slide to copy email & connect',
  successText = '✓ Copied mathely27@gmail.com!',
  onCommit,
}) {
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [status, setStatus] = useState('idle'); // 'idle' | 'committing' | 'committed'
  const isDragging = useRef(false);
  const trackRef = useRef(null);

  const startDrag = (clientX) => {
    if (status !== 'idle') return;
    isDragging.current = true;
    updateProgress(clientX);
  };

  const updateProgress = (clientX) => {
    if (!isDragging.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const handleWidth = 46;
    const maxDistance = rect.width - handleWidth;
    const currentX = Math.max(0, Math.min(clientX - rect.left - handleWidth / 2, maxDistance));
    const progress = currentX / maxDistance;
    setDragProgress(progress);

    if (progress >= 0.92) {
      commitAction();
    }
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (status === 'idle') {
      setDragProgress(0);
    }
  };

  const commitAction = () => {
    isDragging.current = false;
    setDragProgress(1);
    setStatus('committing');

    setTimeout(() => {
      setStatus('committed');
      navigator.clipboard.writeText('mathely27@gmail.com');
      triggerConfetti(0.5, 0.7);

      if (onCommit) onCommit();

      // Reset after 4.5 seconds
      setTimeout(() => {
        setStatus('idle');
        setDragProgress(0);
      }, 4500);
    }, 600);
  };

  useEffect(() => {
    const handleMouseMove = (e) => updateProgress(e.clientX);
    const handleMouseUp = () => stopDrag();
    const handleTouchMove = (e) => {
      if (e.touches[0]) updateProgress(e.touches[0].clientX);
    };
    const handleTouchEnd = () => stopDrag();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [status]);

  return (
    <div
      ref={trackRef}
      className={`relative h-12 w-full max-w-sm rounded-full border select-none transition-all duration-300 overflow-hidden flex items-center p-1 cursor-pointer ${
        status === 'committed'
          ? 'bg-emerald-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
          : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
      }`}
      onClick={() => {
        if (status === 'idle') commitAction();
      }}
    >
      {/* Filled Track background */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-emerald-500/15 pointer-events-none transition-[width] duration-75"
        style={{ width: `${dragProgress * 100}%` }}
      />

      {/* Label Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs sm:text-sm font-medium tracking-normal">
        {status === 'committed' ? (
          <span className="text-emerald-300 font-bold flex items-center gap-1.5 animate-fadeIn">
            <Check size={15} className="text-emerald-400" />
            {successText}
          </span>
        ) : status === 'committing' ? (
          <span className="text-zinc-400 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin text-cyan-400" />
            Copying address...
          </span>
        ) : (
          <span
            className="text-zinc-400 transition-opacity flex items-center gap-1.5"
            style={{ opacity: 1 - dragProgress * 1.4 }}
          >
            <Mail size={13} className="text-zinc-500" />
            {label}
          </span>
        )}
      </div>

      {/* Draggable Handle */}
      {status !== 'committed' && (
        <div
          onMouseDown={(e) => startDrag(e.clientX)}
          onTouchStart={(e) => e.touches[0] && startDrag(e.touches[0].clientX)}
          className="relative z-10 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 border border-zinc-600 flex items-center justify-center text-zinc-100 shadow-md cursor-grab active:cursor-grabbing transition-transform duration-75"
          style={{
            transform: `translateX(${dragProgress * ((trackRef.current?.offsetWidth || 280) - 48)}px)`,
          }}
        >
          {status === 'committing' ? (
            <Loader2 size={16} className="animate-spin text-cyan-400" />
          ) : (
            <ChevronRight size={18} className="text-zinc-200" />
          )}
        </div>
      )}
    </div>
  );
}

