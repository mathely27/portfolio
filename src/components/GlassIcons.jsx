import React, { useState } from 'react';

/**
 * GlassIcons Component (React Bits inspired)
 * https://reactbits.dev/components/glass-icons
 *
 * Frosted liquid glass morphism icons with colored background plates,
 * light-catching reflections, and 3D hover lift.
 */
export default function GlassIcons({
  items,
  className = '',
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const defaultItems = [
    { label: 'Python', color: '#38bdf8', iconColor: '#38bdf8' },
    { label: 'Swift', color: '#f97316', iconColor: '#f97316' },
    { label: 'React', color: '#06b6d4', iconColor: '#06b6d4' },
    { label: 'Ollama', color: '#a855f7', iconColor: '#a855f7' },
    { label: 'Qwen3', color: '#10b981', iconColor: '#10b981' },
    { label: 'Node.js', color: '#22c55e', iconColor: '#22c55e' },
    { label: 'TypeScript', color: '#60a5fa', iconColor: '#60a5fa' },
    { label: 'Supabase', color: '#34d399', iconColor: '#34d399' },
  ];

  const list = items || defaultItems;

  return (
    <div className={`glass-icons-container flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {list.map((item, index) => {
        const isHovered = hoveredIdx === index;
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative cursor-pointer select-none"
            style={{ perspective: '800px' }}
          >
            {/* Colored ambient glow behind glass */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
                transform: isHovered ? 'scale(1.2)' : 'scale(0.8)',
              }}
            />

            {/* Frosted Glass Plate */}
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-300"
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: isHovered
                  ? '1px solid rgba(255, 255, 255, 0.28)'
                  : '1px solid rgba(255, 255, 255, 0.10)',
                boxShadow: isHovered
                  ? `0 16px 32px -8px rgba(0, 0, 0, 0.6), 0 0 20px ${item.color}33, inset 0 1px 1px rgba(255, 255, 255, 0.4)`
                  : '0 8px 24px -6px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                transform: isHovered
                  ? 'translateY(-6px) scale(1.06) rotateX(4deg)'
                  : 'translateY(0) scale(1)',
              }}
            >
              {/* Glass Top Edge Sheen */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                }}
              />

              {/* Icon Container */}
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-1"
                style={{
                  backgroundColor: `${item.color}18`,
                  color: item.iconColor || item.color,
                }}
              >
                {Icon ? (
                  <Icon size={22} />
                ) : (
                  <span className="font-bold text-sm tracking-tight" style={{ color: item.color }}>
                    {item.label.slice(0, 2)}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className="text-[11px] sm:text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors tracking-tight text-center truncate max-w-full px-1"
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

