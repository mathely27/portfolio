import React, { useState, useRef, useEffect } from 'react';
import { triggerConfetti } from '../utils/confetti';
import { ShieldCheck, Terminal, X, Sparkles } from 'lucide-react';

/**
 * CodeSlots Component (React Bits inspired)
 * https://reactbits.dev/micro/code-slots
 *
 * OTP / Security passkey input with spring physics & secret developer unlock.
 */
export default function CodeSlots({ targetCode = '27' }) {
  const [slots, setSlots] = useState(['', '']);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    // Only take the last character
    const char = value.slice(-1);
    const newSlots = [...slots];
    newSlots[index] = char;
    setSlots(newSlots);

    if (char && index < slots.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const currentCode = newSlots.join('');
    if (currentCode === targetCode) {
      setIsUnlocked(true);
      setShowModal(true);
      triggerConfetti(0.5, 0.4);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !slots[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleQuickFill = () => {
    setSlots(['2', '7']);
    setIsUnlocked(true);
    setShowModal(true);
    triggerConfetti(0.5, 0.4);
  };

  return (
    <div className="code-slots-wrapper">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
          <Terminal size={13} className="text-emerald-400" />
          Passkey Access:
        </span>
        <button
          onClick={handleQuickFill}
          className="text-[11px] font-mono text-zinc-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer"
          title="Auto-fill developer passkey"
        >
          [Key: 27]
        </button>
      </div>

      <div className="flex items-center gap-2">
        {slots.map((val, idx) => (
          <div key={idx} className="relative">
            <input
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-9 h-11 text-center font-mono text-base font-bold rounded-lg border transition-all duration-200 outline-none select-none ${
                isUnlocked
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-100 hover:border-zinc-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
            />
          </div>
        ))}

        <div className="ml-2 flex items-center">
          {isUnlocked ? (
            <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded-md">
              <ShieldCheck size={14} />
              DEV ACCESS GRANTED
            </span>
          ) : (
            <span className="text-[11px] font-mono text-zinc-400">
              Enter 27
            </span>
          )}
        </div>
      </div>

      {/* Secret Developer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold mb-3">
              <Sparkles size={16} />
              SYSTEM DIAGNOSTIC // MATHELY27
            </div>

            <p className="text-xs text-zinc-300 font-mono mb-4 leading-relaxed">
              Passkey <strong>27</strong> recognized. You unlocked Mathely's internal developer console!
            </p>

            <div className="bg-black/60 rounded-lg p-3 font-mono text-xs text-zinc-400 space-y-2 border border-zinc-800">
              <div className="flex justify-between">
                <span>Active Agent:</span>
                <span className="text-cyan-400 font-bold">Berry v0.9 (Ollama Qwen3)</span>
              </div>
              <div className="flex justify-between">
                <span>Native Build:</span>
                <span className="text-purple-400">AppLocker (Swift 5.9 / macOS)</span>
              </div>
              <div className="flex justify-between">
                <span>DSA Rating:</span>
                <span className="text-emerald-400">LeetCode Streak Active 🔥</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Contact:</span>
                <span className="text-zinc-200">mathely27@gmail.com</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('mathely27@gmail.com');
                  setShowModal(false);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs py-2 px-3 rounded-lg transition-colors font-semibold cursor-pointer"
              >
                Copy Direct Email
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

