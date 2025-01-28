import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion } from "framer-motion";
import { MacNotification } from "@/components/MacNotification";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full">
      <MacbookScroll
        title={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-white block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hi, I&apos;m Luca Alonso
            </motion.span>
            <div className="flex items-center justify-center gap-2">
              <motion.span 
                className="text-gray-400 text-3xl md:text-4xl mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                I&apos;m a
              </motion.span>
              <FlipWords
                words={[
                  "Software Engineer",
                  "Problem Solver",
                  "Tech Enthusiast",
                  "Full-Stack Developer"
                ]}
                duration={2000}
                className="text-gray-400 text-3xl md:text-4xl mt-4"
              />
            </div>
          </motion.div>
        }
        content={
          <div className="relative w-full h-full bg-[url('/wallpaper.jpg')] bg-cover bg-center">
            {/* Barra superior de macOS */}
            <div className="absolute top-0 w-full h-7 bg-black/20 backdrop-blur-md flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            
            {/* Reloj y fecha */}
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
            
            {/* Contenedor de notificaciones */}
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
        }
        showGradient={false}
      />
    </div>
  );
}
