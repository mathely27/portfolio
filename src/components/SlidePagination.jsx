import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlidePagination({ activeSlide, setActiveSlide, totalSlides = 3 }) {
  const prev = () => setActiveSlide((curr) => Math.max(0, curr - 1));
  const next = () => setActiveSlide((curr) => Math.min(totalSlides - 1, curr + 1));

  const slideNames = ['About', 'Projects', 'Skills & Contact'];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-14 border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
      {/* Current View Indicator */}
      <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-xs">
        <span className="text-zinc-200 font-medium">{slideNames[activeSlide]}</span>
        <span className="text-zinc-600">·</span>
        <span>Use arrow keys or click tabs to explore</span>
      </div>

      {/* Center Dots */}
      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeSlide === i
                ? 'w-6 h-2 bg-zinc-200 shadow-sm'
                : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>

      {/* Prev / Next Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={prev}
          disabled={activeSlide === 0}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
            activeSlide === 0
              ? 'opacity-30 border-zinc-800 text-zinc-600 cursor-not-allowed'
              : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
          }`}
        >
          <ChevronLeft size={14} />
          <span>Back</span>
        </button>

        <button
          onClick={next}
          disabled={activeSlide === totalSlides - 1}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
            activeSlide === totalSlides - 1
              ? 'opacity-30 border-zinc-800 text-zinc-600 cursor-not-allowed'
              : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
          }`}
        >
          <span>Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </footer>
  );
}
