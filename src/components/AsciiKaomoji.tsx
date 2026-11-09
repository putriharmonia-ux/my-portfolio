import { ASCII_COLS, ASCII_GLYPHS, ASCII_ROWS } from '../config/asciiArt';

interface AsciiKaomojiProps {
  /** jumlah karakter yang sudah "diketik" (untuk efek typewriter) */
  visibleCount: number;
  color: string;
}

const CELL = 0.6; // lebar 1 sel (em)
const LINE = 1.65; // tinggi 1 baris (em)

/** ASCII art kaomoji; tiap karakter diposisikan sendiri supaya rapi di semua font. */
const AsciiKaomoji = ({ visibleCount, color }: AsciiKaomojiProps) => (
  <div
    role="img"
    aria-label="ASCII art kucing"
    className="select-none"
    style={{
      position: 'relative',
      width: `${ASCII_COLS * CELL}em`,
      height: `${ASCII_ROWS * LINE}em`,
      fontFamily: "'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans JP', 'Meiryo', monospace",
      fontSize: 'clamp(15px, 1.5vw, 22px)',
      fontWeight: 600,
      lineHeight: 1,
      color,
    }}
  >
    <style>{`
      @keyframes asciiTwinkle {
        0%, 100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        50% { opacity: 0.45; transform: translate(-50%, 0) scale(0.82); }
      }
      @media (prefers-reduced-motion: reduce) { .ascii-star { animation: none !important; } }
    `}</style>
    {ASCII_GLYPHS.slice(0, visibleCount).map((g, i) => (
      <span
        key={i}
        className={g.star ? 'ascii-star' : undefined}
        style={{
          position: 'absolute',
          left: `${g.col * CELL}em`,
          top: `${g.row * LINE + 0.3}em`,
          transform: 'translate(-50%, 0)',
          whiteSpace: 'pre',
          animation: g.star ? `asciiTwinkle ${2.4 + (i % 4) * 0.5}s ease-in-out ${(i % 5) * 0.35}s infinite` : undefined,
        }}
      >
        {g.ch}
      </span>
    ))}
  </div>
);

export default AsciiKaomoji;
