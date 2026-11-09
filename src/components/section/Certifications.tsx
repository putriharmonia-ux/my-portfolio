import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import CertificateLightbox from '../CertificateLightbox';

// Import certificate images
import certificate3M from '../../assets/certifications/Sertifikat_3M.jpg';
import baktiDesaImage from '../../assets/certifications/Sertifikat_Bakti_Desa_FT_compressed.jpg';
import iotImage from '../../assets/certifications/Sertifikat_IoT_compressed.jpg';
import jarmaBaksaImage from '../../assets/certifications/Sertifikat_Jarma_Baksa.jpg';
import mekarSabakdesImage from '../../assets/certifications/Sertifikat_Mekar_Sabakdes.jpg';
import ngabersImage from '../../assets/certifications/Sertifikat_Ngabers.jpg';
import pkmImage from '../../assets/certifications/Sertifikat_PKM_dengan_Dosen.jpg';
import copyrightImage from '../../assets/certifications/sertifikat_EC002025061124_Iyan_Bachtiar_compressed.jpg';
import copyrightIotSmaImage from '../../assets/certifications/Sertifikat_Hak_Cipta_IoT_SMA.jpg';
import copyrightAiAgentImage from '../../assets/certifications/Sertifikat_Hak_Cipta_AI_Agent.jpg';
import erpSalesImage from '../../assets/certifications/Sertifikat_ERP_Odoo_Sales.jpg';
import erpPurchaseImage from '../../assets/certifications/Sertifikat_ERP_Odoo_Purchase.jpg';
import erpFinanceImage from '../../assets/certifications/Sertifikat_ERP_Odoo_Finance_Accounting.jpg';
import erpInventoryImage from '../../assets/certifications/Sertifikat_ERP_Odoo_Inventory_Manufacturing.jpg';
import itM365Image from '../../assets/certifications/Sertifikat_IT_Microsoft365_Google_Workspace.jpg';
import guestLectureImage from '../../assets/certifications/Sertifikat_Guest_Lecture_Humanitarian_Logistics.jpg';
import studiumEraDigitalImage from '../../assets/certifications/Sertifikat_Studium_Generale_Era_Digital.jpg';
import studiumKewirausahaanImage from '../../assets/certifications/Sertifikat_Studium_Generale_Kewirausahaan.jpg';
import studiumPeluangImage from '../../assets/certifications/Sertifikat_Studium_Generale_Peluang_Tantangan.jpg';
import webinarPsppiImage from '../../assets/certifications/Sertifikat_Webinar_PSPPI.jpg';
import skilledgeImage from '../../assets/certifications/Sertifikat_Skilledge_Gen_Z.jpg';
import tablighAkbarImage from '../../assets/certifications/Sertifikat_Tabligh_Akbar.jpg';
import diklatBaktiDesaImage from '../../assets/certifications/Sertifikat_Diklat_Bakti_Desa.jpg';
import porakTiImage from '../../assets/certifications/Sertifikat_PORAK_TI.jpg';
import kmtiChampionshipImage from '../../assets/certifications/Sertifikat_KMTI_Championship.jpg';
import ppmbImage from '../../assets/certifications/Sertifikat_PPMB_TI_2024.jpg';
import pkmbImage from '../../assets/certifications/Sertifikat_PKMB_TI_2024.jpg';
import taarufTiImage from '../../assets/certifications/Sertifikat_Taaruf_TI_2024.jpg';

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [selected, setSelected] = useState<number | null>(null);

  const certifications = [
      {
      id: 'erp-sales',
      image: erpSalesImage,
      title: 'ERP with Odoo: Sales',
      subtitle: 'PT Ctech ERP Indonesia – Score 90.00 – December 2025',
      category: 'Professional Training'
    },
    {
      id: 'erp-purchase',
      image: erpPurchaseImage,
      title: 'ERP with Odoo: Purchase',
      subtitle: 'PT Ctech ERP Indonesia – Score 83.33 – December 2025',
      category: 'Professional Training'
    },
    {
      id: 'erp-finance',
      image: erpFinanceImage,
      title: 'ERP with Odoo: Finance & Accounting',
      subtitle: 'PT Ctech ERP Indonesia – Score 93.33 – January 2026',
      category: 'Professional Training'
    },
    {
      id: 'erp-inventory',
      image: erpInventoryImage,
      title: 'ERP with Odoo: Inventory & Manufacturing',
      subtitle: 'PT Ctech ERP Indonesia – Score 96.67 – January 2026',
      category: 'Professional Training'
    },
    {
      id: 'iot',
      image: iotImage,
      title: 'Internet of Things (IoT)',
      subtitle: 'Certificate of Training – July 2025',
      category: 'Technology'
    },
    {
      id: 'it-m365',
      image: itM365Image,
      title: 'Microsoft 365 & Google Workspace',
      subtitle: 'Certificate of Completion Information Technology Course – September-November 2022',
      category: 'Technology'
    },
    {
      id: 'pkm',
      image: pkmImage,
      title: 'Pengabdian Kepada Masyarakat',
      subtitle: 'Research and Academic Collaboration – April 2025',
      category: 'Community Service'
    },
    {
      id: 'bakti-desa',
      image: baktiDesaImage,
      title: 'Bakti Desa Nuraga',
      subtitle: 'Community Service Program – July 2024',
      category: 'Community Service'
    },
    {
      id: 'mekar-sabakdes',
      image: mekarSabakdesImage,
      title: 'Mekar Sabakdes',
      subtitle: 'Certificate of Participation as Treasurer – October 2024',
      category: 'Organization & Activities'
    },
    {
      id: 'jarma-baksa',
      image: jarmaBaksaImage,
      title: 'Jarma Baksa',
      subtitle: 'Certificate of Participation as Treasurer – September 2023',
      category: 'Organization & Activities'
    },
    {
      id: 'diklat-bakti-desa',
      image: diklatBaktiDesaImage,
      title: 'Diklat Bakti Desa UNISBA',
      subtitle: 'Certificate of Participation as Event Committee – January 2025',
      category: 'Organization & Activities'
    },
    {
      id: 'kmti-championship',
      image: kmtiChampionshipImage,
      title: 'KMTI Championship 3.0',
      subtitle: 'Certificate of Participation as Event Committee – July 2023',
      category: 'Organization & Activities'
    },
    {
      id: 'tabligh-akbar',
      image: tablighAkbarImage,
      title: 'Tabligh Akbar',
      subtitle: 'Certificate of Participation as Event Committee – May 2023',
      category: 'Organization & Activities'
    },
    {
      id: 'porak-ti',
      image: porakTiImage,
      title: 'PORAK TI 2023',
      subtitle: 'Certificate of Participation as Event Committee – February 2023',
      category: 'Organization & Activities'
    },
    {
      id: '3m',
      image: certificate3M,
      title: '3M Event',
      subtitle: 'Certificate of Participation as Logistics Committee – October 2024',
      category: 'Organization & Activities'
    },
    {
      id: 'ngabers',
      image: ngabersImage,
      title: 'Ngarawat Bumi Bareng Bakdes',
      subtitle: 'Certificate of Participation as Logistics Committee – May 2025',
      category: 'Organization & Activities'
    },
    {
      id: 'ppmb',
      image: ppmbImage,
      title: 'PPMB Teknik Industri 2024',
      subtitle: 'Certificate of Participation as Logistics Committee – September 2024',
      category: 'Organization & Activities'
    },
    {
      id: 'pkmb',
      image: pkmbImage,
      title: 'PKMB Teknik Industri 2024',
      subtitle: 'Certificate of Participation as Logistics Committee – September 2024',
      category: 'Organization & Activities'
    },
    {
      id: 'taaruf-ti',
      image: taarufTiImage,
      title: "Ta'aruf Teknik Industri 2024",
      subtitle: 'Certificate of Participation as Logistics Committee – September 2024',
      category: 'Organization & Activities'
    },
    {
      id: 'skilledge',
      image: skilledgeImage,
      title: 'Skilledge: Tantangan Gen-Z',
      subtitle: 'Certificate of Participation – June 2025',
      category: 'Organization & Activities'
    },
    {
      id: 'copyright-ai-agent',
      image: copyrightAiAgentImage,
      title: 'Copyright Registration Certificate',
      subtitle: 'AI-Agent for E-commerce and Omnichannel Software – July 2026',
      category: 'Intellectual Property'
    },
    {
      id: 'copyright-iot-sma',
      image: copyrightIotSmaImage,
      title: 'Copyright Registration Certificate',
      subtitle: 'Technology Training on Arduino-Based IoT – June 2026',
      category: 'Intellectual Property'
    },
    {
      id: 'copyright',
      image: copyrightImage,
      title: 'Copyright Registration Certificate',
      subtitle: 'Program Development at Tanggulun Village – June 2025',
      category: 'Intellectual Property'
    },
    {
      id: 'webinar-psppi',
      image: webinarPsppiImage,
      title: 'Webinar PSPPI FT UNISBA 2025',
      subtitle: 'Ethical and Sustainable Mining Management – June 2025',
      category: 'Seminars & Webinars'
    },
    {
      id: 'guest-lecture',
      image: guestLectureImage,
      title: 'Humanitarian Logistics',
      subtitle: 'International Guest Lecture – September 2024',
      category: 'Seminars & Webinars'
    },
        {
      id: 'studium-1',
      image: studiumEraDigitalImage,
      title: 'Studium Generale: Era Teknologi Digital',
      subtitle: 'The Role of an Industrial Engineering Graduate – November 2023',
      category: 'Seminars & Webinars'
    },
    {
      id: 'studium-2',
      image: studiumKewirausahaanImage,
      title: 'Studium Generale: Kewirausahaan',
      subtitle: 'Fostering Entrepreneurship Driven by Innovation – November 2023',
      category: 'Seminars & Webinars'
    },
    {
      id: 'studium-3',
      image: studiumPeluangImage,
      title: 'Studium Generale: Peluang & Tantangan',
      subtitle: 'Opportunities and Challenges in the Digital Technology Era – November 2023',
      category: 'Seminars & Webinars'
    }
  ];

  return (
    <section
      id="certifications"
      className="py-12 md:py-16 relative"
      style={{
        background:
          themeColors.background.sections?.certifications ||
          themeColors.background.gradient,
        transition: 'background 0.3s ease-in-out'
      }}
    >
      <div
        className="container mx-auto px-5 md:px-6 relative"
        style={{ zIndex: 2 }}
      >
        {/* Section Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-3"
          style={{
            color: isDarkMode
              ? themeColors.colors.white
              : themeColors.colors.pink[500]
          }}
        >
          Certifications
        </h2>

        <p
          className="text-center text-sm md:text-base mb-10 max-w-2xl mx-auto"
          style={{
            color: isDarkMode
              ? themeColors.colors.dark[300]
              : themeColors.colors.dark[600]
          }}
        >
          A collection of certificates, academic activities, and professional development experiences.
        </p>

        {/* Certificate Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((certification, index) => (
              <div
                key={certification.id}
                role="button"
                tabIndex={0}
                aria-label={`View certificate: ${certification.title}`}
                onClick={() => setSelected(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(index);
                  }
                }}
                className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                style={{
                  background: isDarkMode
                    ? themeColors.colors.dark[800]
                    : '#ffffff',
                  border: `1px solid ${
                    isDarkMode
                      ? 'rgba(255,255,255,0.12)'
                      : 'rgba(236,72,153,0.15)'
                  }`
                }}
              >
                {/* Certificate Image */}
                <div
                  className="relative overflow-hidden p-3 md:p-4"
                  style={{
                    background: isDarkMode
                      ? '#25212b'
                      : '#fff7fb'
                  }}
                >
                  <div
                    className="w-full overflow-hidden rounded-lg"
                    style={{
                      aspectRatio: '1.35 / 1'
                    }}
                  >
                    <img
                      src={certification.image}
                      alt={certification.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width="400"
                      height="300"
                    />
                  </div>

                  {/* Hover hint */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      background: isDarkMode
                        ? 'rgba(15,23,42,0.45)'
                        : 'rgba(236,72,153,0.14)',
                      backdropFilter: 'blur(1.5px)'
                    }}
                  >
                    <span
                      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-lg translate-y-2 transition-transform duration-300 group-hover:translate-y-0"
                      style={{
                        background: isDarkMode ? themeColors.colors.pink[200] : '#ffffff',
                        color: isDarkMode ? '#1E293B' : themeColors.colors.pink[600]
                      }}
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                      View certificate
                    </span>
                  </div>
                </div>

                {/* Certificate Information */}
                <div className="p-3 md:p-4">
                  <span
                    className="inline-block text-xs font-medium px-2 py-1 rounded-full mb-2"
                    style={{
                      background: isDarkMode
                        ? 'rgba(236,72,153,0.15)'
                        : 'rgba(236,72,153,0.10)',
                      color: isDarkMode
                        ? themeColors.colors.pink[300]
                        : themeColors.colors.pink[500]
                    }}
                  >
                    {certification.category}
                  </span>

                  <h3
                    className="text-sm md:text-base font-semibold mb-2 leading-snug"
                    style={{
                      color: isDarkMode
                        ? themeColors.colors.pink[300]
                        : themeColors.colors.pink[500]
                    }}
                  >
                    {certification.title}
                  </h3>

                  <p
                    className="text-xs md:text-sm leading-relaxed"
                    style={{
                      color: isDarkMode
                        ? themeColors.colors.dark[300]
                        : themeColors.colors.dark[600]
                    }}
                  >
                    {certification.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate popup */}
      <CertificateLightbox
        items={certifications}
        index={selected}
        onClose={() => setSelected(null)}
        onIndexChange={setSelected}
      />

      {/* Bottom Gradient Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1
        }}
      />
    </section>
  );
};

export default Certifications;
