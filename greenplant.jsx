import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Database, ShieldCheck, ChevronRight, Zap, ArrowRight, Factory, CheckCircle2, Plus, ArrowUpRight, MapPin, ChevronDown } from 'lucide-react';

// --- STYLES & FONTS ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    :root {
      --bg-black: #030404;
      --accent-gold: #C6A87C;
      --text-light: #EAE6DF;
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
  `}} />
);

// --- CUSTOM HOOKS & UTILS ---

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
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
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

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

const Crosshair = ({ className = "" }) => (
  <div className={`absolute w-4 h-4 opacity-30 ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C6A87C]"></div>
    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#C6A87C]"></div>
  </div>
);

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 border-b ${scrolled ? 'bg-[#030404]/80 backdrop-blur-2xl border-[#C6A87C]/10 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]' : 'bg-transparent border-transparent py-10'}`}>
      <div className="max-w-[100rem] mx-auto px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-5 group cursor-pointer interactive-element">
          <div className="relative w-10 h-10 border border-[#C6A87C]/30 flex items-center justify-center overflow-hidden group-hover:border-[#C6A87C] transition-colors duration-700">
            <div className="absolute inset-0 bg-[#C6A87C] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            <Leaf className="w-4 h-4 text-[#C6A87C] group-hover:text-[#030404] relative z-10 transition-colors duration-500" strokeWidth={1} />
          </div>
          <span className="text-[#EAE6DF] font-serif tracking-widest text-xl hidden sm:block uppercase">
            Green Plant <span className="text-[#C6A87C] font-light italic lowercase">tech.</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-mono tracking-[0.3em] text-[#EAE6DF]/50 uppercase">
          {['Podejście', 'Proces', 'Ekonomia', 'Realizacje'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#C6A87C] transition-colors duration-500 relative py-2 group interactive-element">
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A87C] group-hover:w-full transition-all duration-500 ease-out"></span>
            </a>
          ))}
        </div>
        <a href="#kontakt" className="bg-[#030404] border border-[#C6A87C]/40 text-[#C6A87C] px-8 py-3.5 text-[10px] font-mono tracking-[0.3em] uppercase hover:bg-[#C6A87C] hover:text-[#030404] transition-all duration-700 flex items-center gap-3 interactive-element">
          Wyceń projekt
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#030404]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjQzZBODYDIiBzdHJva2Utd2lkdGg9IjAuMDUiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0wIDYwaDYwTTYwIDBmLTYwIi8+PC9nPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_20%,transparent_100%)] opacity-30"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.08)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-center w-full">
        <div className="lg:col-span-7 relative z-20">
          <FadeIn>
            <div className="inline-flex items-center gap-4 mb-10 border border-[#C6A87C]/20 px-4 py-2 bg-[#030404]/50 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-[#C6A87C] animate-pulse"></span>
              <span className="text-[#C6A87C] text-[9px] font-mono tracking-[0.4em] uppercase">Generalny Wykonawca</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-[5rem] md:text-[7.5rem] font-serif text-[#EAE6DF] leading-[0.85] tracking-tight mb-12 font-light">
              Stabilna <br />
              <span className="italic text-[#C6A87C] font-normal pl-8 md:pl-16">energia.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-xl md:text-2xl text-[#EAE6DF]/60 mb-10 leading-relaxed max-w-2xl font-serif font-light italic border-l border-[#C6A87C]/30 pl-6">
              Projektujemy i budujemy przemysłowe i rolnicze instalacje biogazowe. Transformujemy biomasę w czysty zysk.
            </p>
            <p className="text-[11px] font-mono text-[#EAE6DF]/40 max-w-lg leading-loose mb-14 uppercase tracking-[0.2em]">
              Realizacje pod klucz. Od fundamentów komór fermentacyjnych po synchronizację agregatów CHP z krajową siecią energetyczną.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <a href="#kontakt" className="group inline-flex items-center gap-6 interactive-element">
              <div className="w-14 h-14 rounded-full border border-[#C6A87C]/40 flex items-center justify-center group-hover:bg-[#C6A87C] transition-colors duration-500">
                <ArrowRight className="w-5 h-5 text-[#C6A87C] group-hover:text-[#030404] transition-colors" strokeWidth={1} />
              </div>
              <span className="text-[#C6A87C] text-[10px] font-mono tracking-[0.3em] uppercase group-hover:tracking-[0.4em] transition-all duration-500">
                Inicjuj Inwestycję
              </span>
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={400} direction="left" className="lg:col-span-5 relative hidden lg:block h-full">
          <div className="absolute inset-0 border border-[#C6A87C]/10 bg-[#060807]/60 backdrop-blur-xl p-8 flex flex-col group overflow-hidden">
            <Crosshair className="top-4 left-4" />
            <Crosshair className="top-4 right-4" />
            <Crosshair className="bottom-4 left-4" />
            <Crosshair className="bottom-4 right-4" />

            <div className="flex justify-between items-start relative z-10 mb-auto">
              <Factory className="text-[#C6A87C]/40 w-8 h-8" strokeWidth={1} />
              <div className="text-right">
                <div className="font-mono text-[8px] text-[#EAE6DF]/30 tracking-[0.3em] uppercase mb-2">Instalacja Kogeneracyjna</div>
                <div className="font-serif text-[#C6A87C] text-xl italic">Fermentacja Mezofilna</div>
              </div>
            </div>

            <div className="relative w-full aspect-square flex items-center justify-center my-8">
               <div className="absolute inset-4 border-[0.5px] border-[#C6A87C]/20 rounded-full"></div>
               <div className="absolute inset-10 border-[0.5px] border-dashed border-[#C6A87C]/30 rounded-full animate-[spin_60s_linear_infinite]"></div>
               <div className="absolute w-40 h-40 bg-[#C6A87C]/5 rounded-full blur-[40px]"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-[#C6A87C]/60" strokeWidth={0.5} />
               </div>
               <div className="absolute w-full h-[1px] bg-[#C6A87C]/10"></div>
               <div className="absolute h-full w-[1px] bg-[#C6A87C]/10"></div>
            </div>

            <div className="relative z-10 border-t-[0.5px] border-[#C6A87C]/20 pt-6 mt-auto">
              <div className="flex justify-between font-mono text-[9px] text-[#EAE6DF]/50 uppercase tracking-[0.2em] mb-3">
                <span>Wydajność Procesu</span>
                <span className="text-[#C6A87C]">Optymalna</span>
              </div>
              <div className="h-[1px] w-full bg-[#EAE6DF]/10 relative">
                <div className="absolute top-0 left-0 h-full bg-[#C6A87C] w-full shadow-[0_0_15px_rgba(198,168,124,0.4)]"></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const TickerTape = () => {
  const words = [
    "FERMENTACJA MEZOFILNA", "KOGENERACJA CHP", "ZBIORNIKI ŻELBETOWE", 
    "POFERMENT", "ODSIARCZANIE", "SCADA SYSTEM", "GENERALNE WYKONAWSTWO",
    "FERMENTACJA MEZOFILNA", "KOGENERACJA CHP", "ZBIORNIKI ŻELBETOWE"
  ];

  return (
    <div className="bg-[#030404] border-y border-[#C6A87C]/10 py-6 overflow-hidden flex items-center relative">
       <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#030404] to-transparent z-10 pointer-events-none"></div>
       <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#030404] to-transparent z-10 pointer-events-none"></div>
       <div className="flex animate-marquee whitespace-nowrap w-[200%] items-center">
          {words.map((word, i) => (
            <div key={i} className="flex items-center">
              <span className="font-mono text-[10px] text-[#EAE6DF]/30 tracking-[0.4em] uppercase px-8">{word}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A87C]/30"></div>
            </div>
          ))}
       </div>
    </div>
  )
}

const Approach = () => {
  return (
    <section id="podejscie" className="relative min-h-[90vh] flex items-center bg-[#020202]">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative hidden md:block">
          <div className="absolute inset-0 bg-[#030404]/40 z-10"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888087425-ce81df8219b7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-luminosity"></div>
          <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C6A87C]/30 to-transparent z-20"></div>
        </div>
        <div className="w-full md:w-1/2 h-full bg-topo opacity-50 relative">
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#020202]"></div>
        </div>
      </div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-20 w-full">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="hidden md:block">
            <FadeIn direction="right">
              <div className="w-32 h-32 border border-[#C6A87C]/20 p-4">
                <div className="w-full h-full border border-[#C6A87C]/40 animate-[spin_30s_linear_infinite]"></div>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn direction="left" className="py-20 md:py-0">
            <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Filozofia Inwestycji</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#EAE6DF] leading-[1.1] mb-10">
              Budujemy na <br/>
              <span className="text-outline italic">dekady.</span>
            </h2>
            <p className="text-[#EAE6DF]/60 font-light text-lg leading-relaxed mb-12 font-serif italic max-w-lg">
              Instalacja biogazowa to masywna inwestycja inżynieryjna. Odrzucamy niesprawdzone nowinki. Opieramy się na pancernej architekturze żelbetowej i zachodnich technologiach pompujących.
            </p>
            
            <div className="flex gap-16 border-t-[0.5px] border-[#C6A87C]/20 pt-10">
              <div>
                <div className="text-5xl font-serif text-[#C6A87C] mb-3">25<span className="text-xl text-[#C6A87C]/50 italic">+ lat</span></div>
                <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.3em]">Oczekiwana żywotność</div>
              </div>
              <div>
                <div className="text-5xl font-serif text-[#C6A87C] mb-3">24<span className="text-xl text-[#C6A87C]/50 italic">/7</span></div>
                <div className="font-mono text-[8px] text-[#EAE6DF]/40 uppercase tracking-[0.3em]">Ciągła praca silników</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const BlueprintProcess = () => {
  const steps = [
    { num: "01", title: "Audyt i Projekt", desc: "Zaczynamy od dokładnej analizy Twojego substratu (np. gnojowica, obornik, kiszonka). Na tej podstawie dobieramy pojemność komór i moc generatora." },
    { num: "02", title: "Prace Budowlane", desc: "Wylewamy szczelne żelbetowe zbiorniki fermentacyjne. Instalujemy precyzyjne systemy ogrzewania ściennego oraz zaawansowane układy mieszadeł." },
    { num: "03", title: "Rozruch i CHP", desc: "Instalacja stacji oczyszczania biogazu, odpalenie silnika kogeneracyjnego (CHP) i wpięcie do sieci elektroenergetycznej z zachowaniem norm." }
  ];

  return (
    <section id="proces" className="relative py-40 bg-[#050606] border-t border-[#C6A87C]/10 overflow-hidden">
      <div className="absolute inset-0 bg-blueprint z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050606_80%)] z-0 pointer-events-none"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 pb-8 border-b-[0.5px] border-[#C6A87C]/20">
            <div>
              <h2 className="text-[10px] font-mono tracking-[0.4em] text-[#C6A87C] uppercase mb-4">Metodologia</h2>
              <p className="text-4xl md:text-5xl font-serif text-[#EAE6DF]">Proces <span className="italic font-light text-[#C6A87C]">Wykonawczy</span></p>
            </div>
            <div className="text-[9px] font-mono text-[#EAE6DF]/30 tracking-[0.3em] uppercase mt-6 md:mt-0">
              Wdrażanie architektury klasy przemysłowej
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 200} className="relative bg-[#030404]/80 backdrop-blur-sm border border-[#C6A87C]/20 p-10 group hover:bg-[#080A09] transition-colors duration-700 interactive-element">
              <Crosshair className="top-2 left-2 opacity-10 group-hover:opacity-50 transition-opacity" />
              <Crosshair className="bottom-2 right-2 opacity-10 group-hover:opacity-50 transition-opacity" />
              
              <div className="font-serif text-6xl text-[#C6A87C]/10 absolute right-6 top-6 italic group-hover:text-[#C6A87C]/20 transition-colors duration-700">{step.num}</div>
              
              <div className="w-12 h-12 border-[0.5px] border-[#C6A87C]/30 rounded-full flex items-center justify-center mb-10 bg-[#030404]">
                <div className="w-2 h-2 bg-[#C6A87C] rounded-full group-hover:animate-ping"></div>
              </div>
              
              <h3 className="font-mono text-[11px] tracking-[0.3em] text-[#C6A87C] uppercase mb-6">{step.title}</h3>
              <p className="font-serif font-light text-[#EAE6DF]/50 leading-relaxed text-lg">{step.desc}</p>
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
  const [hoveredRow, setHoveredRow] = useState(null);

  const substrates = [
    { name: "Gnojowica Bydlęca", category: "Odpad Rolniczy", yield: "~ 25 m³/t", ch4: "55-60%" },
    { name: "Obornik Świński", category: "Odpad Rolniczy", yield: "~ 60 m³/t", ch4: "60-65%" },
    { name: "Kiszonka Kukurydzy", category: "Uprawa Celowa", yield: "~ 200 m³/t", ch4: "52-55%" },
    { name: "Wysłodki Buraczane", category: "Odpad Przemysłowy", yield: "~ 120 m³/t", ch4: "50-55%" },
    { name: "Odpady Poubojowe", category: "Odpad Przemysłowy", yield: "~ 300 m³/t", ch4: "65-70%" }
  ];

  return (
    <section className="py-40 bg-[#050606] border-t border-[#C6A87C]/10 relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-xl">
              <h2 className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-6">Parametryzacja Wsadu</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-[#EAE6DF] leading-[1.1]">
                Macierz <span className="italic font-light text-[#C6A87C]">Substratów.</span>
              </h3>
            </div>
            <p className="text-[#EAE6DF]/40 font-serif italic text-lg font-light max-w-sm">
              Każda instalacja jest indywidualnie kalibrowana. Wydajność reaktora zależy od precyzyjnej receptury i właściwości biochemicznych Twojej biomasy.
            </p>
          </div>
        </FadeIn>

        <div className="border-t-[0.5px] border-[#C6A87C]/30 flex flex-col w-full relative">
          {substrates.map((sub, i) => (
            <div 
              key={i}
              className="group border-b-[0.5px] border-[#C6A87C]/10 relative interactive-element"
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A87C]/5 to-transparent transition-opacity duration-500 pointer-events-none ${hoveredRow === i ? 'opacity-100' : 'opacity-0'}`}></div>
              
              <div className={`relative z-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 transition-all duration-500 ${hoveredRow !== null && hoveredRow !== i ? 'opacity-30 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'}`}>
                <div className="flex items-center gap-10 md:w-1/2">
                  <span className="font-mono text-[#C6A87C]/30 text-xs w-8">0{i+1}</span>
                  <div>
                    <h4 className="font-serif text-4xl md:text-5xl text-[#EAE6DF] font-light mb-2">{sub.name}</h4>
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#EAE6DF]/50">{sub.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-12 md:w-1/2 md:justify-end">
                  <div className="text-left md:text-right">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C6A87C] mb-2">Uzysk Biogazu (świeża masa)</p>
                    <p className="font-serif text-2xl text-[#EAE6DF] italic">{sub.yield}</p>
                  </div>
                  <div className="text-left md:text-right w-24">
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C6A87C] mb-2">Zawartość CH4</p>
                    <p className="font-serif text-2xl text-[#EAE6DF] italic">{sub.ch4}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EconomicsSection = () => {
  return (
    <section id="ekonomia" className="relative py-40 bg-[#010101] overflow-hidden border-t border-[#C6A87C]/10">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-full h-[1px] top-[20%] bg-[#C6A87C]/10"></div>
        <div className="absolute w-full h-[1px] top-[40%] bg-[#C6A87C]/10"></div>
        <div className="absolute w-full h-[1px] top-[60%] bg-[#C6A87C]/10"></div>
        <div className="absolute w-full h-[1px] top-[80%] bg-[#C6A87C]/10"></div>
        <div className="absolute h-full w-[1px] left-[20%] bg-[#C6A87C]/5"></div>
        <div className="absolute h-full w-[1px] left-[50%] bg-[#C6A87C]/5"></div>
        <div className="absolute h-full w-[1px] left-[80%] bg-[#C6A87C]/5"></div>
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <FadeIn direction="right">
            <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Inżynieria Finansowa</div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-[1.05] mb-10">
              Zwrot z <br/>
              <span className="italic text-[#C6A87C] font-light">inwestycji.</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-xl leading-relaxed mb-12 font-serif italic">
              Biogazownia to nie tylko utylizacja odpadów. To przewidywalne, potrójne źródło przychodu dla Twojego przedsiębiorstwa rolnego lub komunalnego.
            </p>
            
            <div className="space-y-8 border-t-[0.5px] border-[#C6A87C]/20 pt-12">
              {[
                { title: "Energia Elektryczna", desc: "Sprzedaż do sieci z gwarantowaną ceną (aukcje OZE) lub zasilanie własnego zakładu.", val: "65%" },
                { title: "Energia Cieplna", desc: "Darmowe ciepło do ogrzewania budynków, suszarni lub sprzedaży do lokalnej sieci ciepłowniczej.", val: "25%" },
                { title: "Wysokiej Klasy Nawóz", desc: "Poferment to znakomity, bezwonny nawóz zastępujący drogie nawozy sztuczne.", val: "10%" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start group">
                  <div className="max-w-sm">
                    <h4 className="font-serif text-2xl text-[#EAE6DF] mb-2">{item.title}</h4>
                    <p className="font-mono text-[9px] tracking-widest text-[#EAE6DF]/40 uppercase leading-loose">{item.desc}</p>
                  </div>
                  <div className="font-serif text-3xl text-[#C6A87C] italic opacity-50 group-hover:opacity-100 transition-opacity">{item.val}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left" className="relative h-full min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,168,124,0.1)_0%,transparent_70%)]"></div>
            <svg className="w-full h-auto drop-shadow-[0_0_20px_rgba(198,168,124,0.3)]" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 250 Q 100 250, 150 200 T 300 150 T 500 50" stroke="#C6A87C" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="0">
                <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="4s" fill="freeze" repeatCount="indefinite" />
              </path>
              <path d="M0 250 Q 100 250, 150 200 T 300 150 T 500 50 L 500 300 L 0 300 Z" fill="url(#gradient)" opacity="0.1" />
              <defs>
                <linearGradient id="gradient" x1="250" y1="50" x2="250" y2="300" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C6A87C" />
                  <stop offset="1" stopColor="#C6A87C" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle cx="150" cy="200" r="4" fill="#030404" stroke="#C6A87C" strokeWidth="2" />
              <circle cx="300" cy="150" r="4" fill="#030404" stroke="#C6A87C" strokeWidth="2" />
              <circle cx="500" cy="50" r="6" fill="#C6A87C" className="animate-pulse" />
            </svg>
            <div className="absolute right-0 top-10 border-[0.5px] border-[#C6A87C]/30 bg-[#030404]/80 backdrop-blur-md px-6 py-4">
              <div className="font-mono text-[8px] text-[#EAE6DF]/50 uppercase tracking-[0.3em] mb-2">Szacowany CAPEX Payback</div>
              <div className="font-serif text-4xl text-[#C6A87C]">5-7 <span className="text-xl text-[#C6A87C]/50 italic">lat</span></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const SmartGrid = () => {
  return (
    <section className="py-40 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,168,124,0.05)_0%,transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-32">
            <h2 className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-6">Dystrybucja Zysków</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-[1.05]">
              Węzeł <span className="italic font-light text-[#C6A87C]">Integracyjny.</span>
            </h3>
          </div>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#C6A87C]/20 -translate-y-1/2 hidden md:block"></div>
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A87C] to-transparent -translate-y-1/2 opacity-50 hidden md:block animate-[pulse_3s_ease-in-out_infinite]"></div>
           
           <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative z-10">
             {[
               { icon: <Zap className="w-6 h-6" />, title: "Smart Grid", desc: "Sprzedaż nadwyżek energii elektrycznej do sieci krajowej w godzinach szczytowego zapotrzebowania.", val: "1.2 MW" },
               { icon: <Factory className="w-6 h-6" />, title: "Ciepło Systemowe", desc: "Zasilanie lokalnych sieci ciepłowniczych lub własnych suszarni rolniczych darmowym ciepłem odpadowym.", val: "1.3 MWt" },
               { icon: <Leaf className="w-6 h-6" />, title: "Rynek Nawozów", desc: "Dystrybucja certyfikowanego, organicznego pofermentu do okolicznych gospodarstw rolnych.", val: "22 t/doba" }
             ].map((node, i) => (
                <FadeIn key={i} delay={i * 200} className={`bg-[#050606] border-[0.5px] border-[#C6A87C]/30 p-10 flex flex-col items-center text-center relative group hover:border-[#C6A87C] transition-colors duration-500 interactive-element ${i === 1 ? 'md:-translate-y-12' : 'md:translate-y-12'}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,168,124,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C6A87C]/50 flex items-center justify-center mb-8 bg-[#030404] text-[#C6A87C] group-hover:scale-110 transition-transform duration-500">
                    {node.icon}
                  </div>
                  <h4 className="font-serif text-2xl text-[#EAE6DF] mb-4">{node.title}</h4>
                  <p className="font-mono text-[9px] tracking-widest leading-loose text-[#EAE6DF]/40 uppercase mb-8">{node.desc}</p>
                  <div className="mt-auto border-t-[0.5px] border-[#EAE6DF]/10 pt-6 w-full">
                    <span className="font-serif text-3xl italic text-[#C6A87C]">{node.val}</span>
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
        <h2 className="text-[12vw] font-serif uppercase tracking-tighter text-outline-massive leading-none">
          STABILNE ZRÓDŁO PRZYCHODU • ODPADY W ENERGIĘ • 
        </h2>
        <h2 className="text-[12vw] font-serif uppercase tracking-tighter text-outline-massive leading-none">
          STABILNE ZRÓDŁO PRZYCHODU • ODPADY W ENERGIĘ • 
        </h2>
      </div>
      
      <div className="w-[200%] flex animate-marquee-reverse whitespace-nowrap mt-[-2vw]">
        <h2 className="text-[12vw] font-serif uppercase tracking-tighter text-[#C6A87C] leading-none mix-blend-difference opacity-80">
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
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    { title: "Biogazownia Rolnicza", spec: "1.2 MW / Gnojowica i kiszonka", img: "https://images.unsplash.com/photo-1534073133331-c4b62a557083?q=80&w=2000&auto=format&fit=crop" },
    { title: "Zakład Komunalny", spec: "0.5 MW / Odpady Bio", img: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2000&auto=format&fit=crop" },
    { title: "Instalacja Przemysłowa", spec: "2.0 MW / Odpad poubojowy", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2000&auto=format&fit=crop" }
  ];

  return (
    <section id="realizacje" className="relative py-40 bg-[#030404] border-t border-[#C6A87C]/10 min-h-screen flex items-center overflow-hidden transition-colors duration-1000">
      {projects.map((proj, i) => (
        <div 
          key={i} 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out pointer-events-none"
          style={{ 
            backgroundImage: `url(${proj.img})`, 
            opacity: hoveredIndex === i ? 0.3 : 0,
            filter: 'grayscale(50%)'
          }}
        ></div>
      ))}
      <div className="absolute inset-0 bg-[#030404]/60 mix-blend-multiply pointer-events-none"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10 w-full">
        <FadeIn>
          <div className="mb-20">
            <h2 className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-4">Indeks Infrastruktury</h2>
            <div className="w-12 h-[1px] bg-[#C6A87C]/50"></div>
          </div>
        </FadeIn>

        <div className="flex flex-col w-full">
          {projects.map((proj, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div 
                className="group border-b border-[#EAE6DF]/10 py-12 md:py-16 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 interactive-element"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light text-outline text-outline-hover transition-all duration-500 uppercase tracking-tight">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-right">
                    <p className="font-mono text-[10px] tracking-[0.3em] text-[#C6A87C] uppercase mb-1">Moc / Substrat</p>
                    <p className="font-serif text-xl text-[#EAE6DF] italic">{proj.spec}</p>
                  </div>
                  <ArrowUpRight className="w-10 h-10 text-[#C6A87C] transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" strokeWidth={1} />
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
  const technologies = [
    { cat: "Kogeneracja (CHP)", brand: "Premium OEM", spec: "Sprawność elektryczna >43%. Praca w reżimie ciągłym." },
    { cat: "Systemy Pompowe", brand: "Wangen / Netzsch", spec: "Pompy wyporowe śrubowe, odporne na materiały ścierne." },
    { cat: "Magazynowanie Gazu", brand: "Sattler", spec: "Podwójne membrany EPDM o wysokiej gęstości z systemem kompensacji." },
    { cat: "Mieszadła", brand: "Suma / Flygt", spec: "Zatapialne i wolnoobrotowe. Pełna certyfikacja ATEX Strefa 1/2." },
    { cat: "Automatyka", brand: "Siemens S7", spec: "Architektura redundantna. Niezawodność sterowania przemysłowego." },
    { cat: "Analiza Gazu", brand: "Awite", spec: "Ciągła telemetria spektrometryczna: CH4, H2S, O2, CO2." }
  ];

  return (
    <section className="py-40 bg-[#050606] border-t border-[#C6A87C]/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint z-0 opacity-20"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-24">
            <h2 className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-4">Hardware & Komponenty</h2>
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b-[0.5px] border-[#C6A87C]/20 pb-8">
              <h3 className="text-4xl md:text-5xl font-serif text-[#EAE6DF]">
                Stos <span className="italic font-light text-[#C6A87C]">Technologiczny.</span>
              </h3>
              <p className="text-[#EAE6DF]/50 text-lg font-serif italic max-w-sm leading-relaxed text-right">
                Niezawodność to wypadkowa użytych części. Stosujemy wyłącznie europejski sprzęt klasy Tier-1.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-[0.5px] border-[#C6A87C]/20 bg-[#030404]/80 backdrop-blur-md">
          {technologies.map((tech, i) => (
            <FadeIn key={i} delay={i * 100} className="border-[0.5px] border-[#C6A87C]/10 p-10 group hover:bg-[#080A09] transition-colors duration-500 interactive-element">
              <div className="font-mono text-[9px] tracking-[0.3em] text-[#C6A87C]/60 uppercase mb-6 flex items-center gap-3">
                <span className="w-1 h-1 bg-[#C6A87C] rounded-full"></span>
                {tech.cat}
              </div>
              <h4 className="font-serif text-3xl text-[#EAE6DF] mb-4 font-light">{tech.brand}</h4>
              <p className="font-mono text-[10px] tracking-widest text-[#EAE6DF]/40 uppercase leading-loose">{tech.spec}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScadaSystem = () => {
  return (
    <section className="py-40 bg-[#030404] border-t border-[#C6A87C]/10 relative overflow-hidden">
      <div className="absolute inset-0 scanline z-20 pointer-events-none opacity-50 mix-blend-overlay"></div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        <FadeIn direction="right">
          <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">System SCADA</div>
          <h2 className="text-5xl md:text-6xl font-serif text-[#EAE6DF] leading-[1.1] mb-8">
            Nadzór <span className="italic text-[#C6A87C] font-light">absolutny.</span>
          </h2>
          <p className="text-[#EAE6DF]/60 font-light text-xl leading-relaxed mb-10 font-serif italic max-w-lg">
            Sercem każdej wybudowanej przez nas instalacji jest centralny system sterowania. Zapomnij o ręcznym regulowaniu zaworów. Cały proces jest w pełni zautomatyzowany.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t-[0.5px] border-[#EAE6DF]/10 pt-10">
            <div>
              <Database className="text-[#C6A87C] w-6 h-6 mb-4" strokeWidth={1} />
              <h4 className="font-serif text-2xl text-[#EAE6DF] mb-2">Automatyka</h4>
              <p className="font-mono text-[9px] tracking-widest text-[#EAE6DF]/40 uppercase leading-loose">Samodzielne sterowanie pompami i mieszadłami na podstawie odczytów pH i temperatury.</p>
            </div>
            <div>
              <Zap className="text-[#C6A87C] w-6 h-6 mb-4" strokeWidth={1} />
              <h4 className="font-serif text-2xl text-[#EAE6DF] mb-2">Zdalny Dostęp</h4>
              <p className="font-mono text-[9px] tracking-widest text-[#EAE6DF]/40 uppercase leading-loose">Podgląd wszystkich parametrów biogazowni z poziomu przeglądarki lub telefonu 24/7.</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" className="relative">
          <div className="border-[0.5px] border-[#C6A87C]/30 bg-[#020202] p-6 shadow-[0_0_50px_rgba(198,168,124,0.05)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,168,124,0.08)_0%,transparent_80%)]"></div>
            
            <div className="flex justify-between items-center border-b-[0.5px] border-[#C6A87C]/20 pb-4 mb-8 relative z-10">
              <span className="font-mono text-[10px] text-[#C6A87C] tracking-[0.3em] uppercase animate-pulse">Live Feed • Fermentator A</span>
              <span className="font-mono text-[10px] text-[#EAE6DF]/40">SYS.ON</span>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10 mb-8">
              <div className="bg-[#050606] border-[0.5px] border-[#C6A87C]/10 p-4">
                <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.2em] mb-2">Temp. Wew.</div>
                <div className="font-serif text-3xl text-[#EAE6DF]">42.1 <span className="text-sm text-[#C6A87C] italic">°C</span></div>
              </div>
              <div className="bg-[#050606] border-[0.5px] border-[#C6A87C]/10 p-4">
                <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.2em] mb-2">Poziom CH4</div>
                <div className="font-serif text-3xl text-[#EAE6DF]">58.4 <span className="text-sm text-[#C6A87C] italic">%</span></div>
              </div>
              <div className="bg-[#050606] border-[0.5px] border-[#C6A87C]/10 p-4">
                <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.2em] mb-2">Ciśnienie Gazu</div>
                <div className="font-serif text-3xl text-[#EAE6DF]">14.2 <span className="text-sm text-[#C6A87C] italic">mbar</span></div>
              </div>
              <div className="bg-[#050606] border-[0.5px] border-[#C6A87C]/10 p-4 relative overflow-hidden">
                <div className="font-mono text-[8px] text-[#EAE6DF]/30 uppercase tracking-[0.2em] mb-2">Mieszadła</div>
                <div className="font-serif text-2xl text-[#C6A87C] italic">Aktywne</div>
                <div className="absolute right-4 bottom-4 w-2 h-2 bg-[#C6A87C] rounded-full animate-ping"></div>
              </div>
            </div>

            <div className="h-24 border-[0.5px] border-[#C6A87C]/20 bg-[#030404] relative z-10 flex items-end gap-1 p-2">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-[#C6A87C]/40 group-hover:bg-[#C6A87C] transition-colors duration-500" 
                  style={{ height: `${Math.max(20, Math.random() * 100)}%`, animation: `pulse ${1 + Math.random() * 2}s infinite alternate` }}
                ></div>
              ))}
            </div>
          </div>
        </FadeIn>
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
      id: "ENG-01"
    },
    { 
      role: "Główny Technolog OZE", 
      name: "Dział Biologiczny", 
      exp: "Eksperci od fermentacji metanowej. Parametryzacja środowiska pod kątem maksymalizacji uzysku z powierzonej biomasy.",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
      id: "BIO-02"
    }
  ];

  return (
    <section className="py-40 bg-[#030404] border-t border-[#C6A87C]/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-pinstripes opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030404] via-transparent to-[#030404] z-0"></div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <FadeIn>
          <div className="mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b-[0.5px] border-[#C6A87C]/20 pb-8">
            <div>
              <h2 className="text-[10px] font-mono tracking-[0.4em] text-[#C6A87C] uppercase mb-4">Ludzie & Beton</h2>
              <p className="text-4xl md:text-5xl font-serif text-[#EAE6DF]">Nadzór <span className="italic font-light text-[#C6A87C]">Inżynierski</span></p>
            </div>
            <p className="text-[#EAE6DF]/50 text-lg font-serif italic max-w-md leading-relaxed">
              Budowę biogazowni powierza się ekspertom, których doświadczenie mierzy się w megawatach i metrach sześciennych wylanego betonu.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-24">
          {leaders.map((leader, i) => (
            <FadeIn key={i} delay={i * 200} className={`group relative flex flex-col items-center md:items-start interactive-element ${i === 1 ? 'md:mt-32' : ''}`}>
               <div className="absolute -left-10 md:-left-20 -top-20 font-serif text-[12rem] text-[#EAE6DF]/[0.02] italic font-light pointer-events-none group-hover:text-[#C6A87C]/5 transition-colors duration-1000 leading-none z-0">
                 0{i+1}
               </div>

               <div className="aspect-[3/4] w-full max-w-[28rem] bg-[#050606] border-[0.5px] border-[#C6A87C]/20 relative overflow-hidden mb-12 grayscale group-hover:grayscale-0 transition-all duration-1000 z-10">
                  <div className="absolute inset-0 bg-[#0A0C0B] opacity-60 group-hover:opacity-20 transition-opacity duration-1000 mix-blend-multiply z-10 pointer-events-none"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 group-hover:translate-x-4 transition-transform duration-500 ease-out z-0"
                    style={{ backgroundImage: `url(${leader.img})` }}
                  ></div>
                  
                  <div className="absolute top-4 left-4 w-4 h-[0.5px] bg-[#C6A87C]/50 z-20"></div>
                  <div className="absolute top-4 left-4 w-[0.5px] h-4 bg-[#C6A87C]/50 z-20"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-[0.5px] bg-[#C6A87C]/50 z-20"></div>
                  <div className="absolute bottom-4 right-4 w-[0.5px] h-4 bg-[#C6A87C]/50 z-20"></div>
                  
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C6A87C]/50 shadow-[0_0_15px_#C6A87C] animate-scan"></div>

                     <div className="absolute bottom-24 left-6 flex flex-col gap-2">
                       <div className="font-mono text-[8px] text-[#030404] tracking-[0.4em] uppercase bg-[#C6A87C]/80 px-2 py-1 backdrop-blur-sm w-fit border-[0.5px] border-[#C6A87C]">
                         ID: {leader.id}
                       </div>
                       <div className="flex items-end gap-[2px] h-4 ml-1">
                         {[...Array(6)].map((_, j) => (
                           <div key={j} className="w-1 bg-[#C6A87C]" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animation: `pulse ${0.5 + Math.random()}s infinite alternate` }}></div>
                         ))}
                       </div>
                     </div>

                     <div className="absolute top-6 right-6 text-right">
                       <div className="font-mono text-[7px] text-[#EAE6DF]/60 tracking-[0.3em] uppercase mb-1">Status Wizyjny</div>
                       <div className="flex gap-1 justify-end">
                         <div className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full animate-pulse"></div>
                         <div className="font-mono text-[8px] text-[#C6A87C] tracking-[0.2em]">REC</div>
                       </div>
                     </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full bg-[#030404]/90 backdrop-blur-md px-8 py-5 border-t-[0.5px] border-r-[0.5px] border-[#C6A87C]/20 z-30 -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out">
                     <span className="font-mono text-[9px] tracking-[0.3em] text-[#C6A87C] uppercase flex items-center gap-3">
                       <CheckCircle2 className="w-4 h-4" strokeWidth={1} />
                       Akredytacja Jakości ISO
                     </span>
                  </div>
               </div>
               
               <div className="relative z-10 pl-8 border-l-[0.5px] border-[#C6A87C]/30 max-w-[28rem] w-full group-hover:border-[#C6A87C] transition-colors duration-700">
                 <h4 className="font-mono text-[9px] tracking-[0.4em] text-[#C6A87C] uppercase mb-5 flex items-center gap-3">
                   <span className="w-1.5 h-1.5 bg-[#C6A87C] rounded-full group-hover:animate-ping"></span>
                   {leader.role}
                 </h4>
                 <h3 className="font-serif text-4xl text-[#EAE6DF] mb-6 font-light">{leader.name}</h3>
                 <p className="font-serif font-light text-[#EAE6DF]/50 text-xl italic leading-relaxed">{leader.exp}</p>
               </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

const OperationsMaintenance = () => {
  return (
    <section className="py-40 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
      {/* Background Graphic representing a continuous cycle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#EAE6DF" strokeWidth="0.2" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#C6A87C" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="#EAE6DF" strokeWidth="0.2" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-[100rem] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <FadeIn className="lg:col-span-5">
            <div className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-8 border-l border-[#C6A87C] pl-4">Wsparcie Post-Koncesyjne</div>
            <h2 className="text-5xl md:text-7xl font-serif text-[#EAE6DF] leading-[1.05] mb-10">
              Utrzymanie <br/>
              <span className="italic text-[#C6A87C] font-light">ruchu. (O&M)</span>
            </h2>
            <p className="text-[#EAE6DF]/50 font-light text-xl leading-relaxed mb-12 font-serif italic">
              Oddanie kluczy to dopiero początek. Zapewniamy kompleksowy serwis mechaniczny, elektryczny oraz wsparcie biologiczne, aby Twoja biogazownia pracowała bez przestojów.
            </p>
            <button className="bg-transparent border-[0.5px] border-[#C6A87C]/50 text-[#C6A87C] px-8 py-4 text-[9px] font-mono tracking-[0.3em] uppercase hover:bg-[#C6A87C] hover:text-[#030404] transition-all duration-700 interactive-element">
              Pobierz SLA (Service Level Agreement)
            </button>
          </FadeIn>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {[
              { num: "24/7", title: "Monitoring SCADA", desc: "Zdalny nadzór nad parametrami pracy agregatów i komór przez nasze centrum dyspozytorskie." },
              { num: "48h", title: "Gwarancja Reakcji", desc: "Mobilne ekipy serwisowe gotowe do usunięcia usterki mechanicznej lub elektronicznej na terenie całego kraju." },
              { num: "Magazyn", title: "Części Zamienne", desc: "Kluczowe podzespoły (pompy, uszczelnienia, części silnikowe) trzymamy w naszym krajowym buforze magazynowym." },
              { num: "Biolog", title: "Opieka Technologiczna", desc: "Cykliczne badanie pofermentu i optymalizacja dawkowania substratu w celu utrzymania stabilności flory bakteryjnej." }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 150} className="border-[0.5px] border-[#EAE6DF]/10 bg-[#030404]/50 backdrop-blur-sm p-8 group hover:border-[#C6A87C]/50 transition-colors duration-500 interactive-element">
                <div className="font-serif text-4xl text-[#C6A87C] italic mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{feature.num}</div>
                <h4 className="font-mono text-[11px] tracking-widest uppercase text-[#EAE6DF] mb-4">{feature.title}</h4>
                <p className="font-serif font-light text-[#EAE6DF]/40 text-lg leading-relaxed">{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const SafetyStandards = () => {
  const standards = [
    { title: "Dyrektywa ATEX", desc: "Zabezpieczenie przeciwwybuchowe EX dla wszystkich stref zagrożonych wyciekiem metanu. Zero kompromisów." },
    { title: "Certyfikacja CE", desc: "Pełna zgodność z rygorystycznymi europejskimi normami maszynowymi. Homologacja komponentów." },
    { title: "Standardy UDT", desc: "Instalacje ciśnieniowe podlegające ścisłemu dozorowi Urzędu Dozoru Technicznego w każdym etapie wylewek." },
    { title: "Ochrona PPOŻ", desc: "Zintegrowane systemy oddymiania i aktywne, bezdymne pochodnie bezpieczeństwa nadmiarowego gazu." }
  ];

  return (
    <section className="py-40 bg-[#020202] border-t border-[#C6A87C]/10 relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,168,124,0.05)_0%,transparent_50%)] pointer-events-none"></div>
       <div className="max-w-[100rem] mx-auto px-8 relative z-10">
          <FadeIn>
             <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="max-w-xl">
                   <h2 className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
                     <ShieldCheck className="w-4 h-4" /> Zgodność i Normy
                   </h2>
                   <h3 className="text-4xl md:text-6xl font-serif text-[#EAE6DF] leading-[1.1]">
                     Standardy <br/><span className="italic font-light text-[#C6A87C]">Bezpieczeństwa.</span>
                   </h3>
                </div>
                <p className="text-[#EAE6DF]/50 text-lg font-serif italic max-w-sm leading-relaxed border-l border-[#C6A87C]/30 pl-6 pb-2">
                   Przemysł biogazowy to środowisko podwyższonego ryzyka. Projektujemy i budujemy w reżimie najwyższych, europejskich dyrektyw.
                </p>
             </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {standards.map((std, i) => (
                <FadeIn key={i} delay={i*150} className="border-[0.5px] border-[#C6A87C]/20 bg-[#030404] p-10 group hover:bg-[#070908] transition-colors duration-700 relative overflow-hidden interactive-element flex flex-col justify-between min-h-[300px]">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A87C]/5 rounded-bl-full group-hover:scale-[2] transition-transform duration-[1.5s] ease-out"></div>
                   
                   <div>
                     <div className="font-mono text-[10px] text-[#C6A87C]/40 mb-8 tracking-widest">REG.0{i+1}</div>
                     <h4 className="font-serif text-3xl text-[#EAE6DF] mb-6 font-light">{std.title}</h4>
                   </div>
                   
                   <p className="font-mono text-[9px] tracking-widest leading-loose text-[#EAE6DF]/40 uppercase relative z-10 group-hover:text-[#EAE6DF]/60 transition-colors duration-500">
                     {std.desc}
                   </p>
                </FadeIn>
             ))}
          </div>
       </div>
    </section>
  )
}

const TechnicalFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "Jakie pozyskujemy pozwolenia na budowę?", a: "Prowadzimy inwestora przez cały proces formalny. Uzyskujemy decyzję środowiskową, warunki zabudowy (lub wpis do MPZP), pozwolenie na budowę oraz warunki przyłączeniowe do sieci energetycznej." },
    { q: "Jaki jest czas realizacji inwestycji?", a: "Dla typowej biogazowni rolniczej o mocy 500 kW - 1 MW, proces budowlany i rozruch technologiczny zajmuje zazwyczaj od 8 do 12 miesięcy po uzyskaniu wszystkich prawomocnych pozwoleń." },
    { q: "Czy pomagacie w doborze substratu?", a: "Tak. Nasi technolodzy badają dostępną biomasę w laboratorium. Tworzymy tzw. 'recepturę wsadu', która determinuje dobór technologii i wielkość komór, gwarantując stałą produkcję metanu." },
    { q: "Jak wygląda serwis po oddaniu instalacji?", a: "Zapewniamy pełen serwis gwarancyjny i pogwarancyjny, w tym zdalny monitoring SCADA. Posiadamy mobilne ekipy serwisowe, które dbają o przeglądy agregatów CHP i układów pompowych." }
  ];

  return (
    <section className="py-40 bg-[#050606] border-t border-[#C6A87C]/10 relative">
       <div className="absolute inset-0 bg-blueprint z-0 opacity-50"></div>
       <div className="max-w-[100rem] mx-auto px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-start">
         
         <FadeIn className="lg:col-span-4 sticky top-40">
            <h2 className="font-mono text-[#C6A87C] text-[10px] tracking-[0.4em] uppercase mb-6">Baza Wiedzy</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#EAE6DF] leading-[1.1] mb-8">
              Dokumentacja <br/>
              <span className="italic font-light text-[#C6A87C]">Operacyjna.</span>
            </h3>
            <p className="text-[#EAE6DF]/40 font-serif italic text-lg font-light">Najważniejsze aspekty procesu inwestycyjnego zdemistyfikowane.</p>
         </FadeIn>

         <div className="lg:col-span-8 flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div 
                  className="border-b-[0.5px] border-[#C6A87C]/20 py-8 cursor-pointer group interactive-element"
                  onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                >
                  <div className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-8">
                      <span className="font-mono text-[10px] text-[#C6A87C]/40 uppercase tracking-[0.2em] w-12">DOC.0{i+1}</span>
                      <h4 className={`font-mono text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${openIndex === i ? 'text-[#C6A87C]' : 'text-[#EAE6DF] group-hover:text-[#C6A87C]/70'}`}>
                        {faq.q}
                      </h4>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#C6A87C]/50 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} strokeWidth={1} />
                  </div>
                  <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <p className="font-serif italic text-xl text-[#EAE6DF]/60 leading-relaxed pl-20 pt-8 pb-4">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
         </div>
       </div>
    </section>
  )
}

const ServiceCoverage = () => {
  return (
    <section className="relative py-40 bg-[#020202] border-t border-[#C6A87C]/10 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
         <div className="w-[1000px] h-[1000px] border-[0.5px] border-[#C6A87C] rounded-full absolute flex items-center justify-center">
            <div className="absolute w-[800px] h-[800px] border-[0.5px] border-[#C6A87C] rounded-full"></div>
            <div className="absolute w-[600px] h-[600px] border-[0.5px] border-dashed border-[#C6A87C] rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
            <div className="absolute w-[400px] h-[400px] border-[0.5px] border-[#C6A87C] rounded-full"></div>
            <div className="w-full h-[0.5px] bg-[#C6A87C] absolute"></div>
            <div className="h-full w-[0.5px] bg-[#C6A87C] absolute"></div>
            <div className="absolute top-[30%] right-[35%] w-2 h-2 bg-[#C6A87C] rounded-full animate-ping"></div>
            <div className="absolute top-[60%] left-[40%] w-1 h-1 bg-[#C6A87C] rounded-full shadow-[0_0_10px_#C6A87C]"></div>
            <div className="absolute bottom-[25%] right-[20%] w-1.5 h-1.5 bg-[#C6A87C] rounded-full shadow-[0_0_10px_#C6A87C]"></div>
         </div>
      </div>
      
      <div className="max-w-[100rem] mx-auto px-8 relative z-10 flex flex-col items-center text-center">
        <FadeIn>
          <MapPin className="text-[#C6A87C] w-8 h-8 mb-8 mx-auto" strokeWidth={1} />
          <h2 className="text-4xl md:text-5xl font-serif text-[#EAE6DF] leading-[1.1] mb-6">
            Logistyka i <span className="italic text-[#C6A87C] font-light">zasięg.</span>
          </h2>
          <p className="text-[#EAE6DF]/50 font-serif italic text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Nasze zespoły projektowe, budowlane i serwisowe operują na terenie całej Polski, zapewniając szybki czas reakcji i pełen nadzór inwestorski bez względu na lokalizację inwestycji.
          </p>
          <div className="inline-flex items-center gap-4 border border-[#C6A87C]/30 px-6 py-3 bg-[#030404]/80 backdrop-blur-md">
            <span className="w-2 h-2 bg-[#C6A87C] rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#EAE6DF]/80">Polska Centralna, Północna, Zachodnia</span>
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <button className="w-full sm:w-auto bg-[#030404] text-[#C6A87C] px-12 py-5 text-[10px] font-mono tracking-[0.4em] uppercase hover:bg-transparent hover:text-[#030404] border border-[#030404] transition-all duration-500 interactive-element">
              Wyślij Zapytanie
            </button>
            <button className="w-full sm:w-auto px-12 py-5 text-[10px] font-mono tracking-[0.4em] text-[#030404] border border-[#030404] hover:bg-[#030404] hover:text-[#C6A87C] uppercase transition-all duration-500 interactive-element">
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
        <FilmGrain />
        <CustomCursor />
        <Navbar />
        <Hero />
        <TickerTape />
        <Approach />
        <BlueprintProcess />
        <ContractModels />
        <FeedstockMatrix />
        <EconomicsSection />
        <SmartGrid />
        <KineticBreak />
        <CircularImpact />
        <EnvironmentalImpact />
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
