"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollSectionsProps {
  sections: {
    content: React.ReactNode;
    className?: string;
  }[];
  className?: string;
}

export const StickyScrollSections = ({
  sections,
  className,
}: StickyScrollSectionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        const sectionHeight = 100 / sections.length;
        const startProgress = index * sectionHeight / 100;
        const endProgress = (index + 1) * sectionHeight / 100;

        return (
          <motion.div
            key={index}
            className={cn(
              "sticky top-0 h-screen w-full overflow-hidden",
              section.className
            )}
            style={{
              zIndex: sections.length - index,
            }}
          >
            <motion.div
              className="h-full w-full"
              style={{
                y: isLast ? 0 : "100%",
                opacity: scrollYProgress.get() >= startProgress && scrollYProgress.get() <= endProgress ? 1 : 0,
                transition: "transform 0.5s ease-out, opacity 0.3s ease-out",
                transform: `translateY(${
                  isLast
                    ? 0
                    : Math.max(
                        0,
                        Math.min(
                          100,
                          ((scrollYProgress.get() - startProgress) / (endProgress - startProgress)) * 100
                        )
                      )
                }%)`,
              }}
            >
              {section.content}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}; 