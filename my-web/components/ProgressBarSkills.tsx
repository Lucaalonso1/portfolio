import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 0-100
  color: string;
}

interface ProgressBarSkillsProps {
  skills: Skill[];
}

export const ProgressBarSkills: React.FC<ProgressBarSkillsProps> = ({ skills }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Icono */}
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl">
            {skill.icon}
          </div>
          
          {/* Nombre y barra de progreso */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
              <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${skill.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
