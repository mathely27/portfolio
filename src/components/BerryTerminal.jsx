import React, { useState } from 'react';
import { Terminal, Bot, CornerDownLeft } from 'lucide-react';

/**
 * BerryTerminal Component
 * Interactive mini AI agent runner for Mathely's Berry project.
 */
export default function BerryTerminal() {
  const [history, setHistory] = useState([
    { sender: 'berry', text: 'Hey, I am Berry — Mathely\'s little local AI assistant. Type "help" or click a prompt below!' },
  ]);
  const [inputVal, setInputVal] = useState('');

  const sendQuery = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const userEntry = { sender: 'user', text: query };
    let reply = '';

    if (q === 'help') {
      reply = 'Commands: "whoami", "stack", "time", "quote", "projects"';
    } else if (q.includes('whoami') || q.includes('who are you')) {
      reply = 'I am Berry! Mathely created me to be his personal offline AI assistant powered by Ollama.';
    } else if (q.includes('stack')) {
      reply = 'Berry runs on Python 3 + Ollama (Qwen3) + PySide6 desktop UI with local tool bindings.';
    } else if (q.includes('time')) {
      reply = `Current timestamp: ${new Date().toLocaleTimeString()} (IST).`;
    } else if (q.includes('quote') || q.includes('inspire')) {
      reply = '“First make it work, then make it right, then make it fast.” — Kent Beck';
    } else if (q.includes('projects')) {
      reply = 'Active repos: Berry, Autonomous (ai-agent), macapplock (AppLocker), Clutch, Text_Encryptor.';
    } else {
      reply = `Berry processed: "${query}". Running in local inference mode on Mathely's workstation.`;
    }

    setHistory((prev) => [...prev, userEntry, { sender: 'berry', text: reply }]);
    setInputVal('');
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 font-mono text-xs shadow-inner">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-2">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Bot size={13} />
          <span className="font-bold tracking-wider">BERRY // LOCAL AI INFERENCE</span>
        </div>
        <span className="text-[10px] text-zinc-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Ollama active
        </span>
      </div>

      {/* Message Output */}
      <div className="h-28 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-1.5 ${
              msg.sender === 'user' ? 'text-zinc-200' : 'text-cyan-300'
            }`}
          >
            <span className="opacity-40 select-none">
              {msg.sender === 'user' ? '>' : '●'}
            </span>
            <span className="leading-relaxed">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Suggested queries */}
      <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-zinc-800/60">
        {['whoami', 'stack', 'time', 'quote'].map((s) => (
          <button
            key={s}
            onClick={() => sendQuery(s)}
            className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10px] text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuery(inputVal);
        }}
        className="mt-2 flex items-center gap-1.5"
      >
        <span className="text-zinc-400 select-none">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask Berry something..."
          className="flex-1 bg-transparent border-none text-zinc-100 placeholder-zinc-400 text-xs focus:outline-none"
        />
        <button
          type="submit"
          className="text-zinc-400 hover:text-cyan-400 p-1 transition-colors"
          title="Send query"
        >
          <CornerDownLeft size={13} />
        </button>
      </form>
    </div>
  );
}

