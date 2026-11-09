import { lazy, Suspense } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import { useThemeColors } from './hooks/useThemeColors'
import { colors } from './styles/colors'
import Navigation from './components/section/Navigation'
import About from './components/section/About'
import { divider } from './assets'
import SparkleCursor from './components/SparkleCursor'
import IntroScreen from './components/IntroScreen'
import ScrollProgress from './components/ScrollProgress'
import AmbientStars from './components/AmbientStars'
import SectionDivider from './components/SectionDivider'
import { useAutoReveal } from './hooks/useAutoReveal'
import { siteEffects } from './config/siteEffects'
import './App.css'
import './styles/effects.css'

// Lazy load project pages - add your project page imports here
// Example: const MyProject = lazy(() => import('./pages/projects/MyProject'))
const Contact = lazy(() => import('./pages/Contact'))

// Lazy load below-the-fold components for better initial load
const Projects = lazy(() => import('./components/section/Projects'))
const Experience = lazy(() => import('./components/section/Experience'))
const Skills = lazy(() => import('./components/section/Skills'))
const Certifications = lazy(() => import('./components/section/Certifications'))
const Footer = lazy(() => import('./components/Footer'))

function HomePage() {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  useAutoReveal(siteEffects.autoReveal);

  return (
    <>
      <About />
      {siteEffects.dividers.enabled && <SectionDivider variant="yarn" />}
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Projects />
      </Suspense>
      {siteEffects.dividers.enabled && <SectionDivider variant="paws" />}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Experience />
      </Suspense>
      {/* Divider with gradient transitions */}
      <div className="w-full py-8 relative" style={{
        background: isDarkMode ? themeColors.background.gradientEnd : colors.white,
        transition: 'background 0.3s ease-in-out'
      }}>
        {/* Top gradient overlay to blend with Experience section */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '60px',
            background: isDarkMode
              ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
              : `linear-gradient(180deg, ${colors.white} 0%, transparent 100%)`,
            zIndex: 1
          }}
        />
        {/* Bottom gradient overlay to blend with Skills section */}
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '200px',
            background: isDarkMode 
              ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
              : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
            zIndex: 1
          }}
        />
        <img
          src={divider}
          alt="Section divider"
          className="w-full h-auto relative"
          style={{
            zIndex: 2,
            filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none',
            opacity: isDarkMode ? 0.7 : 1
          }}
          width="1200"
          height="100"
          loading="lazy"
        />
      </div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Skills />
      </Suspense>
      {siteEffects.dividers.enabled && <SectionDivider variant="wave" bg="white" />}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Certifications />
      </Suspense>
    </>
  )
}

const INTRO_KEY = 'introSeen'

function shouldShowIntro(pathname: string) {
  if (!siteEffects.intro.enabled) return false
  if (pathname !== '/') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (siteEffects.intro.oncePerSession && sessionStorage.getItem(INTRO_KEY)) return false
  return true
}

function AppContent() {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro(location.pathname));
  const [siteVisible, setSiteVisible] = useState(() => !shouldShowIntro(location.pathname));

  // muat bagian bawah website selagi opening berjalan, supaya mulus saat tirai terbuka
  useEffect(() => {
    if (!showIntro) return;
    void import('./components/section/Projects');
    void import('./components/section/Experience');
    void import('./components/section/Skills');
    void import('./components/section/Certifications');
    void import('./components/Footer');
  }, [showIntro]);

  const handleReveal = useCallback(() => {
    setSiteVisible(true);
    const root = document.documentElement;
    root.classList.add('site-entering');
    window.setTimeout(() => root.classList.remove('site-entering'), 2600);
  }, []);

  const handleDone = useCallback(() => {
    setShowIntro(false);
    if (siteEffects.intro.oncePerSession) sessionStorage.setItem(INTRO_KEY, '1');
  }, []);

  return (
    <>
      {siteEffects.cursor.enabled && (
        <SparkleCursor variant={siteEffects.cursor.variant} autopilot={showIntro} />
      )}
      {showIntro && <IntroScreen onReveal={handleReveal} onDone={handleDone} />}

      {siteVisible && (
        <>
          {siteEffects.scrollProgress && <ScrollProgress />}
          {siteEffects.ambientStars && <AmbientStars />}
          <Navigation />
          <div className="app transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#101727' : undefined }}>
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <main id="main-content" className="main-content">
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contact" element={<Contact />} />
                  {/* Add your project routes here */}
                  {/* Example: <Route path="/projects/my-project" element={<MyProject />} /> */}
                </Routes>
              </Suspense>
            </main>
            <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
              <Footer />
            </Suspense>
          </div>
        </>
      )}
    </>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

export default App