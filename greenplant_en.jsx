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
    .kinetic-word { display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: 0.1em; margin-bottom: -0.1em; }

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
    { d: 100, txt: '> POWER ........................... OK' },
    { d: 280, txt: '> SCADA COMMUNICATION ................... OK' },
    { d: 460, txt: '> PRESSURE SENSORS [12/12] .......... OK' },
    { d: 640, txt: '> CH4 ANALYZER ...................... 62.4 %' },
    { d: 820, txt: '> REACTOR TEMPERATURE ................ 38.4 °C' },
    { d: 1000, txt: '> TIER-1 CHP ENGINE ................... READY' },
    { d: 1180, txt: '> AUTHORIZATION: GP-2026-X .............. GRANTED' },
    { d: 1360, txt: '> FEED DOSING QUEUE ............. 21 t' },
  ];
  return (
    <div className="boot-overlay fixed inset-0 z-[1000] bg-[#020202] flex items-center justify-center" data-testid="boot-overlay">
      <div className="paper-grain absolute inset-0 opacity-30 pointer-events-none" />
      <div className="absolute inset-0 technical-grid opacity-10" />
      <div className="relative w-full max-w-3xl px-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_12px_#4ADE80]" />
          <span className="font-mono text-[10px] text-[#4ADE80] tracking-[0.4em] uppercase">Green Plant Technologies // Control Center</span>
          <div className="flex-1 h-px bg-[#C6A87C]/20" />
          <span className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em]">VER 4.0.26</span>
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
          <span className="text-[#EAE6DF]/40 text-sm italic">Initiating deployment sequence</span>
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
        <span className="font-mono text-[7px] text-[#4ADE80] tracking-[0.3em] uppercase">System Active</span>
      </div>
      <div className="hidden sm:flex items-center gap-4 border-l border-[#C6A87C]/10 pl-6">
        <span className="font-mono text-[7px] text-[#EAE6DF]/30 tracking-[0.2em] uppercase">Grid Sync: 50.02 Hz</span>
        <span className="font-mono text-[7px] text-[#EAE6DF]/30 tracking-[0.2em] uppercase">Load: 0.48 MW</span>
      </div>
    </div>
    <div className="font-mono text-[7px] text-[#C6A87C]/40 tracking-[0.3em] uppercase hidden md:block">
      LAT: 52.2297 // LON: 21.0122 // TIME: 14:23:05
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
          <div className="hidden lg:flex items-center gap-8 text-[9px] font-mono tracking-[0.25em] text-[#F2EDE4]/40 uppercase">
            {[
              { label: 'Approach', id: 'podejscie' },
              { label: 'Technology', id: 'technologia' },
              { label: 'Process', id: 'proces' },
              { label: 'Economics', id: 'ekonomia' },
              { label: 'Standards', id: 'standardy' }
            ].map(link => (
              <a key={link.label} href={`#${link.id}`} className="hover:text-[#C8A97D] transition-colors duration-500 relative py-2 group interactive-element whitespace-nowrap">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A97D] group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-[#F2EDE4]/60">
              <a href="/" className="hover:text-[#F2EDE4] transition-colors interactive-element">PL</a>
              <span className="text-[#C8A97D]/30">/</span>
              <a href="/en" className="text-[#C8A97D] hover:text-[#F2EDE4] transition-colors interactive-element">EN</a>
            </div>
            <a href="tel:+48601944451" className="hidden md:flex font-mono text-[12px] text-[#C8A97D] tracking-[0.2em] hover:text-[#F2EDE4] transition-colors items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
              +48 601 944 451
            </a>
            <a href="#kontakt" className="bg-[#C8A97D] text-[#050505] px-8 py-3 text-[10px] font-mono tracking-[0.25em] uppercase hover:bg-[#F2EDE4] border border-[#C8A97D] hover:border-[#F2EDE4] transition-all duration-500 flex items-center gap-3 interactive-element rounded-full font-medium">
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050505]" data-testid="hero">
      <div className="absolute inset-0 hero-mesh z-0" />
      <div className="absolute inset-0 bg-blueprint opacity-5 pointer-events-none z-[1]" />

      {/* MASSIVE reactor cross-section watermark behind everything */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-end opacity-[0.18]">
        <svg viewBox="0 0 800 800" className="h-[140%] w-auto" style={{ maxWidth: '70%' }}>
          <defs>
            <linearGradient id="heroRGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#C8A97D" stopOpacity="0" />
              <stop offset="0.5" stopColor="#C8A97D" stopOpacity="0.5" />
              <stop offset="1" stopColor="#C8A97D" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* outermost circle */}
          <circle cx="400" cy="400" r="380" fill="none" stroke="url(#heroRGrad)" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="400" cy="400" r="320" fill="none" stroke="#C8A97D" strokeOpacity="0.4" strokeWidth="0.6" />
          {/* reactor body (vertical) */}
          <line x1="220" y1="180" x2="220" y2="620" stroke="#C8A97D" strokeOpacity="0.7" />
          <line x1="580" y1="180" x2="580" y2="620" stroke="#C8A97D" strokeOpacity="0.7" />
          {/* top Homee */}
          <path d="M 220 180 Q 400 60 580 180" fill="none" stroke="#C8A97D" strokeOpacity="0.7" />
          <path d="M 240 170 Q 400 80 560 170" fill="none" stroke="#C8A97D" strokeOpacity="0.4" strokeDasharray="2 3" />
          <path d="M 260 160 Q 400 100 540 160" fill="none" stroke="#C8A97D" strokeOpacity="0.25" strokeDasharray="1 4" />
          {/* bottom ellipse */}
          <ellipse cx="400" cy="620" rx="180" ry="30" fill="none" stroke="#C8A97D" strokeOpacity="0.6" />
          <ellipse cx="400" cy="180" rx="180" ry="22" fill="none" stroke="#C8A97D" strokeOpacity="0.4" strokeDasharray="2 3" />
          {/* mixer shaft */}
          <line x1="400" y1="100" x2="400" y2="600" stroke="#C8A97D" strokeOpacity="0.55" strokeWidth="1.5" />
          <rect x="384" y="80" width="32" height="24" fill="none" stroke="#C8A97D" strokeOpacity="0.7" />
          <path d="M 350 580 L 450 580 M 350 580 L 376 560 M 450 580 L 424 560" stroke="#C8A97D" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
          {/* gas pipe top */}
          <line x1="580" y1="120" x2="700" y2="120" stroke="#C8A97D" strokeOpacity="0.6" />
          <line x1="700" y1="120" x2="700" y2="40" stroke="#C8A97D" strokeOpacity="0.6" />
          <path d="M 692 40 Q 700 10 708 40" fill="#D97847" fillOpacity="0.5" stroke="#D97847" strokeOpacity="0.7" />
          {/* inlet */}
          <line x1="100" y1="520" x2="220" y2="520" stroke="#C8A97D" strokeOpacity="0.6" />
          <polygon points="100,514 90,520 100,526" fill="#C8A97D" fillOpacity="0.6" />
          {/* outlet */}
          <line x1="580" y1="520" x2="700" y2="520" stroke="#C8A97D" strokeOpacity="0.6" />
          <polygon points="700,514 710,520 700,526" fill="#C8A97D" fillOpacity="0.6" />
          {/* gas bubbles inside */}
          {[...Array(20)].map((_, i) => (
            <circle key={i} cx={260 + (i * 19) % 280} cy={400 + (i * 23) % 180} r={2 + (i % 3)}
              fill="#4ADE80" fillOpacity="0.4">
              <animate attributeName="cy" values={`${400 + (i*23)%180};220;${400 + (i*23)%180}`} dur={`${3.5 + i*0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.05;0.5" dur={`${3.5 + i*0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* dimension lines */}
          <line x1="220" y1="700" x2="580" y2="700" stroke="#C8A97D" strokeOpacity="0.35" />
          <line x1="220" y1="694" x2="220" y2="706" stroke="#C8A97D" strokeOpacity="0.35" />
          <line x1="580" y1="694" x2="580" y2="706" stroke="#C8A97D" strokeOpacity="0.35" />
          <text x="400" y="720" textAnchor="middle" className="font-mono" fontSize="11" fill="#C8A97D" fillOpacity="0.5">⌀ 24 m</text>
          {/* tick marks around outer circle */}
          {[...Array(48)].map((_, k) => {
            const a = (k / 48) * Math.PI * 2;
            const r1 = 320;
            const r2 = k % 4 === 0 ? 332 : 325;
            return <line key={k}
              x1={400 + Math.cos(a) * r1} y1={400 + Math.sin(a) * r1}
              x2={400 + Math.cos(a) * r2} y2={400 + Math.sin(a) * r2}
              stroke="#C8A97D" strokeOpacity={k % 4 === 0 ? 0.5 : 0.2} strokeWidth="0.6" />;
          })}
          {/* labels */}
          <text x="120" y="170" className="font-mono" fontSize="9" fill="#C8A97D" fillOpacity="0.4">DWG-014 / SECT. A-A</text>
          <text x="640" y="780" className="font-mono" fontSize="9" fill="#C8A97D" fillOpacity="0.4">SCALE 1:200 / GP 2026</text>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[2]" />

      <div className="max-w-[100rem] mx-auto px-6 md:px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-center w-full">
        <div className="lg:col-span-7 relative hero-stagger">
          <div>
            <div className="inline-flex items-center gap-3 mb-10 glass-morphism px-5 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#34D399] animate-pulse rounded-full shadow-[0_0_10px_#34D399]" />
              <span className="text-[#C8A97D] text-[9px] font-mono tracking-[0.4em] uppercase">New Standard of Agricultural Energy</span>
            </div>
          </div>

          <div>
            <h1 className="text-[4.5rem] md:text-[8rem] lg:text-[11rem] font-serif text-[#F2EDE4] leading-[0.88] pb-4 tracking-tighter mb-12 font-light">
              <KineticHeading delay={200} stagger={45}>Stability</KineticHeading>
              <br />
              <span className="italic text-[#C8A97D] font-Standardl pl-4 md:pl-16 inline-block">
                <KineticHeading delay={650} stagger={55}>industrial.</KineticHeading>
              </span>
            </h1>
          </div>

          <div>
            <div className="draw-line h-[1px] w-48 bg-gradient-to-r from-[#C8A97D] to-transparent mb-12" />
          </div>

          <div>
            <p className="text-xl md:text-2xl text-[#F2EDE4]/70 leading-relaxed max-w-xl font-serif font-light italic mb-16">
              Preparation of biogas plant projects 0.5 MW. We build energy assets that transform waste into predictable capital and operational independence.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-10">
              <MagneticButton>
                <a href="#kontakt" className="group relative px-10 py-5 bg-[#C8A97D] text-[#050505] text-[10px] font-mono tracking-[0.4em] uppercase hover:bg-[#F2EDE4] transition-all duration-500 rounded-full flex items-center gap-5 interactive-element shadow-[0_0_50px_rgba(200,169,125,0.25)] font-medium">
                  Initiate Investment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </a>
              </MagneticButton>
              <div className="flex items-center gap-5 text-[#F2EDE4]/30">
                <div className="w-12 h-[1px] bg-[#C8A97D]/40" />
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Tier-1 Expertise</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-10 md:gap-16 mt-20 pt-10 border-t border-[#C8A97D]/10">
              {[
                { label: "CHP Efficiency", value: "44.2", suffix: "%" },
                { label: "Electrical Power", value: "499", suffix: " kW" },
                { label: "Daily Input", value: "42", suffix: " t" }
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
            <span className="font-mono text-[9px] text-[#34D399] tracking-[0.4em] uppercase">Aktywne // GP-2026-X</span>
          </div>
          <div className="text-right">
            <div className="font-mono text-[8px] text-[#C8A97D]/60 tracking-[0.3em] mb-1">REF. MODELU</div>
            <div className="font-mono text-[10px] text-[#F2EDE4]/80">Reactor-A1</div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {[
            { l: 'CH4 Purity', v: ch4, u: '%', g: parseFloat(ch4) > 62 },
            { l: 'Temp. Reactora', v: temp, u: '°C', g: true },
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
  const dataItems = ['Methane Purity: 62.4%', 'Grid Load: 0.49MW', 'Service Interval: 8 000h', 'CO2 Savings: 2.1t/d', 'Reactor Temp: 38.4°C', 'pH: 7.62', 'H₂S: <50ppm', 'VFA: 1.8g/L'];
  const editorialItems = ['Profit engineering', 'Matter into energy', 'Closed loop', 'Zero waste'];
  const refItems = ['DWG-014/REV.C', 'PROC-ADM-01', 'CYB-SEC-PRO', 'TECH-HYD-V4', 'LOG-BIO-S7', 'Directive 2014/34/UE'];
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
            § I — Engineering Philosophy // GP / 26
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-7 relative">
            <FadeIn direction="right">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1 flex items-center gap-4">
                <span>Engineering Philosophy</span>
                <span className="text-[#C6A87C]/30">/</span>
                <span className="text-[#C6A87C]/40">§ I</span>
              </div>
              <h2 className="text-7xl md:text-[10rem] font-serif text-[#EAE6DF] leading-[0.92] pb-6 mb-12 font-light tracking-tight">
                <KineticHeading delay={100} stagger={40}>Materia w</KineticHeading><br/>
                <span className="italic text-[#C6A87C] font-Standardl"><KineticHeading delay={500} stagger={50}>energy.</KineticHeading></span>
              </h2>

              {/* Editorial drop-cap body */}
              <div className="max-w-2xl">
                <p className="text-[#EAE6DF]/70 font-serif text-2xl leading-[1.55] mb-8 font-light">
                  <span className="float-left font-serif text-7xl md:text-[8rem] leading-[0.92] pb-2 text-[#C6A87C] italic mr-5 mt-2 font-Standardl">B</span>
                  A biogas plant is not just a collection of concrete tanks. It is a precisely tuned ecosystem where <span className="italic text-[#C6A87C]">biologia</span> meets heavy mechanical engineering — methanogenic bacteria, PLC controllers, acid-resistant steel, and double EPDM membranes work together in one closed system.
                </p>
                <p className="text-[#EAE6DF]/40 font-serif italic text-xl leading-relaxed mb-14 font-light">
                  Our role is to design this harmony — with millimeter precision in tank geometry and 0.3 °C precision in fermentation process stability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl pt-12 border-t border-[#C6A87C]/15">
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light"><AnimatedCounter value="25" /><span className="text-xl text-[#C6A87C]/40 italic ml-2">lat+</span></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Projected <br/>structure lifespan</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light"><AnimatedCounter value="98" suffix="%" /></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Availability <br/>of CHP units</div>
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
                    {/* Homee */}
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
                    We reject half-measures. Every m³ of concrete is verified for gas tightness, and every weld in the CHP system undergoes non-destructive testing."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C6A87C]/20 border border-[#C6A87C]/40 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#C6A87C]" />
                    </div>
                    <span className="font-mono text-[9px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase">TÜV Quality Certification</span>
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

const BlueprintProcesss = () => {
  const steps = [
    { num: "01", title: "Substrate Analysis", desc: "We test the methane potential of your biomass in the lab. Based on this, we calibrate the reactor capacity.", color: "#34D399" },
    { num: "02", title: "Process Engineering", desc: "We design the hydraulic layout, mixing, and heat exchange systems. We optimize feedstock flow.", color: "#60A5FA" },
    { num: "03", title: "Investor Supervision", desc: "We supervise the pouring of gas-tight reinforced concrete chambers and the installation of Tier-1 CHP units.", color: "#FBBF24" }
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 pb-12 border-b border-[#C6A87C]/10">
            <div>
              <h2 className="text-[9px] font-mono tracking-[0.5em] text-[#C6A87C] uppercase mb-6">Implementation Protocol</h2>
              <p className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-tight">Implementation <br/><span className="italic font-light text-[#C6A87C]">Sequence.</span></p>
            </div>
            <div className="text-[10px] font-mono text-[#EAE6DF]/20 tracking-[0.4em] uppercase mt-8 md:mt-0">
              Standards Techniczne v2.0
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-1px bg-[#C6A87C]/10">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 200} className="relative bg-[#050606] p-16 group hover:bg-[#090b0a] transition-all duration-700 interactive-element">
              <div className="absolute top-0 left-0 w-full h-[2px] transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100" style={{ backgroundColor: step.color }}></div>
              
              <div className="font-serif text-8xl absolute right-12 top-12 italic opacity-5 transition-all duration-700 group-hover:opacity-10" style={{ color: step.color }}>
                {step.num}
              </div>
              
              <div className="w-14 h-14 border border-[#C6A87C]/20 rounded-xl flex items-center justify-center mb-12 bg-[#020202] group-hover:border-opacity-50 transition-colors" style={{ borderColor: i === 0 ? '#34D39933' : i === 1 ? '#60A5FA33' : '#FBBF2433' }}>
                <ChevronRight className="w-6 h-6" strokeWidth={1} style={{ color: step.color }} />
              </div>
              
              <h3 className="font-mono text-xs tracking-[0.4em] uppercase mb-8" style={{ color: step.color }}>{step.title}</h3>
              <p className="font-serif font-light text-[#EAE6DF]/50 leading-relaxed text-xl italic">{step.desc}</p>
              
              <div className="mt-12 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }}></span>
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: step.color }}>Faza Aktywna</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


const FeedstockMatrix = () => {
  const [hoveredRow, setHoveredRow] = useState(0);

  const substrates = [
    { id: "MTRL-01", name: "Cattle Slurry", category: "Agricultural Waste", yield: "25", ch4: "58", temp: "38°C" },
    { id: "MTRL-02", name: "Pig Manure", category: "Agricultural Waste", yield: "60", ch4: "62", temp: "42°C" },
    { id: "MTRL-03", name: "Kiszonka Kukurydzy", category: "Uprawa Celowa", yield: "210", ch4: "54", temp: "40°C" },
    { id: "MTRL-04", name: "Beet Pulp", category: "Industrial Waste", yield: "125", ch4: "52", temp: "39°C" },
    { id: "MTRL-05", name: "slaughterhouse waste", category: "Industrial Waste", yield: "320", ch4: "68", temp: "45°C" }
  ];

  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-32 border-b border-[#C6A87C]/10 pb-16">
            <div className="max-w-2xl">
              <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-pulse"></span>
                Laboratorium Surowcowe
              </h2>
              <h3 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">
                Substrate <br/><span className="italic text-[#C6A87C] font-Standardl">Matrix.</span>
              </h3>
            </div>
            <p className="text-[#EAE6DF]/40 font-serif italic text-2xl font-light max-w-sm leading-relaxed text-right">
              Precise reactor calibration tailored to the physicochemical characteristics of the feedstock.
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
                
                <h5 className="font-mono text-[9px] text-[#C6A87C] tracking-[0.4em] uppercase mb-12 border-b border-[#C6A87C]/20 pb-4">Analysis Detaliczna: {substrates[hoveredRow].id}</h5>
                
                <div className="space-y-12">
                   <div>
                      <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-4">Material Category</div>
                      <div className="font-serif text-3xl text-[#EAE6DF] italic">{substrates[hoveredRow].category}</div>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                      <div>
                         <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-4">CH4 Content</div>
                         <div className="font-serif text-5xl text-[#C6A87C] font-light">{substrates[hoveredRow].ch4}<span className="text-xl">%</span></div>
                      </div>
                      <div>
                         <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-4">Temp. Processu</div>
                         <div className="font-serif text-5xl text-[#C6A87C] font-light">{substrates[hoveredRow].temp}</div>
                      </div>
                   </div>

                   <div className="pt-8">
                      <div className="flex justify-between items-center mb-4">
                         <span className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.2em]">Energy Potential</span>
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
              Analysis <br/>
              <span className="italic text-[#C6A87C] font-Standardl">profitability.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-2xl leading-relaxed mb-16 font-serif italic max-w-xl">
              We model the return on capital based on real RES auctions and self-consumption optimization. A biogas plant is a stable baseload energy asset operating 8,000 hours a year.
            </p>
            
            <div className="space-y-10">
              {[
                { title: "Electrical Revenue", desc: "Aukcje OZE lub PPA. Stabilna cena zakontraktowana na 15 lat.", val: "70%" },
                { title: "Thermal Energy", desc: "Heat recovery from engine cooling systems and exhaust gases. Zero heating costs.", val: "20%" },
                { title: "Fertilizer Substitution", desc: "Digestate serves as a free alternative to urea and phosphates.", val: "10%" }
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-[#020202]/50 p-8 border border-[#C6A87C]/10 rounded-2xl">
                   <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.3em] mb-4">Okres Zwrotu</div>
                   <div className="font-serif text-5xl text-[#C6A87C] font-light"><AnimatedCounter value="5.2" /><span className="text-xl text-[#C6A87C]/40 italic ml-2">lat</span></div>
                </div>
                <div className="bg-[#020202]/50 p-8 border border-[#C6A87C]/10 rounded-2xl">
                   <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.3em] mb-4">Internal Rate of Return (IRR)</div>
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
            <h3 className="text-6xl md:text-9xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">
              System <br/><span className="italic text-[#C6A87C] font-Standardl">Node.</span>
            </h3>
          </div>
        </FadeIn>

        <div className="relative max-w-6xl mx-auto">
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A87C]/30 to-transparent -translate-y-1/2 hidden md:block"></div>
           
           <div className="grid md:grid-cols-3 gap-12 relative z-10">
             {[
               { icon: <Zap className="w-8 h-8" />, title: "Smart Grid", desc: "Automated sale of surplus energy based on Peak Shaving algorithms and spot energy prices.", val: "499 kW" },
               { icon: <Factory className="w-8 h-8" />, title: "District Heating", desc: "Operational cost reduction by powering local infrastructure with free thermal energy.", val: "510 kWt" },
               { icon: <Leaf className="w-8 h-8" />, title: "Fertilizer Circulation", desc: "Closing the elemental loop through the distribution of stabilized, odorless digestate.", val: "30 t/d" }
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
          STABLE REVENUE SOURCE • WASTE TO ENERGY • 
        </h2>
        <h2 className="text-[clamp(2.8rem,9vw,9rem)] font-serif uppercase tracking-tighter text-outline-massive leading-none">
          STABLE REVENUE SOURCE • WASTE TO ENERGY • 
        </h2>
      </div>
      
      <div className="w-[200%] flex animate-marquee-reverse whitespace-nowrap mt-4">
        <h2 className="text-[clamp(2.8rem,9vw,9rem)] font-serif uppercase tracking-tighter text-[#C6A87C] leading-none mix-blend-difference opacity-80">
          CLOSED LOOP • CLOSED LOOP • 
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
          <text fill="#C6A87C" className="font-mono text-[8.5px] tracking-[0.25em] uppercase">
            <textPath href="#textPath" startOffset="0%" textLength="471">
              • CLOSED LOOP • ZERO WASTE • CIRCULAR AGRICULTURE • CLOSED LOOP • ZERO WASTE • CIRCULAR AGRICULTURE 
            </textPath>
          </text>
        </svg>
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn direction="right">
          <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Sustainable profit</div>
          <h2 className="text-5xl md:text-6xl font-serif text-[#EAE6DF] leading-[1.1] mb-8">
            Added value:<br/>
            <span className="italic text-[#C6A87C] font-light">Poferment.</span>
          </h2>
          <p className="text-[#EAE6DF]/60 font-light text-xl leading-relaxed mb-10 font-serif italic max-w-lg">
            The methane fermentation process does more than just produce biogas. It transforms burdensome agricultural waste into a premium, odorless organic fertilizer.
          </p>
          <ul className="space-y-6">
            {['Replaces expensive synthetic fertilizers (N-P-K).', 'Improves soil structure and water retention.', 'Completely free from weed seeds and pathogens.', 'Free from the troublesome odors typical of raw manure spreading.'].map((item, i) => (
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
              Negative carbon <br/>
              <span className="italic text-[#C6A87C] font-light text-outline">footprint.</span>
            </h2>
            <p className="text-[#EAE6DF]/60 font-light text-xl leading-relaxed mb-12 font-serif italic max-w-lg">
              A biogas plant does more than produce green energy. By utilizing slurry and manure, it prevents spontaneous atmospheric methane emissions, making the process highly climate-friendly.
            </p>
            <div className="inline-flex items-center gap-4 border border-[#C6A87C]/20 px-6 py-4 bg-[#050606]">
              <ShieldCheck className="w-5 h-5 text-[#C6A87C]" />
              <span className="font-mono text-[10px] tracking-widest text-[#EAE6DF]/80 uppercase">Certyfikaty redukcji emisji (CER)</span>
            </div>
          </FadeIn>
          
          <div className="space-y-6">
            {[
              { label: "CO2 emission reduction", val: "7,250", unit: "tons / year" },
              { label: "Equivalent of planted trees", val: "120,000", unit: "trees" },
              { label: "Powered households", val: "1,600", unit: "homes" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 150} className="border-b-[0.5px] border-[#EAE6DF]/10 pb-6 flex flex-col sm:flex-row sm:items-start md:items-end justify-between gap-4 group">
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
    { title: "Typ A — Agricultural", spec: "0.5 MW · slurry + silage", location: "Feedstock: 21 t / day", img: "/assets/img/rolnicza.png" },
    { title: "Typ B — Municipal", spec: "0.5 MW · municipal waste", location: "Feedstock: 18 t / day", img: "/assets/img/komunalny.webp" },
    { title: "Typ C — Industrial", spec: "0.5 MW · slaughterhouse waste", location: "Feedstock: 21 t / day", img: "/assets/img/przemyslowy.webp" }
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
            <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase">Typologie projektowe — modele referencyjne</h2>
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
                    <p className="font-mono text-[8px] tracking-[0.3em] text-[#C6A87C] uppercase mb-2">Specyfikacja // Daily feedstock</p>
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




const ScadaSystem = () => {
  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-10"></div>
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <FadeIn direction="right">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Infrastruktura Software</div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 mb-12 font-light italic">
              Digital <br/><span className="text-[#C6A87C] not-italic">twin.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-2xl leading-relaxed mb-16 font-serif italic max-w-xl">
              The SCADA system is the operational backbone of the plant. It aggregates data from hundreds of sensors and precisely controls mixers, pumps, and CHP systems to ensure biological stability and maximize methane yield.
            </p>
          </FadeIn>

          <FadeIn direction="left" className="relative h-[600px] glass-morphism rounded-[3rem] overflow-hidden p-12">
             <div className="absolute inset-0 bg-[#020202]/50 backdrop-blur-xl"></div>
             <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-[#4ADE80] rounded-full animate-pulse"></div>
                      <span className="font-mono text-[9px] text-[#EAE6DF]/80 tracking-[0.3em] uppercase">System Sterowania Active</span>
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
                      <div className="font-mono text-[7px] text-[#EAE6DF]/30 uppercase mb-2">Poziom Tlenu</div>
                      <div className="font-serif text-3xl text-[#EAE6DF]">0.02 <span className="text-xs italic text-[#C6A87C]">%</span></div>
                   </div>
                   <div>
                      <div className="font-mono text-[7px] text-[#EAE6DF]/30 uppercase mb-2">Engine Load</div>
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
          <div className="absolute inset-0 opacity-40 bg-[url('/assets/img/lab.webp')] bg-cover bg-center grayscale mix-blend-luminosity"></div>
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
              We don't rely on guesswork. Before designing the reactors, we subject samples of your biomass to rigorous Biochemical Methane Potential (BMP) testing.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "BMP Tests (Biochemical Methane Potential)", desc: "Precise determination of the methane yield per ton of your feedstock." },
                { title: "Physicochemical Analysis", desc: "Analysis of dry matter, ash content, and carbon-to-nitrogen (C:N) ratio." },
                { title: "Symulacja Fermentacji", desc: "Przeprowadzenie miniaturowego procesu w Reactorach laboratoryjnych." }
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
      role: "Lead Project Engineer", 
      name: "Construction Department", 
      exp: "Precision supervision of thermal insulation and reinforced concrete pouring. Ensuring a completely sterile environment.",
      img: "/assets/img/konstrukcyjny.webp",
      id: "AUTORYZACJA_LVL_4",
      clearance: "TOP SECRET // INDUSTRIAL"
    },
    { 
      role: "Lead RES Technologist", 
      name: "Biology Department", 
      exp: "Methane fermentation experts. We parameterize the environment to maximize the yield of the entrusted biomass.",
      img: "/assets/img/biologiczny.webp",
      id: "AUTORYZACJA_LVL_4",
      clearance: "TOP SECRET // BIOLOGICAL"
    }
  ];

  return (
    <section className="py-48 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-40 flex flex-col lg:flex-row lg:items-start xl:items-end justify-between gap-16 border-b border-[#C6A87C]/10 pb-16">
            <div>
              <h2 className="text-[9px] font-mono tracking-[0.5em] text-[#C6A87C] uppercase mb-8">Indeks Personelu</h2>
              <p className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">Verified <br/><span className="italic font-light text-[#C6A87C]">Supervision.</span></p>
            </div>
            <p className="text-[#EAE6DF]/40 text-2xl font-serif italic max-w-md leading-relaxed text-right">
              Engineering staff certified to design high-risk gas installations.
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
                          <div className="font-mono text-[9px] text-[#EAE6DF]/40 uppercase tracking-[0.2em] mb-1">Autoryzacja</div>
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
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Control Center // O&M</div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 mb-12 font-light">
              Utrzymanie <br/>
              <span className="italic text-[#C6A87C] font-Standardl">ruchu.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-2xl leading-relaxed mb-16 font-serif italic max-w-xl">
              Handing over the keys is just the beginning. Our operations center monitors biological and mechanical parameters 24/7 to ensure continuous power generation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="p-8 glass-morphism rounded-3xl">
                  <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-4">Uptime SLA</div>
                  <div className="font-serif text-5xl text-[#EAE6DF] font-light"><AnimatedCounter value="98.5" suffix="%" /></div>
               </div>
               <div className="p-8 glass-morphism rounded-3xl">
                  <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-4">Czas Reakcji</div>
                  <div className="font-serif text-5xl text-[#EAE6DF] font-light">&lt;<AnimatedCounter value="24" /><span className="text-xl text-[#C6A87C]/40 italic ml-2">h</span></div>
               </div>
            </div>
          </FadeIn>

          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            {[
              { title: "Remote SCADA Diagnostics", desc: "Live view of every valve and mixer. Anomaly detection before they become failures.", icon: <Zap className="w-6 h-6" /> },
              { title: "Technologist Supervision", desc: "Weekly analysis of fermentation parameters. Reactor diet optimization.", icon: <Leaf className="w-6 h-6" /> },
              { title: "Tier-1 Mechanical Service", desc: "Authorized service for CHP units and pumping systems. Original parts.", icon: <Factory className="w-6 h-6" /> }
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
    { title: "ATEX Directive", desc: "EX explosion protection for methane hazard zones.", code: "Directive 2014/34/UE", hue: "#FBBF24" },
    { title: "Standards UDT", desc: "Technical supervision over pressure vessels and pipelines.", code: "UDT REGULATION", hue: "#60A5FA" },
    { title: "Fire Protection", desc: "Integrated smoke exhaust systems and active safety flares.", code: "NORMY NFPA-EN", hue: "#F87171" },
    { title: "CE Certification", desc: "Compliance with European machinery and occupational safety standards.", code: "MD 2006/42/WE", hue: "#34D399" }
  ];

  return (
    <section className="py-48 bg-[#020202] relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-32">
             <h2 className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 flex items-center gap-4">
               <ShieldCheck className="w-5 h-5" /> Technical Compliance Framework
             </h2>
             <h3 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">Standard <br/><span className="italic text-[#C6A87C] font-Standardl">Safety.</span></h3>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((std, i) => (
            <FadeIn key={i} delay={i * 100} className="p-12 group transition-all duration-700 interactive-element relative overflow-hidden border rounded-2xl"
               style={{ backgroundColor: `${std.hue}0A`, borderColor: `${std.hue}33` }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = `${std.hue}1A`;
                 e.currentTarget.style.borderColor = `${std.hue}66`;
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = `${std.hue}0A`;
                 e.currentTarget.style.borderColor = `${std.hue}33`;
               }}
            >
               <div className="absolute top-0 left-0 w-full h-[3px] transition-all duration-700" style={{ backgroundImage: `linear-gradient(to right, transparent, ${std.hue}, transparent)` }} />
               <div className="font-mono text-[8px] tracking-[0.3em] uppercase mb-8 transition-colors" style={{ color: std.hue }}>{std.code}</div>
               <h4 className="font-serif text-3xl text-[#EAE6DF] mb-6 font-light transition-colors" style={{ textShadow: `0 0 20px ${std.hue}40` }}>{std.title}</h4>
               <p className="font-serif italic text-[#EAE6DF]/60 text-lg leading-relaxed relative z-10">{std.desc}</p>
               <div className="mt-12 w-8 h-[2px] transition-all duration-700 group-hover:w-full relative z-10" style={{ backgroundColor: std.hue }}></div>
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
    { q: "Permit Acquisition Methodology", a: "We handle the entire administrative process: from the Project Information Sheet (KIP) and environmental reports, to the final building permit and energy concession.", doc: "PROC-ADM-01" },
    { q: "Process Hydraulics Parameterization", a: "We apply proprietary algorithms to optimize mixer power and pump efficiency based on substrate rheology, reducing energy consumption by 15%.", doc: "TECH-HYD-V4" },
    { q: "Cybersecurity Architecture", a: "SCADA systems operate in isolated VLAN networks with encrypted VPN access, ensuring protection against unauthorized access to PLC controllers.", doc: "CYB-SEC-PRO" },
    { q: "Digestate and Dewatering Logistics", a: "We design integrated phase separation and digestate storage systems to optimize transport and field fertilization costs.", doc: "LOG-BIO-S7" }
  ];

  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-5"></div>
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-24 items-start">
         
         <FadeIn className="lg:col-span-4 sticky top-40">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">Repozytorium Wiedzy</div>

             <h3 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">
               Dokumentacja <br/>
               <span className="italic text-[#C6A87C] font-Standardl">operacyjna.</span>
             </h3>
             <p className="text-[#EAE6DF]/40 font-serif italic text-2xl font-light mt-12 leading-relaxed">
               A comprehensive set of technical procedures and standards defining every phase of the plant's lifecycle.
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
                          <span className="font-mono text-[8px] text-[#4ADE80] tracking-[0.3em] uppercase">Status: Dokument Zweryfikowany</span>
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
          <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] px-6 py-1 mx-auto w-fit">Logistyka Regionalna</div>
          <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 mb-12 font-light">
            Operational <br/><span className="italic text-[#C6A87C] font-Standardl">reach.</span>
          </h2>
          <p className="text-[#EAE6DF]/50 font-serif italic text-2xl max-w-3xl mx-auto leading-relaxed mb-20">
            Our engineering and service teams operate nationwide, providing technical support in every corner of the country.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10 w-full">
             {[
               { region: "Northern Poland", city: "Gdansk Hub", status: "Operational" },
               { region: "Polska Centralna", city: "Warsaw HQ", status: "Operational" },
               { region: "Western Poland", city: "Poznan Hub", status: "Active" },
               { region: "Southern Poland", city: "Krakow Hub", status: "Operational" }
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
            <span className="font-mono text-[#C8A97D] text-[9px] tracking-[0.4em] uppercase">Available system capacities // Q3 2026</span>
          </div>
          <h2 className="font-serif text-[#F2EDE4] leading-[0.92] pb-2 tracking-tight font-light" data-testid="cta-headline">
            <span className="block text-[5rem] md:text-[10rem] lg:text-[14rem]">
              <KineticHeading delay={100} stagger={40}>Czas na</KineticHeading>
            </span>
            <span className="block italic text-[#C8A97D] text-[6rem] md:text-[12rem] lg:text-[16rem]">
              <KineticHeading delay={600} stagger={50}>projekt.</KineticHeading>
            </span>
          </h2>
        </div>

        {/* Lower row: copy + CTA + spec */}
        <FadeIn delay={400}>
          <div className="grid lg:grid-cols-12 gap-12 items-end max-w-7xl mx-auto pt-12 border-t border-[#C6A87C]/15">
            <div className="lg:col-span-5">
              <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-4">— Inicjacja kontraktu</div>
              <p className="font-serif italic text-2xl md:text-3xl text-[#F2EDE4]/70 leading-[1.4] font-light">
                We verify the technology, estimate CAPEX, design, and build. Your first m³ of biogas—in 14 months.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center gap-6">
              <MagneticButton>
                <a href="#kontakt" className="group relative bg-[#C8A97D] text-[#050505] px-14 py-7 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-[#F2EDE4] transition-all duration-500 rounded-full flex items-center gap-5 interactive-element shadow-[0_0_60px_rgba(200,169,125,0.35)] font-medium" data-testid="cta-init">
                  Inicjuj rozmowy
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2} />
                </a>
              </MagneticButton>
              <div className="font-mono text-xl md:text-3xl text-[#C8A97D] tracking-widest mt-2 flex items-center gap-4">
                <span className="text-[10px] text-[#F2EDE4]/40 tracking-[0.4em] uppercase">lub</span> 
                <a href="tel:+48601944451" className="hover:text-[#F2EDE4] transition-colors interactive-element">+48 601 944 451</a>
              </div>
            </div>

            <div className="lg:col-span-3 lg:text-right">
              <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-4">— Operational response</div>
              <div className="font-serif text-6xl md:text-7xl text-[#F2EDE4] font-light leading-none">
                &lt;24<span className="text-2xl italic text-[#C8A97D]/60 ml-2">h</span>
              </div>
              <div className="font-mono text-[8px] text-[#F2EDE4]/30 tracking-[0.3em] uppercase mt-3">
                Sales department + engineer
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Decorative bottom band */}
        <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto pt-12 border-t border-[#C6A87C]/10">
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
              Preparation of biogas plant projects agricultural and municipal. Design, investor supervision, and technical support — optimized for methane yield.
            </p>
            <div className="flex flex-wrap gap-x-12 gap-y-4 font-mono text-[10px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase">
              <div>8 Stanislaw Wyspianski St. // 05-400 Otwock</div>
              <div>NIP 5322124348 // REGON 544014417 // KRS 0001224533</div>
              <div>+48 601 944 451 // kontakt@greenplant.tech</div>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-2">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Platforma</h4>
            <ul className="space-y-5">
              {[
                { label: 'Approach', href: '#podejscie' },
                { label: 'Technology', href: '#technologia' },
                { label: 'Process', href: '#proces' },
                { label: 'Economics', href: '#ekonomia' },
                { label: 'Standards', href: '#standardy' }
              ].map((link, i) => (
                <li key={i}><a href={link.href} className="text-[#EAE6DF]/40 hover:text-[#C6A87C] transition-colors text-[10px] font-mono tracking-[0.2em] uppercase interactive-element">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Firma</h4>
            <ul className="space-y-5">
              {[

                { label: 'Maintenance', href: '#utrzymanie' },
                { label: 'Team', href: '#kariera' },
                { label: 'Press', href: '#prasa' },
                { label: 'Contact', href: '#kontakt' }
              ].map((link, i) => (
                <li key={i}><a href={link.href} className="text-[#EAE6DF]/40 hover:text-[#C6A87C] transition-colors text-[10px] font-mono tracking-[0.2em] uppercase interactive-element">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-12">
            <h4 className="text-[#C6A87C] font-mono mb-6 uppercase text-[9px] tracking-[0.4em]">Kolofon</h4>
            <div className="flex flex-wrap gap-x-12 gap-y-6 font-mono text-[9px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase leading-relaxed">
              <div>Typeset in <span className="text-[#C6A87C]/80 font-serif italic Standardl-case tracking-Standardl text-sm">Cormorant Garamond</span> and <span className="text-[#C6A87C]/80 font-mono Standardl-case tracking-Standardl text-sm">Space Mono</span></div>
              <div className="flex gap-12">
                <div>Zaprojektowano w Warszawie</div>
                <div>Feedstock — from local fields</div>
              </div>
              <div className="flex gap-12">
                <div>Wydanie N° 04 // 2026</div>
                <div>Tom I, Edycja III</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C6A87C]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#EAE6DF]/30 text-[9px] font-mono uppercase tracking-[0.3em]">
            &copy; 2026 Green Plant Technologies Sp. z o.o. // All rights reserved
          </p>
          <div className="font-mono text-[9px] text-[#EAE6DF]/30 uppercase tracking-[0.3em]">
            LAT 52.2297 // LON 21.0122
          </div>
          <div className="flex gap-10 text-[9px] text-[#EAE6DF]/30 font-mono uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-[#C6A87C] transition-colors interactive-element">Privacy Policy</a>
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
    { id: '01', name: 'Submersible mixer', desc: 'Stainless steel 1.4571. Three hydrodynamic blades 18.5 kW.', x: 30, y: 35 },
    { id: '02', name: 'Double EPDM membrane', desc: 'Biogas storage 600 m³. Thermal resistance -40 to +80°C.', x: 50, y: 12 },
    { id: '03', name: 'Heating coil', desc: 'Stabilizacja procesu mezofilowego. 38.4 °C ±0.3.', x: 22, y: 60 },
    { id: '04', name: 'Reinforced concrete tank', desc: 'Concrete class C35/45. Gas tightness P10. Insulation 20cm mineral wool.', x: 50, y: 60 },
    { id: '05', name: 'Substrate inlet', desc: 'Dispenser with homogenizer. 21 t/day. Dry matter sensor.', x: 8, y: 50 },
    { id: '06', name: 'Digestate outlet', desc: 'Phase separator. Dry organic fertilizer + liquid digestate.', x: 88, y: 50 },
    { id: '07', name: 'Measuring probe', desc: 'pH, ORP, temperature, volatile fatty acids (VFA). Continuous sampling.', x: 70, y: 40 },
    { id: '08', name: 'Emergency flare', desc: 'Biogas flaring in case of overpressure. ATEX zone 1 standard.', x: 78, y: 8 },
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
                <CrosshairIcon className="w-3.5 h-3.5" strokeWidth={1} /> Schemat techniczny // Widok rozstrzelony
              </div>
              <h2 className="text-6xl md:text-[9rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Anatomia <br/><span className="italic text-[#C6A87C] font-Standardl">Reactora.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-serif italic text-2xl text-[#EAE6DF]/50 leading-relaxed">
                Every reactor component operates under extreme conditions—from corrosive H₂S to gas overpressure. Zero compromises.
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
              <div className="absolute top-4 left-6 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">DWG-014 / CROSS SECTION A-A</div>
              <div className="absolute top-4 right-6 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">SKALA 1:200</div>
              <div className="absolute bottom-4 left-6 font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.3em] uppercase">OPRACOWANIE: GREEN PLANT TECH.</div>
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
                {/* gas Homee */}
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
const MolecularProcesss = () => {
  const stages = [
    { phase: 'I', name: 'Hydrolysis', formula: 'C₆H₁₀O₅ → C₆H₁₂O₆', time: '0–24h', desc: 'Extracellular enzymes break down polysaccharides, proteins, and fats into simple, water-soluble monomers.' },
    { phase: 'II', name: 'Acidogenesis', formula: 'C₆H₁₂O₆ → CH₃COOH + H₂', time: '24–72h', desc: 'Fermentative bacteria convert monomers into short-chain fatty acids, hydrogen, and carbon dioxide.' },
    { phase: 'III', name: 'Acetogenesis', formula: 'CH₃CH₂COOH → CH₃COOH + H₂', time: '3–7 dni', desc: 'Acetogenic bacteria oxidize higher fatty acids to acetate — the proper substrate for methanogens.' },
    { phase: 'IV', name: 'Methanogenesis', formula: 'CH₃COOH → CH₄ + CO₂', time: '14–28 dni', desc: 'Methanogenic archaea synthesize methane from acetate and hydrogen. This phase is the economic engine of the biogas plant.' },
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
            <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light mb-10">
              Cztery <span className="italic text-[#C6A87C] font-Standardl">fazy</span><br/>
              one molecule.
            </h2>
            <p className="font-serif italic text-2xl text-[#EAE6DF]/50 leading-relaxed">
              From silage to methane in 28 days. Each fermentation phase has its own microflora, pH, and pace. The art of biological engineering lies in harmonizing these four worlds within a single chamber.
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
          <span className="w-6 h-px bg-[#C6A87C]" /> Edytorial — N° 04 / 26
        </div>
        <blockquote className="font-serif text-5xl md:text-[6.5rem] text-[#EAE6DF] leading-[1.05] font-light tracking-tight">
          <span className="text-[#C6A87C] italic">„</span>
          The time when energy <br/>
          was a privilege of <span className="italic text-[#C6A87C]">cities</span>,<br/>
          comes to an end. The era <br/>
          is arriving where every <br/>
          farm becomes <br/>
          <span className="italic text-[#C6A87C]">power plant.</span>
          <span className="text-[#C6A87C] italic">"</span>
        </blockquote>
        <div className="mt-20 flex items-end justify-between border-t border-[#C6A87C]/20 pt-8">
          <div>
            <div className="font-mono text-[10px] text-[#C6A87C] tracking-[0.4em] uppercase">— Green Plant Tech.</div>
            <div className="font-serif italic text-[#EAE6DF]/40 text-lg mt-2">Manifest Energii Rolniczej, 2026</div>
          </div>
          <div className="font-mono text-[9px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase hidden md:block">
            Typeset in Cormorant Garamond
          </div>
        </div>
      </div>
    </section>
  );
};

// Poland map with installations
const PolandMap = () => {
  const sites = [
    { x: 38, y: 28, name: 'Pomorze', mw: '32', sub: 'Odpady mleczarskie, ryby' },
    { x: 60, y: 25, name: 'Warmia-Mazury', mw: '21', sub: 'Cattle, poultry' },
    { x: 50, y: 48, name: 'Mazowsze', mw: '58', sub: 'Mieszane rolnicze' },
    { x: 32, y: 52, name: 'Wielkopolska', mw: '94', sub: 'Trzoda, Corn' },
    { x: 72, y: 56, name: 'Lubelszczyzna', mw: '38', sub: 'Beets, cattle' },
    { x: 48, y: 75, name: 'Lesser Poland', mw: '17', sub: 'Municipal waste' },
    { x: 28, y: 78, name: 'Lower Silesia', mw: '42', sub: 'Distillery stillage' },
    { x: 64, y: 38, name: 'Warsaw', mw: 'HQ', sub: 'Centrala operacyjna', hq: true },
  ];
  const [active, setActive] = useState(3);
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="poland-map">
      <div className="absolute inset-0 technical-grid opacity-5" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 items-end gap-12 mb-24 border-b border-[#C6A87C]/10 pb-12">
            <div className="lg:col-span-8">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Radar className="w-3.5 h-3.5" strokeWidth={1} /> Polska mapa biogazu rolniczego
              </div>
              <h2 className="text-6xl md:text-[8.5rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Market <br/><span className="italic text-[#C6A87C] font-Standardl">regionalny.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Approx. 180 active agricultural biogas plants in Poland. Most densely in Greater Poland and Mazovia — where livestock breeding and agri-food industry are concentrated.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <FadeIn className="lg:col-span-8 relative">
            <div className="aspect-[4/4.5] relative glass-morphism rounded-[2rem] p-10 overflow-hidden">
              <div className="absolute top-6 left-8 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">MAPA // POLSKA // 1:2 500 000</div>
              <div className="absolute top-6 right-8 font-mono text-[9px] text-[#4ADE80] tracking-[0.3em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" /> ≈ 380 MW
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
            <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-6">Provinces — market density</div>
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
              <Hexagon className="w-3 h-3" strokeWidth={1} /> Engineering Manifesto
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] font-light mb-12">
              We believe a <span className="italic">biogas plant</span> is more than just a power source. It is a comprehensive tool that simultaneously solves three challenges: waste, energy, and fertilization.
            </h2>
            <div className="space-y-6 font-serif text-xl leading-relaxed text-[#0a0c0b]/80 max-w-3xl">
              <p>
                Agriculture, which once fed the nation, is now blamed for methane emissions, slurry odors, and soil depletion. This is unjust. The solution is simply closing the loop.
              </p>
              <p>
                <span className="font-serif italic text-[#C6A87C]">Every</span> ton of manure is not a liability—it's 60 m³ of biogas, 0.13 MWh of electricity, and 22 kg of potassium and phosphorus returned to the soil rather than our lakes. You just need the right tools.
              </p>
              <p>
                Our role is to deliver these tools with a build quality designed to run flawlessly for 25 years. Stainless steel 1.4571. Concrete W10 XA3. Tier-1 engines. ABB controllers. Zero compromises on material specifications.
              </p>
              <p className="italic text-[#0a0c0b]/60">
                Because agricultural energy deserves nothing less.
              </p>
            </div>
            <div className="mt-16 pt-8 border-t border-[#0a0c0b]/15 flex items-end justify-between">
              <div>
                <svg viewBox="0 0 200 60" className="w-48 h-14 mb-2">
                  <path d="M 10 40 Q 30 10, 50 30 Q 70 50, 90 25 Q 110 5, 130 35 Q 150 50, 175 20" fill="none" stroke="#0a0c0b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0a0c0b]/60">Founders, Green Plant Tech.</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0a0c0b]/40 mb-2">Warsaw</div>
                <div className="font-serif italic text-lg">May 10, 2026</div>
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

// ===== ROUND 2 ELEVATIONS =====

// 5-chapter cinematic narrative: field → electricity → home → field again
const FieldToElectricity = () => {
  const chapters = [
    {
      no: 'I',
      title: 'Corn',
      lead: 'Spring. 12,000 seeds per hectare. Every stalk represents a future 0.4 m³ of biogas.',
      body: 'In the first year of cooperation, we measure not only the acreage — we measure sun, rain, and soil pH. Polish energy corn has some of the highest methane potentials in Europe: 210 m³ of biogas from a ton of fresh mass.',
      stat: '210 m³/t',
      ref: 'CH-01 / FIELD',
      hue: '#4ADE80',
    },
    {
      no: 'II',
      title: 'Reactor',
      lead: '38.4 °C. pH 7.6. 28 dni. A silent environment where archaea work relentlessly.',
      body: 'Silage enters the dispenser at 6:00 AM. Mixers rotate slowly at 8 revolutions per minute. Methanogenic bacteria cannot tolerate oxygen, noise, or sudden changes. This is a biological factory where the loudest sound is the hum of the cooling fan.',
      stat: '38.4 °C',
      ref: 'CH-02 / REACTOR',
      hue: '#C6A87C',
    },
    {
      no: 'III',
      title: 'Grid',
      lead: 'After 28 days, biogas flows into the intake of a Tier-1 engine. 499 kW of electrical power. Smart Grid Sync.',
      body: 'The Jenbacher J312 engine burns biogas with milliampere precision. The energy is fed into the national grid and sold in RES auctions at a contracted price locked in for 15 years. Every hour of operation yields approx. 130 EUR gross—regardless of weather, season, or geopolitics.',
      stat: '499 kW',
      ref: 'CH-03 / GRID',
      hue: '#D97847',
    },
    {
      no: 'IV',
      title: 'Home',
      lead: '1,600 Polish households powered by a single biogas plant. 24/7.',
      body: 'Unlike wind and solar, biogas works at night. It works in December. It works when energy exchange prices spike to 400 EUR/MWh on a freezing winter evening. There is no energy crisis here—because the fuel grows in the neighboring field.',
      stat: '1 600',
      ref: 'CH-04 / HOUSEHOLD',
      hue: '#EAE6DF',
    },
    {
      no: 'V',
      title: 'Return',
      lead: 'The digestate returns to the field. 30 tons of premium NPK fertilizer daily—closing the loop.',
      body: 'What sprang from the soil as corn returns as fertilizer. Free from weed seeds, pathogens, and odors. The farmer stops buying urea and phosphates—because he produces them himself in his own methane factory.',
      stat: '30 t/d',
      ref: 'CH-05 / RETURN',
      hue: '#4ADE80',
    },
  ];
  return (
    <section className="relative py-32 bg-[#020202] overflow-hidden" data-testid="field-to-electricity">
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-[#C6A87C]/15 pb-12">
            <div>
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Workflow className="w-3.5 h-3.5" strokeWidth={1} /> Narrative sequence — 5 chapters
              </div>
              <h2 className="text-6xl md:text-[9rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                From the field <br/><span className="italic text-[#C6A87C] font-Standardl">to power.</span>
              </h2>
            </div>
            <p className="font-serif italic text-2xl text-[#EAE6DF]/50 max-w-md leading-relaxed text-right">
              Five chapters. One loop. Hundreds of kilometers of cables, thousands of archaea, two generations of farmers.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-32">
          {chapters.map((c, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className={`grid lg:grid-cols-12 gap-12 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Big roman numeral */}
                <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-3 lg:text-right' : ''}`}>
                  <div className="font-serif font-light text-[#C6A87C]/15 leading-none" style={{ fontSize: '14rem', color: 'transparent', WebkitTextStroke: `1px ${c.hue}40` }}>
                    {c.no}
                  </div>
                </div>

                {/* Title + body */}
                <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6 flex items-center gap-4" style={{ color: c.hue }}>
                    <span className="w-8 h-px" style={{ backgroundColor: c.hue }} />
                    {c.ref}
                  </div>
                  <h3 className="font-serif text-6xl md:text-[7rem] text-[#EAE6DF] leading-[0.95] pb-1 font-light mb-8">
                    {c.title}<span style={{ color: c.hue }}>.</span>
                  </h3>
                  <p className="font-serif italic text-2xl md:text-3xl text-[#EAE6DF]/70 leading-[1.4] mb-8 max-w-2xl">
                    {c.lead}
                  </p>
                  <p className="font-serif text-lg text-[#EAE6DF]/40 leading-relaxed max-w-2xl">
                    {c.body}
                  </p>
                </div>

                {/* Stat panel */}
                <div className={`lg:col-span-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="glass-morphism p-10 rounded-[2rem] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundColor: c.hue }} />
                    <div className="font-mono text-[9px] tracking-[0.4em] uppercase mb-8" style={{ color: c.hue }}>
                      Chapter number
                    </div>
                    <div className="font-serif font-light text-[#EAE6DF] leading-none mb-8" style={{ fontSize: '6rem' }}>
                      {c.stat}
                    </div>
                    {/* Mini chapter icon */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-50">
                      {i === 0 && (
                        <>
                          <line x1="50" y1="80" x2="50" y2="40" stroke={c.hue} strokeWidth="1" />
                          <path d="M 50 40 Q 40 30, 30 35 Q 40 25, 50 30 Q 60 25, 70 35 Q 60 30, 50 40" fill={c.hue} fillOpacity="0.5" />
                          <line x1="50" y1="60" x2="40" y2="50" stroke={c.hue} strokeWidth="0.8" />
                          <line x1="50" y1="60" x2="60" y2="50" stroke={c.hue} strokeWidth="0.8" />
                          <line x1="30" y1="80" x2="70" y2="80" stroke={c.hue} strokeOpacity="0.4" strokeDasharray="2 3" />
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <rect x="30" y="35" width="40" height="45" fill="none" stroke={c.hue} />
                          <ellipse cx="50" cy="35" rx="20" ry="6" fill="none" stroke={c.hue} />
                          <ellipse cx="50" cy="80" rx="20" ry="6" fill={c.hue} fillOpacity="0.2" stroke={c.hue} />
                          <path d="M 30 35 Q 50 15, 70 35" fill="none" stroke={c.hue} strokeOpacity="0.6" />
                          <circle cx="50" cy="55" r="2" fill={c.hue}>
                            <animate attributeName="cy" values="60;40;60" dur="3s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <circle cx="50" cy="50" r="20" fill="none" stroke={c.hue} />
                          <path d="M 30 50 L 70 50 M 50 30 L 50 70" stroke={c.hue} />
                          <circle cx="20" cy="20" r="3" fill={c.hue} />
                          <circle cx="80" cy="20" r="3" fill={c.hue} />
                          <circle cx="20" cy="80" r="3" fill={c.hue} />
                          <circle cx="80" cy="80" r="3" fill={c.hue} />
                          <line x1="20" y1="20" x2="50" y2="50" stroke={c.hue} strokeOpacity="0.4" />
                          <line x1="80" y1="20" x2="50" y2="50" stroke={c.hue} strokeOpacity="0.4" />
                          <line x1="20" y1="80" x2="50" y2="50" stroke={c.hue} strokeOpacity="0.4" />
                          <line x1="80" y1="80" x2="50" y2="50" stroke={c.hue} strokeOpacity="0.4" />
                        </>
                      )}
                      {i === 3 && (
                        <>
                          <path d="M 25 75 L 25 50 L 50 30 L 75 50 L 75 75 Z" fill="none" stroke={c.hue} />
                          <rect x="45" y="60" width="10" height="15" fill={c.hue} fillOpacity="0.4" stroke={c.hue} />
                          <rect x="32" y="55" width="6" height="8" fill="none" stroke={c.hue} />
                          <rect x="62" y="55" width="6" height="8" fill="none" stroke={c.hue} />
                          <circle cx="50" cy="20" r="2" fill={c.hue}>
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      {i === 4 && (
                        <>
                          <circle cx="50" cy="50" r="30" fill="none" stroke={c.hue} strokeDasharray="2 3" />
                          <path d="M 50 20 A 30 30 0 0 1 80 50" fill="none" stroke={c.hue} strokeWidth="1.5" />
                          <polygon points="78,46 84,50 78,54" fill={c.hue} />
                          <text x="50" y="55" textAnchor="middle" fontSize="14" fill={c.hue} fontFamily="serif" fontStyle="italic">∞</text>
                        </>
                      )}
                    </svg>
                    <div className="absolute bottom-6 right-6 font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${c.hue}80` }}>{c.ref}</div>
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

// 24-hour fermentation cycle clock
const ReactorClock = () => {
  const [hour, setHour] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHour(h => (h + 1) % 24), 2200);
    return () => clearInterval(id);
  }, []);
  const events = {
    0: { l: 'Night silence', d: 'The reactor operates in maintenance mode. Mixers run slowly at 4 rpm. Constant temperature of 38.4 °C.' },
    6: { l: 'Dozowanie poranne', d: 'Pierwsza porcja kiszonki: 18 t. Sucha masa 32%. pH wlotu 6.8.' },
    9: { l: 'Gas peak', d: 'Peak CH₄ production. CHP efficiency reaches 44.2%. Exporting to the grid at maximum capacity.' },
    12: { l: 'Operator control', d: 'Technician visit. Taking a sample to the lab. Gas tightness check.' },
    15: { l: 'Afternoon dosing', d: 'Second portion of substrate: 16 t. Process stabilization. Lambda probe confirms composition.' },
    18: { l: 'Peak shaving sales', d: 'Highest energy prices between 6:00 PM and 9:00 PM. The SCADA algorithm maximizes output.' },
    21: { l: 'Cool down', d: 'Slow power dissipation. Mixers slow down. The grid transitions into the night.' },
  };
  const labelEvents = [0, 6, 9, 12, 15, 18, 21];
  return (
    <section className="relative py-48 bg-[#050505] overflow-hidden" data-testid="reactor-clock">
      <div className="absolute inset-0 paper-grain opacity-20" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-24">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center justify-center gap-4">
              <Cog className="w-3.5 h-3.5" strokeWidth={1} /> Cykl dobowy biogazowni
            </div>
            <h2 className="text-6xl md:text-[9rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
              Twenty-four <br/><span className="italic text-[#C6A87C] font-Standardl">hours.</span>
            </h2>
            <p className="font-serif italic text-2xl text-[#EAE6DF]/50 max-w-2xl mx-auto mt-12 leading-relaxed">
              One cycle. 7 critical points. An algorithm that works while you sleep.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <FadeIn className="lg:col-span-7 flex justify-center">
            <div className="relative aspect-square w-full max-w-[640px]">
              <svg viewBox="0 0 600 600" className="w-full h-full">
                <defs>
                  <radialGradient id="clockGrad" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0.7" stopColor="#020202" stopOpacity="0" />
                    <stop offset="1" stopColor="#C6A87C" stopOpacity="0.1" />
                  </radialGradient>
                </defs>
                {/* outer halo */}
                <circle cx="300" cy="300" r="290" fill="url(#clockGrad)" />
                {/* outer ring */}
                <circle cx="300" cy="300" r="270" fill="none" stroke="#C6A87C" strokeOpacity="0.25" />
                <circle cx="300" cy="300" r="250" fill="none" stroke="#C6A87C" strokeOpacity="0.15" strokeDasharray="1 4" />
                {/* inner ring */}
                <circle cx="300" cy="300" r="120" fill="none" stroke="#C6A87C" strokeOpacity="0.2" />
                {/* 24 ticks */}
                {[...Array(24)].map((_, h) => {
                  const angle = (h / 24) * Math.PI * 2 - Math.PI / 2;
                  const x1 = 300 + Math.cos(angle) * 245;
                  const y1 = 300 + Math.sin(angle) * 245;
                  const x2 = 300 + Math.cos(angle) * (labelEvents.includes(h) ? 255 : 252);
                  const y2 = 300 + Math.sin(angle) * (labelEvents.includes(h) ? 255 : 252);
                  return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C6A87C" strokeOpacity={labelEvents.includes(h) ? 0.7 : 0.2} strokeWidth={labelEvents.includes(h) ? 1.5 : 0.6} />;
                })}
                {/* hour labels */}
                {[0, 6, 12, 18].map((h) => {
                  const angle = (h / 24) * Math.PI * 2 - Math.PI / 2;
                  const x = 300 + Math.cos(angle) * 280;
                  const y = 300 + Math.sin(angle) * 280;
                  return (
                    <text key={h} x={x} y={y + 5} textAnchor="middle" className="font-mono" fontSize="14" fill="#C6A87C" fillOpacity="0.6">
                      {String(h).padStart(2, '0')}:00
                    </text>
                  );
                })}
                {/* event arcs (sectors) */}
                {labelEvents.map((h, i) => {
                  const isActive = hour >= h && hour < (labelEvents[i + 1] || 24);
                  const startAngle = (h / 24) * Math.PI * 2 - Math.PI / 2;
                  const endAngle = ((labelEvents[i + 1] || 24) / 24) * Math.PI * 2 - Math.PI / 2;
                  const x1 = 300 + Math.cos(startAngle) * 200;
                  const y1 = 300 + Math.sin(startAngle) * 200;
                  const x2 = 300 + Math.cos(endAngle) * 200;
                  const y2 = 300 + Math.sin(endAngle) * 200;
                  const x3 = 300 + Math.cos(endAngle) * 240;
                  const y3 = 300 + Math.sin(endAngle) * 240;
                  const x4 = 300 + Math.cos(startAngle) * 240;
                  const y4 = 300 + Math.sin(startAngle) * 240;
                  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
                  return (
                    <path key={i}
                      d={`M ${x1} ${y1} A 200 200 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A 240 240 0 ${largeArc} 0 ${x4} ${y4} Z`}
                      fill="#C6A87C" fillOpacity={isActive ? 0.25 : 0.05} stroke="#C6A87C" strokeOpacity="0.2" />
                  );
                })}
                {/* hour hand */}
                {(() => {
                  const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
                  const tipX = 300 + Math.cos(angle) * 240;
                  const tipY = 300 + Math.sin(angle) * 240;
                  return (
                    <>
                      <line x1="300" y1="300" x2={tipX} y2={tipY} stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
                      <circle cx={tipX} cy={tipY} r="6" fill="#4ADE80" />
                      <circle cx={tipX} cy={tipY} r="14" fill="none" stroke="#4ADE80" strokeOpacity="0.4">
                        <animate attributeName="r" values="6;20;6" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  );
                })()}
                {/* center hub */}
                <circle cx="300" cy="300" r="40" fill="#020202" stroke="#C6A87C" strokeOpacity="0.4" />
                <circle cx="300" cy="300" r="4" fill="#C6A87C" />
                <text x="300" y="280" textAnchor="middle" className="font-mono" fontSize="9" fill="#C6A87C" fillOpacity="0.5">T-NOW</text>
                <text x="300" y="325" textAnchor="middle" className="font-serif" fontSize="32" fill="#EAE6DF" fontStyle="italic">{String(hour).padStart(2, '0')}:00</text>
              </svg>
            </div>
          </FadeIn>

          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" /> Aktualna faza cyklu
            </div>
            {labelEvents.map((h, i) => {
              const next = labelEvents[i + 1] || 24;
              const isActive = hour >= h && hour < next;
              const e = events[h];
              return (
                <div key={i} data-testid={`clock-event-${h}`} className={`p-6 rounded-2xl border transition-all duration-700 ${isActive ? 'bg-[#C6A87C]/10 border-[#C6A87C]/40 translate-x-2' : 'border-[#C6A87C]/5 opacity-40'}`}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className={`font-mono text-[10px] tracking-[0.3em] ${isActive ? 'text-[#4ADE80]' : 'text-[#C6A87C]/40'}`}>
                      {String(h).padStart(2, '0')}:00 — {String(next).padStart(2, '0')}:00
                    </span>
                    <span className={`font-serif italic text-2xl ${isActive ? 'text-[#EAE6DF]' : 'text-[#EAE6DF]/40'}`}>{e.l}</span>
                  </div>
                  {isActive && (
                    <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed mt-3">{e.d}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Microbial taxonomy — bacteria specimen page
const MicrobialTaxonomy = () => {
  const microbes = [
    {
      genus: 'Methanosarcina',
      species: 'M. barkeri',
      role: 'Metanogen acetoklastyczny',
      desc: "An irregularly shaped polygonal archaeon. It produces 70% of the reactor's methane by decomposing acetate into CH₄ and CO₂. Optimal pH is 6.8–7.4.",
      phylum: 'Euryarchaeota',
      yield: '0.42',
      svg: 'sarcina',
      kingdom: 'Archaea',
    },
    {
      genus: 'Methanobacterium',
      species: 'M. formicicum',
      role: 'Metanogen hydrogenotroficzny',
      desc: 'A rod-shaped bacterium 2–8 µm in length. It uses hydrogen and CO₂ to produce methane. Essential during the initial phase when free fatty acids dominate.',
      phylum: 'Euryarchaeota',
      yield: '0.28',
      svg: 'rod',
      kingdom: 'Archaea',
    },
    {
      genus: 'Ruminococcus',
      species: 'R. albus',
      role: 'Bakteria hydrolityczna',
      desc: "An anaerobe that breaks down cellulose and hemicellulose. It forms the first rung of the reactor's food chain and operates highly efficiently in mesophilic conditions (38 °C).",
      phylum: 'Bacillota',
      yield: '—',
      svg: 'rod',
      kingdom: 'Bacteria',
    },
    {
      genus: 'Bacteroides',
      species: 'B. cellulosolvens',
      role: 'Bakteria fermentacyjna',
      desc: 'Anaerobic Gram-negative rod. Converts simple sugars into volatile fatty acids (VFA) — fuel for methanogens.',
      phylum: 'Bacteroidetes',
      yield: '—',
      svg: 'curve',
      kingdom: 'Bacteria',
    },
  ];
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="microbial-taxonomy">
      <div className="absolute inset-0 bg-pinstripes opacity-30" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 border-b border-[#C6A87C]/15 pb-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Beaker className="w-3.5 h-3.5" strokeWidth={1} /> Microbiological taxonomy — the living staff of the reactor
              </div>
              <h2 className="text-6xl md:text-[8.5rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Niewidzialni <br/><span className="italic text-[#C6A87C] font-Standardl">pracownicy.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              A billion cells operate in a single drop of substrate. Bacteria and archaea are our true engineers—we select the most efficient strains tailored specifically to the local reactor diet.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10">
          {microbes.map((m, i) => (
            <FadeIn key={i} delay={i * 120} className="bg-[#030404] p-10 relative group">
              {/* specimen label */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Specimen N° {String(i + 1).padStart(3, '0')}</div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase">{m.kingdom} / {m.phylum}</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#C6A87C]/30 flex items-center justify-center wax-seal">
                  <Atom className="w-4 h-4 text-[#C6A87C]/60" strokeWidth={1} />
                </div>
              </div>

              {/* illustration */}
              <div className="aspect-square mb-8 flex items-center justify-center bg-[#020202]/40 rounded-2xl relative overflow-hidden">
                <svg viewBox="0 0 200 200" className="w-32 h-32">
                  {m.svg === 'sarcina' && (
                    <>
                      {[[80, 80], [120, 80], [80, 120], [120, 120], [100, 100]].map(([x, y], k) => (
                        <polygon key={k} points={`${x-12},${y} ${x},${y-14} ${x+12},${y} ${x+10},${y+12} ${x-10},${y+12}`} fill="#C6A87C" fillOpacity="0.3" stroke="#C6A87C" strokeOpacity="0.7" />
                      ))}
                      <circle cx="100" cy="100" r="60" fill="none" stroke="#C6A87C" strokeOpacity="0.15" strokeDasharray="2 3" />
                    </>
                  )}
                  {m.svg === 'rod' && (
                    <>
                      <rect x="50" y="90" width="100" height="20" rx="10" fill="#C6A87C" fillOpacity="0.3" stroke="#C6A87C" strokeOpacity="0.7" />
                      <rect x="60" y="95" width="20" height="10" rx="5" fill="#4ADE80" fillOpacity="0.6" />
                      <rect x="120" y="95" width="20" height="10" rx="5" fill="#4ADE80" fillOpacity="0.6" />
                      <path d="M 30 100 Q 40 90, 50 100" fill="none" stroke="#C6A87C" strokeOpacity="0.4" />
                      <path d="M 30 100 Q 40 110, 50 100" fill="none" stroke="#C6A87C" strokeOpacity="0.4" />
                      <path d="M 150 100 Q 160 90, 170 100" fill="none" stroke="#C6A87C" strokeOpacity="0.4" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#C6A87C" strokeOpacity="0.15" strokeDasharray="2 3" />
                    </>
                  )}
                  {m.svg === 'curve' && (
                    <>
                      <path d="M 40 100 Q 60 60, 100 100 T 160 100" fill="none" stroke="#C6A87C" strokeOpacity="0.7" strokeWidth="14" strokeLinecap="round" />
                      <path d="M 40 100 Q 60 60, 100 100 T 160 100" fill="none" stroke="#4ADE80" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#C6A87C" strokeOpacity="0.15" strokeDasharray="2 3" />
                    </>
                  )}
                </svg>
                {/* scale bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-[#C6A87C]/40" />
                  <span className="font-mono text-[8px] text-[#C6A87C]/40 tracking-[0.2em]">5 µm</span>
                </div>
                <div className="absolute top-3 right-3 reg-mark" style={{width:'14px',height:'14px'}} />
              </div>

              {/* names */}
              <div className="mb-6">
                <h3 className="font-serif italic text-3xl text-[#EAE6DF] font-light leading-tight">{m.genus}</h3>
                <div className="font-serif italic text-base text-[#C6A87C]/80 mt-1">{m.species}</div>
              </div>
              <div className="font-mono text-[9px] text-[#4ADE80] tracking-[0.3em] uppercase mb-4 pb-4 border-b border-[#C6A87C]/15">{m.role}</div>
              <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed mb-6">{m.desc}</p>
              {m.yield !== '—' && (
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl text-[#C6A87C] font-light">{m.yield}</span>
                  <span className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.2em] uppercase">m³ CH₄ / mol C</span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 font-mono text-[7px] text-[#C6A87C]/20 tracking-[0.4em] uppercase rotate-90 origin-bottom-right">— GP COLLECTION</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Press wall — as featured in
const PressWall = () => {
  const press = [
    { outlet: 'PULS BIZNESU', date: '08.2024', headline: 'Agricultural biogas plants have great potential in Poland', cat: 'Market', url: 'https://www.pb.pl/biogazownie-rolnicze-maja-w-polsce-wielki-potencjal-1193306' },
    { outlet: 'FORBES POLSKA', date: '12.2023', headline: 'From 2026, Polish companies and homes may be powered by blue fuel', cat: 'Analysis', url: 'https://news.google.com/rss/articles/CBMilgFBVV95cUxOUWV4ZmpIZ0ZVS3lSMDB2UE9tS1BwU01tNVhtamw0WlUweHpxNzlqOVRmUllEajItM281RzQ4S281REszeDBJNEJ4Z3c3ZDBIek82Xy02T2lRdlF3bm16YW84RE9tV3YteWVvNGQ5MkpJd0J0S3psclRRMmJqWjBxbVBNUW1qZnl4aTR4TzF3eWRsSWxQcVE?oc=5' },
    { outlet: 'RZECZPOSPOLITA', date: '09.2023', headline: 'Polska jest u progu nowej, zielonej rewolucji. Motorem biogaz.', cat: 'Energetyka', url: 'https://news.google.com/rss/articles/CBMisgFBVV95cUxNb1htZWRwSElPZHJ4dER1TmhfT2pLdmZxbUhjckc2Rnlhbjd5Uk1wTHpIT21XSVcxQ1hOZUw4TjBtb0YxUkV1aTh4aU04dFh2YWVIVV9rY1g4TkxXQ2h6WjQxdmF0RGJNS0hHWHB2Y0lXNWZqTEp3akM3NEpIRnlqTW5fOGQ3aWw2YmVfTVQxUWxGNDJqZmxNUXF2aVdNRDBzWUNNbVl2N2FkNVVndGZpSFFn?oc=5' },
    { outlet: 'FORUM ENERGII', date: '02.2024', headline: 'Biomethane in Poland. Potential Assessment (Report)', cat: 'Report', url: 'https://news.google.com/rss/articles/CBMiY0FVX3lxTE9GWHg1SVRLd2R6RFRZSHp0cmhYcmVEd3dtWXZ0V3lIWGpMV0k5NW1jajFvLXZtWnFYX0wwRUZzUUtjZkoyUjVlOFJFRWdmbG1pTmh2ektyXzN2Z3E0OU1ZckQ0VQ?oc=5' },
    { outlet: 'AGRO PROFIL', date: '01.2024', headline: 'New varieties of corn for grain, silage, and biogas', cat: 'Education', url: 'https://news.google.com/rss/articles/CBMilgFBVV95cUxQbnNfMXlrWGtjSV9Vd2dQcEl3UE1HVmM4ZXNUcUJPSExmempLTzhOQ2I2Zk5NRkd4cG1lYm1zSWNEaVk2MC0tSm9aQ2p2dnMtVk5NZGZUZS1pektLY1pVTlpwYkRXMlgyeklGWTk1SEJPY0t5a0tjUXVab0l5ZUlhem9wcW80eG1keVNsSmE0LTdqLXdlNWc?oc=5' },
    { outlet: 'Market ENERGII', date: '05.2023', headline: 'Agricultural biogas as an element of the circular economy', cat: 'Analysis', url: 'https://news.google.com/rss/articles/CBMiTkFVX3lxTFBhMWw4Vy1vTE9qVWpuNjhPenlRNm9aeUVTVmlpcGFNQ0R5d2VMMEN5bkhqZWpiTVJpWjJzU2hMVDdoYzNMbzFRSGpLU3BIdw?oc=5' },
  ];
  return (
    <section className="relative py-40 bg-[#020202] overflow-hidden" data-testid="press-wall">
      <div className="absolute inset-0 technical-grid opacity-5" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20 border-b border-[#C6A87C]/15 pb-10">
            <div className="lg:col-span-8">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
                <FileText className="w-3.5 h-3.5" strokeWidth={1} /> Recommended reading — industry briefing
              </div>
              <h2 className="text-5xl md:text-[7rem] font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">
                Polecane <br/><span className="italic text-[#C6A87C] font-Standardl">lektury.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 text-right">
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-2">— Selekcja redakcyjna</div>
              <div className="font-serif italic text-2xl text-[#EAE6DF]/60">What to track in the sector</div>
            </div>
          </div>
        </FadeIn>

        {/* logo / wordmark wall */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10 mb-20">
            {press.map((p, i) => (
              <a 
                key={i} 
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#020202] py-12 flex items-center justify-center group cursor-pointer hover:bg-[#050606] transition-all duration-700 interactive-element block"
              >
                <span className="font-serif italic text-2xl md:text-3xl text-[#EAE6DF]/40 group-hover:text-[#C6A87C] transition-colors duration-700 tracking-tight">
                  {p.outlet.split(' ').map((w, j) => (
                    <React.Fragment key={j}>
                      {j === 0 ? w : <em className="not-italic font-light"> {w}</em>}
                    </React.Fragment>
                  ))}
                </span>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* headline list */}
        <div className="space-y-px bg-[#C6A87C]/10">
          {press.map((p, i) => (
            <FadeIn key={i} delay={i * 60}>
              <a 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#020202] py-10 grid md:grid-cols-12 gap-8 items-baseline group hover:bg-[#050606] transition-all duration-500 interactive-element px-8 -mx-8 border-b border-[#C6A87C]/10 block"
              >
                <div className="md:col-span-2 font-mono text-[10px] text-[#C6A87C] tracking-[0.3em] uppercase">{p.date}</div>
                <div className="md:col-span-2 font-serif italic text-[#C6A87C]/70 text-lg">{p.outlet}</div>
                <div className="md:col-span-7 font-serif text-2xl md:text-3xl text-[#EAE6DF] leading-tight font-light group-hover:text-[#C6A87C] transition-colors duration-500">
                  „{p.headline}"
                </div>
                <div className="md:col-span-1 text-right font-mono text-[8px] text-[#EAE6DF]/40 tracking-[0.3em] uppercase">{p.cat}</div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// 14-month Gantt construction timeline
const GanttBuild = () => {
  const months = ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11', 'M12', 'M13', 'M14'];
  const phases = [
    { name: 'BMP Analysis + feasibility study', start: 0, end: 2, color: '#C6A87C', cat: 'PRE' },
    { name: 'Permits + PIS + environmental decision', start: 1, end: 4, color: '#C6A87C', cat: 'ADM' },
    { name: 'Projekt budowlany + PNB', start: 3, end: 6, color: '#C6A87C', cat: 'ENG' },
    { name: 'Roboty ziemne + fundamenty', start: 5, end: 7, color: '#D97847', cat: 'CIV' },
    { name: 'Reinforced concrete pouring of chambers', start: 6, end: 9, color: '#D97847', cat: 'CIV' },
    { name: 'Installation of EPDM membranes + tanks', start: 8, end: 10, color: '#D97847', cat: 'MECH' },
    { name: 'CHP assembly + pump systems', start: 9, end: 11, color: '#D97847', cat: 'MECH' },
    { name: 'Instalacja SCADA + Grid energetyczna', start: 10, end: 12, color: '#4ADE80', cat: 'I&C' },
    { name: 'Inoculation + start-up filling', start: 11, end: 12, color: '#4ADE80', cat: 'BIO' },
    { name: 'Rozruch technologiczny + odbiory UDT', start: 12, end: 13, color: '#4ADE80', cat: 'CMS' },
    { name: 'Komercyjna Operation (COD)', start: 13, end: 14, color: '#4ADE80', cat: 'COD' },
  ];
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="gantt-build">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20 border-b border-[#C6A87C]/15 pb-10">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
                <GitBranch className="w-3.5 h-3.5" strokeWidth={1} /> Schedule — 14 months
              </div>
              <h2 className="text-5xl md:text-[7.5rem] font-serif text-[#EAE6DF] leading-[0.95] pb-1 font-light">
                Od podpisu <br/>do pierwszego <br/><span className="italic text-[#C6A87C] font-Standardl">m³ biogazu.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Standard 0.5 MW biogas plant design. 11 phases, 14 months, 3 execution categories. No delays — secured by contractual penalties.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="glass-morphism rounded-[2rem] p-10 overflow-x-auto">
            <div className="min-w-[1000px]">
            {/* header */}
            <div className="grid mb-8 pb-4 border-b border-[#C6A87C]/15" style={{ gridTemplateColumns: '4fr repeat(14, 1fr)', gap: '2px' }}>
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">Faza / Cat.</div>
              {months.map((m, i) => (
                <div key={i} className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.2em] uppercase text-center">{m}</div>
              ))}
            </div>
            {/* rows */}
            <div className="space-y-1">
              {phases.map((p, i) => (
                <FadeIn key={i} delay={i * 60}>
                  <div className="grid items-center py-2 group" style={{ gridTemplateColumns: '4fr repeat(14, 1fr)', gap: '2px' }}>
                    <div className="pr-6 flex items-center gap-4">
                      <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1 rounded" style={{ color: p.color, backgroundColor: `${p.color}15` }}>{p.cat}</span>
                      <span className="font-serif italic text-base text-[#EAE6DF]/80 group-hover:text-[#EAE6DF] transition-colors">{p.name}</span>
                    </div>
                    {months.map((_, m) => {
                      const isInRange = m >= p.start && m < p.end;
                      const isStart = m === p.start;
                      const isEnd = m === p.end - 1;
                      return (
                        <div key={m} className="relative h-6 flex items-center">
                          {isInRange && (
                            <div className="absolute inset-y-1 left-0 right-0 transition-all duration-700"
                              style={{
                                backgroundColor: p.color,
                                opacity: 0.7,
                                borderTopLeftRadius: isStart ? 4 : 0,
                                borderBottomLeftRadius: isStart ? 4 : 0,
                                borderTopRightRadius: isEnd ? 4 : 0,
                                borderBottomRightRadius: isEnd ? 4 : 0,
                                boxShadow: `0 0 8px ${p.color}40`,
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </FadeIn>
              ))}
            </div>
            {/* milestones */}
            <div className="grid mt-10 pt-8 border-t border-[#C6A87C]/15" style={{ gridTemplateColumns: '4fr repeat(14, 1fr)', gap: '2px' }}>
              <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full" /> Kamienie milowe
              </div>
              {months.map((_, m) => {
                const ms = { 1: 'KIP', 3: 'PNB', 6: 'CIV', 11: 'M&E', 13: 'COD' }[m];
                return (
                  <div key={m} className="text-center">
                    {ms && (
                      <div className="font-mono text-[8px] text-[#4ADE80] tracking-[0.1em] flex items-center justify-center gap-1">
                        <span className="w-1 h-1 bg-[#4ADE80] rounded-full" /> {ms}
                      </div>
                    )}
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {[
            { c: '#C6A87C', l: 'Faza przygotowawcza', d: 'Analizy, pozwolenia, projekt' },
            { c: '#D97847', l: 'Wykonawstwo', d: 'Cywilne + mechaniczne' },
            { c: '#4ADE80', l: 'Rozruch', d: 'I&C, BIO, odbiory' },
            { c: '#EAE6DF', l: 'Operation', d: 'COD — full operational power' },
          ].map((l, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-6 h-6 mt-1 rounded" style={{ backgroundColor: l.c, opacity: 0.7, boxShadow: `0 0 12px ${l.c}40` }} />
              <div>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#EAE6DF]/70 mb-1">{l.l}</div>
                <div className="font-serif italic text-sm text-[#EAE6DF]/40">{l.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Energy comparison — editorial horizontal bars
const EnergyComparison = () => {
  const dims = [
    { key: 'Stability dostaw (8000h/rok)', max: 100, sources: [
      { n: 'Biogaz', v: 95, hi: true },
      { n: 'Coal', v: 90 },
      { n: 'Wiatr', v: 26 },
      { n: 'Solar', v: 12 },
    ]},
    { key: 'Emisja CO₂ ekw. (g/kWh)', max: 1100, inverted: true, sources: [
      { n: 'Biogaz', v: -25, hi: true },
      { n: 'Coal', v: 1040 },
      { n: 'Wiatr', v: 11 },
      { n: 'Solar', v: 45 },
    ]},
    { key: 'Powierzchnia (m²/MWh)', max: 60, inverted: true, sources: [
      { n: 'Biogaz', v: 8, hi: true },
      { n: 'Coal', v: 4 },
      { n: 'Wiatr', v: 55 },
      { n: 'Solar', v: 18 },
    ]},
    { key: 'CAPEX (M€/MW)', max: 8, inverted: true, sources: [
      { n: 'Biogaz', v: 3.5, hi: true },
      { n: 'Coal', v: 2.2 },
      { n: 'Wiatr', v: 1.6 },
      { n: 'Solar', v: 0.9 },
    ]},
  ];
  return (
    <section className="relative py-48 bg-[#050505] overflow-hidden" data-testid="energy-comparison">
      <div className="absolute inset-0 paper-grain opacity-15" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 border-b border-[#C6A87C]/15 pb-12">
            <div className="lg:col-span-8">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Gauge className="w-3.5 h-3.5" strokeWidth={1} /> Comparative energy source analysis
              </div>
              <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Four sources, <br/><span className="italic text-[#C6A87C] font-Standardl">one equation.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Biogas isn't the cheapest. It isn't the most space-efficient. But it is the only energy source that combines baseload stability with a negative carbon footprint.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-20">
          {dims.map((d, i) => {
            const maxVal = Math.max(...d.sources.map(s => Math.abs(s.v)));
            return (
              <FadeIn key={i} delay={i * 80}>
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-3">
                    <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-3">Wymiar {String(i + 1).padStart(2, '0')}</div>
                    <h3 className="font-serif text-3xl text-[#EAE6DF] font-light leading-tight">{d.key}</h3>
                    {d.inverted && <div className="font-mono text-[8px] text-[#D97847] tracking-[0.3em] uppercase mt-3">↓ mniej = lepiej</div>}
                  </div>
                  <div className="lg:col-span-9 space-y-3">
                    {d.sources.map((s, j) => {
                      const isNeg = s.v < 0;
                      const w = (Math.abs(s.v) / maxVal) * 100;
                      const color = s.hi ? '#C6A87C' : isNeg ? '#4ADE80' : (j === 1 ? '#D97847' : '#EAE6DF');
                      return (
                        <div key={j} className="flex items-center gap-6 group">
                          <div className="w-24 font-mono text-[10px] text-[#EAE6DF]/60 tracking-[0.2em] uppercase">{s.n}</div>
                          <div className="flex-1 h-12 relative bg-[#C6A87C]/[0.04] overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 transition-all duration-1500 ease-out"
                              style={{ width: `${w}%`, backgroundColor: color, opacity: s.hi ? 0.9 : 0.4, boxShadow: s.hi ? `0 0 30px ${color}40` : 'none' }}
                            />
                            {s.hi && (
                              <div className="absolute inset-0 flex items-center pl-4">
                                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#050505] font-bold">GREEN PLANT TECHNOLOGIES</span>
                              </div>
                            )}
                            {isNeg && (
                              <div className="absolute inset-0 flex items-center pl-4">
                                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#050505] font-bold">UJEMNA</span>
                              </div>
                            )}
                          </div>
                          <div className="w-32 text-right">
                            <span className="font-serif text-3xl font-light" style={{ color }}>{s.v > 0 ? s.v : s.v}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={400}>
          <div className="mt-32 pt-12 border-t border-[#C6A87C]/15 grid md:grid-cols-3 gap-12">
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.4em] uppercase mb-3">Data source</div>
              <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed">
                Energy Forum 2025, IEA World Energy Outlook 2024, industry data of the agricultural biogas sector in the EU. Averaged values for a 0.5 MW project.
              </p>
            </div>
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.4em] uppercase mb-3">Dlaczego ujemny CO₂</div>
              <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed">
                A biogas plant doesn't just achieve zero emissions—it actively utilizes methane that would otherwise escape from slurry into the atmosphere. Hence, a footprint of −25 g/kWh.
              </p>
            </div>
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.4em] uppercase mb-3">Czego nie pokazuje wykres</div>
              <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed">
                Revenue from digestate, eliminated slurry disposal costs, energy independence, and the positive impact on local agriculture. This fundamentally changes the equation.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Glossary lexicon — encyclopedia-style technical terms
const GlossaryLexicon = () => {
  const terms = [
    { letter: 'A', name: 'ATEX', latin: 'Directive 2014/34/EU', def: 'European Directive regulating equipment in potentially explosive atmospheres. All Reactor elements working with methane are classified as EX zone 1 or 2.', ref: 'STD' },
    { letter: 'B', name: 'BMP', latin: 'Biochemical Methane Potential', def: 'Laboratory test measuring maximum methane yield from a given biomass. Lasts 30–60 days. The basis for every design decision.', ref: 'TEST' },
    { letter: 'C', name: 'CHP', latin: 'Combined Heat and Power', def: 'Combined Heat and Power. Reaches total efficiency of up to 90%—compared to just 35% for standalone electricity generation.', ref: 'TECH' },
    { letter: 'D', name: 'Availability factor', latin: 'Availability factor', def: 'The percentage of time the plant is fully operational. GP guarantees 98% availability—approx. 8,600 hours per year.', ref: 'METRIC' },
    { letter: 'E', name: 'EPC', latin: 'Engineering, Procurement, Construction', def: 'A turnkey contract model. The contractor is fully responsible for the design, procurement, and execution of the investment, delivering a fully operational plant meeting specified yield guarantees.', ref: 'LEGAL' },
    { letter: 'F', name: 'Mesophilic digestion', latin: 'Mesophilic digestion', def: 'Fermentation process at 35–40 °C. Most commonly used — a compromise between decomposition rate and microbiome stability.', ref: 'PROC' },
    { letter: 'H', name: 'H₂S', latin: 'Hydrogen sulfide', def: 'A toxic, highly corrosive gas. Exceeding limits (e.g., above 200 ppm) risks severe damage to the CHP engine.', ref: 'BIO' },
    { letter: 'K', name: 'KIP', latin: 'Project Information Sheet', def: 'The first official document in the environmental permit acquisition process. Contains location, technology, planned emissions.', ref: 'ADM' },
    { letter: 'L', name: 'LKT', latin: 'Volatile Fatty Acids', def: 'Intermediate fermentation products. Their excess (limit approx. 3-4 g/L) signals a process disturbance — so-called Reactor acidosis.', ref: 'BIO' },
    { letter: 'M', name: 'Methanogenesis', latin: 'Methanogenesis', def: 'The final phase of anaerobic fermentation. Archaea transform acetate and hydrogen into methane and carbon dioxide. This phase is the true economic heart of the business.', ref: 'BIO' },
    { letter: 'O', name: 'OZE', latin: 'Renewable Energy Sources', def: 'Polish support system including auctions and support tariffs (FIT). Agricultural biogas has its own basket — without competition from wind and solar.', ref: 'LEGAL' },
    { letter: 'P', name: 'Poferment', latin: 'Digestate', def: 'A fermentation byproduct. Odorless and rich in nitrogen, phosphorus, and potassium. Fully replaces synthetic fertilizers. A 0.5 MW plant yields 30 tons daily.', ref: 'PROD' },
    { letter: 'S', name: 'SCADA', latin: 'Supervisory Control and Data Acquisition', def: 'The Supervisory Control and Data Acquisition system. It processes thousands of variables per second, with an algorithm precisely controlling every valve and pump.', ref: 'I&C' },
    { letter: 'U', name: 'UDT', latin: 'Office of Technical Inspection', def: 'The regulatory body supervising pressure vessels, pipelines, and critical equipment. Every biogas plant is subject to strict annual inspections.', ref: 'ADM' },
  ];
  return (
    <section className="relative py-48 bg-[#020202] overflow-hidden" data-testid="glossary-lexicon">
      <div className="absolute inset-0 bg-pinstripes opacity-30" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 border-b border-[#C6A87C]/15 pb-12">
            <div className="lg:col-span-8">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <FileText className="w-3.5 h-3.5" strokeWidth={1} /> Leksykon biogazowni — A do U
              </div>
              <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Industry <br/><span className="italic text-[#C6A87C] font-Standardl">glossary.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Every industry has its own language. Here are 14 terms that separate the engineer from the dilettante. It reads like the Encyclopaedia Britannica.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-px">
          {terms.map((t, i) => (
            <FadeIn key={i} delay={i * 30} className="group py-8 border-b border-[#C6A87C]/10 flex gap-8 items-baseline hover:border-[#C6A87C]/30 transition-colors duration-700">
              <div className="font-serif italic text-7xl text-[#C6A87C]/30 group-hover:text-[#C6A87C]/70 transition-colors duration-700 leading-none w-20 shrink-0">
                {t.letter}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-2">
                  <h3 className="font-serif text-3xl text-[#EAE6DF] font-light">{t.name}</h3>
                  <span className="font-serif italic text-base text-[#C6A87C]/60">— {t.latin}</span>
                </div>
                <p className="font-serif italic text-base text-[#EAE6DF]/55 leading-relaxed">{t.def}</p>
                <div className="mt-3 font-mono text-[8px] text-[#C6A87C]/40 tracking-[0.4em] uppercase">CAT: {t.ref} / N° {String(i + 1).padStart(3, '0')}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Material samples — architect's mood board
const MaterialSamples = () => {
  const materials = [
    {
      name: 'Beton C35/45',
      cat: 'Load-bearing structure',
      spec: 'Klasa ekspozycji XA3 / XF2 / W10',
      desc: 'Hydrotechnical concrete with P10 gas tightness. 28-day compressive strength 45 MPa. Reinforced with BSt 500 S rebar.',
      thick: '40 cm',
      origin: 'EU · Ganddze',
      visual: 'concrete',
    },
    {
      name: 'Stal 1.4571',
      cat: 'Komponenty kontaktowe',
      spec: 'AISI 316Ti / X6CrNiMoTi17-12-2',
      desc: 'Austenitic acid-resistant steel with titanium. Resistant to H₂S, NH₃ and Volatile Fatty Acids. TIG welded in an argon atmosphere.',
      thick: '4 mm',
      origin: 'DE · Outokumpu',
      visual: 'steel',
    },
    {
      name: 'EPDM Vario-D',
      cat: 'Membrana gazoszczelna',
      spec: 'Etylen-Propylen-Dien M-class',
      desc: 'Double-layer membrane. The upper stores biogas, the lower protects against oxygen ingress. 25-year lifespan.',
      thick: '1.5 mm',
      origin: 'AT · Sattler',
      visual: 'membrane',
    },
    {
      name: 'Copper Cu-DHP',
      cat: 'Heat exchangers',
      spec: 'Cu-DHP (CW024A) / 99.90% Cu',
      desc: 'Oxygen-free high-conductivity copper. Thermal conductivity 380 W/m·K. Alfa Laval plate heat exchangers for heat recovery from CHP exhaust gases.',
      thick: '2 mm',
      origin: 'SE · Alfa Laval',
      visual: 'copper',
    },
  ];
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="material-samples">
      <div className="absolute inset-0 technical-grid opacity-5" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20 border-b border-[#C6A87C]/15 pb-10">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Wrench className="w-3.5 h-3.5" strokeWidth={1} /> Material sample — architect's moodboard
              </div>
              <h2 className="text-6xl md:text-[8.5rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                What <br/><span className="italic text-[#C6A87C] font-Standardl">it consists of.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Concrete from Ganddze. Steel from Tornio. Membrane from Graz. Copper from Linköping. Four materials that together weigh 320 tons and will survive 25 winters.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10">
          {materials.map((m, i) => (
            <FadeIn key={i} delay={i * 100} className="bg-[#030404] group">
              {/* Material swatch */}
              <div className="aspect-square relative overflow-hidden">
                {m.visual === 'concrete' && (
                  <div className="absolute inset-0" style={{
                    background: `
                      radial-gradient(circle at 30% 20%, rgba(155,150,140,0.4), transparent 8%),
                      radial-gradient(circle at 70% 60%, rgba(140,135,125,0.5), transparent 6%),
                      radial-gradient(circle at 50% 80%, rgba(170,165,155,0.3), transparent 7%),
                      radial-gradient(circle at 20% 70%, rgba(125,120,110,0.4), transparent 5%),
                      linear-gradient(135deg, #6b665e 0%, #8a8479 50%, #5e5950 100%)
                    `,
                    filter: 'contrast(0.85)',
                  }} />
                )}
                {m.visual === 'steel' && (
                  <>
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(135deg, #2a2d30 0%, #5a6066 50%, #2a2d30 100%)`,
                    }} />
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent 0, transparent 3px, rgba(255,255,255,0.04) 3px, rgba(255,255,255,0.04) 4px)',
                    }} />
                  </>
                )}
                {m.visual === 'membrane' && (
                  <>
                    <div className="absolute inset-0" style={{
                      background: `radial-gradient(circle at 50% 50%, #1f2620 0%, #0d1410 100%)`,
                    }} />
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(74,222,128,0.08), transparent 40%), radial-gradient(circle at 70% 70%, rgba(198,168,124,0.06), transparent 40%)',
                    }} />
                  </>
                )}
                {m.visual === 'copper' && (
                  <>
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(135deg, #8a4a2a 0%, #c47245 30%, #b5613a 60%, #8a4a2a 100%)`,
                    }} />
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)',
                    }} />
                  </>
                )}
                {/* Overlay grain */}
                <div className="absolute inset-0 paper-grain opacity-30 mix-blend-overlay" />
                {/* Reg marks */}
                <div className="absolute top-3 left-3 reg-mark" style={{ width: '14px', height: '14px' }} />
                <div className="absolute top-3 right-3 reg-mark" style={{ width: '14px', height: '14px' }} />
                <div className="absolute bottom-3 left-3 reg-mark" style={{ width: '14px', height: '14px' }} />
                <div className="absolute bottom-3 right-3 reg-mark" style={{ width: '14px', height: '14px' }} />
                {/* Sample number */}
                <div className="absolute top-6 left-6">
                  <div className="font-mono text-[8px] text-[#EAE6DF]/70 tracking-[0.3em] uppercase backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
                    SAMPLE NO {String(i + 1).padStart(3, '0')}
                  </div>
                </div>
                {/* Thickness label */}
                <div className="absolute bottom-6 left-6">
                  <div className="font-mono text-[9px] text-[#EAE6DF] tracking-[0.3em] uppercase backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded">
                    {m.thick}
                  </div>
                </div>
              </div>

              {/* Spec sheet */}
              <div className="p-8">
                <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.4em] uppercase mb-3">{m.cat}</div>
                <h3 className="font-serif text-3xl text-[#EAE6DF] font-light mb-2">{m.name}</h3>
                <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.2em] uppercase mb-6 pb-4 border-b border-[#C6A87C]/15">{m.spec}</div>
                <p className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed mb-6">{m.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-[#C6A87C]/10">
                  <span className="font-mono text-[8px] text-[#C6A87C]/50 tracking-[0.3em] uppercase">{m.origin}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A87C]/40 group-hover:text-[#C6A87C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" strokeWidth={1} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Kinetic break II — diagonal overlapping massive type
const KineticBreakII = () => {
  const layers = [
    { txt: 'DESIGN · SUPERVISION · OPTIMIZATION · SERVICE ·', size: '12rem', dir: 'Standardl', dur: '50s', color: 'transparent', stroke: true, ts: '-0.04em' },
    { txt: 'biologia × technologia × ekonomia ×', size: '8rem', dir: 'reverse', dur: '35s', color: '#C6A87C', italic: true, opacity: 0.7, ts: '-0.02em' },
    { txt: 'CH₄ + CO₂ → PURE CAPITAL · CH₄ + CO₂ → PURE CAPITAL ·', size: '5rem', dir: 'Standardl', dur: '40s', color: '#4ADE80', opacity: 0.5, ts: '0.02em' },
    { txt: 'SUBSTRAT → Reactor → ENERGIA → POFERMENT ·', size: '9rem', dir: 'reverse', dur: '60s', color: '#EAE6DF', italic: true, opacity: 0.15, ts: '-0.03em' },
  ];
  return (
    <section className="relative py-32 bg-[#020202] overflow-hidden" data-testid="kinetic-break-2">
      <div className="absolute inset-0 paper-grain opacity-15" />
      <div className="absolute inset-0 bg-topo opacity-10" />
      <div className="space-y-8 py-8 relative z-10">
        {layers.map((l, i) => (
          <div key={i} className={`flex whitespace-nowrap items-center ${l.dir === 'reverse' ? 'animate-marquee-reverse' : 'animate-marquee'}`}
            style={{ animationDuration: l.dur }}>
            {[...Array(6)].map((_, k) => (
              <span
                key={k}
                className={`font-serif leading-[0.92] pb-2 pr-12 ${l.italic ? 'italic' : ''}`}
                style={{
                  fontSize: `clamp(3rem, ${l.size}, 16rem)`,
                  color: l.stroke ? 'transparent' : l.color,
                  WebkitTextStroke: l.stroke ? `1px ${l.color === 'transparent' ? '#C6A87C50' : l.color}` : '0',
                  opacity: l.opacity ?? 1,
                  letterSpacing: l.ts,
                  fontWeight: l.italic ? 400 : 300,
                }}>
                {l.txt}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

// Kinetic break III — single massive vertical glyph & fragmented words
const KineticBreakIII = () => {
  return (
    <section className="relative bg-[#050505] overflow-hidden flex items-center justify-center" style={{ minHeight: '80vh' }} data-testid="kinetic-break-3">
      <div className="absolute inset-0 halftone opacity-[0.06]" />
      <div className="absolute inset-0 bg-pinstripes opacity-30" />
      {/* Massive italic CH₄ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="font-serif italic font-light leading-[0.9] pb-2 text-[#C6A87C]/[0.07] select-none"
          style={{ fontSize: 'clamp(20rem, 50vw, 60rem)', letterSpacing: '-0.06em' }}
        >
          CH₄
        </span>
      </div>
      {/* Vertical text edges */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 vertical-writing font-mono text-[10px] text-[#C6A87C]/40 tracking-[0.4em] uppercase">
        Metan · CH₄ · 16.04 g/mol · 35 MJ/m³
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 vertical-writing font-mono text-[10px] text-[#C6A87C]/40 tracking-[0.4em] uppercase" style={{ transform: 'translateY(-50%) rotate(180deg)' }}>
        Punkt wrzenia · -161.5 °C · Gaz palny · GWP 28
      </div>
      {/* Foreground content */}
      <div className="relative z-10 text-center max-w-5xl px-8">
        <FadeIn>
          <div className="font-mono text-[#4ADE80] text-[10px] tracking-[0.5em] uppercase mb-12 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-[#4ADE80]" /> Particle one · basis of production <span className="w-12 h-px bg-[#4ADE80]" />
          </div>
          <h2 className="font-serif text-5xl md:text-[6rem] text-[#EAE6DF] leading-[0.95] font-light mb-12 tracking-tight">
            Metan jest <br/>
            <span className="italic text-[#C6A87C]">produktem rolnym</span> <br/>
            like milk, grain, meat.
          </h2>
          <p className="font-serif italic text-2xl text-[#EAE6DF]/55 max-w-3xl mx-auto leading-relaxed">
            Every kilogram we produce in the reactor is a kilogram that didn't escape from slurry into the atmosphere. It's not just energy — it's <span className="text-[#C6A87C] not-italic">utilization that pays for itself</span>.
          </p>
        </FadeIn>
      </div>
      {/* Corner crosshairs */}
      <div className="absolute top-12 left-12 reg-mark" />
      <div className="absolute top-12 right-12 reg-mark" />
      <div className="absolute bottom-12 left-12 reg-mark" />
      <div className="absolute bottom-12 right-12 reg-mark" />
    </section>
  );
};

// Vertical company history timeline since 2008
const TimelineSince2008 = () => {
  const events = [
    { year: '2005', title: 'Biocomponents Act', desc: 'The first legal regulations creating a framework for energy production from agricultural biogas.', cat: 'POLICY' },
    { year: '2008', title: 'Green certificates', desc: 'Introduction of a support system for renewable cogeneration. The first 0.5–1 MW agricultural biogas plants are built.', cat: 'GENESIS' },
    { year: '2011', title: 'The first hundred installations', desc: 'The number of active agricultural biogas plants in Poland exceeds 30. Projects based on corn silage dominate.', cat: 'GROWTH' },
    { year: '2015', title: 'RES Act — auctions', desc: 'Wprowadzenie systemu aukcyjnego. Biogaz rolniczy zyskuje osobny koszyk kontraktowy bez konkurencji z wiatrem i Solarm.', cat: 'POLICY' },
    { year: '2018', title: 'RED II Directive', desc: 'The Union defines sustainability criteria for bioenergy. Every m³ of biogas requires documentation of biomass origin.', cat: 'EU' },
    { year: '2021', title: 'Fit for 55 Package', desc: 'Emphasis on biomethane and municipal biogas plants. Opening of new financial paths under the National Recovery Plan.', cat: 'EU' },
    { year: '2023', title: 'Biomethane strategy', desc: 'Target strategy published — 250 biogas plants by 2030, 4 billion m³ of biomethane annually.', cat: 'POLICY' },
    { year: '2025', title: 'Investment boom', desc: 'The number of projects in building permits exceeds 180. BGK, BOŚ and EBRD launch dedicated financial lines.', cat: 'CAPITAL' },
    { year: '2026', title: 'We are here', desc: 'Wchodzimy na Market z jednym mandatem: industrializacja procesu. Biogazownia jako produkt powtarzalny, projektowany do tych samych norm co rafineria — nie eksperyment.', cat: 'NOW', live: true },
  ];
  return (
    <section className="relative py-48 bg-[#030404] overflow-hidden" data-testid="timeline-2008">
      <div className="absolute inset-0 technical-grid opacity-5" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 border-b border-[#C6A87C]/15 pb-12">
            <div className="lg:col-span-8">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <Activity className="w-3.5 h-3.5" strokeWidth={1} /> Linia czasu — 21 lat regulacji
              </div>
              <h2 className="text-6xl md:text-[9rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Polski biogaz <br/><span className="italic text-[#C6A87C] font-Standardl">od 2005.</span>
              </h2>
            </div>
            <p className="lg:col-span-4 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Nine milestones. Three national laws, two EU directives, one upward trend. This is how the agricultural biogas industry matured.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Central spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C6A87C]/30 to-transparent hidden md:block" />

          <div className="space-y-24">
            {events.map((e, i) => {
              const isRight = i % 2 === 0;
              return (
                <FadeIn key={i} delay={i * 60}>
                  <div className={`grid md:grid-cols-2 gap-12 items-center relative ${isRight ? '' : ''}`}>
                    {/* Node on spine */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:block">
                      {e.live ? (
                        <div className="relative">
                          <div className="w-4 h-4 bg-[#4ADE80] rounded-full" />
                          <div className="absolute inset-0 w-4 h-4 bg-[#4ADE80] rounded-full animate-ping" />
                          <div className="absolute -inset-3 border border-[#4ADE80]/40 rounded-full" />
                        </div>
                      ) : (
                        <div className="w-3 h-3 bg-[#020202] border-2 border-[#C6A87C]/60 rounded-full" />
                      )}
                    </div>

                    {/* Left side */}
                    <div className={`${isRight ? 'md:text-right md:pr-20' : 'md:order-2 md:pl-20'}`}>
                      <div className={`font-mono text-[10px] tracking-[0.4em] uppercase mb-4 ${e.live ? 'text-[#4ADE80]' : 'text-[#C6A87C]/60'}`}>
                        {e.cat}
                      </div>
                      <div className={`font-serif font-light leading-none mb-6 ${e.live ? 'text-[#4ADE80]' : 'text-[#C6A87C]'}`} style={{ fontSize: '7rem' }}>
                        {e.year}
                      </div>
                    </div>

                    {/* Right side */}
                    <div className={`glass-morphism p-10 rounded-[2rem] relative ${isRight ? '' : 'md:order-1'}`}>
                      <h3 className="font-serif text-3xl text-[#EAE6DF] font-light leading-tight mb-4">{e.title}</h3>
                      <p className="font-serif italic text-base text-[#EAE6DF]/55 leading-relaxed">{e.desc}</p>
                      {e.live && (
                        <div className="mt-6 flex items-center gap-3 pt-6 border-t border-[#4ADE80]/20">
                          <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_8px_#4ADE80]" />
                          <span className="font-mono text-[9px] text-[#4ADE80] tracking-[0.4em] uppercase">Aktualnie</span>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Engineering drawing margin annotations
const BlueprintMargin = () => {
  const notes = [
    { code: 'N.001', txt: 'All dimensions in mm unless otherwise noted.' },
    { code: 'N.002', txt: 'Dimensional tolerance acc. to ISO 2768-mK for linear dimensions.' },
    { code: 'N.003', txt: 'Spawanie wg EN ISO 15614-1. Wszystkie spoiny klasy B.' },
    { code: 'N.004', txt: 'Anticorrosion coatings — C5 system acc. to ISO 12944.' },
    { code: 'N.005', txt: 'Beton hydrotechniczny klasa C35/45 W10 XA3.' },
    { code: 'N.006', txt: 'Zbrojenie konstrukcyjne stal BSt 500 S, otulina min. 50 mm.' },
    { code: 'N.007', txt: 'Gas tightness test before UDT acceptance — 50 mbar / 24h overpressure.' },
    { code: 'N.008', txt: 'Explosive atmospheres — classification acc. to EN 60079-10-1.' },
    { code: 'N.009', txt: 'Equipotential bonding of all metal elements — resistance < 10 Ω.' },
    { code: 'N.010', txt: 'Engine tightness check with lambda — 200 mth interval.' },
  ];
  return (
    <section className="relative py-32 bg-[#020202] overflow-hidden" data-testid="blueprint-margin">
      <div className="absolute inset-0 bg-blueprint opacity-15" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        {/* Drawing header */}
        <FadeIn>
          <div className="border border-[#C6A87C]/30 grid grid-cols-12 mb-16">
            <div className="col-span-6 p-8 border-r border-[#C6A87C]/30">
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-3">Drawing title</div>
              <h2 className="font-serif text-5xl text-[#EAE6DF] font-light leading-tight">
                Agricultural biogas plant 0.5 MW <br/><span className="italic text-[#C6A87C]">— longitudinal section.</span>
              </h2>
            </div>
            <div className="col-span-3 grid grid-rows-3">
              <div className="p-5 border-b border-[#C6A87C]/30 border-r">
                <div className="font-mono text-[7px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Skala</div>
                <div className="font-mono text-lg text-[#EAE6DF]">1:200</div>
              </div>
              <div className="p-5 border-b border-[#C6A87C]/30 border-r">
                <div className="font-mono text-[7px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Format</div>
                <div className="font-mono text-lg text-[#EAE6DF]">A1</div>
              </div>
              <div className="p-5 border-r">
                <div className="font-mono text-[7px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Numer arkusza</div>
                <div className="font-mono text-lg text-[#EAE6DF]">014 / 47</div>
              </div>
            </div>
            <div className="col-span-3 grid grid-rows-3">
              <div className="p-5 border-b border-[#C6A87C]/30">
                <div className="font-mono text-[7px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Drawn by</div>
                <div className="font-serif italic text-lg text-[#EAE6DF]">M. Krawczyk</div>
              </div>
              <div className="p-5 border-b border-[#C6A87C]/30">
                <div className="font-mono text-[7px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Checked by</div>
                <div className="font-serif italic text-lg text-[#EAE6DF]">A. Nowicki</div>
              </div>
              <div className="p-5">
                <div className="font-mono text-[7px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Rev. / Data</div>
                <div className="font-mono text-lg text-[#EAE6DF]">C / 04.2026</div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Annotated drawing area */}
        <div className="relative border border-[#C6A87C]/20 min-h-[680px] bg-[#020202]/40 overflow-hidden">
          {/* Drawing in middle — full bleed, no FadeIn wrapper so absolute positioning anchors correctly */}
          <div className="absolute inset-0 p-12 pointer-events-none">
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="bm-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#C6A87C" strokeOpacity="0.3" strokeWidth="1" />
                  </pattern>
                </defs>
                {/* Ground */}
                <line x1="50" y1="500" x2="1150" y2="500" stroke="#C6A87C" strokeOpacity="0.4" strokeWidth="1.5" />
                <rect x="200" y="500" width="800" height="30" fill="url(#bm-hatch)" />
                {/* Digesters x2 */}
                <ellipse cx="400" cy="500" rx="170" ry="25" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.55" />
                <rect x="230" y="250" width="340" height="250" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <ellipse cx="400" cy="250" rx="170" ry="25" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.55" />
                <path d="M 230 250 Q 400 130 570 250" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <text x="400" y="380" textAnchor="middle" fill="#C6A87C" fillOpacity="0.6" fontSize="12" className="font-mono">Reactor I</text>
                <text x="400" y="395" textAnchor="middle" fill="#C6A87C" fillOpacity="0.4" fontSize="9" className="font-mono">2400 m³</text>

                <ellipse cx="800" cy="500" rx="170" ry="25" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.55" />
                <rect x="630" y="280" width="340" height="220" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <ellipse cx="800" cy="280" rx="170" ry="25" fill="#0a0c0b" stroke="#C6A87C" strokeOpacity="0.55" />
                <path d="M 630 280 Q 800 170 970 280" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <text x="800" y="380" textAnchor="middle" fill="#C6A87C" fillOpacity="0.6" fontSize="12" className="font-mono">Reactor II</text>
                <text x="800" y="395" textAnchor="middle" fill="#C6A87C" fillOpacity="0.4" fontSize="9" className="font-mono">2400 m³</text>

                {/* CHP building */}
                <rect x="1020" y="420" width="120" height="80" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <text x="1080" y="465" textAnchor="middle" fill="#C6A87C" fillOpacity="0.6" fontSize="11" className="font-mono">CHP</text>
                <text x="1080" y="480" textAnchor="middle" fill="#C6A87C" fillOpacity="0.4" fontSize="8" className="font-mono">499 kW</text>

                {/* Gas pipes between */}
                <line x1="570" y1="200" x2="630" y2="200" stroke="#4ADE80" strokeOpacity="0.6" strokeDasharray="4 3" />
                <line x1="970" y1="200" x2="1080" y2="200" stroke="#4ADE80" strokeOpacity="0.6" strokeDasharray="4 3" />
                <line x1="1080" y1="200" x2="1080" y2="420" stroke="#4ADE80" strokeOpacity="0.6" strokeDasharray="4 3" />

                {/* Substrate silo */}
                <polygon points="60,500 60,440 130,400 200,440 200,500" fill="none" stroke="#C6A87C" strokeOpacity="0.55" />
                <text x="130" y="475" textAnchor="middle" fill="#C6A87C" fillOpacity="0.6" fontSize="10" className="font-mono">SUBSTRAT</text>
                <line x1="200" y1="450" x2="230" y2="450" stroke="#C6A87C" strokeOpacity="0.6" />

                {/* Dimension lines */}
                <line x1="50" y1="560" x2="1150" y2="560" stroke="#C6A87C" strokeOpacity="0.3" />
                <line x1="50" y1="555" x2="50" y2="565" stroke="#C6A87C" strokeOpacity="0.3" />
                <line x1="1150" y1="555" x2="1150" y2="565" stroke="#C6A87C" strokeOpacity="0.3" />
                <text x="600" y="575" textAnchor="middle" fill="#C6A87C" fillOpacity="0.5" fontSize="10" className="font-mono">120.0 m — total plant length</text>

                {/* Numbered annotations */}
                {[
                  { x: 130, y: 425, n: '01' },
                  { x: 400, y: 200, n: '02' },
                  { x: 800, y: 230, n: '03' },
                  { x: 1080, y: 460, n: '04' },
                  { x: 600, y: 200, n: '05' },
                ].map((a, i) => (
                  <g key={i}>
                    <circle cx={a.x} cy={a.y} r="14" fill="#C6A87C" />
                    <text x={a.x} y={a.y + 4} textAnchor="middle" fill="#050505" fontSize="10" fontWeight="700" className="font-mono">{a.n}</text>
                  </g>
                ))}

                {/* Title block bottom right */}
                <rect x="950" y="540" width="190" height="40" fill="none" stroke="#C6A87C" strokeOpacity="0.6" />
                <text x="960" y="557" fill="#C6A87C" fillOpacity="0.6" fontSize="8" className="font-mono">DWG-014/REV.C</text>
                <text x="960" y="572" fill="#C6A87C" fillOpacity="0.6" fontSize="8" className="font-mono">GREEN PLANT TECH. © 2026</text>
              </svg>
          </div>

          {/* Corner registration marks */}
          <div className="absolute top-4 left-4 reg-mark" />
          <div className="absolute top-4 right-4 reg-mark" />
          <div className="absolute bottom-4 left-4 reg-mark" />
          <div className="absolute bottom-4 right-4 reg-mark" />

          {/* Side notes column */}
          <div className="absolute top-8 right-8 max-w-[280px] space-y-1 bg-[#020202]/80 backdrop-blur p-4 border border-[#C6A87C]/15">
            <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.4em] uppercase pb-2 mb-2 border-b border-[#C6A87C]/15">Uwagi techniczne</div>
            {notes.slice(0, 5).map((n, i) => (
              <div key={i} className="flex gap-3">
                <span className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.1em] shrink-0">{n.code}</span>
                <span className="font-serif italic text-[10px] text-[#EAE6DF]/50 leading-snug">{n.txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom annotations grid */}
        <FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
            {[
              { n: '01', l: 'Silage silo', d: 'Capacity 900 t. EPDM geomembrane.' },
              { n: '02', l: 'Reactor I — hydrolysis', d: 'Initial phase. Mesophiles 38 °C.' },
              { n: '03', l: 'Reactor II — methanogenesis', d: 'Main phase. Retention time 28 days.' },
              { n: '04', l: 'Maszynownia CHP', d: 'Silnik Jenbacher J312. 499 kWe.' },
              { n: '05', l: 'Biogas storage', d: 'Double membrane 600 m³.' },
            ].map((a, i) => (
              <div key={i} className="border border-[#C6A87C]/15 p-5 bg-[#020202]/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#C6A87C] flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold text-[#050505]">{a.n}</span>
                  </div>
                  <span className="font-serif italic text-lg text-[#EAE6DF]">{a.l}</span>
                </div>
                <p className="font-serif italic text-[11px] text-[#EAE6DF]/45 leading-relaxed pl-10">{a.d}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Notes row (extended) */}
        <FadeIn delay={300}>
          <div className="mt-12 border-t border-[#C6A87C]/15 pt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {notes.slice(5).map((n, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.2em] shrink-0 w-12">{n.code}</span>
                <span className="font-serif italic text-sm text-[#EAE6DF]/50 leading-relaxed">{n.txt}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Fixed-side scroll progress indicator showing current section name + index
const SectionIndex = () => {
  const [info, setInfo] = useState({ idx: 0, total: 0, name: '' });
  useEffect(() => {
    const update = () => {
      const sections = Array.from(document.querySelectorAll('section[data-testid]'));
      if (!sections.length) return;
      const vh = window.innerHeight;
      let activeIdx = 0;
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= vh * 0.4) activeIdx = i;
      });
      const labels = {
        'reactor-anatomy': 'Anatomia',
        'molecular-process': 'Biochemia',
        'editorial-quote': 'Editorial',
        'poland-map': 'Polska',
        'manifesto': 'Manifest',
        'field-to-electricity': 'From field to power',
        'microbial-taxonomy': 'Mikrobiologia',
        'reactor-clock': 'Cykl 24h',
        'press-wall': 'Prasa',
        'gantt-build': 'Harmonogram',
        'energy-comparison': 'Comparison',
        'glossary-lexicon': 'Leksykon',
        'material-samples': 'Materials',
        'kinetic-break-2': 'Interludium',
        'kinetic-break-3': 'Particle',
        'timeline-2008': 'Linia czasu',
        'blueprint-margin': 'Rysunek techniczny',
        'cta': 'Kontakt',
        'footer': 'Stopka',
        'approach': 'Approach',
        'ticker-tape': 'Telemetria',
      };
      const id = sections[activeIdx].getAttribute('data-testid');
      setInfo({ idx: activeIdx + 1, total: sections.length, name: labels[id] || id.replace(/-/g, ' ') });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  if (info.idx === 0) return null;
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex items-center gap-4 pointer-events-none" data-testid="section-index">
      <div className="flex flex-col items-end gap-2 text-right">
        <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase">Sekcja</div>
        <div className="font-serif italic text-xl text-[#EAE6DF]/80 leading-none capitalize">{info.name}</div>
        <div className="font-mono text-[10px] text-[#C6A87C] tracking-[0.3em] tabular-nums">
          {String(info.idx).padStart(2, '0')} <span className="text-[#C6A87C]/30">/</span> {String(info.total).padStart(2, '0')}
        </div>
      </div>
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#C6A87C]/40 to-transparent relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#4ADE80] rounded-full shadow-[0_0_8px_#4ADE80] transition-all duration-700"
          style={{ top: `${(info.idx / info.total) * 100}%` }} />
      </div>
    </div>
  );
};

// Cursor-following ambient gradient (global subtle light)
const CursorAmbient = () => {
  useEffect(() => {
    const el = document.querySelector('.cursor-ambient');
    if (!el) return;
    const onMove = (e) => {
      el.style.setProperty('--cx', e.clientX + 'px');
      el.style.setProperty('--cy', e.clientY + 'px');
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="cursor-ambient fixed inset-0 pointer-events-none z-[150]"
      style={{
        background: 'radial-gradient(400px circle at var(--cx, 50%) var(--cy, 50%), rgba(198,168,124,0.06), transparent 60%)',
        mixBlendMode: 'plus-lighter',
      }} />
  );
};

// Interactive aerial site plan of a single biogas facility
const SiteAerial = () => {
  const [hovered, setHovered] = useState(0);
  const buildings = [
    { id: '01', name: 'Silage silo', area: '1 800 m²', vol: '5 400 t', x: 12, y: 38, w: 22, h: 14, shape: 'rect' },
    { id: '02', name: 'Reactor I — hydrolysis', area: '450 m²', vol: '2 400 m³', x: 38, y: 30, w: 12, h: 12, shape: 'circle' },
    { id: '03', name: 'Reactor II — methanogenesis', area: '450 m²', vol: '2 400 m³', x: 52, y: 30, w: 12, h: 12, shape: 'circle' },
    { id: '04', name: 'Zbiornik pofermentu', area: '380 m²', vol: '1 800 m³', x: 66, y: 30, w: 11, h: 11, shape: 'circle' },
    { id: '05', name: 'Maszynownia CHP', area: '210 m²', vol: '499 kWe', x: 38, y: 55, w: 16, h: 10, shape: 'rect' },
    { id: '06', name: 'Biogas storage', area: '320 m²', vol: '1 200 m³', x: 56, y: 55, w: 14, h: 10, shape: 'rect' },
    { id: '07', name: 'Sterownia + SCADA', area: '95 m²', vol: '8 stanowisk', x: 74, y: 55, w: 9, h: 8, shape: 'rect' },
    { id: '08', name: 'Emergency flare', area: '12 m²', vol: 'ATEX zone 1', x: 80, y: 22, w: 4, h: 4, shape: 'circle' },
    { id: '09', name: 'Wjazd dla cystern', area: '—', vol: 'Brama bezpieczna', x: 5, y: 70, w: 8, h: 5, shape: 'rect' },
    { id: '10', name: 'Trafostacja 15 kV', area: '40 m²', vol: 'Eaton Power-Xpert', x: 86, y: 65, w: 7, h: 6, shape: 'rect' },
  ];
  return (
    <section className="relative py-48 bg-[#050505] overflow-hidden" data-testid="site-aerial">
      <div className="absolute inset-0 paper-grain opacity-20" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20 border-b border-[#C6A87C]/15 pb-10">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1} /> Rzut sytuacyjny — 1.2 ha
              </div>
              <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Z lotu <br/><span className="italic text-[#C6A87C] font-Standardl">ptaka.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              Standard 0.5 MW biogas plant on 1.2 hectares. 10 facilities, 320 meters of pipelines, 3 kilometers of control cables. Every element has its place — and its document.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <FadeIn className="lg:col-span-8 relative">
            <div className="relative aspect-[100/80] glass-morphism rounded-[2rem] overflow-hidden">
              {/* Top-down site */}
              <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="grass" patternUnits="userSpaceOnUse" width="3" height="3">
                    <rect width="3" height="3" fill="#0a0c0b" />
                    <circle cx="1.5" cy="1.5" r="0.2" fill="#4ADE80" fillOpacity="0.15" />
                  </pattern>
                  <pattern id="asphalt" patternUnits="userSpaceOnUse" width="2" height="2">
                    <rect width="2" height="2" fill="#1a1c1d" />
                  </pattern>
                  <pattern id="rooftop" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                    <rect width="4" height="4" fill="#0e1010" />
                    <line x1="0" y1="0" x2="0" y2="4" stroke="#C6A87C" strokeOpacity="0.4" strokeWidth="0.3" />
                  </pattern>
                </defs>
                {/* Plot boundary */}
                <rect x="0" y="0" width="100" height="80" fill="url(#grass)" />
                <rect x="2" y="2" width="96" height="76" fill="none" stroke="#C6A87C" strokeOpacity="0.4" strokeWidth="0.15" strokeDasharray="0.8 0.8" />
                {/* Road grid */}
                <path d="M 4 70 L 4 18 L 90 18 L 90 50" fill="none" stroke="url(#asphalt)" strokeWidth="2.5" />
                <path d="M 4 70 L 4 18 L 90 18 L 90 50" fill="none" stroke="#C6A87C" strokeOpacity="0.25" strokeWidth="0.1" strokeDasharray="0.4 0.4" />
                {/* Underground pipes (dashed) */}
                <path d="M 44 36 L 56 36 M 56 36 L 67 36 M 44 42 L 44 55 M 56 42 L 56 55 M 67 42 L 67 55" fill="none" stroke="#4ADE80" strokeOpacity="0.45" strokeDasharray="0.5 0.5" strokeWidth="0.2" />
                {/* Compass */}
                <g transform="translate(92, 6)">
                  <circle cx="0" cy="0" r="3" fill="none" stroke="#C6A87C" strokeOpacity="0.4" strokeWidth="0.1" />
                  <polygon points="0,-2.5 0.8,0.5 0,-0.3 -0.8,0.5" fill="#C6A87C" fillOpacity="0.7" />
                  <text x="0" y="-3.4" textAnchor="middle" fontSize="1.4" fill="#C6A87C" fillOpacity="0.7" className="font-mono">N</text>
                </g>
                {/* Scale */}
                <g transform="translate(4, 76)">
                  <line x1="0" y1="0" x2="20" y2="0" stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.15" />
                  <line x1="0" y1="-0.4" x2="0" y2="0.4" stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.15" />
                  <line x1="10" y1="-0.3" x2="10" y2="0.3" stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.15" />
                  <line x1="20" y1="-0.4" x2="20" y2="0.4" stroke="#C6A87C" strokeOpacity="0.6" strokeWidth="0.15" />
                  <text x="0" y="-1.2" fontSize="1.1" fill="#C6A87C" fillOpacity="0.6" className="font-mono">0</text>
                  <text x="10" y="-1.2" textAnchor="middle" fontSize="1.1" fill="#C6A87C" fillOpacity="0.6" className="font-mono">50</text>
                  <text x="20" y="-1.2" textAnchor="middle" fontSize="1.1" fill="#C6A87C" fillOpacity="0.6" className="font-mono">100 m</text>
                </g>

                {/* Buildings */}
                {buildings.map((b, i) => {
                  const cx = b.x + b.w / 2;
                  const cy = b.y + b.h / 2;
                  const isActive = hovered === i;
                  return (
                    <g key={i} onMouseEnter={() => setHovered(i)} className="cursor-pointer">
                      {b.shape === 'rect' ? (
                        <>
                          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#rooftop)" />
                          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={isActive ? '#4ADE80' : '#C6A87C'} strokeOpacity={isActive ? 1 : 0.7} strokeWidth={isActive ? 0.35 : 0.18} />
                          {/* Drop shadow indicator */}
                          <rect x={b.x + 0.2} y={b.y + 0.2} width={b.w} height={b.h} fill="black" fillOpacity="0.3" style={{ filter: 'blur(0.4px)' }} />
                        </>
                      ) : (
                        <>
                          <circle cx={cx} cy={cy} r={b.w / 2} fill="url(#rooftop)" />
                          <circle cx={cx} cy={cy} r={b.w / 2} fill="none" stroke={isActive ? '#4ADE80' : '#C6A87C'} strokeOpacity={isActive ? 1 : 0.7} strokeWidth={isActive ? 0.35 : 0.18} />
                          <circle cx={cx} cy={cy} r={b.w / 2 - 1.5} fill="none" stroke="#C6A87C" strokeOpacity="0.3" strokeWidth="0.1" strokeDasharray="0.3 0.3" />
                        </>
                      )}
                      {/* Numbered label */}
                      <circle cx={cx} cy={cy} r="1.6" fill={isActive ? '#4ADE80' : '#020202'} stroke="#C6A87C" strokeOpacity={isActive ? 1 : 0.8} strokeWidth="0.12" />
                      <text x={cx} y={cy + 0.55} textAnchor="middle" fontSize="1.4" fontWeight="700" fill={isActive ? '#050505' : '#C6A87C'} className="font-mono">{b.id}</text>
                      {/* leader line for active */}
                      {isActive && (
                        <>
                          <line x1={cx} y1={b.y - 0.5} x2={cx + 5} y2={b.y - 5} stroke="#4ADE80" strokeOpacity="0.7" strokeWidth="0.12" />
                          <text x={cx + 5.3} y={b.y - 4.5} fontSize="1.5" fill="#EAE6DF" className="font-serif" fontStyle="italic">{b.name}</text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Property edge label */}
                <text x="50" y="78.5" textAnchor="middle" fontSize="0.9" fill="#C6A87C" fillOpacity="0.35" className="font-mono">— PLOT BOUNDARY — 12 800 m² —</text>
              </svg>
              <div className="absolute top-4 left-4 font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.3em] uppercase">PLAN SYTUACYJNY — REF: GP-A1-01</div>
              <div className="absolute top-4 right-4 font-mono text-[9px] text-[#4ADE80] tracking-[0.3em] uppercase">PLOT: 1.28 ha</div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.3em] uppercase">⌗ Top view 0° · Scale 1:1000</div>
              <div className="absolute -top-3 -left-3 reg-mark" />
              <div className="absolute -top-3 -right-3 reg-mark" />
              <div className="absolute -bottom-3 -left-3 reg-mark" />
              <div className="absolute -bottom-3 -right-3 reg-mark" />
            </div>
          </FadeIn>

          <div className="lg:col-span-4 space-y-2">
            <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-4">Object index</div>
            {buildings.map((b, i) => (
              <button key={i}
                onMouseEnter={() => setHovered(i)}
                data-testid={`site-building-${b.id}`}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-500 ${hovered === i ? 'bg-[#4ADE80]/10 border-[#4ADE80]/30' : 'bg-transparent border-[#C6A87C]/5 opacity-40 hover:opacity-100'}`}>
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-[10px] tracking-[0.2em] ${hovered === i ? 'text-[#4ADE80]' : 'text-[#C6A87C]/50'}`}>{b.id}</span>
                    <span className="font-serif italic text-base text-[#EAE6DF]">{b.name}</span>
                  </div>
                </div>
                {hovered === i && (
                  <div className="flex justify-between mt-3 pl-8 font-mono text-[9px] tracking-[0.2em] uppercase">
                    <span className="text-[#C6A87C]/60">{b.area}</span>
                    <span className="text-[#EAE6DF]/60">{b.vol}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Awards and certifications — wax-seal stamps grid
const AwardsAndCertifications = () => {
  const items = [
    { y: 'Standard', name: 'ISO 14001', sub: 'Environment', body: 'Board of Directorszanie Environmentwe', color: '#C6A87C' },
    { y: 'Standard', name: 'ISO 9001', sub: 'Quality', body: 'Quality management system', color: '#C6A87C' },
    { y: 'Compliance', name: 'ISO 45001', sub: 'OHS', body: 'Occupational safety', color: '#C6A87C' },
    { y: 'Directive', name: 'ATEX', sub: 'Explosiveness', body: 'Explosive atmospheres', color: '#D97847' },
    { y: 'Standard', name: 'EN 60079', sub: 'Strefy EX', body: 'Klasyfikacja ATEX zone 1/2', color: '#D97847' },
    { y: 'Requirement', name: 'Technical Inspection', sub: 'Polska', body: 'Pressure vessels', color: '#C6A87C' },
    { y: 'Standard', name: 'EN ISO 15614', sub: 'Welding', body: 'Welding process qualification', color: '#4ADE80' },
    { y: 'Compliance', name: 'ISO 12944', sub: 'Coatings', body: 'Anticorrosion C5', color: '#4ADE80' },
  ];
  return (
    <section className="relative py-48 bg-[#020202] overflow-hidden" data-testid="awards-cert">
      <div className="absolute inset-0 paper-grain opacity-15" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20 border-b border-[#C6A87C]/15 pb-10">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1} /> Reference standards — what we design against
              </div>
              <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Osiem norm, <br/><span className="italic text-[#C6A87C] font-Standardl">jedna Quality.</span>
              </h2>
            </div>
            <p className="lg:col-span-5 font-serif italic text-xl text-[#EAE6DF]/50 leading-relaxed">
              We design every project according to eight rigorous external standards. We don't list them for marketing purposes—we list them because they define our strict scope of responsibility to both the investor and supervisory bodies.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {items.map((it, i) => (
            <FadeIn key={i} delay={i * 80} className="group flex flex-col items-center text-center">
              <div className="relative w-44 h-44 mb-8 transition-transform duration-700 group-hover:scale-105">
                {/* Wax seal */}
                <svg viewBox="0 0 200 200" className="w-full h-full wax-seal">
                  <defs>
                    <radialGradient id={`seal-${i}`} cx="0.5" cy="0.4" r="0.6">
                      <stop offset="0" stopColor={it.color} stopOpacity="0.45" />
                      <stop offset="1" stopColor={it.color} stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  {/* Outer scalloped edge */}
                  {[...Array(24)].map((_, k) => {
                    const a = (k / 24) * Math.PI * 2;
                    return <circle key={k} cx={100 + Math.cos(a) * 90} cy={100 + Math.sin(a) * 90} r="6" fill={`url(#seal-${i})`} stroke={it.color} strokeOpacity="0.4" strokeWidth="0.5" />;
                  })}
                  {/* Main seal */}
                  <circle cx="100" cy="100" r="84" fill={`url(#seal-${i})`} stroke={it.color} strokeOpacity="0.6" strokeWidth="1" />
                  <circle cx="100" cy="100" r="72" fill="none" stroke={it.color} strokeOpacity="0.35" strokeWidth="0.5" />
                  {/* Curving text on outer ring */}
                  <defs>
                    <path id={`tpath-${i}`} d="M 100 100 m -76 0 a 76 76 0 1 1 152 0 a 76 76 0 1 1 -152 0" fill="none" />
                  </defs>
                  <text fill={it.color} fillOpacity="0.65" fontSize="7" className="font-mono" letterSpacing="1">
                    <textPath href={`#tpath-${i}`} startOffset="5%">
                      · {it.sub.toUpperCase()} · {it.y.toUpperCase()} · GREEN PLANT TECH · {it.sub.toUpperCase()} ·
                    </textPath>
                  </text>
                  {/* Inner name */}
                  <text x="100" y="92" textAnchor="middle" fontSize="14" fill="#EAE6DF" className="font-serif" fontStyle="italic" fontWeight="300">Cert.</text>
                  <text x="100" y="112" textAnchor="middle" fontSize="20" fill={it.color} className="font-serif" fontWeight="400">{it.name}</text>
                  <text x="100" y="128" textAnchor="middle" fontSize="9" fill="#EAE6DF" fillOpacity="0.5" className="font-mono" letterSpacing="2">{it.y}</text>
                  {/* small star or ornament */}
                  <text x="100" y="148" textAnchor="middle" fontSize="14" fill={it.color} fillOpacity="0.5">✦</text>
                </svg>
              </div>
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-2">{it.sub}</div>
              <div className="font-serif italic text-base text-[#EAE6DF]/60 leading-tight max-w-[180px]">{it.body}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Numbered editorial epigraphs
const NumberedEpigraphs = () => {
  const epi = [
    { n: 'I', q: `An engineer doesn't believe in "almost tight." An engineer measures.`, who: 'First design principle' },
    { n: 'II', q: 'A biogas plant is only as reliable as its weakest weld. We verify every single one with non-destructive testing.', who: 'Quality control department' },
    { n: 'III', q: 'Methanogenic bacteria do not negotiate. Neither electricity prices nor weather conditions. They work 24/7.', who: 'Biology department' },
  ];
  return (
    <section className="relative py-40 bg-[#030404] overflow-hidden" data-testid="numbered-epigraphs">
      <div className="absolute inset-0 bg-stripes opacity-20" />
      <div className="max-w-[80rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-20 flex items-center gap-4 justify-center">
            <span className="w-12 h-px bg-[#C6A87C]/40" /> Three principles · written on the walls <span className="w-12 h-px bg-[#C6A87C]/40" />
          </div>
        </FadeIn>
        <div className="space-y-20">
          {epi.map((e, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="grid md:grid-cols-12 gap-10 items-baseline">
                <div className="md:col-span-2 text-right">
                  <div className="font-serif font-light text-[#C6A87C]/30 leading-none" style={{ fontSize: '12rem', WebkitTextStroke: '1px #C6A87C40', color: 'transparent' }}>
                    {e.n}
                  </div>
                </div>
                <blockquote className="md:col-span-8 font-serif italic text-3xl md:text-5xl text-[#EAE6DF]/85 leading-[1.25] tracking-tight border-l-2 border-[#C6A87C]/30 pl-10">
                  <span className="text-[#C6A87C] not-italic">„</span>{e.q}<span className="text-[#C6A87C] not-italic">"</span>
                </blockquote>
                <div className="md:col-span-2 pt-4 border-t border-[#C6A87C]/15">
                  <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.4em] uppercase mb-1">— Source</div>
                  <div className="font-serif italic text-sm text-[#EAE6DF]/50 leading-tight">{e.who}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Editorial technical spec sheet for GP-2026-X reference model
const TechnicalSpecSheet = () => {
  const sections = [
    {
      cat: 'Wymiary konstrukcyjne',
      ref: 'CON',
      items: [
        ['Reactor Capacity I + II', '7 200 m³'],
        ['Diameter of each chamber', '24.0 m'],
        ['Construction height', '8.0 m'],
        ['Reinforced concrete wall thickness', '0.40 m'],
        ['Klasa betonu', 'C35/45 W10 XA3'],
        ['Plot area min.', '1.20 ha'],
      ],
    },
    {
      cat: 'Charakterystyka procesowa',
      ref: 'BIO',
      items: [
        ['Temperatura procesu', '38.4 °C ± 0.3'],
        ['pH operacyjne', '7.4 — 7.8'],
        ['Czas retencji hydraulicznej', '28 dni'],
        ['Sucha masa wsadu', '8 — 12% TS'],
        ['Daily feedstock', '21 t / day'],
        ['Uzysk biogazu', '210 m³ / t TS'],
      ],
    },
    {
      cat: 'Parametry energetyczne',
      ref: 'ENG',
      items: [
        ['Moc elektryczna nominalna', '499 kWe'],
        ['Moc cieplna', '510 kWt'],
        ['CHP electrical efficiency', '44.2 %'],
        ['Thermal efficiency', '46.0 %'],
        ['Total efficiency', '90.2 %'],
        ['Roczna produkcja energii', '4 050 MWh'],
      ],
    },
    {
      cat: 'Wymagania Environmentwe',
      ref: 'ENV',
      items: [
        ['Noise (plot boundary) max', '45 dB(A) noc'],
        ['Emisja NOx', '< 500 mg/Nm³'],
        ['Emisja CO', '< 650 mg/Nm³'],
        ['Waste utilization', '7 650 t / rok'],
        ['Redukcja CO₂', '7 250 t / rok'],
        ['Produkcja pofermentu', '4 015 t / rok'],
      ],
    },
  ];
  return (
    <section className="relative py-48 bg-[#020202] overflow-hidden" data-testid="tech-spec-sheet">
      <div className="absolute inset-0 bg-pinstripes opacity-30" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20 border-b border-[#C6A87C]/15 pb-10">
            <div className="lg:col-span-7">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
                <FileText className="w-3.5 h-3.5" strokeWidth={1} /> Karta techniczna — REF: GP-2026-X
              </div>
              <h2 className="text-6xl md:text-[8rem] font-serif text-[#EAE6DF] leading-[0.92] pb-2 font-light">
                Full <br/><span className="italic text-[#C6A87C] font-Standardl">specification.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-right">
                <div>
                  <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Wersja</div>
                  <div className="font-mono text-base text-[#EAE6DF]/80">4.2 / 2026</div>
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Dokument</div>
                  <div className="font-mono text-base text-[#EAE6DF]/80">GP-TS-014</div>
                </div>
                <div>
                  <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.3em] uppercase mb-1">Status</div>
                  <div className="font-mono text-base text-[#4ADE80] flex items-center gap-2 justify-end">
                    <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" /> AKTYWNY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-px bg-[#C6A87C]/10 border border-[#C6A87C]/10">
          {sections.map((s, i) => (
            <FadeIn key={i} delay={i * 80} className="bg-[#020202] p-12">
              <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-[#C6A87C]/15">
                <h3 className="font-serif text-3xl text-[#EAE6DF] font-light">{s.cat}</h3>
                <span className="font-mono text-[10px] text-[#C6A87C] tracking-[0.4em] uppercase">§ {s.ref} · 0{i + 1}</span>
              </div>
              <div className="space-y-5">
                {s.items.map((it, j) => (
                  <div key={j} className="flex justify-between items-baseline gap-8 group hover:translate-x-1 transition-transform duration-500">
                    <span className="font-serif italic text-lg text-[#EAE6DF]/70 leading-snug">{it[0]}</span>
                    <span className="font-mono text-base text-[#C6A87C] tracking-wider whitespace-nowrap pl-4 border-b border-dashed border-[#C6A87C]/20 flex-1 text-right pb-1">
                      {'.'.repeat(4)} <span className="text-[#EAE6DF]">{it[1]}</span>
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Sign-off footer */}
        <FadeIn delay={400}>
          <div className="mt-12 grid md:grid-cols-4 gap-8 pt-10 border-t border-[#C6A87C]/15">
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-2">Prepared by</div>
              <div className="font-serif italic text-lg text-[#EAE6DF]/70">GP Technology Department</div>
            </div>
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-2">Checked by</div>
              <div className="font-serif italic text-lg text-[#EAE6DF]/70">M. Sobierajska, P.E.</div>
            </div>
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-2">Approved by</div>
              <div className="font-serif italic text-lg text-[#EAE6DF]/70">Board of Directors</div>
            </div>
            <div>
              <div className="font-mono text-[8px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-2">Valid from</div>
              <div className="font-mono text-base text-[#C6A87C]">01.01.2026</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const TechnologyPartners = () => {
  const partners = [
    { name: "SIEMENS", role: "SCADA & AUTOMATYKA", delay: 0, hue: "#009adb" },
    { name: "ABB", role: "DRIVES & MOTORS", delay: 100, hue: "#ff0000" },
    { name: "JENBACHER", role: "KOGENERACJA CHP", delay: 200, hue: "#ff8c00" },
    { name: "XYLEM", role: "FLUID DYNAMICS", delay: 300, hue: "#00a3e0" },
    { name: "ENDRESS+HAUSER", role: "METROLOGIA", delay: 400, hue: "#005aab" },
    { name: "WOLF", role: "POCHODNIE BIOGAZOWE", delay: 500, hue: "#6c8c1e" }
  ];

  return (
    <section className="py-32 bg-[#020202] relative border-b border-[#C6A87C]/10">
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-16 flex items-center gap-4">
            <span className="w-8 h-px bg-[#C6A87C]/30" /> Ekosystem Technologiczny
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((p, i) => (
            <FadeIn key={i} delay={p.delay} className="group cursor-pointer">
              <div 
                className="p-8 h-32 flex flex-col items-center justify-center transition-all duration-500 rounded-xl relative overflow-hidden border"
                style={{ backgroundColor: `${p.hue}0A`, borderColor: `${p.hue}33` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${p.hue}1A`;
                  e.currentTarget.style.borderColor = `${p.hue}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${p.hue}0A`;
                  e.currentTarget.style.borderColor = `${p.hue}33`;
                }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, transparent, ${p.hue}, transparent)` }} />
                <span className="font-serif text-[#EAE6DF] text-xl tracking-widest uppercase transition-all duration-500 group-hover:scale-105 z-10" style={{ textShadow: `0 0 20px ${p.hue}80` }}>
                   {p.name}
                </span>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase mt-4 opacity-70 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-center z-10" style={{ color: p.hue }}>{p.role}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const EngineeringDNA = () => {
  return (
    <section className="py-48 bg-[#030404] relative overflow-hidden">
      <div className="absolute inset-0 bg-pinstripes opacity-20 pointer-events-none" />
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <FadeIn className="lg:col-span-5">
            <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">About Us // Company Profile</div>
            <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[0.95] pb-1 mb-12 font-light">
              Process <br/><span className="italic text-[#C6A87C] font-Standardl">engineering.</span>
            </h2>
          </FadeIn>
          <FadeIn className="lg:col-span-7" delay={200}>
            <p className="font-serif italic text-3xl text-[#EAE6DF]/80 leading-relaxed mb-10 font-light">
              Green Plant Tech may be a new entity, but we don't learn at the investor's expense. Our team brings over 50 years of combined experience executing major infrastructure projects across Europe.
            </p>
            <div className="grid md:grid-cols-2 gap-12 pt-10 border-t border-[#C6A87C]/15">
              <div>
                <div className="font-mono text-4xl text-[#C6A87C] mb-2 font-light">50<span className="text-xl ml-2">lat</span></div>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#EAE6DF]/40">Cumulative experience of the engineering team</div>
              </div>
              <div>
                <div className="font-mono text-4xl text-[#C6A87C] mb-2 font-light">0<span className="text-xl ml-2">compromises</span></div>
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#EAE6DF]/40">Tylko sprawdzone, certyfikowane technologie Tier-1</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const ProcesssInitiation = () => {
  return (
    <section id="kontakt" className="relative py-48 bg-[#020202] overflow-hidden" data-testid="process-initiation">
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.08)_0%,transparent_70%)] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="inline-flex items-center gap-4 mb-12 glass-morphism px-6 py-3 rounded-full">
                <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_12px_#4ADE80]" />
                <span className="font-mono text-[#EAE6DF] text-[9px] tracking-[0.4em] uppercase">Status: Ready for deployment</span>
              </div>
              <h2 className="font-serif text-[#F2EDE4] leading-[0.92] pb-2 font-light text-[4.5rem] md:text-[8rem] tracking-tight mb-8">
                Inicjacja <br/><span className="italic text-[#C6A87C] font-Standardl">procesu.</span>
              </h2>
              <p className="font-serif italic text-2xl text-[#EAE6DF]/60 leading-relaxed max-w-2xl mb-16">
                Schedule an initial technological audit. We verify the potential of your facility and estimate the base CAPEX.
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <MagneticButton>
                  <a href="mailto:kontakt@greenplant.tech" className="group relative bg-[#C6A87C] text-[#050505] px-12 py-6 text-[10px] font-mono tracking-[0.4em] uppercase hover:bg-[#EAE6DF] transition-all duration-500 rounded-full flex items-center gap-5 interactive-element shadow-[0_0_40px_rgba(198,168,124,0.2)] font-bold">
                    Zarezerwuj audyt
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                  </a>
                </MagneticButton>
                <div className="font-mono text-xl md:text-3xl text-[#C6A87C] tracking-widest flex items-center gap-4">
                  <span className="text-[10px] text-[#EAE6DF]/40 tracking-[0.4em] uppercase">lub</span> 
                  <a href="tel:+48601944451" className="hover:text-[#EAE6DF] transition-colors interactive-element">+48 601 944 451</a>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-4 lg:col-start-9 hidden lg:block">
            <FadeIn delay={300} direction="left">
              <div className="glass-morphism p-12 rounded-[2rem] border border-[#4ADE80]/20 bg-[#050505]/80">
                <div className="font-mono text-[9px] text-[#C6A87C]/60 tracking-[0.4em] uppercase mb-8 border-b border-[#C6A87C]/10 pb-4">Standard SLA</div>
                <div className="space-y-8">
                  <div>
                    <div className="font-serif text-5xl text-[#EAE6DF] mb-2 font-light">&lt; 48<span className="text-2xl text-[#C6A87C] italic">h</span></div>
                    <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#EAE6DF]/40">Preliminary biogas potential audit</div>
                  </div>
                  <div>
                    <div className="font-serif text-5xl text-[#EAE6DF] mb-2 font-light">100<span className="text-2xl text-[#C6A87C] italic">%</span></div>
                    <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#EAE6DF]/40">Parameter confidentiality (we sign NDAs)</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
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
        <SectionIndex />
        <CustomCursor />
        <CursorAmbient />
        <AmbientOrbs />
        <FilmGrain />
        <Navbar />

        {/* ACT I — HOOK & WORLDVIEW */}
        <Hero />
        <TickerTape />
        <EditorialQuote />
        <div id="podejscie"><Approach /></div>
        <NumberedEpigraphs />
        <Manifesto />
        <KineticBreakII />

        {/* ACT II — WHAT WE BUILD (technology) */}
        <FieldToElectricity />
        <div id="technologia"><ReactorAnatomy /></div>
        <MolecularProcesss />
        <MicrobialTaxonomy />
        <ReactorClock />
        <ScadaSystem />
        <MaterialSamples />
        <BlueprintMargin />

        {/* ACT III — CH₄ INTERLUDE */}
        <KineticBreakIII />

        {/* ACT IV — HOW WE DELIVER */}
        <FeedstockMatrix />

        <div id="proces"><BlueprintProcesss /></div>
        <GanttBuild />
        <SiteAerial />
        <TechnicalSpecSheet />

        {/* ACT V — BUSINESS CASE */}
        <div id="ekonomia"><EconomicsSection /></div>
        <EnergyComparison />
        <SmartGrid />
        <KineticBreak />
        <CircularImpact />
        <EnvironmentalImpact />

        {/* ACT VI — MARKET CONTEXT */}
        <PolandMap />
        <TimelineSince2008 />
        <div id="prasa"><PressWall /></div>

        {/* ACT VII — TEAM & STANDARDS */}
        <div id="kariera"><EngineeringDNA /></div>
        <TechnologyPartners />
        <div id="utrzymanie"><OperationsMaintenance /></div>
        <div id="standardy"><SafetyStandards /></div>
        <AwardsAndCertifications />

        {/* ACT VIII — REFERENCE & CLOSE */}
        <TechnicalFAQ />
        <GlossaryLexicon />
        <div id="kontakt"><ProcesssInitiation /></div>
        <Footer />
      </div>
    </>
  );
}
