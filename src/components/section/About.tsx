import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import TypewriterCarousel from '../TypewriterCarousel';
import AsciiKaomoji from '../AsciiKaomoji';
import { ASCII_GLYPHS } from '../../config/asciiArt';
import journalPortrait from '../../assets/journal-portrait.jpeg';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../../hooks/useThemeColors';
import { aboutMeJournalWebp800, aboutMeJournalWebp400, stickers as stickerImages } from '../../assets';


const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [asciiText, setAsciiText] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const roles = [
  // Core & Foundation
  'Industrial Engineering Graduate',
  'Process Improvement Enthusiast',
  'Information Systems Enthusiast',
  'Aspiring Data Analyst',
  ];


  // ASCII art kaomoji (isi & posisinya diatur di src/config/asciiArt.ts)
  const fullAsciiArt = ASCII_GLYPHS.map((g) => g.ch).join('');

  // Typewriter effect for ASCII art
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 55; // Speed in milliseconds per character

    const typeWriter = () => {
      if (currentIndex < fullAsciiArt.length) {
        setAsciiText(fullAsciiArt.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      }
    };

    // Start typing after a small delay
    const startDelay = setTimeout(() => {
      typeWriter();
    }, 500);

    return () => clearTimeout(startDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;

          // Calculate how much of the section is in view
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          const progress = visibleHeight / windowHeight;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stickers = [
    { id: 1, image: stickerImages[0], initialX: -180, initialY: -80, finalX: -550, finalY: -100, mobileInitialX: -120, mobileInitialY: -60, mobileFinalX: -250, mobileFinalY: -80 },
    { id: 2, image: stickerImages[1], initialX: 180, initialY: -60, finalX: 600, finalY: -250, mobileInitialX: 120, mobileInitialY: -40, mobileFinalX: 200, mobileFinalY: -120 },
    { id: 3, image: stickerImages[2], initialX: -160, initialY: 240, finalX: -200, finalY: 380, mobileInitialX: -100, mobileInitialY: 160, mobileFinalX: -120, mobileFinalY: 220 },
    { id: 4, image: stickerImages[3], initialX: 190, initialY: 260, finalX: 500, finalY: 150, mobileInitialX: 110, mobileInitialY: 180, mobileFinalX: 180, mobileFinalY: 120 },
    { id: 5, image: stickerImages[4], initialX: -200, initialY: 120, finalX: -200, finalY: -380, mobileInitialX: -130, mobileInitialY: 80, mobileFinalX: -130, mobileFinalY: -180 },
    { id: 6, image: stickerImages[5], initialX: 170, initialY: 100, finalX: 150, finalY: -360, mobileInitialX: 110, mobileInitialY: 70, mobileFinalX: 100, mobileFinalY: -160 },
    { id: 7, image: stickerImages[6], initialX: -130, initialY: -130, finalX: -450, finalY: -380, mobileInitialX: -90, mobileInitialY: -90, mobileFinalX: -200, mobileFinalY: -200 },
    { id: 8, image: stickerImages[7], initialX: 150, initialY: 200, finalX: 200, finalY: 350, mobileInitialX: 100, mobileInitialY: 140, mobileFinalX: 130, mobileFinalY: 200 },
    { id: 9, image: stickerImages[8], initialX: -140, initialY: 300, finalX: -500, finalY: 200, mobileInitialX: -90, mobileInitialY: 200, mobileFinalX: -180, mobileFinalY: 160 },
    { id: 10, image: stickerImages[9], initialX: 200, initialY: 120, finalX: 500, finalY: -380, mobileInitialX: 130, mobileInitialY: 80, mobileFinalX: 200, mobileFinalY: -180 },
    { id: 11, image: stickerImages[10], initialX: -220, initialY: -40, finalX: 600, finalY: 10, mobileInitialX: -140, mobileInitialY: -30, mobileFinalX: 220, mobileFinalY: 10 },
    { id: 12, image: stickerImages[11], initialX: 110, initialY: -180, finalX: 500, finalY: 300, mobileInitialX: 80, mobileInitialY: -120, mobileFinalX: 180, mobileFinalY: 180 },
    { id: 13, image: stickerImages[12], initialX: -120, initialY: 360, finalX: 500, finalY: -100, mobileInitialX: -80, mobileInitialY: 240, mobileFinalX: 180, mobileFinalY: -80 },
    { id: 14, image: stickerImages[13], initialX: 210, initialY: 40, finalX: -640, finalY: -220, mobileInitialX: 140, mobileInitialY: 30, mobileFinalX: -220, mobileFinalY: -140 },
    { id: 15, image: stickerImages[14], initialX: -100, initialY: 160, finalX: -400, finalY: 320, mobileInitialX: -70, mobileInitialY: 110, mobileFinalX: -150, mobileFinalY: 200 },
    { id: 16, image: stickerImages[15], initialX: 130, initialY: -100, finalX: -600, finalY: 100, mobileInitialX: 90, mobileInitialY: -70, mobileFinalX: -200, mobileFinalY: 80 },
  ];

  const getStickerStyle = (sticker: typeof stickers[0]) => {
    const progress = scrollProgress; // Direct progress for spreading effect when closer
    const isMobile = window.innerWidth < 768;
    const isVerySmall = window.innerWidth < 375; // iPhone SE and similar

    // Use mobile positioning on smaller screens
    const initialX = isMobile ? sticker.mobileInitialX : sticker.initialX;
    const initialY = isMobile ? sticker.mobileInitialY : sticker.initialY;
    const finalX = isMobile ? sticker.mobileFinalX : sticker.finalX;
    const finalY = isMobile ? sticker.mobileFinalY : sticker.finalY;

    // Further constrain for very small screens to prevent ANY horizontal overflow
    const constrainedFinalX = isVerySmall
      ? Math.max(-100, Math.min(100, finalX * 0.3))
      : isMobile
        ? Math.max(-150, Math.min(150, finalX * 0.5))
        : finalX;
    const constrainedFinalY = isVerySmall ? finalY * 0.6 : finalY * 0.8;

    const x = initialX + (constrainedFinalX - initialX) * progress;
    const y = initialY + (constrainedFinalY - initialY) * progress;
    const scale = isVerySmall ? 0.4 + (0.15 * progress) : isMobile ? 0.6 + (0.2 * progress) : 0.8 + (0.4 * progress);
    const opacity = 0.9 + (0.1 * progress);
    const rotation = progress * 20; // Add slight rotation

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      willChange: 'transform, opacity',
      width: isVerySmall ? '50px' : isMobile ? '60px' : '80px',
      height: isVerySmall ? '50px' : isMobile ? '60px' : '80px',
      filter: `drop-shadow(0 4px 8px ${themeColors.effects.dropShadow})`
    };
  };

  return (
    <section id="about" ref={sectionRef} className="min-h-screen" style={{
      background: themeColors.background.sections?.about || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out',
      width: '100%',
      maxWidth: '100vw',
      contain: 'layout style'
    }}>

      {/* Animasi nama sebagai satu kesatuan, bukan per huruf */}
      <style>{`
        @keyframes nameReveal {
          from { opacity: 0; transform: translateY(22px); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-name-reveal { animation: nameReveal 1.4s ease-out both; }
        @keyframes introLetter {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .intro-letter {
          display: inline-block;
          opacity: 0;
          animation: introLetter 0.2s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-name-reveal { animation: none; }
          .intro-letter { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Hero Section: nama di kiri, kucing ASCII di kanan */}
      <div className="pt-6 pb-1 md:pt-10 md:pb-2">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,330px)] items-center gap-4 lg:gap-6">
            <div className="min-w-0 text-left">
              <h1
                className="animate-name-reveal font-bold tracking-wide"
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(18px, 2.4vw, 32px)',
                  lineHeight: '1.3',
                  color: isDarkMode ? themeColors.primary : themeColors.colors.pink[500],
                }}
              >
                Hi, I'm Putri Febrihandini Harmonia
              </h1>

              <div className="hero-subtitle justify-start text-base md:text-lg mt-3">
                <div className="flex flex-wrap items-center justify-start">
                  <span className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}>
                    I am an&nbsp;
                  </span>
                  {asciiText.length >= fullAsciiArt.length && (
                    <TypewriterCarousel
                      roles={roles}
                      className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}
                    />
                  )}
                </div>
              </div>

              <div className="hero-buttons flex justify-start gap-3 mt-4">
                <button
                  className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  Resume →
                </button>
                <Link to="/contact" className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5">
                  Contact →
                </Link>
              </div>
            </div>

            {/* Kucing ASCII di kanan pada desktop, tanpa ruang kosong berlebihan */}
            <div className="flex flex-col items-center lg:items-end justify-center min-w-0">
              <div
                className="w-full text-center lg:text-right mb-1"
                style={{
                  color: isDarkMode ? themeColors.primary : themeColors.colors.pink[500],
                  fontFamily: 'monospace',
                  fontSize: 'clamp(10px, 1vw, 13px)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                }}
              >
                {['let me introduce myself'].map((line, lineIndex) => (
                  <span className="block" key={lineIndex}>
                    {Array.from(line).map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className="intro-letter"
                        style={{
                          animationDelay: `${0.3 + (lineIndex === 0 ? 0 : 7) * 0.065 + letterIndex * 0.065}s`,
                          whiteSpace: 'pre',
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
              <AsciiKaomoji
                visibleCount={asciiText.length}
                color={isDarkMode ? themeColors.primary : themeColors.colors.pink[500]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Stickers and Journal */}
      <div className="pt-2 pb-8 md:pt-3 md:pb-10" style={{
        background: isDarkMode
          ? 'transparent'
          : `linear-gradient(180deg, transparent 0%, ${withAlpha(themeColors.colors.pink[50], 0.5)} 50%, ${themeColors.colors.pink[25]} 100%)`
      }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center relative min-h-[400px] md:min-h-[600px]">
            {/* Animated Stickers */}
            <div className="absolute inset-0 flex items-center justify-center">
              {stickers.map((sticker) => {
                const isVerySmall = window.innerWidth < 375;
                const isMobile = window.innerWidth < 768;
                return (
                  <img
                    key={sticker.id}
                    src={sticker.image}
                    alt=""
                    className="absolute z-10 pointer-events-none select-none"
                    style={getStickerStyle(sticker)}
                    loading={sticker.id <= 4 ? "eager" : "lazy"}
                    decoding="async"
                    width={isVerySmall ? "50" : isMobile ? "60" : "80"}
                    height={isVerySmall ? "50" : isMobile ? "60" : "80"}
                  />
                );
              })}
            </div>

            {/* About Me Journal Image */}
            <div className="w-full md:max-w-2xl lg:max-w-4xl relative z-20 px-1 md:px-0">
              <picture>
                <source
                  srcSet={`${aboutMeJournalWebp400} 400w, ${aboutMeJournalWebp800} 800w`}
                  sizes="(max-width: 375px) 320px, (max-width: 480px) 400px, (max-width: 768px) 450px, 800px"
                  type="image/webp"
                />
                {/* fallback for browsers that dont support webp */}
                <img
                  src={aboutMeJournalWebp400}
                  alt="Journal page with handwritten personal introduction and interests"
                  className="w-full h-auto object-contain"
                  width="400"
                  height="300"
                  fetchPriority="high"
                  loading="eager"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </picture>

              {/* Scrapbook journal: left photo, right handwritten summary */}
              <div
                className="absolute z-30 grid grid-cols-2 items-center pointer-events-none"
                style={{ left: '8%', right: '8%', top: '9%', bottom: '10%', columnGap: '11%' }}
              >
                {/* Left page: larger textured scrapbook frame, no caption */}
                <div className="h-full min-w-0 flex items-center justify-center">
                  <div className="relative w-[94%] max-w-[345px]" style={{ transform: 'rotate(-5deg)' }}>
                    {/* Paper ephemera tucked behind the frame */}
                    <div
                      className="absolute -top-[5%] left-[6%] w-[31%] h-[18%] -rotate-[17deg]"
                      style={{ background: 'repeating-linear-gradient(0deg,#dfb5a5 0px,#dfb5a5 2px,#f6d8c7 2px,#f6d8c7 6px)', boxShadow: '0 2px 5px #5e34442b' }}
                    />
                    <div
                      className="relative p-[5px] sm:p-[8px] md:p-[12px] pb-[12px] sm:pb-[18px] md:pb-[24px]"
                      style={{
                        backgroundColor: '#c2a4a9',
                        backgroundImage: 'radial-gradient(#fff6e8 0.7px,transparent 0.9px), radial-gradient(#80616b 0.7px,transparent 1px)',
                        backgroundSize: '6px 6px, 9px 9px',
                        border: 'clamp(3px, .7vw, 8px) solid #f9f1e9',
                        boxShadow: '0 9px 18px #4f2b3940, 0 2px 4px #4f2b3926',
                      }}
                    >
                      <div className="relative border-[3px] sm:border-[5px] border-[#f9f3eb] overflow-hidden">
                        <img
                          src={journalPortrait}
                          alt="Foto Putri Febrihandini Harmonia"
                          className="block w-full aspect-[4/5] object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      {/* Decorative gold stars on scrapbook border */}
                      <span aria-hidden="true" className="absolute -top-[5%] left-[15%] text-[#f8e5a4] text-[clamp(10px,2vw,24px)] drop-shadow-sm">★</span>
                      <span aria-hidden="true" className="absolute top-[13%] -right-[5%] text-[#f8e5a4] text-[clamp(11px,2.2vw,27px)] drop-shadow-sm">★</span>
                      <span aria-hidden="true" className="absolute bottom-[6%] left-[12%] text-[#f8e5a4] text-[clamp(10px,1.9vw,23px)] drop-shadow-sm">★</span>
                      <span aria-hidden="true" className="absolute -bottom-[4%] right-[13%] text-[#f8e5a4] text-[clamp(11px,2vw,25px)] drop-shadow-sm">★</span>
                    </div>
                  </div>
                </div>

                {/* Right page: handwriting-inspired typography */}
                <div className="min-w-0 h-full flex flex-col justify-center" style={{ transform: 'rotate(-1deg)' }}>
                  <h2
                    className="mb-2 md:mb-4"
                    style={{
                      fontFamily: '"Comic Sans MS", "Segoe Print", "Bradley Hand", cursive',
                      fontSize: 'clamp(13px, 2.5vw, 29px)',
                      fontWeight: 500,
                      color: '#b66d82',
                    }}
                  >
                    About Me ♡
                  </h2>
                  <p
                    style={{
                      fontFamily: '"Segoe Print", "Comic Sans MS", "Bradley Hand", cursive',
                      fontSize: 'clamp(8px, 1.14vw, 16px)',
                      lineHeight: 1.7,
                      letterSpacing: '0.005em',
                      color: '#51474a',
                      overflowWrap: 'break-word',
                    }}
                  >
                    I'm Putri, an Industrial Engineering graduate from Universitas Islam Bandung.
                    I'm responsible, disciplined, and detail oriented, with an analytical and
                    structured approach to problem solving. I have hands-on experience as an
                    Information Systems and Decisions Laboratory Assistant and as General Treasurer
                    of KMTI Unisba. My skills include document management, data analysis,
                    business process improvement, software development, and financial reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;