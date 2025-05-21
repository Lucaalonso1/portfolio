import React, { useState, useEffect, useRef } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { MacNotification } from "@/components/MacNotification";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle,
  NavbarButton 
} from "@/components/ui/resizable-navbar";
import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiFigma, SiVercel, SiFramer, SiGoogleanalytics, SiAdobexd } from 'react-icons/si';
import { AnimatedRadarSkills } from "@/components/AnimatedRadarSkills";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  const skillsData = [
    { name: 'React', icon: <FaReact size={28} color="#38bdf8" />, level: 95, color: 'from-sky-400 to-blue-500' },
    { name: 'Next.js', icon: <SiNextdotjs size={28} color="#000" />, level: 90, color: 'from-black to-gray-700' },
    { name: 'TypeScript', icon: <SiTypescript size={28} color="#2563eb" />, level: 90, color: 'from-blue-500 to-blue-700' },
    { name: 'JavaScript', icon: <SiJavascript size={28} color="#facc15" />, level: 95, color: 'from-yellow-300 to-yellow-500' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={28} color="#06b6d4" />, level: 90, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Node.js', icon: <FaNodeJs size={28} color="#16a34a" />, level: 85, color: 'from-green-400 to-green-700' },
    { name: 'Express', icon: <SiExpress size={28} color="#222" />, level: 80, color: 'from-gray-400 to-gray-700' },
    { name: 'MongoDB', icon: <SiMongodb size={28} color="#22c55e" />, level: 80, color: 'from-green-300 to-green-600' },
    { name: 'PostgreSQL', icon: <SiPostgresql size={28} color="#1e40af" />, level: 75, color: 'from-blue-400 to-blue-900' },
    { name: 'Framer Motion', icon: <SiFramer size={28} color="#d946ef" />, level: 80, color: 'from-fuchsia-400 to-fuchsia-700' },
    { name: 'Figma', icon: <SiFigma size={28} color="#ec4899" />, level: 85, color: 'from-pink-400 to-pink-700' },
    { name: 'Git', icon: <FaGitAlt size={28} color="#f97316" />, level: 90, color: 'from-orange-400 to-orange-700' },
    { name: 'Vercel', icon: <SiVercel size={28} color="#000" />, level: 80, color: 'from-gray-800 to-black' },
    { name: 'SEO', icon: <SiGoogleanalytics size={28} color="#22c55e" />, level: 70, color: 'from-green-200 to-green-500' },
    { name: 'UI/UX', icon: <SiAdobexd size={28} color="#a21caf" />, level: 85, color: 'from-purple-400 to-purple-700' },
  ];

  useEffect(() => {
    // Actualizar fecha y hora inicialmente
    updateDateTime();
    
    // Actualizar cada minuto
    const interval = setInterval(updateDateTime, 60000);

    const handleScroll = () => {
      if (!projectsRef.current) return;

      const projectsSection = projectsRef.current;
      const windowHeight = window.innerHeight;

      // Ajustamos el inicio de la transición para que comience más temprano
      const start = windowHeight * 0.5; // Comienza a la mitad de la altura de la ventana
      const end = projectsSection.offsetTop - windowHeight * 0.2; // Termina antes de llegar a proyectos
      const scrollY = window.scrollY;

      // Progreso global de la cortina (0 = inicio temprano, 1 = antes de proyectos)
      let progress = (scrollY - start) / (end - start);
      progress = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Calcular el progreso inicial

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateDateTime = () => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }));
    setCurrentTime(now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    }));
  };

  const smoothScroll = (targetPosition: number, startPosition: number, duration: number) => {
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
    const durationMs = duration;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / durationMs, 1);
      
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const currentPosition = startPosition + distance * easeInOutCubic(progress);
      window.scrollTo(0, currentPosition);

      if (timeElapsed < durationMs) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const startPosition = window.pageYOffset;
      const targetPosition = element.offsetTop - 80; // Ajuste para el navbar
      smoothScroll(targetPosition, startPosition, 500); // 500ms = 0.5 segundos
    }
  };

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    smoothScroll(0, startPosition, 500); // 500ms = 0.5 segundos
  };

  const handleContactMe = () => {
    window.location.href = '/contact';
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      onClick: scrollToTop
    },
    {
      name: "Projects",
      link: "#projects",
      onClick: () => scrollToSection('projects')
    },
    {
      name: "Skills",
      link: "#skills",
      onClick: () => scrollToSection('skills')
    }
  ];

  return (
    <div className="overflow-hidden w-full pt-20 relative">
      <div 
        className="fixed inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: scrollProgress >= 1
            ? 'white'
            : `linear-gradient(to bottom, #0B0B0F ${(1 - scrollProgress) * 100}%, white ${(1 - scrollProgress) * 100}%)`,
          zIndex: -1
        }}
      />
      
      <Navbar>
        <NavBody isLightHeader={scrollProgress > 0.5}>
          <Link href="/" className={`z-20 relative transition-colors duration-500 ${scrollProgress > 0.5 ? 'text-black' : 'text-white'}`} onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}>
            <span className={`font-bold transition-colors duration-500 ${scrollProgress > 0.5 ? 'text-black' : 'text-white'}`}>Luca Alonso</span>
          </Link>
          <NavItems items={navItems} isLightHeader={scrollProgress > 0.5} />
          <div className="z-20 relative">
            <NavbarButton 
              onClick={handleContactMe}
              variant={scrollProgress > 0.5 ? 'dark' : 'primary'}
              className={`transition-colors duration-500 ${scrollProgress > 0.5 ? '!bg-black !text-white' : ''}`}
            >
              Contact Me
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="flex items-center" onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}>
              <span className="font-bold text-white">Luca Alonso</span>
            </Link>
            <MobileNavToggle 
              isOpen={isMobileMenuOpen} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              item.link.startsWith("#") ? (
                <button 
                  key={`mobile-link-${idx}`}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 transition-colors duration-300 ${
                    scrollProgress > 0.5 
                      ? 'text-black hover:bg-gray-100' 
                      : 'text-white hover:bg-gray-800'
                  } rounded-md text-left`}
                >
                  {item.name}
                </button>
              ) : (
                <button 
                  key={`mobile-link-${idx}`}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 transition-colors duration-300 ${
                    scrollProgress > 0.5 
                      ? 'text-black hover:bg-gray-100' 
                      : 'text-white hover:bg-gray-800'
                  } rounded-md text-left`}
                >
                  {item.name}
                </button>
              )
            ))}
            <NavbarButton 
              onClick={handleContactMe}
              className="mt-4 w-full"
              variant="primary"
            >
              Contact Me
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <ContainerScroll
        titleComponent={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-semibold text-white">
              Hi, I&apos;m 
              <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Luca Alonso
              </span>
            </h1>
          </motion.div>
        }
      >
        <div className="relative w-full h-full bg-[url('/wallpaper.jpg')] bg-cover bg-center rounded-[24px]">
          <div className="absolute top-0 w-full h-7 bg-black/20 backdrop-blur-md flex items-center px-4 rounded-t-[24px]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs font-light mb-1">
                {currentDate}
              </div>
              <div className="text-3xl xs:text-4xl font-semibold tracking-tight">
                {currentTime}
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-24 xs:top-28 sm:top-32 right-1/2 transform translate-x-1/2 space-y-1.5 xs:space-y-2 w-full max-w-[450px] px-4 sm:px-0">
            <MacNotification
              title="Luca Alonso Froeling"
              message="Second-year Computer Science student and Software Developer with professional experience. Passionate about creating innovative solutions and constantly learning new technologies."
              icon="/profile-icon.png"
              delay={0.5}
              extended={true}
            />
            <MacNotification
              title="GitHub"
              message="Check out my projects on GitHub"
              icon="/github-icon.png"
              link="https://github.com/Lucaalonso1"
              delay={1.5}
            />
            <MacNotification
              title="LinkedIn"
              message="Connect with me on LinkedIn"
              icon="/linkedin-icon.png"
              link="https://www.linkedin.com/in/luca-alonso-froeling-64a6a2306/"
              delay={2.5}
            />
          </div>
        </div>
      </ContainerScroll>

      {/* Projects Section */}
      <section 
        ref={projectsRef}
        id="projects" 
        className="scroll-mt-20 py-0 min-h-[80vh] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-3 text-black"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              My recent work
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-lg mb-8 transition-colors duration-300"
              style={{
                color: scrollProgress > 0.5 ? '#4B5563' : '#9CA3AF'
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Showcasing my latest web development projects. Each one represents a unique challenge and solution.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              {
                title: "7 Indoor Golf",
                description: "Modern website for an indoor golf facility in Madrid with booking system and responsive design.",
                tech: ["Next.js", "React", "Tailwind CSS", "Booking API"],
                image: "/7indoorgolf.mp4",
                link: "https://7indoorgolf.com/"
              },
              {
                title: "ETG - Escuela Técnica de Golf",
                description: "Professional website for a prestigious golf school showcasing their services and facilities.",
                tech: ["React", "Animation", "Responsive Design", "SEO Optimization"],
                image: "/etg.jpg",
                link: "https://www.escuelatecnicadegolf.com/"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative"
              >
                <CardContainer className="inter-var">
                  <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-white border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                    <CardItem
                      translateZ="50"
                      className="text-3xl font-bold text-black"
                    >
                      {project.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-gray-600 text-sm max-w-sm mt-2"
                    >
                      {project.description}
                    </CardItem>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, idx) => (
                        <CardItem
                          key={idx}
                          translateZ="40"
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs text-black"
                        >
                          {tech}
                        </CardItem>
                      ))}
                    </div>

                    <CardItem translateZ="30" className="w-full mt-4">
                      <div className="h-60 w-full relative rounded-xl overflow-hidden">
                        {project.image.endsWith('.mp4') ? (
                          <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src={project.image} type="video/mp4" />
                          </video>
                        ) : (
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${project.image})` }}
                          />
                        )}
                      </div>
                    </CardItem>

                    <CardItem
                      translateZ="100"
                      className="w-full mt-4"
                    >
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-black text-white rounded-xl text-sm font-bold transition-colors hover:bg-gray-800"
                      >
                        Visit Website
                        <svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        id="skills"
        className="py-20 bg-white min-h-[60vh] flex flex-col items-center justify-center"
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-black text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills
          </motion.h2>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            viewport={{ once: true }}
            className="w-full"
          >
            <AnimatedRadarSkills skills={skillsData} />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
