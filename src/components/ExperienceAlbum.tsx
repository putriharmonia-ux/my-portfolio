import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Images, ImageOff, X, Heart } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { getExperiencePhotos } from '../config/experiencePhotos';

interface ExperienceAlbumProps {
  /** Nama folder di src/assets/experience/<folder> */
  folder: string;
  /** Judul experience, dipakai di header album */
  title: string;
}

// Rotasi tipis ala polaroid (string statis supaya terbaca Tailwind)
const TILTS = ['-rotate-1', 'rotate-1', 'rotate-[0.5deg]', '-rotate-[0.5deg]'];

const ExperienceAlbum = ({ folder, title }: ExperienceAlbumProps) => {
  const photos = getExperiencePhotos(folder);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const pink = themeColors.colors.pink;

  const [isOpen, setIsOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setViewerIndex(null);
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const prev = useCallback(
    () => setViewerIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setViewerIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  // Keyboard + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewerIndex !== null) setViewerIndex(null);
        else close();
      } else if (viewerIndex !== null && e.key === 'ArrowLeft') prev();
      else if (viewerIndex !== null && e.key === 'ArrowRight') next();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, viewerIndex, close, prev, next]);

  const panelBg = isDarkMode ? '#1E293B' : pink[25];
  const textMain = isDarkMode ? pink[100] : pink[800];
  const textSoft = isDarkMode ? themeColors.colors.dark[400] : pink[600];

  const stack = photos.slice(0, 3);

  return (
    <>
      {/* ───────── Trigger button (di dalam card) ───────── */}
      <div
        className="mt-5 pt-4 flex items-center justify-between gap-3 border-t border-dashed"
        style={{ borderColor: isDarkMode ? themeColors.colors.dark[600] : pink[200] }}
      >
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
          style={{
            backgroundColor: isDarkMode ? 'rgba(234,190,195,0.12)' : pink[50],
            border: `1px solid ${isDarkMode ? 'rgba(234,190,195,0.35)' : pink[200]}`,
            color: isDarkMode ? pink[200] : pink[700],
          }}
          aria-label={`Open documentation album for ${title}`}
        >
          {/* tumpukan foto mini */}
          {stack.length > 0 ? (
            <span className="relative flex h-8 items-center" style={{ width: 20 + stack.length * 14 }}>
              {stack.map((p, i) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute h-8 w-8 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                  style={{
                    left: i * 14,
                    zIndex: stack.length - i,
                    border: `2px solid ${isDarkMode ? '#1E293B' : '#fff'}`,
                    transform: `rotate(${(i - 1) * 6}deg)`,
                  }}
                />
              ))}
            </span>
          ) : (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: isDarkMode ? 'rgba(234,190,195,0.2)' : pink[100] }}
            >
              <Images className="h-4 w-4" />
            </span>
          )}

          <span className="flex items-center gap-1.5">
            <Images className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
            Documentation Album
          </span>

          <span
            className="rounded-full px-2 py-0.5 text-xs"
            style={{
              backgroundColor: isDarkMode ? 'rgba(234,190,195,0.2)' : pink[100],
              color: isDarkMode ? pink[100] : pink[800],
            }}
          >
            {photos.length}
          </span>
        </button>
      </div>

      {/* ───────── Album modal ───────── */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100005] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
            style={{ backgroundColor: 'rgba(20, 10, 14, 0.72)', backdropFilter: 'blur(6px)' }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} documentation album`}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300"
              style={{
                backgroundColor: panelBg,
                border: `2px solid ${isDarkMode ? themeColors.colors.dark[600] : pink[200]}`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5"
                style={{
                  borderBottom: `1px dashed ${isDarkMode ? themeColors.colors.dark[600] : pink[300]}`,
                  background: isDarkMode
                    ? 'transparent'
                    : `linear-gradient(180deg, ${pink[50]} 0%, ${pink[25]} 100%)`,
                }}
              >
                <div className="min-w-0">
                  <p
                    className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: textSoft }}
                  >
                    <Heart className="h-3 w-3" fill="currentColor" />
                    Documentation Album
                  </p>
                  <h3 className="text-lg font-bold leading-snug sm:text-2xl" style={{ color: textMain }}>
                    {title}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: textSoft }}>
                    {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded-full p-2 transition-all hover:rotate-90 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(234,190,195,0.15)' : pink[100],
                    color: isDarkMode ? pink[200] : pink[700],
                  }}
                  aria-label="Close album"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto px-5 py-6 sm:px-8">
                {photos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: isDarkMode ? 'rgba(234,190,195,0.12)' : pink[100], color: textSoft }}
                    >
                      <ImageOff className="h-7 w-7" />
                    </span>
                    <p className="font-semibold" style={{ color: textMain }}>
                      Documentation coming soon
                    </p>
                    <p className="max-w-sm text-sm" style={{ color: textSoft }}>
                      Photos for this experience are still being curated. Check back later!
                    </p>
                  </div>
                ) : (
                  <div className="columns-2 gap-4 sm:columns-3">
                    {photos.map((photo, i) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setViewerIndex(i)}
                        className={`group mb-4 block w-full break-inside-avoid rounded-md p-2 pb-2 text-left shadow-md transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:rotate-0 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 ${TILTS[i % TILTS.length]}`}
                        style={{
                          backgroundColor: isDarkMode ? '#273449' : '#fff',
                          border: `1px solid ${isDarkMode ? themeColors.colors.dark[600] : pink[100]}`,
                        }}
                        aria-label={`Open photo ${i + 1}${photo.caption ? `: ${photo.caption}` : ''}`}
                      >
                        <div className="overflow-hidden rounded-sm">
                          <img
                            src={photo.src}
                            alt={photo.caption ?? `${title} photo ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="block w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        {photo.caption && (
                          <p
                            className="px-1 pb-1 pt-2 text-center text-xs font-medium"
                            style={{ color: isDarkMode ? pink[200] : pink[700] }}
                          >
                            {photo.caption}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ───────── Lightbox ───────── */}
            {viewerIndex !== null && photos[viewerIndex] && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewerIndex(null);
                }}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
                  touchStartX.current = null;
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewerIndex(null);
                  }}
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25"
                  aria-label="Close photo"
                >
                  <X className="h-6 w-6" />
                </button>

                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/25"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/25"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                <img
                  key={photos[viewerIndex].src}
                  src={photos[viewerIndex].src}
                  alt={photos[viewerIndex].caption ?? `${title} photo ${viewerIndex + 1}`}
                  className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-2xl animate-in zoom-in-95 fade-in duration-300"
                  onClick={(e) => e.stopPropagation()}
                />

                <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
                  {photos[viewerIndex].caption && (
                    <p className="mb-1 text-sm font-medium">{photos[viewerIndex].caption}</p>
                  )}
                  <p className="text-xs text-white/70">
                    {viewerIndex + 1} / {photos.length}
                  </p>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default ExperienceAlbum;
