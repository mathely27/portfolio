import React, { useState } from 'react';
import { Mail, Send, Check, MapPin, Sparkles, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../components/Icons';
import GlassIcons from '../components/GlassIcons';
import InfiniteLoop from '../components/InfiniteLoop';
import SlideCommit from '../components/SlideCommit';
import { triggerConfetti } from '../utils/confetti';

export default function SlideArsenal() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:mathely27@gmail.com?subject=${subject}&body=${body}`;

    setFormSent(true);
    triggerConfetti(0.7, 0.5);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-4 px-3 sm:px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Glass Icons Tech Stack & Infinite Loop */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-2">
              <Layers size={13} className="text-cyan-400" />
              <span>Interactive Glass Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Technologies & Tools
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Hover over the frosted glass tiles to see the core technologies I work with.
            </p>
          </div>

          {/* React Bits Glass Icons Grid */}
          <div className="p-3 sm:p-4 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md">
            <GlassIcons />
          </div>

          {/* Infinite Marquee Loop for extra technologies */}
          <div className="space-y-1.5 pt-1">
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-1">
              Complete Toolchain & Libraries:
            </div>
            <InfiniteLoop />
          </div>
        </div>

        {/* Right Column: Clean Get in Touch & SlideCommit */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-7 shadow-xl backdrop-blur-md space-y-5">
            
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Let's Connect
                </h3>
                <p className="text-sm text-zinc-400 mt-0.5">
                  Looking for engineering internship opportunities for 2026/2027.
                </p>
              </div>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <MapPin size={13} className="text-zinc-500" />
                India 🇮🇳
              </span>
            </div>

            {/* SlideCommit Handle - Placed here naturally on contact view */}
            <div>
              <div className="text-xs font-medium text-zinc-400 mb-2">
                Slide to copy direct email:
              </div>
              <SlideCommit label="Slide to copy email & connect" />
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              <a
                href="https://github.com/mathely27"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800 hover:border-zinc-700 flex flex-col items-center justify-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/mathely27"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800 hover:border-zinc-700 flex flex-col items-center justify-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/mathely27"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800 hover:border-zinc-700 flex flex-col items-center justify-center gap-1.5 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <LeetCodeIcon size={18} />
                <span>LeetCode</span>
              </a>
              <a
                href="mailto:mathely27@gmail.com"
                className="p-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-800 hover:border-zinc-700 flex flex-col items-center justify-center gap-1.5 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>

            {/* Clean Contact Form */}
            <form onSubmit={handleSendMessage} className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                />
              </div>

              <textarea
                placeholder="Your message (e.g. Internship opportunity, project collaboration...)"
                rows={2}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={formSent}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  formSent
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-100 hover:bg-white text-zinc-950 active:scale-98 shadow-sm'
                }`}
              >
                {formSent ? (
                  <>
                    <Check size={16} />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message to Mathely</span>
                  </>
                )}
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
