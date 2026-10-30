import React from 'react';

/**
 * FloatBadges Component (React Bits inspired)
 *
 * Micro-interaction floating tech stack pills with sine-wave physics and spring hover.
 */
export default function FloatBadges() {
  const badges = [
    { name: 'Python', symbol: 'Py', color: '#38bdf8', delay: 0 },
    { name: 'SwiftUI', symbol: 'Sw', color: '#f97316', delay: 0.8 },
    { name: 'React', symbol: 'Re', color: '#06b6d4', delay: 1.4 },
    { name: 'Ollama', symbol: 'Ol', color: '#a855f7', delay: 2.1 },
    { name: 'Qwen3', symbol: 'Qw', color: '#10b981', delay: 0.4 },
    { name: 'TypeScript', symbol: 'Ts', color: '#60a5fa', delay: 1.9 },
    { name: 'Node.js', symbol: 'No', color: '#22c55e', delay: 1.2 },
  ];

  return (
    <div className="flex flex-wrap gap-2 py-2 select-none">
      {badges.map((b, i) => (
        <div
          key={b.name}
          className="group relative px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
          style={{
            animation: `floatY 3.2s ease-in-out infinite alternate`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: b.color }}
          />
          <span className="font-mono text-xs text-zinc-300 group-hover:text-white transition-colors">
            {b.name}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 opacity-60">
            {b.symbol}
          </span>
        </div>
      ))}
    </div>
  );
}

