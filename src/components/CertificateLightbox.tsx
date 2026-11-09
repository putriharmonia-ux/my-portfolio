import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';

export interface LightboxItem {
  image: string;
  title: string;
  subtitle?: string;
  category?: string;
}

interface CertificateLightboxProps {
  items: LightboxItem[];
  /** index sertifikat yang sedang dibuka; null = tertutup */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const CertificateLightbox = ({ items, index, onClose, onIndexChange }: CertificateLightboxProps) => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const pink = themeColors.colors.pink;

  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState<1 | -1>(1);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isOpen = index !== null;
  const total = items.length;

  const go = useCallback(
    (step: 1 | -1) => {
      if (index === null) return;
      setDirection(step);
      onIndexChange((index + step + total) % total);
    },
    [index, total, onIndexChange]
  );

  // reset zoom & loading saat pindah gambar
  useEffect(() => {
    setZoomed(false);
    setOrigin({ x: 50, y: 50 });
    setLoaded(false);
  }, [index]);

  // preload gambar sebelah supaya pindah terasa instan
  useEffect(() => {
    if (index === null) return;
    [1, -1].forEach((d) => {
      const item = items[(index + d + total) % total];
      if (item) new Image().src = item.image;
    });
  }, [index, items, total]);

  // keyboard + kunci scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false);
        else onClose();
      } else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, zoomed, go, onClose]);

  if (index === null || !items[index]) return null;
  const item = items[index];

  const updateOrigin = (clientX: number, clientY: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setOrigin({
      x: Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((clientY - r.top) / r.height) * 100)),
    });
  };

  const panelBg = isDarkMode ? '#1E293B' : '#FFFFFF';
  const textMain = isDarkMode ? pink[100] : pink[800];
  const textSoft = isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600];
  const iconBtn =
    'rounded-full p-2.5 transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300';
  const iconStyle = {
    backgroundColor: isDarkMode ? 'rgba(234,190,195,0.18)' : 'rgba(255,255,255,0.92)',
    color: isDarkMode ? pink[100] : pink[700],
    boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
  } as const;

  return createPortal(
    <div
      className="fixed inset-0 z-[100005] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      style={{ backgroundColor: 'rgba(20,10,14,0.78)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${item.title}`}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || zoomed) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 60) go(dx > 0 ? -1 : 1);
        touchStartX.current = null;
      }}
    >
      {/* tombol atas */}
      <div className="absolute right-3 top-3 z-20 flex gap-2 sm:right-6 sm:top-6" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          className={iconBtn}
          style={iconStyle}
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        >
          {zoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`${iconBtn} hover:rotate-90`}
          style={iconStyle}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* panah */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className={`${iconBtn} absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-6`}
            style={iconStyle}
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className={`${iconBtn} absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-6`}
            style={iconStyle}
            aria-label="Next certificate"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* kartu */}
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ backgroundColor: panelBg, border: `2px solid ${isDarkMode ? themeColors.colors.dark[600] : pink[200]}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* gambar */}
        <div
          className="relative flex min-h-[200px] items-center justify-center overflow-hidden p-3 sm:p-5"
          style={{
            backgroundColor: isDarkMode ? '#25212b' : '#fff7fb',
            cursor: zoomed ? 'zoom-out' : 'zoom-in',
          }}
          onClick={(e) => {
            updateOrigin(e.clientX, e.clientY, e.currentTarget);
            setZoomed((z) => !z);
          }}
          onMouseMove={(e) => zoomed && updateOrigin(e.clientX, e.clientY, e.currentTarget)}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: pink[300], borderTopColor: 'transparent' }}
              />
            </div>
          )}
          <img
            key={item.image}
            src={item.image}
            alt={item.title}
            onLoad={() => setLoaded(true)}
            draggable={false}
            className={`max-h-[68vh] w-auto max-w-full select-none rounded-lg object-contain shadow-md transition-transform duration-300 ease-out animate-in fade-in duration-300 ${
              direction === 1 ? 'slide-in-from-right-6' : 'slide-in-from-left-6'
            }`}
            style={{
              transform: zoomed ? 'scale(2.2)' : 'scale(1)',
              transformOrigin: `${origin.x}% ${origin.y}%`,
              opacity: loaded ? 1 : 0,
            }}
          />
        </div>

        {/* keterangan */}
        <div
          className="flex flex-col gap-1 px-5 py-4 sm:px-7"
          style={{ borderTop: `1px dashed ${isDarkMode ? themeColors.colors.dark[600] : pink[300]}` }}
        >
          <div className="flex items-center justify-between gap-3">
            {item.category && (
              <span
                className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
                style={{
                  background: isDarkMode ? 'rgba(236,72,153,0.15)' : 'rgba(236,72,153,0.10)',
                  color: isDarkMode ? pink[300] : pink[500],
                }}
              >
                {item.category}
              </span>
            )}
            <span className="ml-auto text-xs tabular-nums" style={{ color: textSoft }}>
              {index + 1} / {total}
            </span>
          </div>
          <h3 className="text-base font-bold leading-snug sm:text-xl" style={{ color: textMain }}>
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-xs leading-relaxed sm:text-sm" style={{ color: textSoft }}>
              {item.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CertificateLightbox;
