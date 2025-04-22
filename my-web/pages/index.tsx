import React, { useState } from "react";
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
      name: "About Me",
      link: "#about"
    },
    {
      name: "Skills",
      link: "#skills"
    },
    {
      name: "Contact",
      link: "#contact"
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
            <NavbarButton href="mailto:luca.alonso2005o@gmail.com" variant="primary">
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
              href="mailto:tucorreo@ejemplo.com" 
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
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-4xl font-semibold tracking-tight">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
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
    </div>
  );
}
