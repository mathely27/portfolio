import React, { useEffect, useRef } from "react";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Space+Mono:wght@700&display=swap");

.contur{
  --bg:#05070b; --fg:#fff; --soft:rgba(255,255,255,.68); --faint:rgba(255,255,255,.14);
  --sans:"Schibsted Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;
  --pad:clamp(24px,4vw,56px);
  box-sizing:border-box; color-scheme:dark;
  padding-top:env(safe-area-inset-top,0px); padding-bottom:env(safe-area-inset-bottom,0px);
  width:100%; height:100%; height:100vh; height:100dvh; margin:0;
  background:var(--bg); color:var(--fg); font-family:var(--sans);
  -webkit-font-smoothing:antialiased; overflow:hidden;
  position:relative;
}
.contur *,.contur *::before,.contur *::after{box-sizing:inherit}
.contur a{color:inherit;text-decoration:none}
.contur :focus-visible{outline:2px solid var(--fg);outline-offset:4px}

.contur .hero{position:relative;width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden}

.contur #field{position:absolute;inset:0;width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.35) 30%,#000 68%);
          mask-image:linear-gradient(90deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.35) 30%,#000 68%);
}

.contur nav{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:24px var(--pad)}
.contur .logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:1.05rem;letter-spacing:0.16em;font-family:'Space Mono',monospace}
.contur .where{font-size:.85rem;color:var(--soft);font-family:var(--mono);display:inline-flex;align-items:center;gap:6px}

.contur .content{position:relative;z-index:2;margin-top:auto;padding:0 var(--pad) clamp(36px,6vh,64px);max-width:calc(820px + var(--pad))}
.contur .name-title{
  margin:0;
  font-weight:800;
  font-size:clamp(3.2rem,8.5vw,6.4rem);
  line-height:0.96;
  letter-spacing:-0.04em;
  text-transform:uppercase;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.contur .name-line{display:block}
.contur .name-line.accent{
  background:linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.65) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.contur .lead{
  margin:24px 0 0;
  font-size:clamp(1rem,2.4vw,1.18rem);
  line-height:1.6;
  color:var(--soft);
  max-width:44ch;
}
.contur .cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px}

.contur .btn{
  position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 28px;border-radius:999px;font-size:.875rem;font-weight:600;letter-spacing:.02em;color:var(--fg);cursor:pointer;
  background:linear-gradient(165deg,rgba(255,255,255,.12),rgba(255,255,255,.02) 55%,rgba(255,255,255,.08));
  -webkit-backdrop-filter:blur(12px) saturate(1.8) brightness(1.15);backdrop-filter:blur(12px) saturate(1.8) brightness(1.15);
  border:1px solid rgba(255,255,255,0.18);
  box-shadow:inset 1px 1px 0 rgba(255,255,255,.5),inset -1px -1px 0 rgba(255,255,255,.2),0 12px 32px rgba(0,0,0,.5);
  transition:transform .3s cubic-bezier(.3,1.5,.5,1),box-shadow .3s,border-color .3s;
}
.contur .btn::before{content:"";position:absolute;inset:0;border-radius:inherit;z-index:-1;pointer-events:none;transition:opacity .3s;
  background:radial-gradient(120% 90% at 18% 0%,rgba(255,255,255,.3),transparent 46%),radial-gradient(90% 70% at 85% 110%,rgba(255,255,255,.16),transparent 50%)}
.contur .btn.main{
  background:linear-gradient(165deg,rgba(255,255,255,.24),rgba(255,255,255,.08) 55%,rgba(255,255,255,.18));
  border-color:rgba(255,255,255,0.35);
  box-shadow:inset 1px 1px 0 rgba(255,255,255,.7),inset -1px -1px 0 rgba(255,255,255,.3),0 12px 32px rgba(0,0,0,.6);
}
.contur .btn:hover{transform:translateY(-2px) scale(1.02);border-color:rgba(255,255,255,.6);box-shadow:inset 1px 1px 0 rgba(255,255,255,.8),inset 0 0 24px rgba(255,255,255,.14),0 18px 40px rgba(0,0,0,.65)}
.contur .btn:active{transform:scale(.97)}

