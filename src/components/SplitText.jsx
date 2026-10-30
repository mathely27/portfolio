import React from 'react';

/**
 * SplitText Component (React Bits inspired)
 * https://reactbits.dev/text-animations/split-text
 *
 * Staggered letter-by-letter / word-by-word reveal with spring physics.
 */
export default function SplitText({
  text = '',
  splitBy = 'char', // 'char' | 'word'
  delay = 30, // ms between units
  className = '',
  style = {},
}) {
  const units = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <span
      className={`split-text-container inline-flex flex-wrap ${className}`}
      style={{ ...style }}
    >
      {units.map((unit, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: splitBy === 'word' ? '0.3em' : (unit === ' ' ? '0.25em' : '0'),
          }}
        >
          <span
            style={{
              display: 'inline-block',
              animation: `splitTextRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms both`,
              whiteSpace: unit === ' ' ? 'pre' : 'normal',
            }}
          >
            {unit === ' ' ? '\u00A0' : unit}
          </span>
        </span>
      ))}
    </span>
  );
}

