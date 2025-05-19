"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const typeText = () => {
      const currentWord = words[currentWordIndex].text;
      const typingSpeed = 15; // Ultra rápido: reducido de 30 a 15
      const deletingSpeed = 8; // Ultra rápido: reducido de 15 a 8
      const pauseTime = 300; // Ultra rápido: reducido de 700 a 300

      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          timeout = setTimeout(typeText, typingSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          timeout = setTimeout(typeText, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    if (isInView) {
      timeout = setTimeout(typeText, 100); // Ultra rápido: reducido de 300 a 100
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, isInView]);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2, // Ultra rápido: reducido de 0.3 a 0.2
          ease: "easeOut"
        }
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
    >
      <span className={words[currentWordIndex].className}>
        {currentText}
      </span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.3, // Ultra rápido: reducido de 0.5 a 0.3
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cursorClassName}
      >
        |
      </motion.span>
    </motion.div>
  );
}; 