import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Leaf, Database, ShieldCheck, ChevronRight, Zap, ArrowRight, Factory, CheckCircle2, Plus, ArrowUpRight, MapPin, ChevronDown, Flame, Wind, Beaker, Thermometer, Gauge, Activity, Radio, Crosshair as CrosshairIcon, Radar, FileText, Hexagon, Atom, Wrench, Cog, Workflow, AlertTriangle, Circle, GitBranch } from 'lucide-react';

// --- STYLES & FONTS ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    :root {
      --bg-black: #020202;
      --bg-dark: #070808;
      --accent-gold: #C6A87C;
      --accent-green: #4ADE80;
      --text-light: #EAE6DF;
      --glass-bg: rgba(7, 8, 8, 0.7);
      --glass-border: rgba(198, 168, 124, 0.15);
    }

    body {
      background-color: var(--bg-black);
      color: var(--text-light);
      cursor: none; 
      overflow-x: hidden;
      scroll-behavior: smooth;
    }
    
    .font-serif { font-family: 'Cormorant Garamond', serif; }
    .font-mono { font-family: 'Space Mono', monospace; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-black); }
    ::-webkit-scrollbar-thumb { background: rgba(198, 168, 124, 0.3); }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent-gold); }

    .glow-effect {
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(198, 168, 124, 0.12) 0%, transparent 60%);
    }
    
    .text-outline {
      color: transparent;
      -webkit-text-stroke: 1px rgba(198, 168, 124, 0.4);
    }
    
    .text-outline-hover:hover {
      color: var(--text-light);
      -webkit-text-stroke: 0px transparent;
    }
    
    .text-outline-massive {
      color: transparent;
      -webkit-text-stroke: 1px rgba(198, 168, 124, 0.3);
    }

    .scanline {
      background: linear-gradient(to bottom, transparent 50%, rgba(198,168,124,0.05) 51%);
      background-size: 100% 4px;
    }

    /* Unique Background Patterns */
    .bg-blueprint {
      background-image: 
        linear-gradient(rgba(198, 168, 124, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(198, 168, 124, 0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .bg-stripes {
      background: repeating-linear-gradient(
        -45deg,
        rgba(3, 4, 4, 1),
        rgba(3, 4, 4, 1) 10px,
        rgba(10, 12, 11, 1) 10px,
        rgba(10, 12, 11, 1) 20px
      );
    }
    
    .bg-pinstripes {
      background-image: linear-gradient(90deg, rgba(198, 168, 124, 0.03) 1px, transparent 1px);
      background-size: 120px 100%;
    }

    .bg-topo {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C6A87C' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee { animation: marquee 30s linear infinite; }
    
    @keyframes spin-slow {
      100% { transform: rotate(360deg); }
    }
    .animate-spin-slow { animation: spin-slow 30s linear infinite; }
    
    @keyframes marquee-reverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }
    
    .accordion-content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 500ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .accordion-content.open { grid-template-rows: 1fr; }
    .accordion-inner { overflow: hidden; }

    @media (hover: none), (pointer: coarse) {
      body {
        cursor: auto;
      }
    }

    @media (max-width: 768px) {
      html, body {
        overflow-x: clip;
      }

      section {
        scroll-margin-top: 80px;
      }

      .text-outline,
      .text-outline-massive {
        -webkit-text-stroke-width: 0.7px;
      }

      .animate-marquee,
      .animate-marquee-reverse {
        animation-duration: 45s;
      }
    }

    @keyframes scan {
      0% { top: 0; }
      100% { top: 100%; }
    }
    .animate-scan { animation: scan 3s linear infinite; }

    .glass-morphism {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
    }

    .technical-grid {
      background-image: 
        linear-gradient(rgba(198, 168, 124, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(198, 168, 124, 0.03) 1px, transparent 1px);
      background-size: 20px 20px;
    }
    
    .ken-burns {
      animation: kenburns 40s ease infinite alternate;
    }
    @keyframes kenburns {
      0% { transform: scale(1) translate(0, 0); }
      100% { transform: scale(1.15) translate(-2%, -2%); }
    }

    /* ===== $100K MASTERPIECE LAYER ===== */

    /* Boot sequence */
    @keyframes boot-fade { 0%, 90% { opacity: 1; } 100% { opacity: 0; pointer-events: none; } }
    @keyframes boot-line-grow { 0% { width: 0; } 100% { width: 100%; } }
    @keyframes boot-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    .boot-overlay { animation: boot-fade 3.2s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
    .boot-line { animation: boot-line-grow 2.4s cubic-bezier(0.7, 0, 0.3, 1) forwards; }
    .boot-cursor { animation: boot-blink 0.6s steps(2) infinite; }
    .boot-row { opacity: 0; animation: boot-row-in 0.4s ease forwards; }
    @keyframes boot-row-in { to { opacity: 1; } }

    /* Kinetic split-letter */
    .kinetic-letter {
      display: inline-block;
      transform: translateY(110%);
      opacity: 0;
      transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s ease;
    }
    .kinetic-letter.visible { transform: translateY(0); opacity: 1; }
    .kinetic-word { display: inline-block; overflow: hidden; vertical-align: bottom; }

    /* Registration / crosshair frames */
    .reg-mark {
      position: absolute;
      width: 28px; height: 28px;
      border: 1px solid rgba(198,168,124,0.4);
    }
    .reg-mark::before, .reg-mark::after {
      content: ''; position: absolute; background: rgba(198,168,124,0.4);
    }
    .reg-mark::before { top: 50%; left: -8px; right: -8px; height: 1px; }
    .reg-mark::after { left: 50%; top: -8px; bottom: -8px; width: 1px; }

    /* Paper grain (warmer than film grain, only sections that need it) */
    .paper-grain {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0 0.49 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    /* Halftone dot pattern */
    .halftone {
      background-image: radial-gradient(rgba(198,168,124,0.18) 1px, transparent 1.5px);
      background-size: 14px 14px;
    }

    /* Hero mesh */
    .hero-mesh {
      background:
        radial-gradient(60% 60% at 20% 30%, rgba(198,168,124,0.10) 0%, transparent 60%),
        radial-gradient(50% 50% at 80% 70%, rgba(74,222,128,0.06) 0%, transparent 60%),
        radial-gradient(40% 40% at 50% 50%, rgba(217,120,71,0.04) 0%, transparent 70%);
    }

    /* Draw line on scroll */
    .draw-line { transform-origin: left; animation: draw-x 1.6s cubic-bezier(0.7, 0, 0.3, 1) forwards; transform: scaleX(0); }
    @keyframes draw-x { to { transform: scaleX(1); } }

    /* Glow card with cursor-follow */
    .glow-card {
      position: relative;
      isolation: isolate;
      transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    .glow-card::before {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(198,168,124,0.18), transparent 60%);
      opacity: 0; transition: opacity 0.4s ease;
      pointer-events: none; z-index: -1;
    }
    .glow-card:hover::before { opacity: 1; }

    /* Hero stagger */
    .hero-stagger > div { opacity: 0; transform: translateY(20px); animation: hero-in 1s cubic-bezier(0.16,1,0.3,1) forwards; }
    .hero-stagger > div:nth-child(1) { animation-delay: 0.2s; }
    .hero-stagger > div:nth-child(2) { animation-delay: 0.4s; }
    .hero-stagger > div:nth-child(3) { animation-delay: 0.7s; }
    .hero-stagger > div:nth-child(4) { animation-delay: 0.9s; }
    .hero-stagger > div:nth-child(5) { animation-delay: 1.1s; }
    .hero-stagger > div:nth-child(6) { animation-delay: 1.3s; }
    @keyframes hero-in { to { opacity: 1; transform: translateY(0); } }

    /* Scroll indicator */
    .scroll-indicator { animation: scroll-bob 2.4s ease-in-out infinite; }
    @keyframes scroll-bob { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 8px); } }

    /* Scroll progress bar */
    .scroll-progress { position: fixed; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, transparent, #C8A97D, #4ADE80); z-index: 200; transition: width 0.1s linear; }

    /* Word reveal */
    .word-reveal { display: inline-block; overflow: hidden; vertical-align: bottom; }
    .word-reveal-inner { display: inline-block; transform: translateY(110%); transition: transform 1.2s cubic-bezier(0.16,1,0.3,1); }
    .word-reveal.visible .word-reveal-inner { transform: translateY(0); }

    /* Counter */
    .counter-value { font-variant-numeric: tabular-nums; }

    /* Ambient orbs */
    .orb {
      position: absolute; border-radius: 9999px; filter: blur(120px); opacity: 0.18;
      animation: orb-drift 24s ease-in-out infinite alternate;
    }
    .orb-1 { width: 600px; height: 600px; background: #C8A97D; }
    .orb-2 { width: 500px; height: 500px; background: #4ADE80; animation-duration: 32s; }
    .orb-3 { width: 400px; height: 400px; background: #D97847; animation-duration: 28s; opacity: 0.10; }
    @keyframes orb-drift { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(50px,-30px) scale(1.15); } }

    /* Pulsing flow particle (for circular loop) */
    @keyframes flow-1 { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
    .flow-particle { offset-rotate: 0deg; animation: flow-1 8s linear infinite; }

    /* Wax seal rotation */
    .wax-seal { animation: spin-slow 60s linear infinite; }

    /* Methane dot grid (molecular feel) */
    .molecule-grid {
      background-image:
        radial-gradient(circle at 25% 25%, rgba(198,168,124,0.6) 1.5px, transparent 2px),
        radial-gradient(circle at 75% 75%, rgba(74,222,128,0.4) 1.5px, transparent 2px);
      background-size: 80px 80px, 80px 80px;
    }

    /* Vertical writing helper */
    .vertical-writing { writing-mode: vertical-rl; text-orientation: mixed; }

    /* Selection */
    ::selection { background: #C8A97D; color: #050505; }

  `}} />
);

// --- CUSTOM HOOKS & UTILS ---

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsIntersecting(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return [ref, isIntersecting];
};

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
};

// --- NEW PREMIUM COMPONENTS ---

const ScrollProgressBar = () => {
  const progress = useScrollProgress();
  return <div className="scroll-progress" style={{ width: `${progress * 100}%` }} />;
};

const AmbientOrbs = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="orb orb-1" style={{ top: '10%', left: '-5%' }} />
    <div className="orb orb-2" style={{ top: '60%', right: '-3%' }} />
    <div className="orb orb-3" style={{ bottom: '5%', left: '30%' }} />
  </div>
);

const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const numericValue = parseFloat(String(value).replace(/,/g, ''));
  const hasComma = String(value).includes(',');
  const isDecimal = String(value).includes('.');

  useEffect(() => {
    if (!isVisible) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(eased * numericValue);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, numericValue, duration]);

  const formatted = isDecimal
    ? count.toFixed(1)
    : hasComma
      ? Math.round(count).toLocaleString()
      : Math.round(count).toString();

  return (
    <span ref={ref} className={`counter-value ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

const TextReveal = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const words = typeof children === 'string' ? children.split(' ') : [children];
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className={`word-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="word-reveal-inner" style={{ transitionDelay: `${delay + i * 80}ms` }}>
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
};

const GlowCard = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };
  return (
    <FadeIn delay={delay} className={`glow-card rounded-[2rem] ${className}`}>
      <div ref={cardRef} onMouseMove={handleMouseMove} className="relative z-10 h-full">
        {children}
      </div>
    </FadeIn>
  );
};

// --- EXISTING COMPONENTS (refined) ---

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchLike, setIsTouchLike] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchLike(mq.matches);
    const onMqChange = (e) => setIsTouchLike(e.matches);
    mq.addEventListener("change", onMqChange);
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const t = e.target;
      setIsHovering(!!(t.closest('button') || t.closest('a') || t.closest('.interactive-element')));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { mq.removeEventListener("change", onMqChange); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);
  if (isTouchLike) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#C8A97D] rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${isHovering ? 0 : 1})`, transition: 'transform 0.1s ease-out' }} />
      <div className="fixed top-0 left-0 w-10 h-10 border border-[#C8A97D]/30 rounded-full pointer-events-none z-[9998] flex items-center justify-center" style={{ transform: `translate3d(${pos.x - 20}px, ${pos.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`, transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', backgroundColor: isHovering ? 'rgba(200,169,125,0.06)' : 'transparent' }}>
        {isHovering && <div className="w-1 h-1 bg-[#C8A97D] rounded-full animate-ping" />}
      </div>
    </>
  );
};

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const transforms = { up: 'translate-y-12', down: '-translate-y-12', left: 'translate-x-12', right: '-translate-x-12' };
  return (
    <div ref={ref} className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 translate-x-0 blur-0' : `opacity-0 ${transforms[direction] || transforms.up} blur-[2px]`} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (left + width / 2)) * 0.25, y: (e.clientY - (top + height / 2)) * 0.25 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos({ x: 0, y: 0 })} className={`relative inline-block transition-transform duration-300 ease-out ${className}`} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }} onClick={onClick}>
      {children}
    </div>
  );
};

// Kinetic letter-by-letter heading reveal
const KineticHeading = ({ children, className = '', delay = 0, stagger = 35 }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const text = String(children);
  const words = text.split(' ');
  let letterIndex = 0;
  return (
    <span ref={ref} className={className} data-testid="kinetic-heading">
      {words.map((word, wi) => (
        <span key={wi} className="kinetic-word">
          {word.split('').map((char, ci) => {
            const idx = letterIndex++;
            return (
              <span
                key={ci}
                className={`kinetic-letter ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${delay + idx * stagger}ms` }}
              >{char}</span>
            );
          })}
          {wi < words.length - 1 && <span className="kinetic-letter visible">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

// Industrial control-system boot intro
const BootSequence = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 3300);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  const rows = [
    { d: 100, txt: '> POWER ON ............................ OK' },
    { d: 280, txt: '> SCADA HANDSHAKE ..................... OK' },
    { d: 460, txt: '> PRESSURE SENSORS [12/12] ............ OK' },
    { d: 640, txt: '> CH₄ ANALYZER ........................ 62.4 %' },
    { d: 820, txt: '> REACTOR TEMPERATURE ................. 38.4 °C' },
    { d: 1000, txt: '> CHP TIER-1 ENGINE ................... READY' },
    { d: 1180, txt: '> AUTH: GP-2026-X ..................... GRANTED' },
    { d: 1360, txt: '> BOOTING EDITORIAL LAYER ............. — — —' },
  ];
  return (
    <div className="boot-overlay fixed inset-0 z-[1000] bg-[#020202] flex items-center justify-center" data-testid="boot-overlay">
      <div className="paper-grain absolute inset-0 opacity-30 pointer-events-none" />
      <div className="absolute inset-0 technical-grid opacity-10" />
      <div className="relative w-full max-w-3xl px-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_12px_#4ADE80]" />
          <span className="font-mono text-[10px] text-[#4ADE80] tracking-[0.4em] uppercase">Green Plant // Mission Control</span>
          <div className="flex-1 h-px bg-[#C6A87C]/20" />
          <span className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em]">v 4.0.26</span>
        </div>
        <div className="space-y-2 font-mono text-[11px] text-[#EAE6DF]/70 mb-12">
          {rows.map((r, i) => (
            <div key={i} className="boot-row" style={{ animationDelay: `${r.d}ms` }}>
              <span className="text-[#C6A87C]">{r.txt}</span>
            </div>
          ))}
        </div>
        <div className="relative h-px bg-[#C6A87C]/10 overflow-hidden">
          <div className="boot-line absolute inset-y-0 left-0 bg-gradient-to-r from-[#C6A87C] via-[#4ADE80] to-[#C6A87C]" />
        </div>
        <div className="mt-10 flex items-baseline gap-3 font-serif">
          <span className="text-[#EAE6DF]/40 text-sm italic">Inicjuję sekwencję wdrożeniową</span>
          <span className="boot-cursor inline-block w-2 h-4 bg-[#C6A87C]" />
        </div>
        <div className="absolute -top-6 -left-6 reg-mark" />
        <div className="absolute -top-6 -right-6 reg-mark" />
        <div className="absolute -bottom-6 -left-6 reg-mark" />
        <div className="absolute -bottom-6 -right-6 reg-mark" />
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const Crosshair = ({ className = "" }) => (
  <div className={`absolute w-4 h-4 opacity-30 ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C6A87C]"></div>
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#C6A87C]"></div>
  </div>
);

const SystemStatus = () => (
  <div className="fixed top-0 w-full z-[100] bg-[#020202] border-b border-[#C6A87C]/10 py-1.5 px-8 flex justify-between items-center overflow-hidden">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_8px_#4ADE80]"></div>
        <span className="font-mono text-[7px] text-[#4ADE80] tracking-[0.3em] uppercase">System Live</span>
      </div>
      <div className="hidden sm:flex items-center gap-4 border-l border-[#C6A87C]/10 pl-6">
        <span className="font-mono text-[7px] text-[#EAE6DF]/30 tracking-[0.2em] uppercase">Grid Sync: 50.02 Hz</span>
        <span className="font-mono text-[7px] text-[#EAE6DF]/30 tracking-[0.2em] uppercase">Active Load: 1.18 MW</span>
      </div>
    </div>
    <div className="font-mono text-[7px] text-[#C6A87C]/40 tracking-[0.3em] uppercase hidden md:block">
      LAT: 52.2297 // LON: 21.0122 // T: 14:23:05
    </div>
  </div>
);


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-[100rem] mx-auto px-6 md:px-8">
        <div className={`flex justify-between items-center px-8 md:px-10 py-4 transition-all duration-700 ${scrolled ? 'glass-morphism rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : 'bg-transparent'}`}>
          <a href="#" className="flex items-center gap-4 group cursor-pointer interactive-element">
            <div className="relative w-9 h-9 border border-[#C8A97D]/30 rounded-lg flex items-center justify-center overflow-hidden group-hover:border-[#C8A97D] transition-colors duration-700">
              <div className="absolute inset-0 bg-[#C8A97D] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <Leaf className="w-4 h-4 text-[#C8A97D] group-hover:text-[#050505] relative z-10 transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <span className="text-[#F2EDE4] font-serif tracking-[0.15em] text-lg hidden sm:block uppercase">
              Green Plant <span className="text-[#C8A97D] font-light italic lowercase">tech.</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-mono tracking-[0.25em] text-[#F2EDE4]/40 uppercase">
            {['Podejście', 'Proces', 'Ekonomia', 'Realizacje'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#C8A97D] transition-colors duration-500 relative py-2 group interactive-element">
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A97D] group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
          </div>
          <a href="#kontakt" className="bg-[#C8A97D] text-[#050505] px-8 py-3 text-[10px] font-mono tracking-[0.25em] uppercase hover:bg-[#F2EDE4] border border-[#C8A97D] hover:border-[#F2EDE4] transition-all duration-500 flex items-center gap-3 interactive-element rounded-full font-medium">
            Wyceń projekt
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 hero-mesh z-0" />
      <div className="absolute inset-0 bg-blueprint opacity-5 pointer-events-none z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[2]" />

      <div className="max-w-[100rem] mx-auto px-6 md:px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-center w-full">
        <div className="lg:col-span-7 relative hero-stagger">
          <div>
            <div className="inline-flex items-center gap-3 mb-10 glass-morphism px-5 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#34D399] animate-pulse rounded-full shadow-[0_0_10px_#34D399]" />
              <span className="text-[#C8A97D] text-[9px] font-mono tracking-[0.4em] uppercase">Nowy Standard Energii Rolniczej</span>
            </div>
          </div>

          <div>
            <h1 className="text-[4.5rem] md:text-[8rem] lg:text-[10rem] font-serif text-[#F2EDE4] leading-[0.82] tracking-tight mb-12 font-light">
              <KineticHeading delay={200} stagger={45}>Inżynieria</KineticHeading>
              <br />
              <span className="italic text-[#C8A97D] font-normal pl-6 md:pl-20 inline-block">
                <KineticHeading delay={650} stagger={55}>zysku.</KineticHeading>
              </span>
            </h1>
          </div>

          <div>
            <div className="draw-line h-[1px] w-32 bg-gradient-to-r from-[#C8A97D] to-transparent mb-10" />
          </div>

          <div>
            <p className="text-lg md:text-xl text-[#F2EDE4]/60 leading-relaxed max-w-lg font-serif font-light italic mb-14">
              Generalny wykonawca biogazowni. Transformujemy odpady w stabilne źródło dochodu i czystą energię dla przemysłu i rolnictwa.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-10">
              <MagneticButton>
                <a href="#kontakt" className="group relative px-10 py-5 bg-[#C8A97D] text-[#050505] text-[10px] font-mono tracking-[0.4em] uppercase hover:bg-[#F2EDE4] transition-all duration-500 rounded-full flex items-center gap-5 interactive-element shadow-[0_0_50px_rgba(200,169,125,0.25)] font-medium">
                  Inicjuj Inwestycję
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </a>
              </MagneticButton>
              <div className="flex items-center gap-5 text-[#F2EDE4]/30">
                <div className="w-12 h-[1px] bg-[#C8A97D]/40" />
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Ekspertyza Tier-1</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-10 md:gap-16 mt-20 pt-10 border-t border-[#C8A97D]/10">
              {[
                { label: "Sprawność CHP", value: "44.2", suffix: "%" },
                { label: "Moc Elektryczna", value: "999", suffix: " kW" },
                { label: "Wsad Dobowy", value: "42", suffix: " t" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-mono text-[9px] text-[#F2EDE4]/30 uppercase tracking-[0.2em] mb-3">{stat.label}</div>
                  <div className="font-serif text-3xl md:text-4xl text-[#F2EDE4] font-light">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000 + i * 400} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={600} direction="left" className="lg:col-span-5 hidden lg:block">
          <HeroSCADAPanel />
        </FadeIn>
      </div>

      {/* Editorial frame marks */}
      <div className="reg-mark absolute top-32 left-8 hidden md:block" />
      <div className="reg-mark absolute top-32 right-8 hidden md:block" />
      <div className="reg-mark absolute bottom-32 left-8 hidden md:block" />
      <div className="reg-mark absolute bottom-32 right-8 hidden md:block" />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 scroll-indicator">
        <span className="font-mono text-[8px] text-[#F2EDE4]/20 tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-[#C8A97D]/40" strokeWidth={1.5} />
      </div>
    </section>
  );
};

// Live-feeling SCADA mini-panel for hero
const HeroSCADAPanel = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const seed = (n) => (Math.sin(tick * 1.3 + n) + 1) / 2;
  const ch4 = (61.8 + seed(1) * 1.4).toFixed(1);
  const temp = (38.1 + seed(2) * 0.6).toFixed(1);
  const pressure = (13.8 + seed(3) * 0.8).toFixed(2);
  const load = (82.4 + seed(4) * 4).toFixed(1);
  return (
    <div className="glass-morphism p-10 rounded-[2.5rem] relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97D]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#34D399] rounded-full animate-pulse shadow-[0_0_10px_#34D399]" />
            <span className="font-mono text-[9px] text-[#34D399] tracking-[0.4em] uppercase">Live // GP-2026-X</span>
          </div>
          <div className="text-right">
            <div className="font-mono text-[8px] text-[#C8A97D]/60 tracking-[0.3em] mb-1">MODEL REF</div>
            <div className="font-mono text-[10px] text-[#F2EDE4]/80">REACTOR-A1</div>
          </div>
        </div>

        {/* live waveform */}
        <div className="h-20 mb-10 relative">
          <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
            <path
              d={(() => {
                const pts = [];
                for (let i = 0; i <= 40; i++) {
                  const y = 30 + Math.sin(i * 0.4 + tick) * 8 + Math.sin(i * 0.9 + tick * 1.3) * 6;
                  pts.push(`${i === 0 ? 'M' : 'L'} ${i * 5} ${y}`);
                }
                return pts.join(' ');
              })()}
              fill="none" stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.8"
            />
            <line x1="0" y1="30" x2="200" y2="30" stroke="#C6A87C" strokeOpacity="0.1" strokeDasharray="2 3" />
          </svg>
          <div className="absolute top-0 left-0 font-mono text-[7px] text-[#C8A97D]/60 tracking-[0.3em] uppercase">Gas Flow // m³/h</div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">
          {[
            { l: 'CH₄ Purity', v: ch4, u: '%', g: parseFloat(ch4) > 62 },
            { l: 'Reactor T°', v: temp, u: '°C', g: true },
            { l: 'Gas Pressure', v: pressure, u: 'mbar', g: true },
            { l: 'Engine Load', v: load, u: '%', g: parseFloat(load) > 80 },
          ].map((m, i) => (
            <div key={i} className="bg-[#020202]/40 border border-[#C8A97D]/10 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full ${m.g ? 'bg-[#34D399]' : 'bg-[#D97847]'}`} />
                <div className="font-mono text-[7px] text-[#F2EDE4]/40 uppercase tracking-[0.25em]">{m.l}</div>
              </div>
              <div className="font-serif text-3xl text-[#F2EDE4] font-light counter-value">
                {m.v}<span className="text-sm text-[#C8A97D]/60 italic ml-1">{m.u}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 bg-[#050505]/50 border border-[#34D399]/20 rounded-xl">
          <Activity className="w-3.5 h-3.5 text-[#34D399]" strokeWidth={1.5} />
          <span className="font-mono text-[9px] text-[#34D399] tracking-[0.25em] uppercase">Wszystkie systemy operacyjne</span>
          <div className="flex-1" />
          <span className="font-mono text-[8px] text-[#F2EDE4]/30 tracking-[0.2em]">T+ {String(tick).padStart(4, '0')}s</span>
        </div>
      </div>
    </div>
  );
};

const TickerTape = () => {
  const dataItems = ['Methane Purity: 62.4%', 'Grid Load: 1.25MW', 'Engine Hours: 84,200h', 'CO₂ Savings: 4.2t/d', 'Reactor T: 38.4°C', 'pH: 7.62', 'H₂S: <50ppm', 'VFA: 1.8g/L'];
  const editorialItems = ['Inżynieria zysku', 'Materia w energię', 'Obieg zamknięty', 'Zero odpadów'];
  const refItems = ['DWG-014/REV.C', 'PROC-ADM-01', 'CYB-SEC-PRO', 'TECH-HYD-V4', 'LOG-BIO-S7', 'DIRECTIVE 2014/34/EU'];
  return (
    <div className="bg-[#050505] py-2 overflow-hidden relative z-10 border-y border-[#C6A87C]/10" data-testid="ticker-tape">
      {/* Layer 1: mono data, fast */}
      <div className="py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              {dataItems.map((it, j) => (
                <span key={j} className="font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.4em] uppercase flex items-center gap-3">
                  <span className="w-1 h-1 bg-[#4ADE80] rounded-full" /> {it}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Layer 2: editorial serif, medium speed, big and outlined */}
      <div className="py-4 overflow-hidden border-y border-[#C6A87C]/10">
        <div className="flex animate-marquee-reverse whitespace-nowrap items-center">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-12 pr-12">
              {editorialItems.map((it, j) => (
                <span key={j} className="font-serif italic text-4xl md:text-5xl text-[#C6A87C]/30 tracking-tight flex items-center gap-12">
                  {it}<span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full inline-block" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      {/* Layer 3: tiny doc refs */}
      <div className="py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center" style={{ animationDuration: '60s' }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {refItems.map((it, j) => (
                <span key={j} className="font-mono text-[8px] text-[#EAE6DF]/20 tracking-[0.5em] uppercase">DOC. {it}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Approach = () => {
  return (
    <section id="podejscie" className="relative min-h-screen flex items-center bg-[#020202] overflow-hidden py-32" data-testid="approach">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 technical-grid opacity-20"></div>
        <div className="absolute inset-0 paper-grain opacity-20 pointer-events-none" />
      </div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-20 w-full">
        {/* Section label running vertical */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="vertical-writing font-mono text-[9px] tracking-[0.4em] uppercase text-[#C6A87C]/30">
            § I — Filozofia inżynierska // GP / 26
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-7 relative">
            <FadeIn direction="right">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1 flex items-center gap-4">
                <span>Filozofia Inżynierii</span>
                <span className="text-[#C6A87C]/30">/</span>
                <span className="text-[#C6A87C]/40">§ I</span>
              </div>
              <h2 className="text-7xl md:text-[10rem] font-serif text-[#EAE6DF] leading-[0.88] mb-12 font-light tracking-tight">
                <KineticHeading delay={100} stagger={40}>Materia w</KineticHeading><br/>
                <span className="italic text-[#C6A87C] font-normal"><KineticHeading delay={500} stagger={50}>energię.</KineticHeading></span>
              </h2>

              {/* Editorial drop-cap body */}
              <div className="max-w-2xl">
                <p className="text-[#EAE6DF]/70 font-serif text-2xl leading-[1.55] mb-8 font-light">
                  <span className="float-left font-serif text-[8rem] leading-[0.85] text-[#C6A87C] italic mr-5 mt-2 font-normal">B</span>
                  iogazownia to nie tylko zbiór betonowych zbiorników. To precyzyjnie dostrojony ekosystem, w którym <span className="italic text-[#C6A87C]">biologia</span> spotyka się z ciężką inżynierią mechaniczną — bakterie metanogenne, sterowniki PLC, kwasoodporna stal i podwójne membrany EPDM współpracują w jednym, zamkniętym układzie.
                </p>
                <p className="text-[#EAE6DF]/40 font-serif italic text-xl leading-relaxed mb-14 font-light">
                  Naszą rolą jako generalnego wykonawcy jest projektowanie tej harmonii — z dokładnością do milimetra w geometrii zbiornika i z dokładnością do 0.3 °C w stabilności procesu fermentacji.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-10 max-w-3xl pt-12 border-t border-[#C6A87C]/15">
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light"><AnimatedCounter value="25" /><span className="text-xl text-[#C6A87C]/40 italic ml-2">lat+</span></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Prognozowana <br/>żywotność konstrukcji</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light"><AnimatedCounter value="98" suffix="%" /></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Dyspozycyjność <br/>agregatów CHP</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light">0.3<span className="text-xl text-[#C6A87C]/40 italic ml-2">°C</span></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Tolerancja <br/>temperatury procesu</div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="left" className="lg:col-span-5 relative group sticky top-32">
            <div className="aspect-[4/5] glass-morphism rounded-[3rem] p-12 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C6A87C]/5 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 border border-[#C6A87C]/20 rounded-2xl flex items-center justify-center">
                    <Database className="text-[#C6A87C] w-8 h-8" strokeWidth={1} />
                  </div>
                  <div className="text-right font-mono text-[8px] text-[#C6A87C] tracking-[0.3em]">
                    SPEC_REF: BIO-REACTOR-V1<br/>
                    <span className="text-[#C6A87C]/40">REV. C — 04/2026</span>
                  </div>
                </div>

                {/* Animated isometric reactor SVG */}
                <div className="flex-1 flex items-center justify-center py-8">
                  <svg viewBox="0 0 200 200" className="w-full max-w-xs">
                    <defs>
                      <linearGradient id="iso" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#C6A87C" stopOpacity="0.3" />
                        <stop offset="1" stopColor="#C6A87C" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    {/* base ellipse (top) */}
                    <ellipse cx="100" cy="60" rx="60" ry="14" fill="url(#iso)" stroke="#C6A87C" strokeOpacity="0.6" />
                    {/* body */}
                    <rect x="40" y="60" width="120" height="100" fill="url(#iso)" stroke="#C6A87C" strokeOpacity="0.5" />
                    {/* base ellipse (bottom) */}
                    <ellipse cx="100" cy="160" rx="60" ry="14" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.6" />
                    {/* dome */}
                    <path d="M 40 60 Q 100 -10 160 60" fill="none" stroke="#C6A87C" strokeOpacity="0.6" />
                    <path d="M 50 55 Q 100 15 150 55" fill="none" stroke="#C6A87C" strokeOpacity="0.3" strokeDasharray="2 3" />
                    {/* center mixer line */}
                    <line x1="100" y1="40" x2="100" y2="155" stroke="#C6A87C" strokeOpacity="0.4" strokeWidth="1" />
                    {/* gas bubbles */}
                    {[...Array(8)].map((_, i) => (
                      <circle key={i} cx={60 + (i * 12) % 80} cy={120 + (i * 7) % 30} r="2" fill="#4ADE80" fillOpacity="0.5">
                        <animate attributeName="cy" values={`${120 + (i*7)%30};70;${120 + (i*7)%30}`} dur={`${3 + i*0.3}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0.05;0.5" dur={`${3 + i*0.3}s`} repeatCount="indefinite" />
                      </circle>
                    ))}
                    {/* radius indicators */}
                    <line x1="20" y1="180" x2="180" y2="180" stroke="#C6A87C" strokeOpacity="0.2" strokeDasharray="2 2" />
                    <text x="100" y="195" textAnchor="middle" className="font-mono" fontSize="6" fill="#C6A87C" fillOpacity="0.5">⌀ 24.0 m</text>
                  </svg>
                </div>

                <div className="space-y-6">
                  <div className="h-[1px] w-full bg-[#C6A87C]/10"></div>
                  <p className="font-serif italic text-xl text-[#EAE6DF]/60 leading-relaxed">
                    „Odrzucamy półśrodki. Każdy m³ betonu jest weryfikowany pod kątem szczelności gazowej, a każda spawa w układzie CHP przechodzi testy nieniszczące."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C6A87C]/20 border border-[#C6A87C]/40 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#C6A87C]" />
                    </div>
                    <span className="font-mono text-[9px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase">Certyfikacja Jakości TÜV</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-20 -bottom-20 w-64 h-64 border border-[#C6A87C]/5 rounded-full animate-spin-slow"></div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 border border-[#C6A87C]/10 rounded-full"></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const BlueprintProcess = () => {
  const steps = [
    { num: "01", title: "Analiza Substratu", desc: "Badamy potencjał metanowy Twojej biomasy w laboratorium. Na tej podstawie kalibrujemy pojemność reaktorów." },
    { num: "02", title: "Inżynieria Procesu", desc: "Projektujemy układ hydrauliczny, systemy mieszania oraz wymiany ciepła. Optymalizujemy przepływ wsadu." },
    { num: "03", title: "Realizacja Budowy", desc: "Wylewamy szczelne komory żelbetowe i instalujemy agregaty CHP klasy Tier-1." }
  ];

  return (
    <section id="proces" className="relative py-48 bg-[#050606] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/Users/stan/.gemini/antigravity/brain/906f4f99-9a59-4b7a-b50b-3a2631808779/biogas_technical_blueprint_1778350397581.png" 
          alt="Technical Blueprint" 
          className="w-full h-full object-cover opacity-[0.07] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050606] via-transparent to-[#050606]"></div>
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 pb-12 border-b border-[#C6A87C]/10">
            <div>
              <h2 className="text-[9px] font-mono tracking-[0.5em] text-[#C6A87C] uppercase mb-6">Execution Protocol</h2>
              <p className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-tight">Sekwencja <br/><span className="italic font-light text-[#C6A87C]">Wdrożeniowa.</span></p>
            </div>
            <div className="text-[10px] font-mono text-[#EAE6DF]/20 tracking-[0.4em] uppercase mt-8 md:mt-0">
              Technical Standards v2.0
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-1px bg-[#C6A87C]/10">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 200} className="relative bg-[#050606] p-16 group hover:bg-[#090b0a] transition-all duration-700 interactive-element">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C6A87C] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              
              <div className="font-serif text-8xl text-[#C6A87C]/5 absolute right-12 top-12 italic group-hover:text-[#C6A87C]/10 transition-all duration-700">
                {step.num}
              </div>
              
              <div className="w-14 h-14 border border-[#C6A87C]/20 rounded-xl flex items-center justify-center mb-12 bg-[#020202] group-hover:border-[#C6A87C]/50 transition-colors">
                <ChevronRight className="w-6 h-6 text-[#C6A87C]" strokeWidth={1} />
              </div>
              
              <h3 className="font-mono text-xs tracking-[0.4em] text-[#C6A87C] uppercase mb-8">{step.title}</h3>
              <p className="font-serif font-light text-[#EAE6DF]/50 leading-relaxed text-xl italic">{step.desc}</p>
              
              <div className="mt-12 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full"></span>
                <span className="font-mono text-[7px] text-[#4ADE80] tracking-[0.2em] uppercase">Verified Phase</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContractModels = () => {
  return (
    <section className="py-40 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint z-0 opacity-30"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#050606] via-transparent to-[#050606] pointer-events-none z-0"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b-[0.5px] border-[#C6A87C]/20 pb-8">
            <div>
              <h2 className="text-[10px] font-mono tracking-[0.4em] text-[#C6A87C] uppercase mb-4">Współpraca Biznesowa</h2>
              <p className="text-4xl md:text-5xl font-serif text-[#EAE6DF]">Modele <span className="italic font-light text-[#C6A87C]">Kontraktowe</span></p>
            </div>
            <p className="text-[#EAE6DF]/50 text-lg font-serif italic max-w-md leading-relaxed text-right md:text-left">
              Dostosowujemy ramy prawne i zakres odpowiedzialności do struktury kapitałowej Twojej organizacji.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <FadeIn delay={100} className="group relative">
            <GlowCard className="border-[0.5px] border-[#C8A97D]/20 bg-[#030404]/80 backdrop-blur-md p-12 md:p-16 interactive-element !rounded-none">
              <div className="absolute top-0 right-0 p-6 font-serif text-[8rem] leading-none text-[#C8A97D]/5 italic font-light group-hover:text-[#C8A97D]/10 transition-colors duration-700 pointer-events-none">EPC</div>
              <h3 className="font-mono text-2xl text-[#F2EDE4] mb-2 relative z-10">Model EPC</h3>
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#C8A97D] uppercase mb-8 relative z-10">Engineering, Procurement, Construction</p>
              <p className="font-serif text-[#F2EDE4]/60 text-xl font-light italic leading-relaxed mb-10 relative z-10 max-w-sm">
                Klasyczne generalne wykonawstwo "pod klucz". Bierzemy pełną odpowiedzialność za projekt, dostawy materiałów oraz budowę. Inwestor odbiera gotową, działającą instalację z gwarancją uzysku.
              </p>
            <ul className="space-y-4 relative z-10">
              {['Gwarancja stałej ceny kontraktowej', 'Jeden punkt odpowiedzialności', 'Minimalne obciążenie po stronie inwestora'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A87C] mt-1 shrink-0" strokeWidth={1} />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#EAE6DF]/50">{item}</span>
                </li>
              ))}
            </ul>
            </GlowCard>
          </FadeIn>

          <FadeIn delay={200} className="group relative md:mt-16">
            <GlowCard className="border-[0.5px] border-[#C8A97D]/20 bg-[#030404]/80 backdrop-blur-md p-12 md:p-16 interactive-element !rounded-none">
              <div className="absolute top-0 right-0 p-6 font-serif text-[8rem] leading-none text-[#C8A97D]/5 italic font-light group-hover:text-[#C8A97D]/10 transition-colors duration-700 pointer-events-none">EPCM</div>
              <h3 className="font-mono text-2xl text-[#F2EDE4] mb-2 relative z-10">Model EPCM</h3>
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#C8A97D] uppercase mb-8 relative z-10">Engineering, Procurement, Construction Management</p>
              <p className="font-serif text-[#F2EDE4]/60 text-xl font-light italic leading-relaxed mb-10 relative z-10 max-w-sm">
                Pełnimy rolę inżyniera kontraktu i zarządzamy budową. Inwestor podpisuje umowy bezpośrednio z podwykonawcami, zyskując maksymalną transparentność kosztów i oszczędności marży.
              </p>
            <ul className="space-y-4 relative z-10">
              {['Pełna transparentność przetargowa (Open Book)', 'Elastyczność zmian w trakcie budowy', 'Optymalizacja kosztów inwestycyjnych'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A87C] mt-1 shrink-0" strokeWidth={1} />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#EAE6DF]/50">{item}</span>
                </li>
              ))}
            </ul>
            </GlowCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const FeedstockMatrix = () => {
  const [hoveredRow, setHoveredRow] = useState(0);

  const substrates = [
    { id: "MTRL-01", name: "Gnojowica Bydlęca", category: "Odpad Rolniczy", yield: "25", ch4: "58", temp: "38°C" },
    { id: "MTRL-02", name: "Obornik Świński", category: "Odpad Rolniczy", yield: "60", ch4: "62", temp: "42°C" },
    { id: "MTRL-03", name: "Kiszonka Kukurydzy", category: "Uprawa Celowa", yield: "210", ch4: "54", temp: "40°C" },
    { id: "MTRL-04", name: "Wysłodki Buraczane", category: "Odpad Przemysłowy", yield: "125", ch4: "52", temp: "39°C" },
    { id: "MTRL-05", name: "Odpady Poubojowe", category: "Odpad Przemysłowy", yield: "320", ch4: "68", temp: "45°C" }
  ];

  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-32 border-b border-[#C6A87C]/10 pb-16">
            <div className="max-w-2xl">
              <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-pulse"></span>
                Laboratorium Surowcowe
              </h2>
              <h3 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] font-light">
                Macierz <br/><span className="italic text-[#C6A87C] font-normal">Substratów.</span>
              </h3>
            </div>
            <p className="text-[#EAE6DF]/40 font-serif italic text-2xl font-light max-w-sm leading-relaxed text-right">
              Precyzyjna kalibracja reaktora pod kątem charakterystyki fizykochemicznej wsadu.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 flex flex-col gap-2">
            {substrates.map((sub, i) => (
              <div 
                key={i}
                className={`group relative p-10 cursor-pointer transition-all duration-700 rounded-3xl ${hoveredRow === i ? 'glass-morphism border-[#C6A87C]/30' : 'border border-transparent opacity-40 hover:opacity-100'}`}
                onMouseEnter={() => setHoveredRow(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-10">
                    <span className="font-mono text-[#C6A87C]/40 text-xs">{sub.id}</span>
                    <h4 className="font-serif text-4xl text-[#EAE6DF] font-light group-hover:translate-x-4 transition-transform duration-500">{sub.name}</h4>
                  </div>
                  <div className="hidden md:flex gap-12">
                     <div className="text-right">
                        <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.2em] mb-1 uppercase">Uzysk Biogazu</div>
                        <div className="font-serif text-2xl text-[#EAE6DF] italic">{sub.yield} <span className="text-sm opacity-30">m³/t</span></div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 sticky top-40 h-fit">
             <div className="glass-morphism p-12 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Leaf className="w-32 h-32 text-[#C6A87C]" strokeWidth={0.5} />
                </div>
                
                <h5 className="font-mono text-[9px] text-[#C6A87C] tracking-[0.4em] uppercase mb-12 border-b border-[#C6A87C]/20 pb-4">Analiza Detaliczna: {substrates[hoveredRow].id}</h5>
                
                <div className="space-y-12">
                   <div>
                      <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-4">Kategoria Materiału</div>
                      <div className="font-serif text-3xl text-[#EAE6DF] italic">{substrates[hoveredRow].category}</div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-12">
                      <div>
                         <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-4">Zawartość CH4</div>
                         <div className="font-serif text-5xl text-[#C6A87C] font-light">{substrates[hoveredRow].ch4}<span className="text-xl">%</span></div>
                      </div>
                      <div>
                         <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-4">Temp. Procesu</div>
                         <div className="font-serif text-5xl text-[#C6A87C] font-light">{substrates[hoveredRow].temp}</div>
                      </div>
                   </div>

                   <div className="pt-8">
                      <div className="flex justify-between items-center mb-4">
                         <span className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.2em]">Potencjał Energetyczny</span>
                         <span className="font-mono text-[8px] text-[#4ADE80] uppercase tracking-[0.2em]">Wysoki</span>
                      </div>
                      <div className="h-1 w-full bg-[#020202] rounded-full overflow-hidden">
                         <div className="h-full bg-[#C6A87C] transition-all duration-1000 ease-out" style={{ width: `${(substrates[hoveredRow].ch4 / 80) * 100}%` }}></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EconomicsSection = () => {
  return (
    <section id="ekonomia" className="relative py-48 bg-[#010101] overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-10"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <FadeIn direction="right">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Financial Engineering</div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[1] mb-12 font-light">
              Analiza <br/>
              <span className="italic text-[#C6A87C] font-normal">rentowności.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-2xl leading-relaxed mb-16 font-serif italic max-w-xl">
              Modelujemy zwrot z kapitału w oparciu o realne aukcje OZE i optymalizację zużycia własnego. Biogazownia to fabryka zysku działająca 8000h rocznie.
            </p>
            
            <div className="space-y-10">
              {[
                { title: "Przychód Elektryczny", desc: "Aukcje OZE lub PPA. Stabilna cena zakontraktowana na 15 lat.", val: "70%" },
                { title: "Energia Termiczna", desc: "Odzysk ciepła z chłodzenia silników i spalin. Zero kosztów ogrzewania.", val: "20%" },
                { title: "Substytucja Nawozów", desc: "Poferment jako darmowa alternatywa dla mocznika i fosforanów.", val: "10%" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start group border-b border-[#C6A87C]/10 pb-8 last:border-0">
                  <div className="max-w-md">
                    <h4 className="font-serif text-3xl text-[#EAE6DF] mb-3 font-light">{item.title}</h4>
                    <p className="font-mono text-[8px] tracking-[0.3em] text-[#EAE6DF]/30 uppercase leading-loose">{item.desc}</p>
                  </div>
                  <div className="font-serif text-4xl text-[#C6A87C] italic opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-[-10px]">{item.val}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left" className="relative">
            <div className="glass-morphism p-12 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.1)_0%,transparent_70%)]"></div>
              
              <div className="flex justify-between items-center mb-16">
                <span className="font-mono text-[9px] text-[#C6A87C] tracking-[0.4em] uppercase">Cash Flow Projection</span>
                <span className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase">v3.4 Final</span>
              </div>

              <div className="h-64 relative flex items-end gap-2 mb-16">
                 {[...Array(12)].map((_, i) => (
                   <div 
                     key={i} 
                     className="flex-1 bg-gradient-to-t from-[#C6A87C] to-[#C6A87C]/40 group-hover:opacity-100 transition-all duration-700"
                     style={{ 
                       height: `${30 + (i * 5)}%`, 
                       opacity: 0.3 + (i * 0.05),
                       transitionDelay: `${i * 50}ms`
                     }}
                   ></div>
                 ))}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C6A87C]/20 border-dashed border-b"></div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-[#020202]/50 p-8 border border-[#C6A87C]/10 rounded-2xl">
                   <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.3em] mb-4">Payback Period</div>
                   <div className="font-serif text-5xl text-[#C6A87C] font-light"><AnimatedCounter value="5.2" /><span className="text-xl text-[#C6A87C]/40 italic ml-2">lat</span></div>
                </div>
                <div className="bg-[#020202]/50 p-8 border border-[#C6A87C]/10 rounded-2xl">
                   <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.3em] mb-4">Internal Rate (IRR)</div>
                   <div className="font-serif text-5xl text-[#C6A87C] font-light"><AnimatedCounter value="18.4" suffix="%" /></div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const SmartGrid = () => {
  return (
    <section className="py-48 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-40">
            <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 flex items-center justify-center gap-4">
              <Zap className="w-4 h-4" /> Dystrybucja i Integracja
            </h2>
            <h3 className="text-6xl md:text-9xl font-serif text-[#EAE6DF] leading-[0.9] font-light">
              Węzeł <br/><span className="italic text-[#C6A87C] font-normal">Systemowy.</span>
            </h3>
          </div>
        </FadeIn>

        <div className="relative max-w-6xl mx-auto">
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A87C]/30 to-transparent -translate-y-1/2 hidden md:block"></div>
           
           <div className="grid md:grid-cols-3 gap-12 relative z-10">
             {[
               { icon: <Zap className="w-8 h-8" />, title: "Smart Grid", desc: "Zautomatyzowana sprzedaż nadwyżek energii w oparciu o algorytmy Peak Shaving i spotowe ceny energii.", val: "1.2 MW" },
               { icon: <Factory className="w-8 h-8" />, title: "Ciepło Systemowe", desc: "Redukcja kosztów operacyjnych poprzez zasilanie lokalnej infrastruktury darmową energią cieplną.", val: "1.3 MWt" },
               { icon: <Leaf className="w-8 h-8" />, title: "Cyrkulacja Nawozów", desc: "Zamknięcie obiegu pierwiastków poprzez dystrybucję stabilizowanego, bezzapachowego pofermentu.", val: "22 t/d" }
             ].map((node, i) => (
                <FadeIn key={i} delay={i * 200} className={`glass-morphism p-12 flex flex-col items-center text-center group hover:border-[#C6A87C]/60 transition-all duration-700 interactive-element rounded-[3rem] ${i === 1 ? 'md:-translate-y-20' : 'md:translate-y-20'}`}>
                  <div className="w-24 h-24 rounded-full border border-[#C6A87C]/20 flex items-center justify-center mb-10 bg-[#020202] text-[#C6A87C] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(198,168,124,0.2)] transition-all duration-700">
                    {node.icon}
                  </div>
                  <h4 className="font-serif text-3xl text-[#EAE6DF] mb-6 font-light">{node.title}</h4>
                  <p className="font-mono text-[9px] tracking-widest leading-loose text-[#EAE6DF]/40 uppercase mb-12">{node.desc}</p>
                  <div className="mt-auto pt-8 w-full">
                    <span className="font-serif text-4xl italic text-[#C6A87C]">{node.val}</span>
                  </div>
                </FadeIn>
             ))}
           </div>
        </div>
      </div>
    </section>
  )
}

const KineticBreak = () => {
  return (
    <section className="py-32 bg-[#020202] overflow-hidden flex flex-col justify-center relative">
      <div className="absolute inset-0 bg-topo opacity-10 pointer-events-none"></div>
      
      <div className="w-[200%] flex animate-marquee whitespace-nowrap opacity-20">
        <h2 className="text-[clamp(2.8rem,9vw,9rem)] font-serif uppercase tracking-tighter text-outline-massive leading-none">
          STABILNE ZRÓDŁO PRZYCHODU • ODPADY W ENERGIĘ • 
        </h2>
        <h2 className="text-[clamp(2.8rem,9vw,9rem)] font-serif uppercase tracking-tighter text-outline-massive leading-none">
          STABILNE ZRÓDŁO PRZYCHODU • ODPADY W ENERGIĘ • 
        </h2>
      </div>
      
      <div className="w-[200%] flex animate-marquee-reverse whitespace-nowrap mt-[-2vw]">
        <h2 className="text-[clamp(2.8rem,9vw,9rem)] font-serif uppercase tracking-tighter text-[#C6A87C] leading-none mix-blend-difference opacity-80">
          ZAMKNIĘTY OBIEG SUROWCÓW • ZAMKNIĘTY OBIEG SUROWCÓW • 
        </h2>
      </div>
    </section>
  );
};

const CircularImpact = () => {
  return (
    <section className="relative py-40 bg-[#030404] overflow-hidden">
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 hidden lg:block">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
          <path id="textPath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="transparent" />
          <text fill="#C6A87C" className="font-mono text-[11px] tracking-[0.3em] uppercase">
            <textPath href="#textPath" startOffset="0%">
              • OBIEG ZAMKNIĘTY • ZERO ODPADÓW • ROLNICTWO CYRKULARNE 
            </textPath>
            <textPath href="#textPath" startOffset="50%">
              • OBIEG ZAMKNIĘTY • ZERO ODPADÓW • ROLNICTWO CYRKULARNE 
            </textPath>
          </text>
        </svg>
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn direction="right">
          <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Zrównoważony zysk</div>
          <h2 className="text-5xl md:text-6xl font-serif text-[#EAE6DF] leading-[1.1] mb-8">
            Wartość dodana:<br/>
            <span className="italic text-[#C6A87C] font-light">Poferment.</span>
          </h2>
          <p className="text-[#EAE6DF]/60 font-light text-xl leading-relaxed mb-10 font-serif italic max-w-lg">
            Proces fermentacji metanowej nie tylko produkuje biogaz. Przekształca on uciążliwe odpady rolnicze w doskonały, bezwonny nawóz organiczny.
          </p>
          <ul className="space-y-6">
            {['Zastępuje drogie nawozy syntetyczne (N-P-K).', 'Poprawia strukturę gleby i retencję wody.', 'Pozbawiony nasion chwastów i patogenów.', 'Brak uciążliwych odorów podczas rozlewania.'].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#C6A87C] shrink-0 mt-1" strokeWidth={1} />
                <span className="font-mono text-[11px] text-[#EAE6DF]/70 tracking-widest leading-relaxed uppercase">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}

const EnvironmentalImpact = () => {
  return (
    <section className="py-40 bg-[#030404] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-stripes opacity-20 pointer-events-none"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Kompensacja Emisji</div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-[1.1] mb-10">
              Ujemny ślad <br/>
              <span className="italic text-[#C6A87C] font-light text-outline">węglowy.</span>
            </h2>
            <p className="text-[#EAE6DF]/60 font-light text-xl leading-relaxed mb-12 font-serif italic max-w-lg">
              Biogazownia nie tylko produkuje zieloną energię. Utylizując gnojowicę i obornik, zapobiega samoistnej emisji metanu do atmosfery, czyniąc proces ekstremalnie przyjaznym dla klimatu.
            </p>
            <div className="inline-flex items-center gap-4 border border-[#C6A87C]/20 px-6 py-4 bg-[#050606]">
              <ShieldCheck className="w-5 h-5 text-[#C6A87C]" />
              <span className="font-mono text-[10px] tracking-widest text-[#EAE6DF]/80 uppercase">Certyfikaty redukcji emisji (CER)</span>
            </div>
          </FadeIn>
          
          <div className="space-y-6">
            {[
              { label: "Redukcja emisji CO2", val: "14,500", unit: "ton / rocznie" },
              { label: "Ekwiwalent posadzonych drzew", val: "240,000", unit: "sztuk" },
              { label: "Zasilone gospodarstwa domowe", val: "3,200", unit: "domów" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 150} className="border-b-[0.5px] border-[#EAE6DF]/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 group">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#EAE6DF]/40 group-hover:text-[#C6A87C] transition-colors">{stat.label}</span>
                <div className="text-right">
                  <span className="font-serif text-5xl md:text-6xl text-[#EAE6DF] italic mr-3"><AnimatedCounter value={stat.val} /></span>
                  <span className="font-mono text-[9px] text-[#C6A87C] uppercase tracking-widest">{stat.unit}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ProjectsGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    { title: "Plant Alpha-01", spec: "1.2 MW / Gnojowica i kiszonka", location: "Wielkopolska, PL", img: "/Users/stan/.gemini/antigravity/brain/906f4f99-9a59-4b7a-b50b-3a2631808779/biogas_plant_cinematic_1778349683317.png" },
    { title: "BioHub Komunalny", spec: "0.5 MW / Odpady Miejskie", location: "Mazowsze, PL", img: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2000&auto=format&fit=crop" },
    { title: "Industrial V3", spec: "2.0 MW / Odpady Przemysłowe", location: "Śląsk, PL", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2000&auto=format&fit=crop" }
  ];

  return (
    <section id="realizacje" className="relative py-48 bg-[#030404] min-h-screen flex items-center overflow-hidden">
      {projects.map((proj, i) => (
        <div 
          key={i} 
          className="absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{ 
            opacity: activeIndex === i ? 0.4 : 0,
            transform: `scale(${activeIndex === i ? 1 : 1.1})`,
            zIndex: activeIndex === i ? 1 : 0
          }}
        >
          <img src={proj.img} className="w-full h-full object-cover grayscale mix-blend-luminosity" alt={proj.title} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030404] via-[#030404]/80 to-transparent z-[2]"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10 w-full">
        <FadeIn>
          <div className="mb-32 flex items-center gap-12">
            <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase">Indeks Infrastruktury</h2>
            <div className="flex-1 h-[1px] bg-[#C6A87C]/10"></div>
            <span className="font-mono text-[9px] text-[#C6A87C] tracking-[0.4em]">ACT_IDX: 0{activeIndex + 1}</span>
          </div>
        </FadeIn>

        <div className="flex flex-col w-full">
          {projects.map((proj, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div 
                className="group border-b border-[#C6A87C]/10 py-16 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-12 interactive-element"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="relative">
                  <span className="absolute -left-12 top-0 font-mono text-[10px] text-[#C6A87C]/40">0{i+1}</span>
                  <h3 className={`text-6xl md:text-9xl font-serif font-light transition-all duration-700 uppercase tracking-tighter ${activeIndex === i ? 'text-[#EAE6DF] translate-x-8' : 'text-outline opacity-30 hover:opacity-100'}`}>
                    {proj.title}
                  </h3>
                </div>
                
                <div className={`flex items-center gap-12 transition-all duration-700 ${activeIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <div className="text-right">
                    <p className="font-mono text-[8px] tracking-[0.3em] text-[#C6A87C] uppercase mb-2">Location // Specs</p>
                    <p className="font-serif text-2xl text-[#EAE6DF] italic">{proj.location} — {proj.spec}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-[#C6A87C] flex items-center justify-center group-hover:bg-[#C6A87C] group-hover:text-[#030404] transition-all">
                    <ArrowUpRight className="w-6 h-6" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const EditorialBento = () => {
  const Card = ({ children, className = "", delay = 0 }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
      <FadeIn delay={delay} className={`glow-effect relative overflow-hidden border-[0.5px] border-[#C6A87C]/10 bg-[#070908]/80 backdrop-blur-xl transition-all duration-700 hover:border-[#C6A87C]/30 ${className}`}>
        <div ref={cardRef} onMouseMove={handleMouseMove} className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
        <div className="relative z-10 h-full p-12 flex flex-col justify-between">
          {children}
        </div>
      </FadeIn>
    );
  };

  return (
    <section className="py-40 bg-[#020202] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#C6A87C]/5 rounded-full blur-[150px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#EAE6DF]/[0.02] rounded-full blur-[100px]"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-[1.05] mb-8">
              Rdzeń <span className="italic text-[#C6A87C] font-light">technologiczny.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 text-xl font-serif font-light italic leading-relaxed">
              Nie oszczędzamy na komponentach. Używamy kwasoodpornej stali, podwójnych membran gazowych i najwydajniejszych silników na rynku.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-7 min-h-[450px]" delay={100}>
             <div>
                <Database className="text-[#C6A87C] w-6 h-6 mb-10" strokeWidth={1} />
                <h3 className="text-3xl md:text-4xl font-serif text-[#EAE6DF] mb-6 font-light">Żelbetowe Komory</h3>
                <p className="text-[#EAE6DF]/50 max-w-md font-serif italic font-light text-xl leading-relaxed">
                  Serce układu. Monolityczne zbiorniki z potężną warstwą ocieplenia, zapewniające idealną stabilność temperatury dla bakterii metanogennych niezależnie od zimy.
                </p>
             </div>
          </Card>
          <Card className="md:col-span-5" delay={200}>
            <Zap className="text-[#C6A87C] w-6 h-6 mb-10" strokeWidth={1} />
            <h3 className="text-2xl font-serif text-[#EAE6DF] mb-4 font-light">Agregaty CHP</h3>
            <p className="text-[#EAE6DF]/50 font-serif italic text-lg font-light leading-relaxed">
              Wysokosprawne silniki przystosowane do trudnego biogazu, działające ciągle przez 8000 godzin rocznie.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  return (
    <section className="py-48 bg-[#020202] relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="text-center mb-32">
           <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10">Hardware Stack // Tier-1</h2>
           <h3 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.9] font-light italic">Technologie <span className="text-[#C6A87C] not-italic">pancerne.</span></h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
           {[
             { name: "Sielens", role: "Pumping Systems", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" },
             { name: "Jenbacher", role: "CHP Generators", img: "https://images.unsplash.com/photo-1542124382-e69a27177e96?q=80&w=1000&auto=format&fit=crop" },
             { name: "Wangen", role: "Progressing Cavity", img: "https://images.unsplash.com/photo-1535813548-6601f6d0f983?q=80&w=1000&auto=format&fit=crop" },
             { name: "ABB", role: "Automation & Control", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" }
           ].map((tech, i) => (
             <GlowCard key={i} delay={i * 100} className="group aspect-square glass-morphism !rounded-3xl overflow-hidden interactive-element">
                <img src={tech.img} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-2">{tech.role}</div>
                   <div className="font-serif text-3xl text-[#EAE6DF] font-light">{tech.name}</div>
                </div>
             </GlowCard>
           ))}
        </div>
      </div>
    </section>
  )
}

const ScadaSystem = () => {
  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-10"></div>
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <FadeIn direction="right">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Software Infrastructure</div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] mb-12 font-light italic">
              Cyfrowy <br/><span className="text-[#C6A87C] not-italic">bliźniak.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-2xl leading-relaxed mb-16 font-serif italic max-w-xl">
              Nasz system SCADA to mózg instalacji. Przetwarza tysiące zmiennych na sekundę, optymalizując proces fermentacji w czasie rzeczywistym.
            </p>
          </FadeIn>

          <FadeIn direction="left" className="relative h-[600px] glass-morphism rounded-[3rem] overflow-hidden p-12">
             <div className="absolute inset-0 bg-[#020202]/50 backdrop-blur-xl"></div>
             <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-[#4ADE80] rounded-full animate-pulse"></div>
                      <span className="font-mono text-[9px] text-[#EAE6DF]/80 tracking-[0.3em] uppercase">Control System Online</span>
                   </div>
                   <span className="font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.3em]">REF: SCADA_V4.0</span>
                </div>
                
                <div className="flex-1 grid grid-cols-6 gap-2 items-end">
                   {[...Array(24)].map((_, i) => (
                     <div 
                       key={i} 
                       className="bg-[#C6A87C]/20 border-t border-[#C6A87C]/40" 
                       style={{ 
                         height: `${30 + Math.random() * 60}%`,
                         animation: `pulse ${1 + Math.random()}s infinite alternate`
                       }}
                     ></div>
                   ))}
                </div>
                
                <div className="mt-12 grid grid-cols-3 gap-8 pt-8">
                   <div>
                      <div className="font-mono text-[7px] text-[#EAE6DF]/30 uppercase mb-2">Gas Pressure</div>
                      <div className="font-serif text-3xl text-[#EAE6DF]">14.2 <span className="text-xs italic text-[#C6A87C]">mbar</span></div>
                   </div>
                   <div>
                      <div className="font-mono text-[7px] text-[#EAE6DF]/30 uppercase mb-2">Oxygen Level</div>
                      <div className="font-serif text-3xl text-[#EAE6DF]">0.02 <span className="text-xs italic text-[#C6A87C]">%</span></div>
                   </div>
                   <div>
                      <div className="font-mono text-[7px] text-[#EAE6DF]/30 uppercase mb-2">Motor Load</div>
                      <div className="font-serif text-3xl text-[#EAE6DF]">84.1 <span className="text-xs italic text-[#C6A87C]">%</span></div>
                   </div>
                </div>
             </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
const ResearchAndDevelopment = () => {
  return (
    <section className="relative py-40 bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-full md:w-1/2 h-full bg-[#030404] relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.05)_0%,transparent_60%)]"></div>
        </div>
        <div className="w-1/2 h-full relative hidden md:block">
          <div className="absolute inset-0 bg-[#030404]/60 z-10 mix-blend-multiply"></div>
          {/* Robust Lab Image */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-luminosity"></div>
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A87C]/30 to-transparent z-20"></div>
        </div>
      </div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-20 w-full">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right" className="py-10 md:py-0">
            <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Faza Przed-Inwestycyjna</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#EAE6DF] leading-[1.1] mb-10">
              Laboratorium <br/>
              <span className="text-outline italic">analityczne.</span>
            </h2>
            <p className="text-[#EAE6DF]/60 font-light text-lg leading-relaxed mb-12 font-serif italic max-w-lg">
              Nie opieramy się na przypuszczeniach. Zanim zaprojektujemy reaktory, próbki Twojej biomasy przechodzą rygorystyczne testy wydajności metanowej (BMP).
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Testy BMP (Biochemical Methane Potential)", desc: "Dokładne określenie ile metanu wyprodukuje tona Twojego surowca." },
                { title: "Analiza Fizykochemiczna", desc: "Badanie suchej masy, zawartości popiołu oraz stosunku węgla do azotu (C:N)." },
                { title: "Symulacja Fermentacji", desc: "Przeprowadzenie miniaturowego procesu w reaktorach laboratoryjnych." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="font-serif text-2xl text-[#C6A87C] italic opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-[#EAE6DF]/80 uppercase mb-2">{item.title}</h4>
                    <p className="font-serif italic text-[#EAE6DF]/40 font-light text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Leadership = () => {
  const leaders = [
    { 
      role: "Główny Inżynier Projektu", 
      name: "Dział Konstrukcyjny", 
      exp: "Nadzór nad precyzją montażu izolacji termicznej i wylewek żelbetowych. Gwarancja sterylności środowiska.",
      img: "https://images.unsplash.com/photo-1541888087425-ce81df8219b7?q=80&w=1000&auto=format&fit=crop",
      id: "AUTH_LVL_4",
      clearance: "TOP SECRET // INDUSTRIAL"
    },
    { 
      role: "Główny Technolog OZE", 
      name: "Dział Biologiczny", 
      exp: "Eksperci od fermentacji metanowej. Parametryzacja środowiska pod kątem maksymalizacji uzysku z powierzonej biomasy.",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
      id: "AUTH_LVL_4",
      clearance: "TOP SECRET // BIOLOGIC"
    }
  ];

  return (
    <section className="py-48 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-40 flex flex-col lg:flex-row lg:items-end justify-between gap-16 border-b border-[#C6A87C]/10 pb-16">
            <div>
              <h2 className="text-[9px] font-mono tracking-[0.5em] text-[#C6A87C] uppercase mb-8">Personnel Index</h2>
              <p className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] font-light">Nadzór <br/><span className="italic font-light text-[#C6A87C]">Weryfikowany.</span></p>
            </div>
            <p className="text-[#EAE6DF]/40 text-2xl font-serif italic max-w-md leading-relaxed text-right">
              Kadra inżynierska z uprawnieniami do projektowania instalacji o wysokim ryzyku gazowym.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-32">
          {leaders.map((leader, i) => (
            <FadeIn key={i} delay={i * 200} className={`group relative flex flex-col interactive-element ${i === 1 ? 'md:mt-40' : ''}`}>
               <div className="aspect-[4/5] w-full bg-[#050606] border border-[#C6A87C]/20 relative overflow-hidden mb-16 rounded-[2rem]">
                  <img 
                    src={leader.img} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    alt={leader.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
                  
                  {/* Security Overlay */}
                  <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                       <div className="glass-morphism px-4 py-2 rounded-lg border-[#C6A87C]/30">
                          <span className="font-mono text-[8px] text-[#C6A87C] tracking-[0.2em]">{leader.clearance}</span>
                       </div>
                       <div className="w-12 h-12 border border-[#C6A87C]/20 flex items-center justify-center rounded-full animate-spin-slow">
                          <Plus className="w-4 h-4 text-[#C6A87C]" strokeWidth={1} />
                       </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                       <div className="space-y-4">
                          <div className="font-mono text-[7px] text-[#C6A87C] tracking-[0.4em] uppercase opacity-60">Identity Verified</div>
                          <div className="h-[2px] w-32 bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]"></div>
                       </div>
                       <div className="text-right">
                          <div className="font-mono text-[9px] text-[#EAE6DF]/40 uppercase tracking-[0.2em] mb-1">Authorization</div>
                          <div className="font-mono text-xs text-[#C6A87C]">{leader.id}</div>
                       </div>
                    </div>
                  </div>
               </div>
               
               <div className="pl-12 border-l-2 border-[#C6A87C]/20 group-hover:border-[#C6A87C] transition-colors duration-700">
                  <h4 className="font-mono text-[10px] tracking-[0.5em] text-[#C6A87C] uppercase mb-6 flex items-center gap-4">
                    <span className="w-2 h-2 bg-[#C6A87C] rounded-full group-hover:animate-ping"></span>
                    {leader.role}
                  </h4>
                  <h3 className="font-serif text-5xl text-[#EAE6DF] mb-8 font-light">{leader.name}</h3>
                  <p className="font-serif font-light text-[#EAE6DF]/60 text-2xl italic leading-relaxed">{leader.exp}</p>
               </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
};

const OperationsMaintenance = () => {
  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-24 items-center">
          <FadeIn className="lg:col-span-6">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Mission Control // O&M</div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] mb-12 font-light">
              Utrzymanie <br/>
              <span className="italic text-[#C6A87C] font-normal">ruchu.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-2xl leading-relaxed mb-16 font-serif italic max-w-xl">
              Przekazanie kluczy to dopiero początek. Nasze centrum operacyjne monitoruje parametry biologiczne i mechaniczne 24/7, gwarantując ciągłość generacji.
            </p>
            
            <div className="grid grid-cols-2 gap-10">
              <div className="p-8 glass-morphism rounded-3xl">
                 <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-4">Uptime SLA</div>
                 <div className="font-serif text-5xl text-[#EAE6DF] font-light"><AnimatedCounter value="98.5" suffix="%" /></div>
              </div>
              <div className="p-8 glass-morphism rounded-3xl">
                 <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-4">Response Time</div>
                 <div className="font-serif text-5xl text-[#EAE6DF] font-light">&lt;<AnimatedCounter value="24" /><span className="text-xl text-[#C6A87C]/40 italic ml-2">h</span></div>
              </div>
            </div>
          </FadeIn>

          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            {[
              { title: "Zdalna Diagnostyka SCADA", desc: "Podgląd na żywo każdego zaworu i mieszadła. Wykrywanie anomalii zanim staną się awarią.", icon: <Zap className="w-6 h-6" /> },
              { title: "Nadzór Technologa", desc: "Cotygodniowa analiza parametrów fermentacji. Optymalizacja diety reaktora.", icon: <Leaf className="w-6 h-6" /> },
              { title: "Serwis Mechaniczny Tier-1", desc: "Autoryzowany serwis agregatów CHP i systemów pompujących. Oryginalne części.", icon: <Factory className="w-6 h-6" /> }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150} className="group glass-morphism p-10 flex gap-8 items-center rounded-[2.5rem] hover:border-[#C6A87C]/40 transition-all duration-700">
                <div className="w-16 h-16 rounded-2xl border border-[#C6A87C]/10 flex items-center justify-center bg-[#020202] text-[#C6A87C] group-hover:scale-110 transition-all duration-700">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-mono text-[9px] tracking-widest uppercase text-[#EAE6DF] mb-2">{item.title}</h4>
                  <p className="font-serif italic text-[#EAE6DF]/40 font-light text-lg">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SafetyStandards = () => {
  const standards = [
    { title: "Dyrektywa ATEX", desc: "Zabezpieczenie przeciwwybuchowe EX dla stref zagrożonych metanem.", code: "DIRECTIVE 2014/34/EU" },
    { title: "Standardy UDT", desc: "Dozór techniczny nad zbiornikami ciśnieniowymi i rurociągami.", code: "UDT REGULATION" },
    { title: "Ochrona PPOŻ", desc: "Zintegrowane systemy oddymiania i aktywne pochodnie bezpieczeństwa.", code: "NFPA-EN STANDARDS" },
    { title: "Certyfikacja CE", desc: "Zgodność z europejskimi normami maszynowymi i bezpieczeństwa pracy.", code: "MD 2006/42/EC" }
  ];

  return (
    <section className="py-48 bg-[#020202] relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-32">
             <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 flex items-center gap-4">
               <ShieldCheck className="w-5 h-5" /> Compliance Framework
             </h2>
             <h3 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] font-light">Bezpieczeństwo <br/><span className="italic text-[#C6A87C] font-normal">normatywne.</span></h3>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10">
          {standards.map((std, i) => (
            <FadeIn key={i} delay={i * 100} className="bg-[#020202] p-12 group hover:bg-[#050606] transition-all duration-700 interactive-element">
               <div className="font-mono text-[7px] text-[#C6A87C] tracking-[0.3em] uppercase mb-8 opacity-40 group-hover:opacity-100">{std.code}</div>
               <h4 className="font-serif text-3xl text-[#EAE6DF] mb-6 font-light group-hover:text-[#C6A87C] transition-colors">{std.title}</h4>
               <p className="font-serif italic text-[#EAE6DF]/40 text-lg leading-relaxed">{std.desc}</p>
               <div className="mt-12 w-8 h-[1px] bg-[#C6A87C]/20 group-hover:w-full transition-all duration-700"></div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


const TechnicalFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "Metodologia Pozyskiwania Decyzji", a: "Zarządzamy pełnym procesem administracyjnym: od Karty Informacyjnej Przedsięwzięcia (KIP), przez raport środowiskowy, aż po ostateczne PNB i koncesję energetyczną.", doc: "PROC-ADM-01" },
    { q: "Parametryzacja Hydrauliki Procesowej", a: "Stosujemy autorskie algorytmy doboru mocy mieszadeł i wydajności pomp w zależności od reologii substratu, co redukuje zużycie energii o 15%.", doc: "TECH-HYD-V4" },
    { q: "Architektura Cyberbezpieczeństwa", a: "Systemy SCADA pracują w odizolowanych sieciach VLAN z szyfrowanym dostępem VPN, zapewniając ochronę przed nieautoryzowanym dostępem do sterowników PLC.", doc: "CYB-SEC-PRO" },
    { q: "Logistyka Pofermentu i Odwadniania", a: "Projektujemy zintegrowane systemy separacji faz i magazynowania pofermentu, optymalizując koszty transportu i nawożenia na polach.", doc: "LOG-BIO-S7" }
  ];

  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
         
         <FadeIn className="lg:col-span-4 sticky top-40">
                         <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Knowledge Repository</div>

             <h3 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] font-light">
               Dokumentacja <br/>
               <span className="italic text-[#C6A87C] font-normal">operacyjna.</span>
             </h3>
             <p className="text-[#EAE6DF]/40 font-serif italic text-2xl font-light mt-12 leading-relaxed">
               Zbiór procedur i standardów technicznych definiujących każdą fazę życia instalacji.
             </p>
         </FadeIn>

          <div className="lg:col-span-7 flex flex-col gap-4">
             {faqs.map((faq, i) => (
               <FadeIn key={i} delay={i * 100}>
                 <div 
                   className={`glass-morphism p-10 cursor-pointer group transition-all duration-700 rounded-[2rem] ${openIndex === i ? 'border-[#C6A87C]/40' : 'opacity-40 hover:opacity-100'}`}
                   onClick={() => setOpenIndex(i)}
                 >
                   <div className="flex justify-between items-center gap-10">
                     <div className="flex items-center gap-8">
                       <span className="font-mono text-[9px] text-[#C6A87C] tracking-[0.2em]">{faq.doc}</span>
                       <h4 className="font-serif text-3xl text-[#EAE6DF] font-light transition-colors duration-300">
                         {faq.q}
                       </h4>
                     </div>
                     <Plus className={`w-6 h-6 text-[#C6A87C] transition-transform duration-500 ${openIndex === i ? 'rotate-45' : ''}`} strokeWidth={1} />
                   </div>
                   
                   {openIndex === i && (
                     <FadeIn className="pt-10 mt-10">
                       <p className="font-serif italic text-xl text-[#EAE6DF]/60 leading-relaxed">
                         {faq.a}
                       </p>
                       <div className="mt-8 flex items-center gap-4">
                          <div className="w-2 h-2 bg-[#4ADE80] rounded-full"></div>
                          <span className="font-mono text-[8px] text-[#4ADE80] tracking-[0.3em] uppercase">Status: Verified Document</span>
                       </div>
                     </FadeIn>
                   )}
                 </div>
               </FadeIn>
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ServiceCoverage = () => {
  return (
    <section className="relative py-48 bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] px-6 py-1 mx-auto w-fit">Regional Logistics</div>
          <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.9] mb-12 font-light">
            Zasięg <br/><span className="italic text-[#C6A87C] font-normal">operacyjny.</span>
          </h2>
          <p className="text-[#EAE6DF]/50 font-serif italic text-2xl max-w-3xl mx-auto leading-relaxed mb-20">
            Nasze zespoły inżynierskie i serwisowe operują na terenie całego kraju, zapewniając wsparcie techniczne w każdym zakątku Polski.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10 w-full">
             {[
               { region: "Polska Północna", city: "Gdańsk Hub", status: "Operational" },
               { region: "Polska Centralna", city: "Warszawa HQ", status: "Operational" },
               { region: "Polska Zachodnia", city: "Poznań Hub", status: "Active" },
               { region: "Polska Południowa", city: "Kraków Hub", status: "Operational" }
             ].map((node, i) => (
               <div key={i} className="bg-[#020202] p-10 group hover:bg-[#050606] transition-all">
                  <div className="font-mono text-[7px] text-[#C6A87C] tracking-[0.3em] uppercase mb-4 opacity-40">{node.status}</div>
                  <div className="font-serif text-2xl text-[#EAE6DF] mb-2">{node.region}</div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.2em]">{node.city}</div>
               </div>
             ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const CTA = () => {
  return (
    <section id="kontakt" className="relative py-56 bg-[#020202] overflow-hidden" data-testid="cta">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-[radial-gradient(circle_at_center,rgba(200,169,125,0.18)_0%,transparent_60%)] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute inset-0 halftone opacity-[0.05]" />
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        {/* Kinetic massive headline */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-12 glass-morphism px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-[#34D399] rounded-full animate-pulse shadow-[0_0_12px_#34D399]" />
            <span className="font-mono text-[#C8A97D] text-[9px] tracking-[0.4em] uppercase">Wolne przepustowości systemowe // Q3 2026</span>
          </div>
          <h2 className="font-serif text-[#F2EDE4] leading-[0.82] tracking-tight font-light" data-testid="cta-headline">
            <span className="block text-[5rem] md:text-[10rem] lg:text-[14rem]">
              <KineticHeading delay={100} stagger={40}>Czas na</KineticHeading>
            </span>
            <span className="block italic text-[#C8A97D] text-[6rem] md:text-[12rem] lg:text-[16rem]">
              <KineticHeading delay={600} stagger={50}>budowę.</KineticHeading>
            </span>
          </h2>
        </div>

        {/* Lower row: copy + CTA + spec */}
        <FadeIn delay={400}>
          <div className="grid lg:grid-cols-12 gap-12 items-end max-w-7xl mx-auto pt-12 border-t border-[#C6A87C]/15">
            <div className="lg:col-span-5">
              <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-4">— Inicjacja kontraktu</div>
              <p className="font-serif italic text-2xl md:text-3xl text-[#F2EDE4]/70 leading-[1.4] font-light">
                Weryfikujemy technologię, szacujemy CAPEX, projektujemy, budujemy. Pierwszy m³ biogazu — w 14 miesięcy.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center gap-6">
              <MagneticButton>
                <a href="#kontakt" className="group relative bg-[#C8A97D] text-[#050505] px-14 py-7 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-[#F2EDE4] transition-all duration-500 rounded-full flex items-center gap-5 interactive-element shadow-[0_0_60px_rgba(200,169,125,0.35)] font-medium" data-testid="cta-init">
                  Inicjuj rozmowy
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2} />
                </a>
              </MagneticButton>
              <div className="font-mono text-[9px] text-[#F2EDE4]/30 tracking-[0.3em] uppercase">
                lub +48 22 000 00 00
              </div>
            </div>

            <div className="lg:col-span-3 lg:text-right">
              <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-4">— Odpowiedź operacyjna</div>
              <div className="font-serif text-6xl md:text-7xl text-[#F2EDE4] font-light leading-none">
                &lt;24<span className="text-2xl italic text-[#C8A97D]/60 ml-2">h</span>
              </div>
              <div className="font-mono text-[8px] text-[#F2EDE4]/30 tracking-[0.3em] uppercase mt-3">
                Dział handlowy + inżynier
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Decorative bottom band */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto pt-12 border-t border-[#C6A87C]/10">
          {[
            { l: 'NDA', v: 'Standard' },
            { l: 'CAPEX Range', v: '€2–14M' },
            { l: 'Engineering', v: '14 mies.' },
            { l: 'Geografia', v: 'PL · DE · CZ' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 100} className="text-center">
              <div className="font-mono text-[8px] text-[#C8A97D]/50 tracking-[0.4em] uppercase mb-3">{s.l}</div>
              <div className="font-serif text-2xl text-[#F2EDE4]/70 italic">{s.v}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#020202] pt-40 pb-12 relative overflow-hidden" data-testid="footer">
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#C6A87C]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 paper-grain opacity-20 pointer-events-none" />

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        {/* Massive wordmark */}
        <FadeIn>
          <div className="border-y border-[#C6A87C]/15 py-16 mb-24">
            <h2 className="font-serif text-[#EAE6DF]/[0.04] leading-none tracking-tighter text-[16vw] uppercase select-none">
              GREEN<span className="italic text-[#C6A87C]/30 lowercase"> plant </span>TECH.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-5">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-10 h-10 border border-[#C6A87C]/30 flex items-center justify-center rounded-lg">
                <Leaf className="w-4 h-4 text-[#C6A87C]" strokeWidth={1} />
              </div>
              <span className="text-[#EAE6DF] font-serif tracking-widest text-2xl uppercase">
                Green Plant <span className="text-[#C6A87C] italic font-light lowercase">tech.</span>
              </span>
            </div>
            <p className="text-[#EAE6DF]/40 max-w-sm font-serif italic font-light text-lg leading-relaxed mb-10">
              Generalny wykonawca biogazowni rolniczych i komunalnych. Projektowanie, budowa i serwis gwarancyjny — z gwarancją uzysku metanowego.
            </p>
            <div className="space-y-2 font-mono text-[10px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase">
              <div>ul. Energetyczna 14 // 00-001 Warszawa</div>
              <div>NIP 525-000-00-00 // KRS 0000000000</div>
              <div>+48 22 000 00 00 // kontakt@greenplant.tech</div>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-2">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Oferta</h4>
            <ul className="space-y-5">
              {['Projektowanie', 'Budowa pod klucz', 'Serwis CHP', 'Modernizacje', 'Audyt BMP'].map((link, i) => (
                <li key={i}><a href="#" className="text-[#EAE6DF]/40 hover:text-[#C6A87C] transition-colors text-[10px] font-mono tracking-[0.2em] uppercase interactive-element">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Firma</h4>
            <ul className="space-y-5">
              {['O nas', 'Realizacje', 'Kariera', 'Kontakt', 'Prasa'].map((link, i) => (
                <li key={i}><a href="#" className="text-[#EAE6DF]/40 hover:text-[#C6A87C] transition-colors text-[10px] font-mono tracking-[0.2em] uppercase interactive-element">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Colophon</h4>
            <div className="space-y-3 font-mono text-[9px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase leading-relaxed">
              <div>Set in <span className="text-[#C6A87C]/80 font-serif italic normal-case tracking-normal text-sm">Cormorant Garamond</span></div>
              <div>& <span className="text-[#C6A87C]/80 font-mono normal-case tracking-normal text-sm">Space Mono</span></div>
              <div className="pt-3 border-t border-[#C6A87C]/10">Engineered in Warsaw</div>
              <div>Bred in the soil of Wielkopolska</div>
              <div className="pt-3 border-t border-[#C6A87C]/10">Issue N° 04 // 2026</div>
              <div>Vol. I, Ed. III</div>
            </div>
          </div>
        </div>

        {/* ASCII art leaf */}
        <FadeIn>
          <pre className="text-[#C6A87C]/15 font-mono text-[8px] leading-tight text-center mb-20 hidden md:block">
{`                    .-.
                  .'   '.
                 /       \\
                |    O    |
                 \\       /
                  '.   .'
                    '-'
                     |
                     |
                  ___|___`}
          </pre>
        </FadeIn>

        <div className="border-t border-[#C6A87C]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#EAE6DF]/30 text-[9px] font-mono uppercase tracking-[0.3em]">
            &copy; 2026 Green Plant Technologies Sp. z o.o. // All rights reserved
          </p>
          <div className="font-mono text-[9px] text-[#EAE6DF]/30 uppercase tracking-[0.3em]">
            LAT 52.2297 // LON 21.0122
          </div>
          <div className="flex gap-10 text-[9px] text-[#EAE6DF]/30 font-mono uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-[#C6A87C] transition-colors interactive-element">Polityka Prywatności</a>
            <a href="#" className="hover:text-[#C6A87C] transition-colors interactive-element">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ===== NEW $100K SIGNATURE SECTIONS =====

// Exploded-view reactor anatomy with numbered callouts
const ReactorAnatomy = () => {
  const [active, setActive] = useState(0);
  const parts = [
    { id: '01', name: 'Mieszadło zanurzeniowe', desc: 'Stal nierdzewna 1.4571. Trzy łopaty hydrodynamiczne 18.5 kW.', x: 30, y: 35 },
    { id: '02', name: 'Membrana podwójna EPDM', desc: 'Magazyn biogazu 1200 m³. Odporność termiczna -40 do +80°C.', x: 50, y: 12 },
    { id: '03', name: 'Wężownica grzejna', desc: 'Stabilizacja procesu mezofilowego. 38.4 °C ±0.3.', x: 22, y: 60 },
    { id: '04', name: 'Komora żelbetowa', desc: 'Beton klasy C35/45. Szczelność gazowa P10. Izolacja 20cm wełna mineralna.', x: 50, y: 60 },
    { id: '05', name: 'Wlot substratu', desc: 'Dozownik z homogenizatorem. 42 t/dobę. Czujnik suchej masy.', x: 8, y: 50 },
    { id: '06', name: 'Wylot pofermentu', desc: 'Separator faz. Suchy nawóz organiczny + ciecz pofermentacyjna.', x: 88, y: 50 },
    { id: '07', name: 'Sonda pomiarowa', desc: 'pH, ORP, temperatura, lotne kwasy tłuszczowe (VFA). Próbkowanie ciągłe.', x: 70, y: 40 },
    { id: '08', name: 'Pochodnia awaryjna', desc: 'Spalanie biogazu w razie nadciśnienia. Norma ATEX zone 1.', x: 78, y: 8 },
  ];
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="reactor-anatomy">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="absolute inset-0 paper-grain opacity-30 pointer-events-none" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-16 items-end mb-24 border-b border-[#C6A87C]/10 pb-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <CrosshairIcon className="w-3.5 h-3.5" strokeWidth={1} /> Schemat techniczny // Exploded View
              </div>
              <h2 className="text-6xl md:text-[9rem] font-serif text-[#EAE6DF] leading-[0.85] font-light">
                Anatomia <br/><span className="italic text-[#C6A87C] font-normal">reaktora.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-serif italic text-2xl text-[#EAE6DF]/50 leading-relaxed">
                Każdy komponent reaktora pracuje w warunkach skrajnych — od korozyjnego H₂S po nadciśnienie gazowe. Zero kompromisów.
              </p>
              <div className="mt-8 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">
                Doc. ref: GP-MECH-DWG-014 / Rev. C
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* SVG anatomy */}
          <FadeIn className="lg:col-span-8 relative">
            <div className="relative aspect-[4/3] glass-morphism rounded-[2rem] overflow-hidden p-6">
              <div className="absolute top-4 left-6 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">DWG-014 / SECTION A-A</div>
              <div className="absolute top-4 right-6 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">SCALE 1:200</div>
              <div className="absolute bottom-4 left-6 font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.3em] uppercase">DRAWN BY GREEN PLANT TECH.</div>
              <div className="absolute bottom-4 right-6 font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.3em] uppercase">⌀ 24.0 M / H 8.0 M</div>

              <svg viewBox="0 0 800 600" className="w-full h-full">
                <defs>
                  <linearGradient id="rgrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#C6A87C" stopOpacity="0.05" />
                    <stop offset="1" stopColor="#C6A87C" stopOpacity="0.18" />
                  </linearGradient>
                  <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#C6A87C" strokeOpacity="0.35" strokeWidth="1" />
                  </pattern>
                </defs>
                {/* ground line */}
                <line x1="60" y1="500" x2="740" y2="500" stroke="#C6A87C" strokeOpacity="0.25" strokeDasharray="4 4" />
                {/* foundation */}
                <rect x="120" y="490" width="560" height="20" fill="url(#hatch)" />
                {/* reactor body */}
                <ellipse cx="400" cy="490" rx="240" ry="40" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.55" />
                <rect x="160" y="220" width="480" height="270" fill="url(#rgrad)" stroke="#C6A87C" strokeOpacity="0.55" />
                <ellipse cx="400" cy="220" rx="240" ry="40" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.55" />
                {/* gas dome */}
                <path d="M 160 220 Q 400 60 640 220" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <path d="M 200 200 Q 400 100 600 200" fill="none" stroke="#C6A87C" strokeOpacity="0.3" strokeDasharray="3 4" />
                {/* mixer shaft */}
                <line x1="280" y1="180" x2="280" y2="430" stroke="#C6A87C" strokeOpacity="0.7" strokeWidth="2" />
                <rect x="266" y="160" width="28" height="22" fill="#C6A87C" fillOpacity="0.25" stroke="#C6A87C" />
                <path d="M 240 410 L 320 410 M 240 410 L 260 395 M 320 410 L 300 395" stroke="#C6A87C" strokeOpacity="0.7" strokeWidth="2" />
                {/* heating coil */}
                <path d="M 200 430 Q 240 410 280 430 T 360 430" fill="none" stroke="#4ADE80" strokeOpacity="0.6" strokeWidth="1.5" />
                {/* inlet pipe */}
                <line x1="40" y1="380" x2="160" y2="380" stroke="#C6A87C" strokeOpacity="0.7" strokeWidth="2" />
                <polygon points="40,374 32,380 40,386" fill="#C6A87C" fillOpacity="0.7" />
                {/* outlet pipe */}
                <line x1="640" y1="380" x2="760" y2="380" stroke="#C6A87C" strokeOpacity="0.7" strokeWidth="2" />
                <polygon points="760,374 768,380 760,386" fill="#C6A87C" fillOpacity="0.7" />
                {/* probe */}
                <line x1="540" y1="150" x2="540" y2="350" stroke="#C6A87C" strokeOpacity="0.45" strokeWidth="1" />
                <circle cx="540" cy="155" r="6" fill="#4ADE80" fillOpacity="0.6" />
                {/* flare */}
                <line x1="620" y1="120" x2="620" y2="30" stroke="#C6A87C" strokeOpacity="0.7" strokeWidth="2" />
                <path d="M 612 30 Q 620 5 628 30" fill="#D97847" fillOpacity="0.55" stroke="#D97847" strokeOpacity="0.7" />
                {/* gas bubbles inside reactor */}
                {[...Array(14)].map((_, i) => (
                  <circle key={i} cx={200 + (i * 31) % 400} cy={300 + (i * 17) % 130} r={3 + (i % 3)}
                    fill="#4ADE80" fillOpacity="0.35">
                    <animate attributeName="cy" values={`${300 + (i*17)%130};${230};${300 + (i*17)%130}`} dur={`${3 + i*0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.05;0.4" dur={`${3 + i*0.4}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {/* dimension lines */}
                <line x1="160" y1="540" x2="640" y2="540" stroke="#C6A87C" strokeOpacity="0.3" />
                <line x1="160" y1="535" x2="160" y2="545" stroke="#C6A87C" strokeOpacity="0.3" />
                <line x1="640" y1="535" x2="640" y2="545" stroke="#C6A87C" strokeOpacity="0.3" />
                <text x="400" y="555" textAnchor="middle" className="font-mono" fontSize="10" fill="#C6A87C" fillOpacity="0.6">⌀ 24.0 m</text>
                {/* callouts */}
                {parts.map((p, i) => {
                  const cx = (p.x / 100) * 800;
                  const cy = (p.y / 100) * 600;
                  const isActive = active === i;
                  return (
                    <g key={i} onMouseEnter={() => setActive(i)} className="cursor-pointer interactive-element">
                      <circle cx={cx} cy={cy} r={isActive ? 14 : 10} fill={isActive ? '#C6A87C' : '#0a0c0b'} stroke="#C6A87C" strokeWidth="1.5" />
                      <text x={cx} y={cy + 4} textAnchor="middle" className="font-mono" fontSize="9" fontWeight="700" fill={isActive ? '#050505' : '#C6A87C'}>{p.id}</text>
                    </g>
                  );
                })}
              </svg>
              <div className="absolute -top-4 -left-4 reg-mark" />
              <div className="absolute -top-4 -right-4 reg-mark" />
              <div className="absolute -bottom-4 -left-4 reg-mark" />
              <div className="absolute -bottom-4 -right-4 reg-mark" />
            </div>
          </FadeIn>

          {/* callout list */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {parts.map((p, i) => (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-testid={`anatomy-callout-${p.id}`}
                className={`text-left p-6 transition-all duration-500 rounded-2xl border ${active === i ? 'bg-[#C6A87C]/10 border-[#C6A87C]/40' : 'bg-[#050606]/40 border-[#C6A87C]/5 opacity-50 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className={`font-mono text-[10px] tracking-[0.3em] ${active === i ? 'text-[#C6A87C]' : 'text-[#C6A87C]/40'}`}>{p.id}</span>
                  <span className={`font-serif text-xl ${active === i ? 'text-[#EAE6DF]' : 'text-[#EAE6DF]/60'}`}>{p.name}</span>
                </div>
                {active === i && (
                  <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed pl-12">{p.desc}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Molecular process — 4-stage fermentation breakdown with animated SVG molecules
const MolecularProcess = () => {
  const stages = [
    { phase: 'I', name: 'Hydroliza', formula: 'C₆H₁₀O₅ → C₆H₁₂O₆', time: '0–24h', desc: 'Enzymy zewnątrzkomórkowe rozkładają wielocukry, białka i tłuszcze do prostych monomerów rozpuszczalnych w wodzie.' },
    { phase: 'II', name: 'Acydogeneza', formula: 'C₆H₁₂O₆ → CH₃COOH + H₂', time: '24–72h', desc: 'Bakterie fermentacyjne przekształcają monomery w krótkołańcuchowe kwasy tłuszczowe, wodór i dwutlenek węgla.' },
    { phase: 'III', name: 'Acetogeneza', formula: 'CH₃CH₂COOH → CH₃COOH + H₂', time: '3–7 dni', desc: 'Bakterie acetogenne utleniają wyższe kwasy tłuszczowe do octanu — substratu właściwego dla metanogenów.' },
    { phase: 'IV', name: 'Metanogeneza', formula: 'CH₃COOH → CH₄ + CO₂', time: '14–28 dni', desc: 'Archeony metanogenne syntezują metan z octanu i wodoru. Sercem ekonomii biogazowni jest właśnie ta faza.' },
  ];
  return (
    <section className="relative py-48 bg-[#020202] overflow-hidden" data-testid="molecular-process">
      <div className="absolute inset-0 molecule-grid opacity-[0.05]" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-32 max-w-4xl mx-auto">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 flex items-center justify-center gap-4">
              <Atom className="w-3.5 h-3.5" strokeWidth={1} /> Biochemia procesu
            </div>
            <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.88] font-light mb-10">
              Cztery <span className="italic text-[#C6A87C] font-normal">fazy</span><br/>
              jednej cząsteczki.
            </h2>
            <p className="font-serif italic text-2xl text-[#EAE6DF]/50 leading-relaxed">
              Od kiszonki do metanu w 28 dni. Każda faza fermentacji ma własną mikroflorę, własne pH, własne tempo. Sztuka inżynierii biologicznej polega na tym, by te cztery światy współistniały w jednej komorze.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-4 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10">
          {stages.map((s, i) => (
            <FadeIn key={i} delay={i * 150} className="bg-[#020202] p-10 relative group hover:bg-[#050606] transition-all duration-700">
              <div className="absolute top-6 right-6 font-serif text-7xl text-[#C6A87C]/10 italic font-light group-hover:text-[#C6A87C]/20 transition-all">{s.phase}</div>
              {/* molecule */}
              <svg viewBox="0 0 100 60" className="w-24 h-16 mb-8">
                <circle cx="20" cy="30" r="6" fill="#C6A87C" fillOpacity="0.6" />
                <circle cx="50" cy="30" r="8" fill="#4ADE80" fillOpacity="0.7" />
                <circle cx="80" cy="30" r="6" fill="#C6A87C" fillOpacity="0.6" />
                <line x1="26" y1="30" x2="42" y2="30" stroke="#C6A87C" strokeOpacity="0.5" strokeWidth="1" />
                <line x1="58" y1="30" x2="74" y2="30" stroke="#C6A87C" strokeOpacity="0.5" strokeWidth="1" />
                <circle cx="50" cy="10" r="3" fill="#EAE6DF" fillOpacity="0.5" />
                <line x1="50" y1="22" x2="50" y2="13" stroke="#C6A87C" strokeOpacity="0.4" strokeWidth="0.8" />
              </svg>
              <div className="font-mono text-[9px] text-[#C6A87C] tracking-[0.4em] uppercase mb-3">Faza {s.phase} // {s.time}</div>
              <h3 className="font-serif text-4xl text-[#EAE6DF] font-light mb-4">{s.name}</h3>
              <div className="font-mono text-xs text-[#4ADE80]/80 mb-6 tracking-wider">{s.formula}</div>
              <p className="font-serif italic text-[#EAE6DF]/40 text-base leading-relaxed">{s.desc}</p>
              <div className="mt-10 h-px w-12 bg-[#C6A87C]/30 group-hover:w-full transition-all duration-1000" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Editorial quote — full-bleed manifesto cut
const EditorialQuote = () => {
  return (
    <section className="relative py-56 bg-[#050505] overflow-hidden" data-testid="editorial-quote">
      <div className="absolute inset-0 halftone opacity-[0.08]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A87C]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A87C]/40 to-transparent" />
      <div className="max-w-[80rem] mx-auto px-8 relative z-10">
        <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-16 flex items-center gap-4">
          <span className="w-6 h-px bg-[#C6A87C]" /> Editorial — N° 04 / 26
        </div>
        <blockquote className="font-serif text-5xl md:text-[6.5rem] text-[#EAE6DF] leading-[1.05] font-light tracking-tight">
          <span className="text-[#C6A87C] italic">„</span>
          Czas, w którym energia <br/>
          była przywilejem <span className="italic text-[#C6A87C]">miast</span>,<br/>
          dobiega końca. Nadchodzi <br/>
          epoka, w której każde <br/>
          gospodarstwo staje się <br/>
          <span className="italic text-[#C6A87C]">elektrownią.</span>
          <span className="text-[#C6A87C] italic">"</span>
        </blockquote>
        <div className="mt-20 flex items-end justify-between border-t border-[#C6A87C]/20 pt-8">
          <div>
            <div className="font-mono text-[10px] text-[#C6A87C] tracking-[0.4em] uppercase">— Green Plant Tech.</div>
            <div className="font-serif italic text-[#EAE6DF]/40 text-lg mt-2">Manifest Energii Rolniczej, 2026</div>
          </div>
          <div className="font-mono text-[9px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase hidden md:block">
            Set in Cormorant Garamond
          </div>
        </div>
      </div>
    </section>
  );
};

// Poland map with installations
const PolandMap = () => {
  const sites = [
    { x: 38, y: 28, name: 'Stargard', mw: '1.2', sub: 'Gnojowica + kiszonka' },
    { x: 60, y: 25, name: 'Olsztyn', mw: '0.8', sub: 'Odpady mleczarskie' },
    { x: 50, y: 48, name: 'Łódź', mw: '2.0', sub: 'Odpady poubojowe' },
    { x: 32, y: 52, name: 'Poznań', mw: '1.5', sub: 'Buraki + kukurydza' },
    { x: 72, y: 56, name: 'Lublin', mw: '0.99', sub: 'Gnojowica bydlęca' },
    { x: 48, y: 75, name: 'Kraków', mw: '1.1', sub: 'Odpady komunalne' },
    { x: 28, y: 78, name: 'Wrocław', mw: '1.8', sub: 'Wywar gorzelniany' },
    { x: 64, y: 38, name: 'Warszawa HQ', mw: 'HQ', sub: 'Centrala operacyjna', hq: true },
  ];
  const [active, setActive] = useState(7);
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="poland-map">
      <div className="absolute inset-0 technical-grid opacity-5" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 items-end gap-12 mb-24 border-b border-[#C6A87C]/10 pb-12">
            <div className="lg:col-span-8">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Radar className="w-3.5 h-3.5" strokeWidth={1} /> Terytorium operacyjne
              </div>
              <h2 className="text-6xl md:text-[8.5rem] font-serif text-[#EAE6DF] leading-[0.85] font-light">
                Polska, <br/><span className="italic text-[#C6A87C] font-normal">w ruchu.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              17 instalacji operacyjnych. 9 w fazie projektowej. Od Bałtyku po Karpaty — sieć inżynierów, technologów i serwisów dyżurnych.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <FadeIn className="lg:col-span-8 relative">
            <div className="aspect-[4/4.5] relative glass-morphism rounded-[2rem] p-10 overflow-hidden">
              <div className="absolute top-6 left-8 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">MAP // POLAND // 1:2,500,000</div>
              <div className="absolute top-6 right-8 font-mono text-[9px] text-[#4ADE80] tracking-[0.3em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" /> 17 LIVE
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Stylized Poland outline */}
                <path d="M 20 25 Q 30 18, 45 20 L 58 18 Q 68 19, 72 22 L 78 28 L 82 38 L 80 48 L 84 55 L 82 65 L 78 75 L 70 82 L 62 84 L 55 82 L 48 84 L 38 85 L 30 82 L 22 76 L 18 68 L 16 58 L 14 48 L 16 38 Q 17 30, 20 25 Z"
                  fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.4" />
                <path d="M 20 25 Q 30 18, 45 20 L 58 18 Q 68 19, 72 22 L 78 28 L 82 38 L 80 48 L 84 55 L 82 65 L 78 75 L 70 82 L 62 84 L 55 82 L 48 84 L 38 85 L 30 82 L 22 76 L 18 68 L 16 58 L 14 48 L 16 38 Q 17 30, 20 25 Z"
                  fill="url(#mapGrad)" />
                <defs>
                  <radialGradient id="mapGrad" cx="0.5" cy="0.5" r="0.6">
                    <stop offset="0" stopColor="#C6A87C" stopOpacity="0.1" />
                    <stop offset="1" stopColor="#C6A87C" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* connecting lines from HQ */}
                {sites.filter(s => !s.hq).map((s, i) => (
                  <line key={i} x1={sites[7].x} y1={sites[7].y} x2={s.x} y2={s.y}
                    stroke="#C6A87C" strokeOpacity={active === i ? 0.6 : 0.12} strokeWidth="0.2" strokeDasharray="0.5 0.8" />
                ))}
                {/* sites */}
                {sites.map((s, i) => (
                  <g key={i} onMouseEnter={() => setActive(i)} className="cursor-pointer">
                    {s.hq ? (
                      <>
                        <circle cx={s.x} cy={s.y} r="1.8" fill="#C6A87C" />
                        <circle cx={s.x} cy={s.y} r="3" fill="none" stroke="#C6A87C" strokeOpacity="0.6">
                          <animate attributeName="r" values="2;5;2" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                        </circle>
                      </>
                    ) : (
                      <>
                        <circle cx={s.x} cy={s.y} r={active === i ? 1.4 : 1} fill="#4ADE80" fillOpacity={active === i ? 1 : 0.7} />
                        <circle cx={s.x} cy={s.y} r="2.5" fill="none" stroke="#4ADE80" strokeOpacity="0.4">
                          <animate attributeName="r" values="1.5;3;1.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                  </g>
                ))}
                {/* label on active */}
                {sites[active] && (
                  <g>
                    <line x1={sites[active].x} y1={sites[active].y} x2={sites[active].x + 8} y2={sites[active].y - 4} stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.2" />
                    <text x={sites[active].x + 8.5} y={sites[active].y - 3.5} fontSize="2" fill="#EAE6DF" className="font-serif italic">{sites[active].name}</text>
                  </g>
                )}
              </svg>
              <div className="absolute -top-4 -left-4 reg-mark" />
              <div className="absolute -top-4 -right-4 reg-mark" />
              <div className="absolute -bottom-4 -left-4 reg-mark" />
              <div className="absolute -bottom-4 -right-4 reg-mark" />
            </div>
          </FadeIn>

          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-6">Index lokalizacji</div>
            {sites.map((s, i) => (
              <button key={i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-testid={`map-site-${i}`}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 ${active === i ? 'bg-[#C6A87C]/10 border-[#C6A87C]/40 translate-x-2' : 'bg-transparent border-[#C6A87C]/5 opacity-50 hover:opacity-100'}`}>
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-xl text-[#EAE6DF]">{s.name}</span>
                  <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${s.hq ? 'text-[#C6A87C]' : 'text-[#4ADE80]'}`}>{s.hq ? 'HQ' : s.mw + ' MW'}</span>
                </div>
                <div className="font-serif italic text-xs text-[#EAE6DF]/40 mt-1">{s.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Manifesto — paper letter closing
const Manifesto = () => {
  return (
    <section className="relative py-48 bg-[#020202] overflow-hidden" data-testid="manifesto">
      <div className="absolute inset-0 bg-stripes opacity-20" />
      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="relative bg-[#EAE6DF] text-[#0a0c0b] p-16 md:p-24 paper-grain shadow-[0_60px_120px_-30px_rgba(198,168,124,0.25)]">
            <div className="absolute top-8 right-8 font-mono text-[9px] text-[#0a0c0b]/40 tracking-[0.3em] uppercase">DOK. 26.05 / SIGNED</div>
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#0a0c0b]/50 mb-12 flex items-center gap-4">
              <Hexagon className="w-3 h-3" strokeWidth={1} /> Manifest Inżynierski
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] font-light mb-12">
              Wierzymy, że <span className="italic">biogazownia</span> to nie infrastruktura energetyczna. To <span className="italic">akt powrotu</span> do równowagi.
            </h2>
            <div className="space-y-6 font-serif text-xl leading-relaxed text-[#0a0c0b]/80 max-w-3xl">
              <p>
                Rolnictwo, które kiedyś żywiło naród, dziś jest oskarżane o emisję metanu, smród gnojowicy, wyjałowienie gleby. Niesłusznie. Wystarczy zamknąć obieg.
              </p>
              <p>
                <span className="font-serif italic text-[#C6A87C]">Każda</span> tona obornika to nie problem — to 60 m³ metanu, 0.13 MWh prądu, 22 kg potasu i fosforu wracającego do gleby zamiast jezior. Wystarczy mieć narzędzia.
              </p>
              <p>
                Naszą rolą jest dostarczyć te narzędzia w jakości, którą znajdziesz w niemieckim BMW, a nie w polskim warsztacie. Stal nierdzewna. Beton P10. Silniki Tier-1. Sterowniki ABB. Bez kompromisów.
              </p>
              <p className="italic text-[#0a0c0b]/60">
                Bo energia rolnicza nie zasługuje na mniej.
              </p>
            </div>
            <div className="mt-16 pt-8 border-t border-[#0a0c0b]/15 flex items-end justify-between">
              <div>
                <svg viewBox="0 0 200 60" className="w-48 h-14 mb-2">
                  <path d="M 10 40 Q 30 10, 50 30 Q 70 50, 90 25 Q 110 5, 130 35 Q 150 50, 175 20" fill="none" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0a0c0b]/60">Zarząd Green Plant Tech.</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0a0c0b]/40 mb-2">Warszawa</div>
                <div className="font-serif italic text-lg">10. maja 2026</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-[#C6A87C]/40 flex items-center justify-center bg-[#EAE6DF] wax-seal">
              <div className="absolute inset-2 rounded-full border border-[#C6A87C]/30" />
              <div className="text-center">
                <div className="font-serif italic text-[#C6A87C] text-xs">Sigillum</div>
                <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.2em] mt-1">GP · 2026</div>
                <div className="font-serif italic text-[#C6A87C] text-xs mt-1">Veritas</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <>
      <GlobalStyles />
      <BootSequence />
      <div className="min-h-screen relative font-serif selection:bg-[#C8A97D] selection:text-[#050505]">
        <ScrollProgressBar />
        <CustomCursor />
        <AmbientOrbs />
        <FilmGrain />
        <Navbar />
        <Hero />
        <TickerTape />
        <Approach />
        <BlueprintProcess />
        <ReactorAnatomy />
        <ContractModels />
        <FeedstockMatrix />
        <MolecularProcess />
        <EconomicsSection />
        <SmartGrid />
        <KineticBreak />
        <EditorialQuote />
        <CircularImpact />
        <EnvironmentalImpact />
        <PolandMap />
        <ProjectsGallery />
        <EditorialBento />
        <TechStack />
        <ScadaSystem />
        <Leadership />
        <OperationsMaintenance />
        <SafetyStandards />
        <TechnicalFAQ />
        <Manifesto />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
