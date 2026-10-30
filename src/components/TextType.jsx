import React, { useState, useEffect } from 'react';

/**
 * TextType Component (React Bits inspired)
 * https://reactbits.dev/text-animations/text-type
 *
 * Dynamic typewriter effect with realistic timing and blinking terminal cursor.
 */
export default function TextType({
  words = ['Software Developer', 'Designer', 'Engineer'],
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseTime = 1800,
  className = '',
  cursorChar = '▋',
  cursorColor = '#38bdf8',
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = words[wordIndex % words.length];

    let timer;
    if (!isDeleting && currentText === fullWord) {
      // Pause at full word before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && currentText === '') {
      // Switch to next word
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    } else {
      // Variable speed for human feel
      const speed = isDeleting
        ? deletingSpeed
        : typingSpeed + (Math.random() * 30 - 15);

      timer = setTimeout(() => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return fullWord.substring(0, prev.length - 1);
          } else {
            return fullWord.substring(0, prev.length + 1);
          }
        });
      }, Math.max(20, speed));
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <span
        style={{
          color: cursorColor,
          marginLeft: '2px',
          animation: 'cursorBlink 0.9s infinite step-start',
        }}
      >
        {cursorChar}
      </span>
    </span>
  );
}

