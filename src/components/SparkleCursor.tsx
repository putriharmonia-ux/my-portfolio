import { useEffect, useRef } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import {
  drawCat,
  drawHeart,
  drawSpark,
  drawStar,
  getPalette,
  type CursorVariant,
} from '../lib/cursorSprites';

interface SparkleCursorProps {
  variant?: CursorVariant;
  /** true = kursor terbang sendiri (dipakai saat opening page) sampai mouse digerakkan */
  autopilot?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  rot: number;
  vr: number;
  kind: 'spark' | 'dot' | 'heart';
  color: string;
  float: boolean;
}

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"], .cursor-pointer';

const SparkleCursor = ({ variant = 'star', autopilot = false }: SparkleCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useDarkMode();
  const darkRef = useRef(isDarkMode);
  const autoRef = useRef(autopilot);
  darkRef.current = isDarkMode;
  autoRef.current = autopilot;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) document.documentElement.classList.add('custom-cursor');

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const s = {
      x: w / 2,
      y: h / 2,
      tx: w / 2,
      ty: h / 2,
      alpha: 0,
      visible: false,
      hover: false,
      down: false,
      usedPointer: false,
      touchUntil: 0,
      scale: 1,
      rot: 0,
      auto: 0,
      emit: 0,
    };

    const trail: { x: number; y: number }[] = [];
    const particles: Particle[] = [];
    const TRAIL_MAX = 26;

    const pal = () => getPalette(darkRef.current);
    const colors = () => {
      const p = pal();
      return [p.main, p.accent, p.light, `rgb(${p.glow})`];
    };

    const spawn = (x: number, y: number, burst = false) => {
      if (particles.length > 180) return;
      const cols = colors();
      const angle = Math.random() * Math.PI * 2;
      const sp = burst ? 90 + Math.random() * 190 : 10 + Math.random() * 40;
      const heart = variant === 'cat' && Math.random() < (burst ? 0.55 : 0.25);
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * sp,
        vy: Math.sin(angle) * sp - (burst ? 0 : 12),
        life: 0,
        max: burst ? 0.7 + Math.random() * 0.5 : 0.55 + Math.random() * 0.6,
        size: heart ? 4 + Math.random() * 4 : 2.5 + Math.random() * (burst ? 5 : 3.5),
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 6,
        kind: heart ? 'heart' : Math.random() < 0.28 ? 'dot' : 'spark',
        color: cols[Math.floor(Math.random() * cols.length)],
        float: heart,
      });
    };

    const onMove = (e: PointerEvent) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (e.pointerType === 'touch') {
        s.touchUntil = performance.now() + 700;
      } else {
        s.usedPointer = true;
        s.visible = true;
        const el = e.target as Element | null;
        s.hover = !!el?.closest?.(HOVER_SELECTOR);
      }
      if (!s.usedPointer && e.pointerType === 'touch') s.visible = true;
    };
    const onDown = (e: PointerEvent) => {
      s.down = true;
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (e.pointerType === 'touch') {
        s.touchUntil = performance.now() + 900;
        s.visible = true;
        s.x = e.clientX;
        s.y = e.clientY;
      }
      for (let i = 0; i < 14; i++) spawn(e.clientX, e.clientY, true);
    };
    const onUp = () => {
      s.down = false;
    };
    const onLeave = () => {
      if (fine) s.visible = false;
    };
    const onEnter = () => {
      if (fine && s.usedPointer) s.visible = true;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('resize', resize);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    let raf = 0;
    let last = performance.now();
    let time = 0;
    let nextBlink = 2.5;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;

      const auto = autoRef.current && !s.usedPointer;
      if (auto) {
        s.auto += dt;
        const t = s.auto;
        s.tx = w / 2 + Math.cos(t * 0.9) * w * 0.28 + Math.sin(t * 2.3) * w * 0.04;
        s.ty = h / 2 + Math.sin(t * 1.35) * h * 0.2 + Math.cos(t * 0.65) * h * 0.07;
      }

      const showing = auto || (fine ? s.visible : now < s.touchUntil);
      s.alpha += ((showing ? 1 : 0) - s.alpha) * (1 - Math.exp(-dt * 10));

      const px = s.x;
      const py = s.y;
      const k = 1 - Math.exp(-dt * (auto ? 6 : 16));
      s.x += (s.tx - s.x) * k;
      s.y += (s.ty - s.y) * k;
      const vx = (s.x - px) / Math.max(dt, 0.001);
      const vy = (s.y - py) / Math.max(dt, 0.001);
      const speed = Math.hypot(vx, vy);

      // trail
      if (s.alpha > 0.05 && Math.hypot(s.x - px, s.y - py) > 0.4) {
        trail.push({ x: s.x, y: s.y });
        if (trail.length > TRAIL_MAX) trail.shift();
      } else if (trail.length) {
        trail.shift();
      }

      // partikel ikut gerak
      if (s.alpha > 0.2) {
        s.emit += speed * dt * 0.05 + (auto ? dt * 6 : dt * 1.2);
        while (s.emit >= 1) {
          s.emit -= 1;
          spawn(s.x + (Math.random() - 0.5) * 8, s.y + (Math.random() - 0.5) * 8);
        }
      }

      s.scale += ((s.down ? 0.78 : s.hover ? 1.45 : 1) - s.scale) * (1 - Math.exp(-dt * 14));
      s.rot += dt * (1.2 + Math.min(speed, 1800) * 0.004);

      ctx.clearRect(0, 0, w, h);
      const p = pal();

      // ── trail
      if (trail.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const base = (variant === 'cat' ? 13 : 11) * s.scale;
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 1; i < trail.length; i++) {
            const f = i / trail.length;
            ctx.beginPath();
            ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
            ctx.lineTo(trail[i].x, trail[i].y);
            ctx.strokeStyle = `rgba(${p.glow},${(pass === 0 ? 0.18 : 0.5) * f * s.alpha})`;
            ctx.lineWidth = base * (pass === 0 ? 1.5 : 0.55) * f;
            ctx.stroke();
          }
        }
      }

      // ── partikel
      for (let i = particles.length - 1; i >= 0; i--) {
        const q = particles[i];
        q.life += dt;
        if (q.life >= q.max) {
          particles.splice(i, 1);
          continue;
        }
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.vx *= 1 - dt * 2.2;
        q.vy = q.vy * (1 - dt * 2.2) + (q.float ? -40 : 30) * dt;
        q.rot += q.vr * dt;
        const f = 1 - q.life / q.max;
        ctx.globalAlpha = Math.min(1, f * 1.4);
        const sz = q.size * (0.4 + f * 0.6);
        if (q.kind === 'spark') drawSpark(ctx, q.x, q.y, sz, q.rot, q.color);
        else if (q.kind === 'heart') drawHeart(ctx, q.x, q.y, sz, q.rot * 0.15, q.color);
        else {
          ctx.fillStyle = q.color;
          ctx.beginPath();
          ctx.arc(q.x, q.y, sz * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // ── sprite utama
      if (s.alpha > 0.02) {
        ctx.globalAlpha = s.alpha;
        if (variant === 'star') {
          drawStar(ctx, s.x, s.y, 11 * s.scale, s.rot, p);
        } else {
          if (time > nextBlink + 0.14) nextBlink = time + 2.2 + Math.random() * 2.5;
          const blink = time > nextBlink && time < nextBlink + 0.14;
          const tilt = Math.max(-0.4, Math.min(0.4, vx * 0.0007)) + Math.sin(time * 5) * 0.03;
          drawCat(ctx, s.x, s.y, 13 * s.scale, tilt, p, s.hover, blink);
        }
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', resize);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483000,
        pointerEvents: 'none',
      }}
    />
  );
};

export default SparkleCursor;
