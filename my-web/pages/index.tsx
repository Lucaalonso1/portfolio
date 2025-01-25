import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { motion } from "framer-motion";

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
        src={`/code-screenshot.png`}
        showGradient={false}
      />
    </div>
  );
}
