import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import '../styles/dividers.css';

type Variant = 'yarn' | 'paws' | 'wave';

interface SectionDividerProps {
  /** yarn = bola wol menggulir | paws = jejak kaki kucing | wave = ombak lembut */
  variant: Variant;
  /** warna latar harus sama dengan ujung section di atas & bawahnya */
  bg?: 'pink' | 'white';
}

/** Mengisi --p (0-1: posisi divider di layar) dan --q (progres animasi) saat di-scroll */
function useScrollVars(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '0.5');
      el.style.setProperty('--q', '1');
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const q = Math.min(1, Math.max(0, (p - 0.08) / 0.5));
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--q', q.toFixed(4));
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
  }, [ref]);
}

const sinePath = (amp: number, periods: number, width = 1000, mid = 50, step = 10) => {
  let d = '';
  for (let x = 0; x <= width; x += step) {
    const y = mid + amp * Math.sin((x / width) * periods * 2 * Math.PI);
    d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)} `;
  }
  return d;
};

const wavePath = (base: number, amp: number, phase: number) => {
  let d = `M0 120 L0 ${base} `;
  for (let x = 0; x <= 2400; x += 20) {
    const y = base + amp * Math.sin((x / 600) * 2 * Math.PI + phase);
    d += `L${x} ${y.toFixed(2)} `;
  }
  return d + 'L2400 120 Z';
};

const PawIcon = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill={fill} aria-hidden="true">
    <g transform="translate(12 14)">
      <path d="M0 0.2 C6.2 0.2 7.8 6.2 3.4 7.8 C1.4 8.6 -1.4 8.6 -3.4 7.8 C-7.8 6.2 -6.2 0.2 0 0.2Z" />
      <ellipse cx="-6.6" cy="-1.2" rx="1.9" ry="2.5" transform="rotate(-28 -6.6 -1.2)" />
      <ellipse cx="-2.3" cy="-5" rx="1.9" ry="2.5" transform="rotate(-7 -2.3 -5)" />
      <ellipse cx="2.3" cy="-5" rx="1.9" ry="2.5" transform="rotate(7 2.3 -5)" />
      <ellipse cx="6.6" cy="-1.2" rx="1.9" ry="2.5" transform="rotate(28 6.6 -1.2)" />
    </g>
  </svg>
);

const CatHead = ({ stroke, ink }: { stroke: string; ink: string }) => (
  <svg viewBox="0 0 44 40" aria-hidden="true">
    <g fill="#fff" stroke={stroke} strokeWidth="2" strokeLinejoin="round">
      <path d="M7 16 L9 3 L20 9 Z" />
      <path d="M37 16 L35 3 L24 9 Z" />
      <ellipse cx="22" cy="23" rx="16" ry="13.5" />
    </g>
    <path d="M10 13 L10.8 6.5 L16 9.5Z M34 13 L33.2 6.5 L28 9.5Z" fill="#FDD5DF" />
    <ellipse cx="12.5" cy="26" rx="3" ry="1.8" fill="rgba(253,150,170,0.45)" />
    <ellipse cx="31.5" cy="26" rx="3" ry="1.8" fill="rgba(253,150,170,0.45)" />
    <circle cx="16" cy="22" r="1.9" fill={ink} />
    <circle cx="28" cy="22" r="1.9" fill={ink} />
    <path d="M20.6 25.6 h2.8 l-1.4 1.9z" fill="#E58A9B" />
    <path d="M22 27.5 q-1 2.4 -3.4 1.9 M22 27.5 q1 2.4 3.4 1.9" stroke={ink} strokeWidth="1.1" fill="none" strokeLinecap="round" />
    <path d="M6 24 L0 23 M6 27 L1 29 M38 24 L44 23 M38 27 L43 29" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SectionDivider = ({ variant, bg = 'pink' }: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const pink = themeColors.colors.pink;
  useScrollVars(ref);

  const background = isDarkMode
    ? themeColors.background.gradientEnd
    : bg === 'white'
      ? '#FFFFFF'
      : pink[25];

  const threadPath = useMemo(() => sinePath(18, 2), []);

  const paws = useMemo(() => {
    const n = 13;
    return Array.from({ length: n }).map((_, i) => {
      const t = (i + 0.5) / n;
      const phase = t * 2 * Math.PI * 2;
      const side = i % 2 === 0 ? -1 : 1;
      return {
        x: 4 + t * 84,
        y: 50 + 16 * Math.sin(phase),
        side,
        t,
        rot: 90 + (Math.atan(0.28 * Math.cos(phase)) * 180) / Math.PI,
      };
    });
  }, []);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => ({
        left: 6 + ((i * 11.3) % 88),
        size: 5 + ((i * 3) % 7),
        dur: 5 + ((i * 1.7) % 4),
        delay: -((i * 1.3) % 6),
        dx: ((i % 2 === 0 ? 1 : -1) * (8 + ((i * 5) % 18))) | 0,
      })),
    []
  );

  const pawFill = isDarkMode ? pink[200] : pink[300];
  const strokeColor = isDarkMode ? pink[300] : pink[400];

  return (
    <div
      ref={ref}
      className={`sd ${variant === 'wave' ? 'sd-wave' : ''}`}
      style={{ background, transition: 'background 0.3s ease-in-out' }}
      aria-hidden="true"
    >
      {variant === 'yarn' && (
        <>
          <svg className="sd-svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path
              d={threadPath}
              pathLength={1}
              className="sd-thread"
              stroke={strokeColor}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="sd-yarn">
            <svg viewBox="0 0 40 40" width="100%" height="100%">
              <defs>
                <clipPath id="yarn-clip">
                  <circle cx="20" cy="20" r="16" />
                </clipPath>
              </defs>
              <circle cx="20" cy="20" r="16" fill={isDarkMode ? pink[200] : pink[300]} />
              <g clipPath="url(#yarn-clip)" fill="none" stroke={isDarkMode ? pink[500] : pink[600]} strokeWidth="1.7" strokeLinecap="round">
                <path d="M3 13 Q20 24 37 11" />
                <path d="M2 21 Q20 32 38 20" />
                <path d="M6 31 Q22 22 36 31" />
                <path d="M13 3 Q24 20 14 38" />
              </g>
              <circle cx="20" cy="20" r="16" fill="none" stroke={isDarkMode ? pink[300] : pink[400]} strokeWidth="1.2" />
            </svg>
          </div>
        </>
      )}

      {variant === 'paws' && (
        <>
          {paws.map((p, i) => (
            <span
              key={i}
              className="sd-paw"
              style={
                {
                  left: `${p.x}%`,
                  top: `calc(${p.y}% + ${p.side * 9}px)`,
                  ['--t' as string]: p.t.toFixed(3),
                  ['--rot' as string]: `${p.rot}deg`,
                } as CSSProperties
              }
            >
              <PawIcon fill={pawFill} />
            </span>
          ))}
          <div className="sd-cat">
            <CatHead stroke={strokeColor} ink={isDarkMode ? '#8B5A65' : '#6B4C57'} />
          </div>
        </>
      )}

      {variant === 'wave' && (
        <div className="sd-wave-wrap">
          <svg className="sd-wave-layer l3" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d={wavePath(58, 10, 2.1)} fill={isDarkMode ? 'rgba(201,182,255,0.12)' : 'rgba(185,167,232,0.28)'} />
          </svg>
          <svg className="sd-wave-layer l2" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d={wavePath(68, 12, 0.9)} fill={isDarkMode ? 'rgba(234,190,195,0.12)' : 'rgba(234,190,195,0.4)'} />
          </svg>
          <svg className="sd-wave-layer" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d={wavePath(78, 9, 0)} fill={isDarkMode ? 'rgba(234,190,195,0.18)' : 'rgba(253,213,223,0.65)'} />
          </svg>
          {bubbles.map((b, i) => (
            <span
              key={i}
              className="sd-bubble"
              style={
                {
                  left: `${b.left}%`,
                  ['--s' as string]: `${b.size}px`,
                  ['--d' as string]: `${b.dur}s`,
                  ['--delay' as string]: `${b.delay}s`,
                  ['--dx' as string]: `${b.dx}px`,
                  background: i % 3 === 0 ? '#B9A7E8' : pink[300],
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionDivider;
