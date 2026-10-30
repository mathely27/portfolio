import React, { useState } from 'react';
import { Fingerprint, CheckCircle2, Lock, ShieldCheck, X } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

/**
 * TouchIDSimulator Component
 * Live interactive biometric demo for Mathely's AppLocker (macapplock) project.
 */
export default function TouchIDSimulator() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState('idle'); // 'idle' | 'scanning' | 'success'

  const handleScan = () => {
    if (state !== 'idle') return;
    setState('scanning');

    setTimeout(() => {
      setState('success');
      triggerConfetti(0.5, 0.5);

      setTimeout(() => {
        setState('idle');
        setIsOpen(false);
      }, 2200);
    }, 1100);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
      >
        <Fingerprint size={14} className="text-cyan-400" />
        <span>Try Touch ID</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-sm w-full p-6 sm:p-7 text-center relative shadow-2xl">
            <button
              onClick={() => {
                setIsOpen(false);
                setState('idle');
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-3">
              <Lock size={20} className="text-zinc-200" />
            </div>

            <h4 className="text-base font-bold text-white mb-1">
              AppLocker for macOS
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Touch the sensor to simulate Touch ID biometric unlock
            </p>

            <div
              onClick={handleScan}
              className={`w-24 h-24 mx-auto rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                state === 'scanning'
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                  : state === 'success'
                  ? 'border-emerald-500 bg-emerald-950/40 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105'
                  : 'border-zinc-700 bg-zinc-800/60 hover:border-zinc-500 hover:bg-zinc-800'
              }`}
            >
              {state === 'scanning' && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scanLine pointer-events-none" />
              )}

              {state === 'success' ? (
                <CheckCircle2 size={38} className="text-emerald-400 animate-scaleBounce" />
              ) : (
                <Fingerprint
                  size={44}
                  className={`transition-colors duration-200 ${
                    state === 'scanning' ? 'text-cyan-300 animate-pulse' : 'text-zinc-400'
                  }`}
                />
              )}
            </div>

            <div className="mt-4 min-h-[24px]">
              {state === 'scanning' ? (
                <span className="text-xs sm:text-sm text-cyan-400 font-medium animate-pulse">
                  Verifying fingerprint...
                </span>
              ) : state === 'success' ? (
                <span className="text-xs sm:text-sm text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck size={16} />
                  Authenticated Successfully!
                </span>
              ) : (
                <span className="text-xs text-zinc-400">
                  Click the fingerprint icon to authenticate
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