.contur .readout{position:absolute;z-index:2;right:var(--pad);bottom:clamp(36px,6vh,64px);font:400 .8125rem/1.7 var(--mono);color:var(--soft);text-align:right;pointer-events:none}
.contur .readout span{color:var(--fg);font-weight:500}
.contur .pin{position:absolute;z-index:1;width:0;height:0;pointer-events:none;transition:opacity .2s}
.contur .pin::before,.contur .pin::after{content:"";position:absolute;background:#38bdf8;box-shadow:0 0 8px #38bdf8}
.contur .pin::before{left:-10px;top:0;width:20px;height:1px}
.contur .pin::after{top:-10px;left:0;height:20px;width:1px}

@media(max-width:720px){
  .contur .where{display:none}
  .contur .readout{left:var(--pad);right:auto;top:72px;bottom:auto;text-align:left}
  .contur #field{-webkit-mask-image:linear-gradient(180deg,#000 0%,rgba(0,0,0,.25) 60%);mask-image:linear-gradient(180deg,#000 0%,rgba(0,0,0,.25) 60%)}
  .contur .btn{height:48px;padding:0 22px}
}
@media(prefers-reduced-motion:reduce){.contur *{transition:none!important}}
`;

const SEG = {
  1: [["L", "B"]],
  2: [["B", "R"]],
  3: [["L", "R"]],
  4: [["T", "R"]],
  5: [["T", "L"], ["B", "R"]],
  6: [["T", "B"]],
  7: [["T", "L"]],
  8: [["T", "L"]],
  9: [["T", "B"]],
  10: [["T", "R"], ["L", "B"]],
  11: [["T", "R"]],
  12: [["L", "R"]],
  13: [["B", "R"]],
  14: [["L", "B"]],
};

const PEAKS = [
  { x: 880, y: 380, h: 1000, s: 230, ax: 30, ay: 20, f: 0.00042 },
  { x: 1110, y: 570, h: 520, s: 140, ax: 24, ay: 28, f: 0.00055 },
  { x: 300, y: 600, h: 360, s: 210, ax: 34, ay: 16, f: 0.00036 },
];

function dm(n, pos, neg) {
  const s = n < 0 ? neg : pos;
  const a = Math.abs(n);
  const d = Math.floor(a);
  return `${d}\u00B0 ${((a - d) * 60).toFixed(2)}\u2032 ${s}`;
}

export default function ConturLand({ onEnter }) {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const pinRef = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);
  const altRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const cv = canvasRef.current;
    const pin = pinRef.current;
    const latEl = latRef.current;
    const lngEl = lngRef.current;
    const altEl = altRef.current;
    if (!root || !hero || !cv || !pin || !latEl || !lngEl || !altEl) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const W = 1200,
      H = 700,
      C = 12,
      nx = Math.floor(W / C) + 1,
      ny = Math.floor(H / C) + 1;
    const v = new Float32Array(nx * ny);
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const ptr = { x: 880, y: 380, tx: 880, ty: 380, k: 0, over: false };
    let sc = 1,
      ox = 0,
      oy = 0,
      dpr = 1,
      raf = 0;
    const t0 = performance.now();

    const lerp = (a, b, L) => (L - a) / (b - a);

    function elev(x, y, t) {
      let e =
        40 +
        34 * Math.sin(x * 0.011 + 1 + t * 0.00018) * Math.sin(y * 0.013 - t * 0.00014) +
        18 * Math.sin(x * 0.027 + y * 0.019 + t * 0.00022);
      for (let i = 0; i < 3; i++) {
        const p = PEAKS[i];
        const px = p.x + p.ax * Math.sin(t * p.f + i);
        const py = p.y + p.ay * Math.cos(t * p.f * 1.3 + i);
        const dx = (x - px) * 0.8;
        const dy = y - py;
        e += p.h * (1 + 0.05 * Math.sin(t * 0.0005 + i * 2)) * Math.exp(-(dx * dx + dy * dy) / (2 * p.s * p.s));
      }
      const bx = x - ptr.x;
      const by = y - ptr.y;
      e += ptr.k * 260 * Math.exp(-(bx * bx + by * by) / (2 * 120 * 120));
      return e;
    }

    function size() {
      const r = hero.getBoundingClientRect();
      const rw = r.width;
      const rh = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = rw * dpr;
      cv.height = rh * dpr;
      sc = Math.max(rw / W, rh / H);
      ox = (rw - W * sc) / 2;
      oy = (rh - H * sc) / 2;
    }

    function draw(t, reveal) {
      const c = ctx;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, cv.width, cv.height);
      c.setTransform(dpr * sc, 0, 0, dpr * sc, dpr * ox, dpr * oy);
      c.save();
      if (reveal < 1) {
        c.beginPath();
        c.arc(880, 380, reveal * 1500, 0, 6.2832);
        c.clip();
      }
      c.lineWidth = 1 / sc;
      c.lineCap = "round";
      c.strokeStyle = "rgba(255,255,255,.07)";
      c.beginPath();
      for (let g = 0; g <= W; g += 100) {
        c.moveTo(g, 0);
        c.lineTo(g, H);
      }
      for (let g = 0; g <= H; g += 100) {
        c.moveTo(0, g);
        c.lineTo(W, g);
      }
      c.stroke();

      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) v[j * nx + i] = elev(i * C, j * C, t);

      for (let L = 100; L <= 1300; L += 100) {
        const major = L % 500 === 0;
        c.beginPath();
        for (let j = 0; j < ny - 1; j++) {
          for (let i = 0; i < nx - 1; i++) {
            const a = v[j * nx + i];
            const b = v[j * nx + i + 1];
            const cc = v[(j + 1) * nx + i + 1];
            const e = v[(j + 1) * nx + i];
            const s = SEG[(a > L ? 8 : 0) + (b > L ? 4 : 0) + (cc > L ? 2 : 0) + (e > L ? 1 : 0)];
            if (!s) continue;
            const x0 = i * C;
            const y0 = j * C;
            const pt = {
              T: [x0 + C * lerp(a, b, L), y0],
              R: [x0 + C, y0 + C * lerp(b, cc, L)],
              B: [x0 + C * lerp(e, cc, L), y0 + C],
              L: [x0, y0 + C * lerp(a, e, L)],
            };
            for (const [s1, s2] of s) {
              const p1 = pt[s1];
              const p2 = pt[s2];
              c.moveTo(p1[0], p1[1]);
              c.lineTo(p2[0], p2[1]);
            }
          }
        }
        c.strokeStyle = major ? "rgba(56,189,248,.85)" : "rgba(255,255,255,.24)";
        c.lineWidth = (major ? 1.5 : 1) / sc;
        c.stroke();
      }
      c.restore();
    }

    function readout(t) {
      const vx = ptr.tx;
      const vy = ptr.ty;
      latEl.textContent = dm(28.6 - vy * 0.00022, "N", "S");
      lngEl.textContent = dm(77.2 + vx * 0.00022, "E", "W");
      altEl.textContent = Math.round((1500 + elev(vx, vy, t)) * 3.281).toLocaleString("en-US") + " ft";
    }

    function place() {
      pin.style.left = ox + ptr.tx * sc + "px";
      pin.style.top = oy + ptr.ty * sc + "px";
    }

    function frame(now) {
      const t = Math.max(0, now - t0);
      let r = Math.min(1, t / 2600);
      r = 1 - Math.pow(1 - r, 3);
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.y += (ptr.ty - ptr.y) * 0.08;
      ptr.k += ((ptr.over ? 1 : 0) - ptr.k) * 0.05;
      draw(t, r);
      readout(t);
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      ptr.tx = (e.clientX - r.left - ox) / sc;
      ptr.ty = (e.clientY - r.top - oy) / sc;
      ptr.over = true;
      place();
      if (reduce) {
        ptr.x = ptr.tx;
        ptr.y = ptr.ty;
        readout(0);
      }
    };
    const onLeave = () => {
      ptr.over = false;
    };
    const onResize = () => {
      size();
      place();
      if (reduce) draw(0, 1);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    size();
    place();
    if (reduce) {
      draw(0, 1);
      readout(0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="contur" ref={rootRef}>
      <style>{css}</style>
      <main className="hero" id="hero" ref={heroRef}>
        <canvas id="field" ref={canvasRef} aria-hidden="true" />
        <div className="pin" ref={pinRef} aria-hidden="true" />

        <nav aria-label="Primary">
          <div className="logo" />
          <span className="where" />
        </nav>

        <div className="content">
          <h1 className="name-title">
            <span className="name-line">MATHELY</span>
            <span className="name-line accent">MITTAL</span>
          </h1>
        </div>

        <div className="readout" aria-hidden="true">
          <div>
            Latitude <span ref={latRef} />
          </div>
          <div>
            Longitude <span ref={lngRef} />
          </div>
          <div>
            Elevation <span ref={altRef} />
          </div>
        </div>
      </main>
    </div>
  );
}
