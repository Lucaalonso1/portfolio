import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion } from "framer-motion";
import { MacNotification } from "@/components/MacNotification";

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
              Hi, I'm Luca Alonso
            </motion.span>
            <motion.span 
              className="text-gray-400 text-3xl md:text-4xl mt-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Software Engineer
            </motion.span>
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
            
            {/* Contenedor de notificaciones */}
            <div className="absolute top-10 right-4 space-y-3 w-72">
              <MacNotification
                title="Portfolio Highlight"
                message="Full-stack developer specialized in React & Node.js"
                icon="/code-icon.png"
                delay={0.5}
              />
              <MacNotification
                title="GitHub"
                message="View my latest projects and contributions"
                icon="/github-icon.png"
                link="https://github.com/yourusername"
                delay={1.5}
              />
              <MacNotification
                title="LinkedIn"
                message="Connect with me professionally"
                icon="/linkedin-icon.png"
                link="https://linkedin.com/in/yourusername"
                delay={2.5}
              />
              <MacNotification
                title="Contact"
                message="Open to new opportunities!"
                icon="/email-icon.png"
                link="mailto:your@email.com"
                delay={3.5}
              />
            </div>
          </div>
        }
        showGradient={false}
      />
    </div>
  );
}
