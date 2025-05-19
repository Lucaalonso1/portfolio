import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 0-100
  color: string;
}

interface AnimatedRadarSkillsProps {
  skills: Skill[];
}

const RADIUS = 280;
const CENTER = 320;
const LEVEL_RADIUS = (level: number) => (RADIUS * level) / 100;

export const AnimatedRadarSkills: React.FC<AnimatedRadarSkillsProps> = ({ skills }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [popupHovered, setPopupHovered] = useState<number | null>(null);
  const total = skills.length;

  // Calcula los puntos del polígono
  const getPoints = (levels: number[]) => {
    return levels.map((level, i) => {
      const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
      const r = LEVEL_RADIUS(level);
      const x = CENTER + r * Math.cos(angle);
      const y = CENTER + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-[640px] h-[640px]">
        <svg width={640} height={640} className="block mx-auto">
          {/* Líneas radiales */}
          {skills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
            const x = CENTER + RADIUS * Math.cos(angle);
            const y = CENTER + RADIUS * Math.sin(angle);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={2}
              />
            );
          })}
          {/* Círculos de referencia */}
          {[0.33, 0.66, 1].map((f, idx) => (
            <circle
              key={idx}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS * f}
              fill="none"
              stroke="#e5e7eb"
              strokeDasharray="8 8"
              strokeWidth={2}
            />
          ))}
          {/* Polígono animado */}
          <motion.polygon
            points={getPoints(skills.map(s => s.level))}
            fill="#38bdf833"
            stroke="#38bdf8"
            strokeWidth={6}
            initial={{ points: getPoints(skills.map(() => 0)) }}
            animate={{ points: getPoints(skills.map(s => s.level)) }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Puntos de cada skill (solo icono) */}
          {skills.map((skill, i) => {
            const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
            const r = LEVEL_RADIUS(skill.level);
            const x = CENTER + r * Math.cos(angle);
            const y = CENTER + r * Math.sin(angle);
            // Si es el primer icono (React), mostrar el popup debajo
            const isReact = i === 0 && skill.name.toLowerCase().includes('react');
            const isNext = skill.name.toLowerCase().includes('next');
            const tooltipY = isReact ? y + 40 : Math.max(0, y - 120);
            // Mostrar el popup si hovered o (para Next.js) si el mouse está sobre el popup
            const showPopup = hovered === i || (isNext && popupHovered === i);
            return (
              <g key={skill.name}>
                <foreignObject
                  x={x - 32}
                  y={y - 32}
                  width={64}
                  height={64}
                  style={{ pointerEvents: 'auto' }}
                >
                  <div
                    className="flex items-center justify-center w-16 h-16 cursor-pointer"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => {
                      // Si es Next.js, solo cerrar si tampoco está el mouse en el popup
                      if (!isNext || popupHovered !== i) setHovered(null);
                    }}
                  >
                    {skill.icon}
                  </div>
                </foreignObject>
                {/* Tooltip animado con AnimatePresence */}
                <AnimatePresence>
                  {showPopup && (
                    <foreignObject
                      x={x - 120}
                      y={tooltipY}
                      width={240}
                      height={90}
                    >
                      <motion.div
                        className="bg-white shadow-lg rounded-xl px-6 py-5 text-center text-xl font-semibold text-gray-800 border border-gray-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        // Solo para Next.js: mantener abierto si el mouse está sobre el popup
                        onMouseEnter={() => { if (isNext) setPopupHovered(i); }}
                        onMouseLeave={() => {
                          if (isNext) {
                            setPopupHovered(null);
                            setHovered(null);
                          }
                        }}
                      >
                        <div className="flex items-center justify-center mb-2 text-4xl">{skill.icon}</div>
                        <div>{skill.name}</div>
                        <div className="text-base text-gray-400">Nivel: {skill.level}%</div>
                      </motion.div>
                    </foreignObject>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </svg>
        {/* Nombres alrededor */}
        {skills.map((skill, i) => {
          const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
          const x = CENTER + (RADIUS + 70) * Math.cos(angle);
          const y = CENTER + (RADIUS + 70) * Math.sin(angle);
          return (
            <motion.div
              key={skill.name + '-label'}
              className="absolute text-xl font-semibold text-gray-700 select-none"
              style={{
                left: x,
                top: y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              viewport={{ once: true }}
            >
              {skill.name}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}; 