import { useCallback, useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { siteEffects } from '../config/siteEffects';

interface IntroScreenProps {
  /** dipanggil saat tirai mulai terangkat (saatnya menampilkan website) */
  onReveal: () => void;
  /** dipanggil saat opening selesai total (unmount) */
  onDone: () => void;
}

const REVEAL_DELAY = 480; // teks memudar dulu, baru tirai naik
const CURTAIN_TIME = 1500; // durasi tirai terangkat

const IntroScreen = ({ onReveal, onDone }: IntroScreenProps) => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const pink = themeColors.colors.pink;
  const cfg = siteEffects.intro;

  const [out, setOut] = useState(false);
  const exited = useRef(false);
  const startedAt = useRef(performance.now());
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const startExit = useCallback(() => {
    if (exited.current) return;
    exited.current = true;
    setOut(true);
    timers.current.push(window.setTimeout(onReveal, REVEAL_DELAY));
    timers.current.push(window.setTimeout(onDone, REVEAL_DELAY + CURTAIN_TIME));
  }, [onReveal, onDone]);

  // kunci scroll selama opening
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // auto lanjut + progress
  useEffect(() => {
    const auto = window.setTimeout(startExit, cfg.durationMs);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt.current) / (cfg.durationMs * 0.9));
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);
      if (counterRef.current) counterRef.current.textContent = String(pct).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(auto);
      cancelAnimationFrame(raf);
    };
  }, [cfg.durationMs, startExit]);

  // bersihkan timer exit saat unmount
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  // skip: klik / tap / tombol
  useEffect(() => {
    const skip = () => {
      if (performance.now() - startedAt.current > 700) startExit();
    };
    const onKey = (e: KeyboardEvent) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startExit]);

  const bg = isDarkMode
    ? 'linear-gradient(180deg, #0A0F1B 0%, #101727 100%)'
    : `linear-gradient(180deg, ${pink[25]} 0%, ${pink[50]} 55%, ${pink[100]} 100%)`;
  const text = isDarkMode ? pink[100] : pink[800];
  const soft = isDarkMode ? pink[300] : pink[600];
  const ring = isDarkMode ? 'rgba(234,190,195,0.28)' : 'rgba(217,165,172,0.55)';

  return (
    <div
      className="intro-root"
      role="dialog"
      aria-label="Welcome"
      onClick={() => {
        if (performance.now() - startedAt.current > 700) startExit();
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 100010, overflow: 'hidden' }}
    >
      {/* tirai belakang (pink) */}
      <div
        className={`intro-layer ${out ? 'intro-layer-out intro-layer-out-a' : ''}`}
        style={{ background: isDarkMode ? '#1E293B' : pink[200] }}
      />

      {/* tirai depan (isi opening) */}
      <div
        className={`intro-layer intro-front ${out ? 'intro-layer-out' : ''}`}
        style={{ background: bg, color: text }}
      >
        {/* pita gradasi di bawah, seperti contoh */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '26vh',
            background: isDarkMode
              ? 'linear-gradient(0deg, rgba(201,182,255,0.16), transparent)'
              : 'linear-gradient(0deg, rgba(185,167,232,0.35), rgba(253,213,223,0.45) 45%, transparent)',
          }}
        />

        {/* cincin orbit */}
        <div className="intro-ring intro-ring-1" style={{ borderColor: ring }}>
          <span className="intro-orbit-dot" style={{ background: pink[400] }} />
        </div>
        <div className="intro-ring intro-ring-2" style={{ borderColor: ring }}>
          <span className="intro-orbit-dot intro-orbit-dot-b" style={{ background: '#B9A7E8' }} />
        </div>

        {/* kilau mengambang */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="intro-twinkle"
            style={{
              left: `${(i * 37 + 11) % 96}%`,
              top: `${(i * 53 + 7) % 90}%`,
              animationDelay: `${(i % 7) * 0.45}s`,
              background: i % 3 === 0 ? '#B9A7E8' : pink[300],
            }}
          />
        ))}

        {/* teks tengah */}
        <div className={`intro-center ${out ? 'intro-center-out' : ''}`}>
          <p className="intro-line" style={{ animationDelay: '0.7s', fontWeight: 600 }}>
            {cfg.subtitle}
          </p>
          <p className="intro-line intro-byline" style={{ animationDelay: '1.05s', color: soft }}>
            <span className="intro-by">{cfg.byLabel}</span>
            <span className="intro-name">{cfg.name}</span>
          </p>
        </div>

        {/* footer */}
        <div
          className="intro-footer"
          style={{ color: soft, opacity: out ? 0 : undefined, transition: 'opacity .3s' }}
        >
          <span>{cfg.footerLeft}</span>
          <span className="intro-progress">
            <span className="intro-bar-track" style={{ background: ring }}>
              <span ref={barRef} className="intro-bar" style={{ background: pink[500] }} />
            </span>
            <span ref={counterRef} className="intro-counter">
              000
            </span>
          </span>
          <span>{cfg.footerRight}</span>
        </div>

        <p className="intro-skip" style={{ color: soft }}>
          Tap to continue
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
