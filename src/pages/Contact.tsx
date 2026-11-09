import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import Aurora from '../components/ui/aurora';
import BackButton from '../components/BackButton';
import { contactItems, type ContactId } from '../config/socialLinks';

const WhatsAppIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ContactIcon = ({ id, className, style }: { id: ContactId; className?: string; style?: React.CSSProperties }) => {
  switch (id) {
    case 'email':
      return <Mail className={className} style={style} aria-hidden="true" />;
    case 'whatsapp':
      return <WhatsAppIcon className={className} style={style} />;
    case 'linkedin':
      return <Linkedin className={className} style={style} aria-hidden="true" />;
    case 'instagram':
      return <Instagram className={className} style={style} aria-hidden="true" />;
  }
};

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main aria-label="Contact page" className="min-h-screen py-20 transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: themeColors.background.primary }}>
      <style>{`
        @keyframes contactCardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to { opacity: 1; transform: none; }
        }
        .contact-card { animation: contactCardIn 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .contact-card:hover .contact-icon { transform: rotate(-8deg) scale(1.12); }
        .contact-icon { transition: transform 0.3s ease; }
        @media (prefers-reduced-motion: reduce) { .contact-card { animation: none; } }
      `}</style>

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0" style={{ opacity: isDarkMode ? 1 : 0.3 }}>
        <Aurora
          colorStops={isDarkMode ? [themeColors.primary, themeColors.colors.special.aurora.dark, themeColors.secondary] : [themeColors.colors.special.aurora.light[1], themeColors.colors.special.aurora.light[2], themeColors.colors.special.aurora.light[3]]}
          blend={isDarkMode ? 0.3 : 0.25}
          amplitude={isDarkMode ? 0.8 : 0.6}
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Back Button */}
        <BackButton
          to="/"
          scrollToId=""
          label="Back to Home"
          ariaLabel="Navigate back to homepage"
        />

        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>Let's Connect!</h1>
          <p className="text-lg" style={{ color: themeColors.text.secondary }}>
            Pick whichever way is most convenient. I'd love to hear from you.
          </p>
        </header>

        {/* Contact Cards */}
        <section className="flex flex-wrap justify-center gap-6" aria-label="Contact methods">
          {contactItems.map((item, index) => (
            <article
              key={item.id}
              className="contact-card w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: themeColors.card.background, animationDelay: `${index * 110}ms` }}
              aria-labelledby={`${item.id}-heading`}
            >
              <div className="flex justify-center mb-4">
                <ContactIcon id={item.id} className="contact-icon h-12 w-12" style={{ color: themeColors.colors.pink[500] }} />
              </div>
              <h3 id={`${item.id}-heading`} className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>{item.label}</h3>
              <a
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={`${item.cta}: ${item.display}${item.external ? ' (opens in new tab)' : ''}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: themeColors.interactive.primary,
                  color: themeColors.text.pink
                }}
              >
                {item.cta}
              </a>
              <p className="text-xs mt-3 break-words" style={{ color: themeColors.text.tertiary }}>{item.display}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Contact;
