import re

with open('greenplant.jsx', 'r') as f:
    content = f.read()

# 1. Add hooks and premium components
hooks_to_replace = """const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsIntersecting(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return [ref, isIntersecting];
};

const useScrollProgress = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
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
  const [count, setCount] = React.useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const numericValue = parseFloat(String(value).replace(/,/g, ''));
  const hasComma = String(value).includes(',');
  const isDecimal = String(value).includes('.');

  React.useEffect(() => {
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
  const cardRef = React.useRef(null);
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
};"""

# Replace all section borders
content = re.sub(r'border-t border-\[#C6A87C\]/10 ', '', content)
content = re.sub(r' border-t border-\[#C6A87C\]/10', '', content)

with open('greenplant.jsx', 'w') as f:
    f.write(content)
