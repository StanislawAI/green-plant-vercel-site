import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Database, ShieldCheck, ChevronRight, Zap, ArrowRight, Factory, CheckCircle2, Plus, ArrowUpRight, MapPin, ChevronDown } from 'lucide-react';

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

  `}} />
);

// --- CUSTOM HOOKS & UTILS ---

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchLike, setIsTouchLike] = useState(false);

  useEffect(() => {
    const coarsePointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchLike(coarsePointerQuery.matches);
    const handlePointerChange = (event) => setIsTouchLike(event.matches);
    coarsePointerQuery.addEventListener("change", handlePointerChange);

    const updateCursor = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a' || e.target.closest('button') || e.target.closest('a') || e.target.closest('.interactive-element')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      coarsePointerQuery.removeEventListener("change", handlePointerChange);
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchLike) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-2 h-2 bg-[#C6A87C] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out" style={{ transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${isHovering ? 0 : 1})` }} />
      <div className="fixed top-0 left-0 w-12 h-12 border border-[#C6A87C]/40 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center backdrop-blur-[2px]" style={{ transform: `translate3d(${pos.x - 24}px, ${pos.y - 24}px, 0) scale(${isHovering ? 1.2 : 1})`, backgroundColor: isHovering ? 'rgba(198, 168, 124, 0.05)' : 'transparent' }}>
        {isHovering && <div className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-ping"></div>}
      </div>
    </>
  );
};

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

const TechnicalCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden lg:block"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isPointer ? 'scale-150' : 'scale-100'}`}>
        <div className="w-10 h-10 border border-[#C6A87C]/20 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-[#C6A87C] rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[0.5px] bg-[#C6A87C]/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-[0.5px] bg-[#C6A87C]/10"></div>
      </div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const getTransform = () => {
    switch(direction) {
      case 'up': return 'translate-y-16';
      case 'down': return '-translate-y-16';
      case 'left': return 'translate-x-16';
      case 'right': return '-translate-x-16';
      default: return 'translate-y-16';
    }
  };

  return (
    <div ref={ref} className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getTransform()}`} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const MagneticButton = ({ children, className = "", onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      onClick={onClick}
    >
      {children}
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-8 w-full z-50 transition-all duration-1000 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-[100rem] mx-auto px-8">
        <div className={`flex justify-between items-center px-10 py-5 transition-all duration-700 ${scrolled ? 'glass-morphism rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[#C6A87C]/20' : 'bg-transparent border-transparent'}`}>
          <a href="#" className="flex items-center gap-5 group cursor-pointer interactive-element">
            <div className="relative w-10 h-10 border border-[#C6A87C]/30 flex items-center justify-center overflow-hidden group-hover:border-[#C6A87C] transition-colors duration-700">
              <div className="absolute inset-0 bg-[#C6A87C] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
              <Leaf className="w-4 h-4 text-[#C6A87C] group-hover:text-[#030404] relative z-10 transition-colors duration-500" strokeWidth={1} />
            </div>
            <span className="text-[#EAE6DF] font-serif tracking-widest text-xl hidden sm:block uppercase">
              Green Plant <span className="text-[#C6A87C] font-light italic lowercase">tech.</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-12 text-[9px] font-mono tracking-[0.3em] text-[#EAE6DF]/50 uppercase">
            {['Podejście', 'Proces', 'Ekonomia', 'Realizacje'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#C6A87C] transition-colors duration-500 relative py-2 group interactive-element">
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A87C] group-hover:w-full transition-all duration-500 ease-out"></span>
              </a>
            ))}
          </div>
          <a href="#kontakt" className="bg-[#C6A87C] text-[#030404] px-10 py-3.5 text-[9px] font-mono tracking-[0.3em] uppercase hover:bg-transparent hover:text-[#C6A87C] border border-[#C6A87C] transition-all duration-700 flex items-center gap-3 interactive-element rounded-full">
            Wyceń projekt
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#020202]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent z-10"></div>
        <img 
          src="/Users/stan/.gemini/antigravity/brain/906f4f99-9a59-4b7a-b50b-3a2631808779/biogas_plant_cinematic_1778349683317.png" 
          alt="Biogas Plant" 
          className="w-full h-full object-cover ken-burns opacity-40 mix-blend-luminosity"
        />
      </div>

      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none z-10"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-20 grid lg:grid-cols-12 gap-16 items-center w-full">
        <div className="lg:col-span-8 relative">
          <FadeIn>
            <div className="inline-flex items-center gap-4 mb-12 glass-morphism px-5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#4ADE80] animate-pulse rounded-full shadow-[0_0_8px_#4ADE80]"></span>
              <span className="text-[#C6A87C] text-[8px] font-mono tracking-[0.5em] uppercase">Nowy Standard Energii Rolniczej</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-[5.5rem] md:text-[9rem] font-serif text-[#EAE6DF] leading-[0.8] tracking-tight mb-14 font-light">
              Inżynieria <br />
              <span className="italic text-[#C6A87C] font-normal pl-8 md:pl-24">zysku.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
              <p className="text-xl md:text-2xl text-[#EAE6DF]/70 leading-relaxed max-w-xl font-serif font-light italic border-l border-[#C6A87C]/30 pl-8">
                Generalny wykonawca biogazowni. Transformujemy odpady w stabilne źródło dochodu i czystą energię dla przemysłu i rolnictwa.
              </p>
              <div className="flex flex-col gap-4">
                <div className="glass-morphism p-6 rounded-2xl">
                  <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-2">Średnia Sprawność CHP</div>
                  <div className="font-serif text-4xl text-[#EAE6DF]">44.2 <span className="text-lg text-[#C6A87C] italic">%</span></div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300} className="mt-16">
            <div className="flex flex-wrap items-center gap-12">
              <MagneticButton>
                <a href="#kontakt" className="group relative px-12 py-6 bg-[#C6A87C] text-[#030404] text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-[#EAE6DF] transition-all duration-500 rounded-full flex items-center gap-6 interactive-element shadow-[0_0_40px_rgba(198,168,124,0.3)]">
                  Inicjuj Inwestycję
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </a>
              </MagneticButton>
              <div className="flex items-center gap-6 opacity-40">
                <div className="w-16 h-[1px] bg-[#C6A87C]"></div>
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase">Ekspertyza Tier-1</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={400} direction="left" className="lg:col-span-4 hidden lg:block">
           <div className="glass-morphism p-10 rounded-[2.5rem] relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#C6A87C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
             <Crosshair className="top-8 left-8" />
             <Crosshair className="bottom-8 right-8" />
             
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-16">
                 <div className="w-12 h-12 border border-[#C6A87C]/20 flex items-center justify-center rounded-xl">
                   <Factory className="text-[#C6A87C] w-6 h-6" strokeWidth={1} />
                 </div>
                 <div className="text-right">
                    <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] mb-1">UNIT_ID</div>
                    <div className="font-mono text-[10px] text-[#EAE6DF]">GP-2026-X</div>
                 </div>
               </div>

               <div className="space-y-8">
                 {[
                   { label: "Moc Elektryczna", val: "999 kW" },
                   { label: "Moc Cieplna", val: "1.1 MW" },
                   { label: "Wsad dobowy", val: "42 t" }
                 ].map((item, i) => (
                   <div key={i} className="border-b border-[#C6A87C]/10 pb-4">
                     <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.2em] mb-2">{item.label}</div>
                     <div className="font-serif text-3xl text-[#EAE6DF] font-light">{item.val}</div>
                   </div>
                 ))}
               </div>

               <div className="mt-12 flex items-center gap-4 p-4 bg-[#020202]/50 border border-[#C6A87C]/20 rounded-xl">
                 <div className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse shadow-[0_0_8px_#4ADE80]"></div>
                 <span className="font-mono text-[9px] text-[#4ADE80] tracking-[0.2em] uppercase">Sonda Lambda: Aktywna</span>
               </div>
             </div>
           </div>
        </FadeIn>
      </div>
    </section>
  );
};

const TickerTape = () => {
  return (
    <div className="bg-[#070808] border-y border-[#C6A87C]/10 py-4 overflow-hidden relative z-10">
      <div className="flex animate-scroll whitespace-nowrap gap-20 items-center">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-20">
            <span className="font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.4em] uppercase">Methane Purity: 62.4%</span>
            <span className="font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.4em] uppercase">Grid Load: 1.25MW</span>
            <span className="font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.4em] uppercase">Engine Hours: 84,200h</span>
            <span className="font-mono text-[9px] text-[#C6A87C]/40 tracking-[0.4em] uppercase">CO2 Savings: 4.2t/d</span>
            <div className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Approach = () => {
  return (
    <section id="podejscie" className="relative min-h-screen flex items-center bg-[#020202] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-transparent z-10"></div>
        <div className="absolute inset-0 technical-grid opacity-20"></div>
      </div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <FadeIn direction="right">
              <div className="font-mono text-[#C6A87C] text-[9px] tracking-[0.5em] uppercase mb-10 border-l-2 border-[#C6A87C] pl-6 py-1">
                Filozofia Inżynierii
              </div>
              <h2 className="text-6xl md:text-8xl font-serif text-[#EAE6DF] leading-[1] mb-12 font-light">
                Materia w <br/>
                <span className="italic text-[#C6A87C] font-normal">energię.</span>
              </h2>
              <p className="text-[#EAE6DF]/70 font-light text-2xl leading-relaxed mb-14 font-serif italic max-w-xl">
                Biogazownia to nie tylko zbiór betonowych zbiorników. To precyzyjnie dostrojony ekosystem, w którym biologia spotyka się z ciężką inżynierią mechaniczną.
              </p>
              
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light">25<span className="text-xl text-[#C6A87C]/40 italic ml-2">lat+</span></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Prognozowana <br/>żywotność konstrukcji</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-[#C6A87C] mb-4 font-light">98<span className="text-xl text-[#C6A87C]/40 italic ml-2">%</span></div>
                  <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.4em] leading-loose">Dyspozycyjność <br/>agregatów CHP</div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="left" className="relative group">
            <div className="aspect-square glass-morphism rounded-[3rem] p-12 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C6A87C]/5 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="w-16 h-16 border border-[#C6A87C]/20 rounded-2xl flex items-center justify-center">
                     <Database className="text-[#C6A87C] w-8 h-8" strokeWidth={1} />
                   </div>
                   <div className="text-right font-mono text-[8px] text-[#C6A87C] tracking-[0.3em]">
                     SPEC_REF: BIO-REACTOR-V1
                   </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-[1px] w-full bg-[#C6A87C]/10"></div>
                  <p className="font-serif italic text-xl text-[#EAE6DF]/60 leading-relaxed">
                    "Odrzucamy półśrodki. Każdy m³ betonu jest weryfikowany pod kątem szczelności gazowej, a każda spawa w układzie CHP przechodzi testy nieniszczące."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C6A87C]/20 border border-[#C6A87C]/40 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#C6A87C]" />
                    </div>
                    <span className="font-mono text-[9px] text-[#EAE6DF]/40 tracking-[0.2em] uppercase">Certyfikacja Jakości TUV</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Tech Elements */}
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
    <section id="proces" className="relative py-48 bg-[#050606] border-t border-[#C6A87C]/10 overflow-hidden">
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
    <section className="py-40 bg-[#050606] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
          <FadeIn delay={100} className="group relative border-[0.5px] border-[#C6A87C]/20 bg-[#030404]/80 backdrop-blur-md p-12 md:p-16 hover:border-[#C6A87C] transition-colors duration-700 interactive-element">
            <div className="absolute top-0 right-0 p-6 font-serif text-[8rem] leading-none text-[#C6A87C]/5 italic font-light group-hover:text-[#C6A87C]/10 transition-colors duration-700 pointer-events-none">EPC</div>
            <h3 className="font-mono text-2xl text-[#EAE6DF] mb-2 relative z-10">Model EPC</h3>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#C6A87C] uppercase mb-8 relative z-10">Engineering, Procurement, Construction</p>
            <p className="font-serif text-[#EAE6DF]/60 text-xl font-light italic leading-relaxed mb-10 relative z-10 max-w-sm">
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
          </FadeIn>

          <FadeIn delay={200} className="group relative border-[0.5px] border-[#C6A87C]/20 bg-[#030404]/80 backdrop-blur-md p-12 md:p-16 hover:border-[#C6A87C] transition-colors duration-700 interactive-element md:mt-16">
            <div className="absolute top-0 right-0 p-6 font-serif text-[8rem] leading-none text-[#C6A87C]/5 italic font-light group-hover:text-[#C6A87C]/10 transition-colors duration-700 pointer-events-none">EPCM</div>
            <h3 className="font-mono text-2xl text-[#EAE6DF] mb-2 relative z-10">Model EPCM</h3>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#C6A87C] uppercase mb-8 relative z-10">Engineering, Procurement, Construction Management</p>
            <p className="font-serif text-[#EAE6DF]/60 text-xl font-light italic leading-relaxed mb-10 relative z-10 max-w-sm">
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
    <section className="py-48 bg-[#050606] border-t border-[#C6A87C]/10 relative overflow-hidden">
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

                   <div className="pt-8 border-t border-[#C6A87C]/10">
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
    <section id="ekonomia" className="relative py-48 bg-[#010101] overflow-hidden border-t border-[#C6A87C]/10">
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
                   <div className="font-serif text-5xl text-[#C6A87C] font-light">5.2 <span className="text-xl text-[#C6A87C]/40 italic">lat</span></div>
                </div>
                <div className="bg-[#020202]/50 p-8 border border-[#C6A87C]/10 rounded-2xl">
                   <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.3em] mb-4">Internal Rate (IRR)</div>
                   <div className="font-serif text-5xl text-[#C6A87C] font-light">18.4 <span className="text-xl text-[#C6A87C]/40 italic">%</span></div>
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
    <section className="py-48 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
                  <div className="mt-auto border-t border-[#C6A87C]/10 pt-8 w-full">
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
    <section className="py-32 bg-[#020202] border-t border-[#C6A87C]/10 overflow-hidden flex flex-col justify-center relative">
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
    <section className="relative py-40 bg-[#030404] border-t border-[#C6A87C]/10 overflow-hidden">
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
    <section className="py-40 bg-[#030404] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
                  <span className="font-serif text-5xl md:text-6xl text-[#EAE6DF] italic mr-3">{stat.val}</span>
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
    <section id="realizacje" className="relative py-48 bg-[#030404] border-t border-[#C6A87C]/10 min-h-screen flex items-center overflow-hidden">
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
    <section className="py-40 bg-[#020202] relative overflow-hidden border-t border-[#C6A87C]/10">
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
    <section className="py-48 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
             <FadeIn key={i} delay={i * 100} className="group relative aspect-square glass-morphism rounded-3xl overflow-hidden interactive-element">
                <img src={tech.img} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-2">{tech.role}</div>
                   <div className="font-serif text-3xl text-[#EAE6DF] font-light">{tech.name}</div>
                </div>
             </FadeIn>
           ))}
        </div>
      </div>
    </section>
  )
}

const ScadaSystem = () => {
  return (
    <section className="py-48 bg-[#050606] relative overflow-hidden border-t border-[#C6A87C]/10">
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
                
                <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-[#C6A87C]/10">
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
    <section className="relative py-40 bg-[#020202] border-t border-[#C6A87C]/10 overflow-hidden">
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
    <section className="py-48 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
    <section className="py-48 bg-[#050606] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
                 <div className="font-serif text-5xl text-[#EAE6DF] font-light">98.5 <span className="text-xl text-[#C6A87C]/40 italic">%</span></div>
              </div>
              <div className="p-8 glass-morphism rounded-3xl">
                 <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.3em] uppercase mb-4">Response Time</div>
                 <div className="font-serif text-5xl text-[#EAE6DF] font-light">24 <span className="text-xl text-[#C6A87C]/40 italic">h</span></div>
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
    <section className="py-48 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
    <section className="py-48 bg-[#050606] border-t border-[#C6A87C]/10 relative overflow-hidden">
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
                     <FadeIn className="pt-10 mt-10 border-t border-[#C6A87C]/10">
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
    <section className="relative py-48 bg-[#020202] border-t border-[#C6A87C]/10 overflow-hidden">
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
    <section id="kontakt" className="relative py-48 bg-[#C6A87C] overflow-hidden text-[#030404]">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
      
      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <FadeIn>
          <div className="font-mono text-[#030404]/60 text-[10px] tracking-[0.4em] uppercase mb-10">Zainicjuj kontakt</div>
          <h2 className="text-[4rem] md:text-[6rem] font-serif text-[#030404] mb-10 leading-[0.9] tracking-tight font-light">
            Czas na <br/>
            <span className="italic">budowę.</span>
          </h2>
          <p className="text-xl text-[#030404]/70 mb-16 max-w-2xl mx-auto font-serif italic font-light leading-relaxed">
            Przygotujemy rzetelną wycenę budowy biogazowni od podstaw. Solidne technologie, realne terminy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
            <MagneticButton>
              <button className="w-full sm:w-auto bg-[#030404] text-[#C6A87C] px-16 py-6 text-[10px] font-mono tracking-[0.5em] uppercase hover:bg-[#1A1C1B] transition-all duration-500 interactive-element rounded-full">
                Wyślij Zapytanie
              </button>
            </MagneticButton>
            <button className="w-full sm:w-auto px-12 py-6 text-[10px] font-mono tracking-[0.4em] text-[#030404] border-b-2 border-[#030404] hover:bg-[#030404] hover:text-[#C6A87C] uppercase transition-all duration-500 interactive-element">
              (+48) 500 000 000
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#020202] border-t border-[#C6A87C]/10 pt-32 pb-12 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#C6A87C]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-5">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-10 h-10 border border-[#C6A87C]/30 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#C6A87C]" strokeWidth={1} />
              </div>
              <span className="text-[#EAE6DF] font-serif tracking-widest text-2xl uppercase">
                Green Plant <span className="text-[#C6A87C] italic font-light lowercase">tech.</span>
              </span>
            </div>
            <p className="text-[#EAE6DF]/40 max-w-sm font-serif italic font-light text-lg leading-relaxed">
              Generalny wykonawca biogazowni rolniczych i komunalnych. Projektowanie, budowa i serwis gwarancyjny.
            </p>
          </div>
          
          <div className="md:col-start-8 md:col-span-2">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Oferta</h4>
            <ul className="space-y-6">
              {['Projektowanie', 'Budowa pod klucz', 'Serwis CHP', 'Modernizacje'].map((link, i) => (
                <li key={i}><a href="#" className="text-[#EAE6DF]/40 hover:text-[#C6A87C] transition-colors text-[10px] font-mono tracking-[0.2em] uppercase interactive-element">{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[#C6A87C] font-mono mb-8 uppercase text-[9px] tracking-[0.4em]">Firma</h4>
            <ul className="space-y-6">
              {['O nas', 'Realizacje', 'Kariera', 'Kontakt'].map((link, i) => (
                <li key={i}><a href="#" className="text-[#EAE6DF]/40 hover:text-[#C6A87C] transition-colors text-[10px] font-mono tracking-[0.2em] uppercase interactive-element">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t-[0.5px] border-[#C6A87C]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#EAE6DF]/30 text-[9px] font-mono uppercase tracking-[0.3em]">
            &copy; 2026 Green Plant Technologies Sp. z o.o.
          </p>
          <div className="flex gap-10 text-[9px] text-[#EAE6DF]/30 font-mono uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-[#C6A87C] transition-colors interactive-element">Polityka Prywatności</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen relative font-serif selection:bg-[#C6A87C] selection:text-[#030404]">
        <TechnicalCursor />
        <FilmGrain />
        <SystemStatus />
        <Navbar />
        <Hero />
        <TickerTape />
        <Approach />
        <BlueprintProcess />
        <ContractModels />
        <FeedstockMatrix />
        <EconomicsSection />
        <SmartGrid />
        <ProjectsGallery />
        <EditorialBento />
        <TechStack />
        <ScadaSystem />
        <ResearchAndDevelopment />
        <Leadership />
        <OperationsMaintenance />
        <SafetyStandards />
        <TechnicalFAQ />
        <ServiceCoverage />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
