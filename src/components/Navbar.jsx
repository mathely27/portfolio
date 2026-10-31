import React from 'react';

export default function Navbar({ activeSlide, setActiveSlide }) {
  const tabs = [
    { id: 0, label: 'Home' },
    { id: 1, label: 'Projects' },
    { id: 2, label: 'About + contact' },
  ];

  return (
    <header className="nav-header">
      <button onClick={() => setActiveSlide(0)} className="nav-brand">
        <span className="nav-brand-prefix">M/</span>
        <span className="nav-brand-name">mathely.dev</span>
      </button>

      <nav className="nav-tabs">
        {tabs.map((tab) => {
          const isActive = activeSlide === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSlide(tab.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(tab.id + 1).padStart(2, '0')} {tab.label}
              </span>
              {isActive && <div className="nav-tab-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="nav-status">
        <span className="nav-status-dot" />
        <span>OPEN TO INTERNSHIPS</span>
      </div>
    </header>
  );
}
