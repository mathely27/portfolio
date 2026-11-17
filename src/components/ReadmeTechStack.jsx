import React from 'react';
import { TECH_STACK } from './techStack';

// Same order, symbols, and animation timings as mathely27's README header SVG.
const TIMINGS = [
  [12.5, -.3], [9.9, -2.2], [13.2, -8.9], [14.2, -1.2], [11, -.3],
  [9.5, -4.8], [8.2, -1.6], [12.5, -6.8], [9.5, -5.6], [13.7, -.1],
  [13.6, -9.5], [10.4, -1.6], [14.7, -4.9], [8.6, -.8], [13.9, -8.4],
];

export default function ReadmeTechStack() {
  return <div className="readme-stack" role="list" aria-label="Tech stack, matching my GitHub README">
    {TECH_STACK.map((tech,index) => <div
      key={tech.key}
      className="readme-stack-tile"
      role="listitem"
      aria-label={tech.name}
      title={tech.name}
      style={{'--tile-brand':tech.brand,'--tile-duration':`${TIMINGS[index][0]}s`,'--tile-delay':`${TIMINGS[index][1]}s`}}
    >
      <span className="readme-tile-glow" aria-hidden="true"/>
      <span className="readme-tile-number" aria-hidden="true">{index+1}</span>
      <div className="readme-tile-face" aria-hidden="true"><span className="readme-tile-symbol">{tech.sym}</span><svg className="readme-tile-icon" viewBox="0 0 24 24"><path fill="currentColor" d={tech.path}/></svg></div>
      <span className="readme-tile-name" aria-hidden="true">{tech.name}</span>
    </div>)}
  </div>;
}
