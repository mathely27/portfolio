import React, { useEffect, useState } from 'react';

/**
 * BlurText - React Bits inspired text animation
 * (https://reactbits.dev/text-animations/blur-text)
 * Words or characters blur in sequentially with soft-focus reveal.
 */
export default function BlurText({
  text = '',
  delay = 80,
  className = '',
  style = {},
  animateBy = 'words', // 'words' or 'letters'
  onComplete,
}) {
  const [revealedCount, setRevealedCount] = useState(0);

  const tokens = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    setRevealedCount(0);
    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= tokens.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, tokens.length]);

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: animateBy === 'words' ? '0.32em' : '0.02em',
        ...style,
      }}
    >
      {tokens.map((token, index) => {
        const isRevealed = index < revealedCount;
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transition: 'filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: isRevealed ? 'blur(0px)' : 'blur(14px)',
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
              willChange: 'filter, opacity, transform',
            }}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
}

