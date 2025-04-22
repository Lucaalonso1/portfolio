import React, { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "framer-motion";
import { MacNotification } from "@/components/MacNotification";
import Link from "next/link";
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

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Actualizar fecha y hora inicialmente
    updateDateTime();
    
    // Actualizar cada minuto
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
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

  const navItems = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Projects",
      link: "#projects"
    },
    {
      name: "Skills",
      link: "#skills"
    }
  ];

  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full pt-20">
      <Navbar>
        <NavBody>
          <Link href="/" className="z-20 relative">
            <span className="font-bold text-white">Luca Alonso</span>
          </Link>
          <NavItems items={navItems} />
          <div className="z-20 relative">
            <NavbarButton href="mailto:luca.alonso2005@gmail.com" variant="primary">
              Contact Me
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="flex items-center">
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
                <a 
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  className="w-full px-4 py-2 text-white hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link 
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  className="w-full px-4 py-2 text-white hover:bg-gray-800 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <NavbarButton 
              href="mailto:luca.alonso2005@gmail.com" 
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
              <div className="text-4xl font-semibold tracking-tight">
                {currentTime}
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-32 right-1/2 transform translate-x-1/2 space-y-2 w-[450px]">
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
      <section id="projects" className="py-0 -mt-32 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-3"
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
              className="max-w-2xl mx-auto text-gray-400 text-lg mb-8"
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
                  hidden: { 
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                  },
                  visible: { 
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20
                    }
                  }
                }}
                whileHover={{ y: -10 }}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full transform-gpu"
                >
                  <motion.div 
                    className="group h-[350px] w-full relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm"
                    initial={{ borderRadius: "1rem" }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10 opacity-80"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                    >
                      {project.image.endsWith('.mp4') ? (
                        <video
                          className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src={project.image} type="video/mp4" />
                        </video>
                      ) : (
                        <motion.div 
                          className="w-full h-full bg-cover bg-center transform-gpu transition-transform duration-700 ease-out"
                          style={{ backgroundImage: `url(${project.image})` }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.7 }}
                        />
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 z-20"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.h3 
                        className="text-3xl font-bold text-white mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {project.description}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {project.tech.map((tech, idx) => (
                          <motion.span 
                            key={idx}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white"
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "rgba(255,255,255,0.2)"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <motion.button
                        className="inline-flex items-center px-4 py-2 bg-white text-black rounded-full text-sm font-medium transition-all group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Website
                        <motion.svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </Link>
                
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="hoverBorder"
                    className="absolute -inset-px rounded-2xl border-2 border-white/20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section (placeholder) */}
    </div>
  );
}
