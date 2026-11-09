import { useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';

/** Glitter / bintang kecil yang naik pelan di seluruh halaman. */
const AmbientStars = () => {
  const { isDarkMode } = useDarkMode();
  const { colors } = useThemeColors();

  const items = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: (i * 71 + 9) % 98,
        size: 8 + ((i * 5) % 11),
        dur: 16 + ((i * 3) % 12),
        delay: -((i * 2.7) % 20),
        sway: 18 + ((i * 7) % 30),
        lilac: i % 3 === 0,
        mobileHide: i % 2 === 1,
      })),
    []
  );

  return (
    <div className="ambient-layer" aria-hidden="true">
      {items.map((it, i) => (
        <svg
          key={i}
          className={`ambient-star ${it.mobileHide ? 'hidden sm:block' : ''}`}
          viewBox="-10 -10 20 20"
          style={{
            left: `${it.left}%`,
            width: it.size,
            height: it.size,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
            ['--sway' as string]: `${it.sway}px`,
            opacity: isDarkMode ? 0.5 : 0.65,
          }}
        >
          <path
            d="M0 -9 Q1.3 -1.3 9 0 Q1.3 1.3 0 9 Q-1.3 1.3 -9 0 Q-1.3 -1.3 0 -9Z"
            fill={it.lilac ? '#B9A7E8' : isDarkMode ? colors.pink[200] : colors.pink[300]}
          />
        </svg>
      ))}
    </div>
  );
};

export default AmbientStars;
