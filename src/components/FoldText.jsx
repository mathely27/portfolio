import React, { useState } from 'react';

/**
 * FoldText Component (React Bits inspired)
 * https://reactbits.dev/text-animations/fold-text
 *
 * 3D paper fold / blinds unfolding text with perspective and hover interaction.
 */
export default function FoldText({
  text = 'Design unfolds',
  foldStyle = 'paper', // 'paper' | 'blinds' | 'flip'
  splitBy = 'char', // 'char' | 'word'
  stagger = 0.035,
  duration = 0.6,
  hoverRefold = true,
  className = '',
  style = {},
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const units = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <span
      className={`fold-text-wrap inline-flex flex-wrap select-none ${className}`}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {units.map((unit, i) => {
        const isHovered = hoveredIndex === i;
        const isNeighbor =
          hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1;

        let foldTransform = 'rotateX(0deg) translateY(0px)';
        if (hoverRefold) {
          if (isHovered) {
            foldTransform = foldStyle === 'flip' ? 'rotateY(30deg) translateZ(8px)' : 'rotateX(-28deg) translateY(-3px)';
          } else if (isNeighbor) {
            foldTransform = foldStyle === 'flip' ? 'rotateY(15deg) translateZ(4px)' : 'rotateX(-14deg) translateY(-1px)';
          }
        }

        return (
          <span
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'inline-block',
              transformStyle: 'preserve-3d',
              transformOrigin: foldStyle === 'flip' ? 'center left' : 'top center',
              animation: `foldOpen ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s both`,
              transform: foldTransform,
              transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
              whiteSpace: unit === ' ' ? 'pre' : 'normal',
              marginRight: splitBy === 'word' ? '0.3em' : (unit === ' ' ? '0.25em' : '0'),
            }}
          >
            {unit === ' ' ? '\u00A0' : unit}
          </span>
        );
      })}
    </span>
  );
}

