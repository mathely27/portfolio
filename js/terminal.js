/**
 * MATHELY MITTAL - INTERACTIVE CYBER TERMINAL (CLI)
 * Hacker-mode shell simulator with interactive commands, command history & matrix mode
 */

(function () {
  const terminalModal = document.getElementById('terminal-modal');
  const terminalBody = document.getElementById('terminal-body');
  const cliInput = document.getElementById('cli-input');
  const btnClose = document.getElementById('term-btn-close');
  const btnLaunch = document.getElementById('btn-cli-hud');
  const btnLaunchHero = document.getElementById('btn-cli-hero');

  if (!terminalModal || !cliInput) return;

  const history = [];
  let historyIndex = -1;

  const BANNER = `
<span class="term-cyan">
 ███╗   ███╗ █████╗ ████████╗██╗  ██╗███████╗██╗  ██╗   ██╗
 ████╗ ████║██╔══██╗╚══██╔══╝██║  ██║██╔════╝██║  ╚██╗ ██╔╝
 ██╔████╔██║███████║   ██║   ███████║█████╗  ██║   ╚████╔╝ 
 ██║╚██╔╝██║██╔══██║   ██║   ██╔══██║██╔══╝  ██║    ╚██╔╝  
 ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║███████╗███████╗██║   
 ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝   
</span>
<span class="term-green">[SYS_INITIALIZED]</span> <span class="term-yellow">Mathely Mittal Cyber Station v2.6.0</span>
[USER]: guest@mathely-os // SECURITY_LEVEL: ROOT_READY
Type <span class="term-cyan">'help'</span> for a list of available cyber commands.
----------------------------------------------------------------`;

  const COMMANDS = {
    help: `
<span class="term-cyan term-bold">AVAILABLE COMMANDS:</span>
  <span class="term-green">about</span>       : Deep-dive into Mathely's background, education & drive
  <span class="term-green">skills</span>      : Full technical matrix (Languages, OS, DB, Frameworks)
  <span class="term-green">projects</span>    : Showcase of flagship projects (AppLocker, Airgeddon Sentinel, etc.)
  <span class="term-green">security</span>    : Security exploration (Touch ID, wireless auditing, packet analysis)
  <span class="term-green">sudo hire</span>   : Grant full developer authorization & schedule interview
  <span class="term-green">matrix</span>      : Toggle cyber matrix data rain effect
  <span class="term-green">contact</span>     : Display direct contact channels & email
  <span class="term-green">clear</span>       : Flush terminal display buffer
  <span class="term-green">whoami</span>      : Current authentication status
  <span class="term-green">exit</span>        : Close cyber terminal window
`,
    about: `
<span class="term-cyan term-bold">// ABOUT MATHELY MITTAL</span>
• Status: 2nd Year Computer Science Undergrad
• Core Ethos: "Love to develop new things, break down complex systems, and build scalable software."
• Dual Focus: High-performance Full-Stack Web Development + Low-Level Systems & Cybersecurity.
• Systems Mastery: Native macOS (Swift/SwiftUI), Ubuntu Linux (Bash & Network Auditing), Windows.
• Problem Solving: Active on LeetCode, mastering DSA in Java, C, and Python.
• Hackathons: Rapid prototyping under pressure, converting bold ideas into production code.
`,
    skills: `
<span class="term-cyan term-bold">// TECHNICAL INVENTORY</span>
[+] <span class="term-yellow">Languages:</span>      HTML5, CSS3, JavaScript (ES6+), React, Python, Java, C, Swift
[+] <span class="term-yellow">Backend & DB:</span>   Node.js, Express, REST APIs, MongoDB, SQL, Authentication
[+] <span class="term-yellow">Systems & OS:</span>   macOS (APIs, MVVM), Linux/Ubuntu (Terminal, Shell), Windows, Git
[+] <span class="term-yellow">Security & Tools:</span>Airgeddon (Wi-Fi auditing), LocalAuthentication (Touch ID), Postman, Xcode
[+] <span class="term-yellow">Fundamentals:</span>   Data Structures & Algorithms, OOP, Systems Architecture
`,
    projects: `
<span class="term-cyan term-bold">// FEATURED PROJECTS</span>
1. <span class="term-yellow">AppLocker for macOS 🔐</span>
   - Native macOS security utility built in Swift & SwiftUI.
   - Enforces Touch ID / Admin password authentication on sensitive app launch.
   - Leverages LocalAuthentication framework and macOS Accessibility APIs.

2. <span class="term-yellow">Wi-Fi Threat Sentinel (Airgeddon Explorer) 📡</span>
   - Wireless network auditing & rogue AP detection suite on Ubuntu Linux.
   - Research on 802.11 de-auth frames, handshake capture, and defense hardening.

3. <span class="term-yellow">Nexus Full-Stack Ecosystem 🌐</span>
   - Full-stack web application with responsive glassmorphism UI, Node/Express & MongoDB.

4. <span class="term-yellow">AlgoVision 3D ⚡</span>
   - Interactive Data Structures & Algorithms visualizer (Trees, Sorting, Graphs).
`,
    security: `
<span class="term-cyan term-bold">// SECURITY RESEARCH & EXPLORATION</span>
• Wi-Fi Security & 802.11 Auditing: Hotspot blocking, de-authentication attack simulation via Airgeddon.
• macOS Security Internals: App lifecycle interception, Touch ID biometric validation, daemon services.
• Defensive Mindset: Writing secure backend endpoints, credential hashing, sanitizing queries.
`,
    contact: `
<span class="term-cyan term-bold">// DIRECT TRANSMISSION CHANNELS</span>
• Email:    <span class="term-green">mathelymittal@gmail.com</span>
• GitHub:   <a href="https://github.com/mathely" target="_blank" class="term-cyan">github.com/mathely</a>
• LinkedIn: <a href="https://linkedin.com" target="_blank" class="term-cyan">linkedin.com/in/mathely-mittal</a>
• Status:   Open for Summer 2026/2027 Engineering & Security Internships!
`,
    whoami: `
guest@mathely-os: You are an explorer discovering Mathely's world. Type 'sudo hire' for next steps!
`
  };

  function printLine(html) {
    const p = document.createElement('div');
    p.className = 'term-output-line';
    p.innerHTML = html;
    terminalBody.insertBefore(p, terminalBody.lastElementChild);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    printLine(`<span class="term-prompt-label">mathely@cyberstation:~$</span> ${cmd}`);

    if (window.cyberAudio) window.cyberAudio.playTerminalKey();

    if (!trimmed) return;

    history.push(cmd);
    historyIndex = history.length;

    if (COMMANDS[trimmed]) {
      printLine(COMMANDS[trimmed]);
    } else if (trimmed === 'clear') {
      const inputRow = terminalBody.lastElementChild;
      terminalBody.innerHTML = '';
      terminalBody.appendChild(inputRow);
    } else if (trimmed === 'sudo hire') {
      if (window.cyberAudio) window.cyberAudio.playSuccess();
      printLine(`
<span class="term-green term-bold">[ACCESS GRANTED: ROOT CANDIDATE UNLOCKED!] 🎉</span>
Mathely Mittal is excited to build high-impact systems with your team!
Transmission initiated. Scroll to the Contact section or email <span class="term-yellow">mathelymittal@gmail.com</span>.
`);
      if (typeof window.triggerConfetti === 'function') {
        window.triggerConfetti();
      }
    } else if (trimmed === 'matrix') {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'matrix') {
        document.documentElement.removeAttribute('data-theme');
        printLine('[SYSTEM]: Matrix theme disabled.');
      } else {
        document.documentElement.setAttribute('data-theme', 'matrix');
        printLine('<span class="term-green">[SYSTEM]: MATRIX THEME ACTIVATED. Wake up, Neo...</span>');
      }
    } else if (trimmed === 'exit') {
      closeTerminal();
    } else {
      printLine(`bash: command not found: <span class="term-yellow">${cmd}</span>. Type <span class="term-cyan">'help'</span> for instructions.`);
    }
  }

  function openTerminal() {
    terminalModal.classList.add('active');
    if (window.cyberAudio) window.cyberAudio.playClick();
    cliInput.focus();
  }

  function closeTerminal() {
    terminalModal.classList.remove('active');
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  // Key event listeners
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cliInput.value;
      cliInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        cliInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        cliInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        cliInput.value = '';
      }
    }
  });

  // Global shortcut (Tilde `~` or Ctrl+K)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        terminalModal.classList.contains('active') ? closeTerminal() : openTerminal();
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      terminalModal.classList.contains('active') ? closeTerminal() : openTerminal();
    }
  });

  // Click triggers
  if (btnLaunch) btnLaunch.addEventListener('click', openTerminal);
  if (btnLaunchHero) btnLaunchHero.addEventListener('click', openTerminal);
  if (btnClose) btnClose.addEventListener('click', closeTerminal);

  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  // Initial welcome message
  printLine(BANNER);
})();
