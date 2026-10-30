import React, { useEffect, useRef, useState } from 'react';

/**
 * TextPressure Component (React Bits inspired)
 * https://reactbits.dev/text-animations/text-pressure
 *
 * Characters dynamically flex scale, weight, and tracking based on mouse proximity.
 */
export default function TextPressure({
  text = 'MATHELY MITTAL',
  textColor = '#f4f4f5',
  activeColor = '#38bdf8',
  className = '',
  radius = 200,
  maxScale = 1.35,
  minWeight = 400,
  maxWeight = 900,
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const charRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -9999, y: -9999 });
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const characters = text.split('');

  return (
    <div
      ref={containerRef}
      className={`text-pressure-container inline-flex flex-wrap select-none ${className}`}
      style={{
        cursor: 'default',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}
    >
      {characters.map((char, index) => {
        let scale = 1;
        let weight = minWeight;
        let isHighlighted = false;

        if (containerRef.current && charRefs.current[index]) {
          const charEl = charRefs.current[index];
          const charRect = charEl.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const charCenterX = charRect.left - containerRect.left + charRect.width / 2;
          const charCenterY = charRect.top - containerRect.top + charRect.height / 2;

          const dx = mousePos.x - charCenterX;
          const dy = mousePos.y - charCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const factor = Math.cos((dist / radius) * (Math.PI / 2));
            scale = 1 + (maxScale - 1) * factor;
            weight = Math.round(minWeight + (maxWeight - minWeight) * factor);
            isHighlighted = factor > 0.4;
          }
        }

        return (
          <span
            key={index}
            ref={(el) => (charRefs.current[index] = el)}
            style={{
              display: 'inline-block',
              fontWeight: weight,
              transform: `scale(${scale})`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.12s cubic-bezier(0.2, 0, 0, 1), font-weight 0.12s ease, color 0.15s ease',
              color: isHighlighted ? activeColor : textColor,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              marginRight: char === ' ' ? '0.3em' : '0',
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        );
      })}
    </div>
  );
}

