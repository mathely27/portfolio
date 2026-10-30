import React from 'react';

export default function Navbar({ activeSlide, setActiveSlide }) {
  const tabs = [
    { id: 0, label: '01 Home' },
    { id: 1, label: '02 Projects' },
    { id: 2, label: '03 About + contact' },
  ];

  return (
    <header className="nav-header">
      {/* Left Logo: M/ mathely.dev */}
      <button
        onClick={() => setActiveSlide(0)}
        className="nav-brand"
      >
        <span className="nav-brand-prefix">M/</span>
        <span className="nav-brand-name">mathely.dev</span>
      </button>

      {/* Center Nav Tabs: 01 Home | 02 Projects | 03 About + contact */}
      <nav className="nav-tabs">
        {tabs.map((tab) => {
          const isActive = activeSlide === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSlide(tab.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
              {isActive && <div className="nav-tab-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* Right Status Pill: OPEN TO INTERNSHIPS */}
      <div className="nav-status">
        <span className="nav-status-dot" />
        <span>OPEN TO INTERNSHIPS</span>
      </div>
    </header>
  );
}
