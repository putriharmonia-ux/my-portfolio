
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import ExperienceAlbum from '../ExperienceAlbum';

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const experiences = [
    {
      id: 'head-engineer-lab',
      title: "Head Engineer – Laboratory Assistant",
      company: "Laboratory of Information Systems and Decisions, Bandung Islamic University",
      location: "Bandung, West Java, Indonesia",
      period: "March 2026 – Present",
      description: [
        "Lead and coordinate a team of laboratory assistants to manage daily operations, allocate resources, and maintain equipment readiness for academic and technical activities.",
        "Coordinate practical sessions for Computer Programming and Information Systems Analysis & Design, helping students apply programming concepts and system analysis methods through hands-on exercises.",
        "Organize Arduino and Internet of Things (IoT) training sessions for 20+ students, providing practical exposure to hardware integration, programming, and emerging technologies.",
        "Oversee laboratory facilities, operational readiness, and team coordination to support an organized learning environment."
      ]
    },
    {
      id: 'junior-software-engineer-lab',
      title: "Junior Software Engineer – Laboratory Assistant",
      company: "Laboratory of Information Systems and Decisions, Bandung Islamic University",
      location: "Bandung, West Java, Indonesia",
      period: "March 2025 – February 2026",
      description: [
        "Collaborated with a team of six laboratory assistants to coordinate laboratory activities, support technical operations, and maintain the delivery of practical learning sessions.",
        "Co-developed eight practical learning modules for Computer Programming and Information Systems Analysis & Design, supporting hands-on learning for 100+ students.",
        "Developed applications using Python and Google AppSheet to support laboratory operations and information systems learning activities, translating practical needs into application features.",
        "Tested and debugged application features and prepared technical documentation to identify issues, improve functionality, and support ongoing application maintenance."
      ]
    },
    {
      id: 'iae-intern',
      title: "Program Management Intern – Maintenance, Assembly, and Modification Division (MS)",
      company: "Indonesian Aerospace (IAe)",
      location: "Bandung, West Java, Indonesia",
      period: "July 2025 – August 2025",
      description: [
        "Reviewed aircraft maintenance, assembly, and modification workflows to understand operational procedures, documentation requirements, and coordination across related functions.",
        "Analyzed manual maintenance documentation practices to identify potential issues affecting work-hour recording, information accuracy, and operational efficiency.",
        "Examined maintenance worksheet procedures and documented how work-hour records and operational data were recorded and managed within existing workflows.",
        "Documented findings and identified opportunities for process improvement and digitalization to support more accurate recordkeeping and efficient maintenance documentation."
      ]
    },
    {
      id: 'kmti-treasurer',
      title: "General Treasurer",
      company: "Keluarga Mahasiswa Teknik Industri (KMTI) Unisba",
      location: "Bandung, West Java, Indonesia",
      period: "October 2025 – September 2026",
      description: [
        "Managed financial planning and budget allocation for an organization with 40+ executive board members.",
        "Coordinated revenue and expenditure budgets with program treasurers and prepared periodic financial reports to support transparent financial management and informed budget decisions."
      ]
    },
    {
      id: 'bakti-desa-treasurer',
      title: "Division Treasurer – Education and Religious Development Division",
      company: "Bakti Desa Unisba",
      location: "Bandung, West Java, Indonesia",
      period: "September 2024 – June 2025",
      description: [
        "Managed budget allocation for four work programs and maintained monthly records of income and expenditures.",
        "Prepared financial accountability reports to support accurate documentation and ensure spending remained within approved budgets."
      ]
    }
  ];

  return (
    <section
      id="experience"
      className="py-8 relative"
      style={{
        background:
          themeColors.background.sections?.experience ||
          themeColors.background.gradient,
        transition: 'background 0.3s ease-in-out'
      }}
    >
      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.white} 100%)`,
          zIndex: 1
        }}
      />

      <div
        className="container mx-auto px-6 relative"
        style={{ zIndex: 2 }}
      >
        <h2
          className="text-4xl font-bold text-center mb-6"
          style={{
            color: isDarkMode
              ? themeColors.colors.white
              : themeColors.colors.pink[500]
          }}
        >
          Experience
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95"
            >
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                  <div className="min-w-0">
                    <CardTitle
                      className="text-xl sm:text-2xl"
                      style={{
                        color: isDarkMode
                          ? themeColors.colors.pink[300]
                          : themeColors.colors.pink[400]
                      }}
                    >
                      {exp.title}
                    </CardTitle>

                    <p className="text-base font-semibold text-gray-700 dark:text-gray-400 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="sm:min-w-fit sm:text-right">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 sm:justify-end">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{exp.period}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 sm:justify-end">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span
                        className="mr-2 shrink-0"
                        style={{ color: themeColors.primary }}
                      >
                        •
                      </span>

                      <span
                        className="text-sm leading-6"
                        style={{
                          color: isDarkMode
                            ? themeColors.colors.dark[200]
                            : themeColors.colors.dark[600]
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <ExperienceAlbum folder={exp.id} title={exp.title} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
