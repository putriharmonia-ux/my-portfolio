import { useEffect, useRef } from 'react';
import { useThemeColors } from '../hooks/useThemeColors';

/** Garis progres scroll di paling atas, ujungnya ada bintang kecil yang berkilau. */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const { colors } = useThemeColors();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 100000, pointerEvents: 'none' }}
    >
      <div
        ref={barRef}
        style={{
          position: 'relative',
          height: '100%',
          width: '0%',
          background: `linear-gradient(90deg, ${colors.pink[200]}, ${colors.pink[400]}, #B9A7E8)`,
          borderRadius: '0 3px 3px 0',
          boxShadow: `0 0 10px ${colors.pink[300]}`,
        }}
      >
        <span className="progress-star" style={{ background: '#fff', boxShadow: `0 0 8px 2px ${colors.pink[300]}` }} />
      </div>
    </div>
  );
};

export default ScrollProgress;
