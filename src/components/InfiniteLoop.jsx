import React from 'react';

/**
 * InfiniteLoop Component (React Bits inspired)
 * Continuous seamless scrolling ticker for skills and tech stack.
 */
export default function InfiniteLoop({ items, speed = 25, direction = 'left' }) {
  const defaultItems = [
    'Python',
    'Swift & SwiftUI',
    'React',
    'Ollama',
    'Qwen3',
    'Node.js',
    'TypeScript',
    'Supabase',
    'MongoDB',
    'Java',
    'C Lang',
    'Express',
    'Linux',
    'Git',
    'Touch ID LocalAuth',
    'LeetCode',
  ];

  const list = items || defaultItems;

  return (
    <div className="relative w-full overflow-hidden py-2 select-none">
      {/* Side edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div
        className="flex items-center gap-4 whitespace-nowrap animate-marquee"
        style={{
          width: 'max-content',
        }}
      >
        {/* Double array for seamless loop */}
        {[...list, ...list].map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

