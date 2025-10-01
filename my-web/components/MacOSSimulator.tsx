import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  zIndex: number;
  onFocus: () => void;
}

interface App {
  id: string;
  name: string;
  icon: string;
  component: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  zIndex,
  onFocus
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const size = { width: 800, height: 600 };
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      onFocus();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition(prev => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? '100vh' : size.height,
        zIndex: zIndex
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-8 bg-gray-100 flex items-center justify-between px-4 border-b border-gray-200"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          />
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
          />
          <button
            onClick={onMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Image src={icon} alt={title} width={16} height={16} />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        
        <div className="w-12" /> {/* Spacer */}
      </div>
      
      {/* Window Content */}
      <div className="h-full overflow-auto">
        {children}
      </div>
    </motion.div>
  );
};

const Dock: React.FC<{ apps: App[]; onAppClick: (app: App) => void; openApps: string[] }> = ({
  apps,
  onAppClick,
  openApps
}) => {
  return (
    <motion.div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 flex space-x-2 border border-white/30"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
    >
      {apps.map((app) => (
        <motion.button
          key={app.id}
          onClick={() => onAppClick(app)}
          className={`relative w-12 h-12 rounded-xl overflow-hidden transition-all duration-200 ${
            openApps.includes(app.id) ? 'bg-white/30' : 'hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src={app.icon} alt={app.name} width={48} height={48} className="object-cover" />
          {openApps.includes(app.id) && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

const MacOSSimulator: React.FC = () => {
  const [windows, setWindows] = useState<Array<{ id: string; app: App; isMaximized: boolean; zIndex: number }>>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps: App[] = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '/profile-icon.png',
      component: (
        <div className="p-8 h-full bg-gradient-to-br from-blue-50 to-indigo-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Luca Alonso Froeling</h1>
          <p className="text-lg text-gray-600 mb-6">Full Stack Developer</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Sobre mí</h3>
              <p className="text-gray-600">
                Desarrollador apasionado por crear experiencias web innovadoras y funcionales.
                Especializado en React, Next.js y tecnologías modernas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Contacto</h3>
              <div className="space-y-2">
                <p className="text-gray-600">📧 luca@example.com</p>
                <p className="text-gray-600">🔗 LinkedIn</p>
                <p className="text-gray-600">💻 GitHub</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '7indoorgolf',
      name: '7 Indoor Golf',
      icon: '/code-icon.png',
      component: (
        <div className="p-8 h-full bg-gradient-to-br from-green-50 to-emerald-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">7 Indoor Golf</h1>
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <video
              className="w-full h-64 object-cover rounded-lg mb-4"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/7indoorgolf.mp4" type="video/mp4" />
            </video>
            <h3 className="text-xl font-semibold mb-2">Características</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Sistema de reservas integrado</li>
              <li>• Diseño responsive y moderno</li>
              <li>• Integración con API de reservas</li>
              <li>• Optimización SEO completa</li>
            </ul>
          </div>
          <a 
            href="https://7indoorgolf.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Visitar Sitio Web
          </a>
        </div>
      )
    },
    {
      id: 'etg',
      name: 'Escuela Técnica de Golf',
      icon: '/code-icon.png',
      component: (
        <div className="p-8 h-full bg-gradient-to-br from-orange-50 to-red-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Escuela Técnica de Golf</h1>
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <div className="w-full h-64 relative rounded-lg mb-4 overflow-hidden">
              <Image 
                src="/etg.jpg" 
                alt="ETG" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Proyecto Destacado</h3>
            <p className="text-gray-600 mb-4">
              Sitio web moderno para escuela de golf con animaciones fluidas y diseño responsive.
              Implementado con React y optimizado para conversiones.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Responsive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">A+</div>
                <div className="text-sm text-gray-600">SEO Score</div>
              </div>
            </div>
          </div>
          <a 
            href="https://www.escuelatecnicadegolf.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Ver Proyecto
          </a>
        </div>
      )
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: '/window.svg',
      component: (
        <div className="h-full bg-black text-green-400 font-mono">
          <div className="p-4 h-full overflow-auto">
            <div className="mb-2">
              <span className="text-blue-400">luca@macbook</span>
              <span className="text-white">:</span>
              <span className="text-yellow-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-green-400">whoami</span>
            </div>
            <div className="mb-4">Luca Alonso Froeling - Full Stack Developer</div>
            
            <div className="mb-2">
              <span className="text-blue-400">luca@macbook</span>
              <span className="text-white">:</span>
              <span className="text-yellow-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-green-400">ls -la skills/</span>
            </div>
            <div className="mb-4">
              <div>drwxr-xr-x  javascript</div>
              <div>drwxr-xr-x  typescript</div>
              <div>drwxr-xr-x  react</div>
              <div>drwxr-xr-x  nextjs</div>
              <div>drwxr-xr-x  python</div>
              <div>drwxr-xr-x  nodejs</div>
              <div>drwxr-xr-x  mongodb</div>
            </div>

            <div className="mb-2">
              <span className="text-blue-400">luca@macbook</span>
              <span className="text-white">:</span>
              <span className="text-yellow-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-green-400">cat projects.json</span>
            </div>
            <div className="mb-4 text-cyan-400">
              {`{
  "current_projects": [
    "7indoorgolf.com",
    "escuelatecnicadegolf.com",
    "portfolio-website"
  ],
  "technologies": ["React", "Next.js", "TypeScript", "Tailwind"],
  "status": "actively_developing"
}`}
            </div>
          </div>
        </div>
      )
    }
  ];

  const openApp = (app: App) => {
    const existingWindow = windows.find(w => w.id === app.id);
    if (existingWindow) {
      // Focus existing window
      setWindows(prev => prev.map(w => 
        w.id === app.id 
          ? { ...w, zIndex: nextZIndex }
          : w
      ));
      setNextZIndex(prev => prev + 1);
    } else {
      // Open new window
      setWindows(prev => [...prev, {
        id: app.id,
        app,
        isMaximized: false,
        zIndex: nextZIndex
      }]);
      setNextZIndex(prev => prev + 1);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, zIndex: nextZIndex }
        : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-[url('/wallpaper.jpg')] bg-cover bg-center opacity-80" />
      
      {/* Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm z-50">
        <div className="flex items-center space-x-4">
          <div className="font-bold">🍎</div>
          <div>Portfolio</div>
        </div>
        <div className="flex items-center space-x-4">
          <div>{currentTime}</div>
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.app.name}
            icon={window.app.icon}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
          >
            {window.app.component}
          </Window>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <Dock 
        apps={apps} 
        onAppClick={openApp}
        openApps={windows.map(w => w.id)}
      />
    </div>
  );
};

export default MacOSSimulator;
