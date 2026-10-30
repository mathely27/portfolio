import React from 'react';
import TextPressure from '../components/TextPressure';
import TextType from '../components/TextType';
import { ArrowRight, MapPin, GraduationCap, Briefcase, Sparkles, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../components/Icons';

export default function SlideIdentity({ onExploreProjects, onGoToContact }) {
  return (
    <div className="w-full h-full flex items-center justify-center py-4 px-3 sm:px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Human, Authentic Introduction */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow status */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm font-medium text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open for Engineering Internships (2026 / 2027)
          </div>

          {/* Big Name with React Bits TextPressure */}
          <div>
            <div className="text-zinc-400 text-lg sm:text-2xl font-medium mb-1">
              Hey, I'm
            </div>
            <TextPressure
              text="Mathely Mittal"
              textColor="#ffffff"
              activeColor="#38bdf8"
              radius={220}
              maxScale={1.14}
              minWeight={600}
              maxWeight={850}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight"
            />
          </div>

          {/* Dynamic role statement */}
          <div className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed">
            <span>I like building </span>
            <strong className="text-white font-bold underline decoration-cyan-500/60 underline-offset-4">
              <TextType
                words={[
                  'native macOS security tools with Touch ID',
                  'offline local AI assistants using Python & Ollama',
                  'full-stack web applications with React',
                  'useful developer utilities from scratch',
                ]}
                typingSpeed={38}
                deletingSpeed={22}
                pauseTime={2500}
                cursorColor="#38bdf8"
              />
            </strong>
          </div>

          {/* Human Bio */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            I'm a 2nd year CS student from India who genuinely loves programming.
            Instead of just solving textbook problems, I spend my time building and
            shipping tools that actually work — from Apple biometric utilities to
            autonomous local LLM agents and web apps.
          </p>

          {/* Action Row - Clean & Non-AI (NO copy button here) */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreProjects}
              className="h-12 px-6 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onGoToContact}
              className="h-12 px-6 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Send size={14} className="text-cyan-400" />
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Quick social links */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://github.com/mathely27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            >
              <GithubIcon size={14} />
              <span>github/mathely27</span>
            </a>
            <a
              href="https://leetcode.com/mathely27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-amber-400 hover:border-zinc-700 transition-colors"
            >
              <LeetCodeIcon size={14} />
              <span>leetcode/mathely27</span>
            </a>
          </div>

        </div>

        {/* Right Column: Clean Bespoke Profile Card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7 shadow-xl backdrop-blur-md space-y-5">
            
            {/* Avatar & Header */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="./assets/mathely-avatar.jpg"
                  alt="Mathely Mittal"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-zinc-700 shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div
                  style={{ display: 'none' }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-bold text-zinc-100"
                >
                  MM
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-950"
                  title="Active student builder"
                >
                  ✓
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Mathely Mittal
                </h3>
                <p className="text-sm text-zinc-400">
                  CS Student & Software Builder
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href="https://github.com/mathely27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/in/mathely27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-blue-400 transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href="https://leetcode.com/mathely27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-amber-400 transition-colors"
                    title="LeetCode"
                  >
                    <LeetCodeIcon size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Information Rows */}
            <div className="space-y-3 pt-3 border-t border-zinc-800/80 text-sm">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500 flex items-center gap-2">
                  <MapPin size={15} /> Location
                </span>
                <span className="font-medium text-zinc-200">India 🇮🇳</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500 flex items-center gap-2">
                  <GraduationCap size={15} /> Education
                </span>
                <span className="font-medium text-zinc-200">2nd Year B.Tech CS</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500 flex items-center gap-2">
                  <Briefcase size={15} /> Core Focus
                </span>
                <span className="font-medium text-zinc-200">macOS, AI Agents, Full-Stack</span>
              </div>

              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-500 flex items-center gap-2">
                  <Sparkles size={15} /> Active Build
                </span>
                <span className="font-medium text-cyan-400">Berry (Ollama Assistant)</span>
              </div>
            </div>

            {/* Clean Mini Tags */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
              {['Python', 'Swift', 'React', 'Ollama', 'Node.js', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800/70 text-zinc-300 border border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
