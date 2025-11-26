import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaLightbulb, FaRocket, FaClock, FaHeart } from 'react-icons/fa';
import { SiTypescript, SiReact, SiNextdotjs } from 'react-icons/si';

interface BentoItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradient: string;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  children?: React.ReactNode;
  delay?: number;
}

const BentoItem = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  size = 'medium',
  children,
  delay = 0 
}: BentoItemProps) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-1 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2',
    wide: 'col-span-1 md:col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`${sizeClasses[size]} group relative overflow-hidden rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer`}
      style={{
        background: gradient,
      }}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          {icon && (
            <motion.div 
              className="text-4xl mb-4 text-white/90"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-white/80 text-sm md:text-base">
            {description}
          </p>
        </div>
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
      
      {/* Efecto de brillo al hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

interface BentoGridProps {
  experienceYears: string;
  projectsCount: string;
  techStack: string;
  availability: string;
  passion: string;
  collaboration: string;
  mainFocus: string;
  learning: string;
}

export const BentoGrid = ({
  experienceYears,
  projectsCount,
  techStack,
  availability,
  passion,
  collaboration,
  mainFocus,
  learning
}: BentoGridProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
        {/* Tarjeta Grande - Stack Principal */}
        <BentoItem
          title={mainFocus}
          description={techStack}
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          size="large"
          delay={0}
          icon={<SiNextdotjs />}
        >
          <div className="flex gap-3 mt-4 flex-wrap">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"
            >
              <SiReact className="text-2xl text-white" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"
            >
              <SiTypescript className="text-2xl text-white" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"
            >
              <SiNextdotjs className="text-2xl text-white" />
            </motion.div>
          </div>
        </BentoItem>

        {/* Años de Experiencia */}
        <BentoItem
          title={experienceYears}
          description="Building amazing web experiences"
          gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          size="medium"
          delay={0.1}
          icon={<FaClock />}
        >
          <motion.div 
            className="text-5xl font-bold text-white mt-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            2+
          </motion.div>
        </BentoItem>

        {/* Proyectos Completados */}
        <BentoItem
          title={projectsCount}
          description="Successfully delivered projects"
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          size="medium"
          delay={0.2}
          icon={<FaRocket />}
        >
          <motion.div 
            className="text-5xl font-bold text-white mt-2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          >
            10+
          </motion.div>
        </BentoItem>

        {/* Disponibilidad */}
        <BentoItem
          title={availability}
          description="Open to new opportunities and collaborations"
          gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          size="wide"
          delay={0.3}
          icon={<FaLightbulb />}
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold text-white mt-2"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available Now
          </motion.div>
        </BentoItem>

        {/* Pasión por el Código */}
        <BentoItem
          title={passion}
          description="Creating beautiful, functional experiences"
          gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
          size="medium"
          delay={0.4}
          icon={<FaHeart />}
        />

        {/* Colaboración */}
        <BentoItem
          title={collaboration}
          description="Let's build something amazing together"
          gradient="linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
          size="medium"
          delay={0.5}
          icon={<FaGithub />}
        >
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-white/90 text-sm mt-2"
          >
            <span>View on GitHub</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </BentoItem>

        {/* Aprendizaje Continuo */}
        <BentoItem
          title={learning}
          description="Always exploring new technologies and best practices"
          gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
          size="wide"
          delay={0.6}
          icon={<FaCode />}
        >
          <div className="flex gap-2 mt-2 flex-wrap">
            {['AI', 'Web3', 'Cloud'].map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="px-3 py-1 bg-white/30 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </BentoItem>
      </div>
    </div>
  );
};

