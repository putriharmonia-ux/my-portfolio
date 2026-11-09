/** Fungsi gambar (canvas 2D) untuk kursor bintang / kucing dan partikelnya. */

export type CursorVariant = 'star' | 'cat';

export interface Palette {
  main: string;
  light: string;
  accent: string;
  glow: string;
  ink: string;
}

export const getPalette = (dark: boolean): Palette =>
  dark
    ? { main: '#EABEC3', light: '#FFFFFF', accent: '#C9B6FF', glow: '253,213,223', ink: '#6B4C57' }
    : { main: '#D9A5AC', light: '#FFFFFF', accent: '#B9A7E8', glow: '217,165,172', ink: '#8B5A65' };

/** Bintang 5 sudut dengan glow */
export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number,
  p: Palette
) {
  ctx.save();
  ctx.translate(x, y);

  // glow
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 3);
  g.addColorStop(0, `rgba(${p.glow},0.55)`);
  g.addColorStop(1, `rgba(${p.glow},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r * 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(rot);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.5;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const px = Math.cos(a) * rad;
    const py = Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();

  const fill = ctx.createLinearGradient(-r, -r, r, r);
  fill.addColorStop(0, p.light);
  fill.addColorStop(1, p.main);
  ctx.fillStyle = fill;
  ctx.strokeStyle = p.main;
  ctx.lineWidth = r * 0.28;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.fill();

  // highlight kecil
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.arc(-r * 0.18, -r * 0.2, r * 0.13, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Kepala kucing lucu */
export function drawCat(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  tilt: number,
  p: Palette,
  happy: boolean,
  blink: boolean
) {
  ctx.save();
  ctx.translate(x, y);

  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.8);
  g.addColorStop(0, `rgba(${p.glow},0.45)`);
  g.addColorStop(1, `rgba(${p.glow},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, s * 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(tilt);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = s * 0.14;
  ctx.strokeStyle = p.main;
  ctx.fillStyle = '#FFFFFF';

  // telinga
  const ear = (dir: number) => {
    ctx.beginPath();
    ctx.moveTo(dir * s * 0.92, -s * 0.1);
    ctx.lineTo(dir * s * 0.78, -s * 1.12);
    ctx.lineTo(dir * s * 0.12, -s * 0.72);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#FDD5DF';
    ctx.beginPath();
    ctx.moveTo(dir * s * 0.74, -s * 0.28);
    ctx.lineTo(dir * s * 0.67, -s * 0.84);
    ctx.lineTo(dir * s * 0.3, -s * 0.66);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
  };
  ear(-1);
  ear(1);

  // kepala
  ctx.beginPath();
  ctx.ellipse(0, 0, s, s * 0.86, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // pipi merona
  ctx.fillStyle = 'rgba(253,150,170,0.45)';
  ctx.beginPath();
  ctx.ellipse(-s * 0.56, s * 0.2, s * 0.17, s * 0.1, 0, 0, Math.PI * 2);
  ctx.ellipse(s * 0.56, s * 0.2, s * 0.17, s * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  // mata
  ctx.strokeStyle = p.ink;
  ctx.fillStyle = p.ink;
  ctx.lineWidth = s * 0.12;
  const eye = (ex: number) => {
    if (happy || blink) {
      ctx.beginPath();
      if (happy) ctx.arc(ex, -s * 0.02, s * 0.14, Math.PI, 0);
      else {
        ctx.moveTo(ex - s * 0.14, -s * 0.02);
        ctx.lineTo(ex + s * 0.14, -s * 0.02);
      }
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(ex, -s * 0.02, s * 0.11, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  eye(-s * 0.36);
  eye(s * 0.36);

  // hidung + mulut
  ctx.fillStyle = '#E58A9B';
  ctx.beginPath();
  ctx.moveTo(-s * 0.08, s * 0.14);
  ctx.lineTo(s * 0.08, s * 0.14);
  ctx.lineTo(0, s * 0.24);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = p.ink;
  ctx.lineWidth = s * 0.08;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.24);
  ctx.quadraticCurveTo(-s * 0.02, s * 0.4, -s * 0.16, s * 0.36);
  ctx.moveTo(0, s * 0.24);
  ctx.quadraticCurveTo(s * 0.02, s * 0.4, s * 0.16, s * 0.36);
  ctx.stroke();

  // kumis
  ctx.strokeStyle = p.main;
  ctx.lineWidth = s * 0.07;
  ctx.beginPath();
  for (const d of [-1, 1]) {
    ctx.moveTo(d * s * 0.62, s * 0.16);
    ctx.lineTo(d * s * 1.15, s * 0.08);
    ctx.moveTo(d * s * 0.62, s * 0.3);
    ctx.lineTo(d * s * 1.12, s * 0.38);
  }
  ctx.stroke();
  ctx.restore();
}

/** Kilau 4 sudut */
export function drawSpark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number,
  color: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(r * 0.14, -r * 0.14, r, 0);
  ctx.quadraticCurveTo(r * 0.14, r * 0.14, 0, r);
  ctx.quadraticCurveTo(-r * 0.14, r * 0.14, -r, 0);
  ctx.quadraticCurveTo(-r * 0.14, -r * 0.14, 0, -r);
  ctx.fill();
  ctx.restore();
}

/** Hati kecil */
export function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  rot: number,
  color: string
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.95, 0, -s * 0.4);
  ctx.bezierCurveTo(s * 0.5, -s * 0.95, s, -s * 0.3, 0, s * 0.35);
  ctx.fill();
  ctx.restore();
}
