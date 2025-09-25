import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface TerminalCommand {
  command: string;
  output: string | ReactElement;
  delay?: number;
}

interface TerminalLine {
  type: 'command' | 'output' | 'prompt';
  content: string | ReactElement;
  timestamp?: Date;
}

const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentUser] = useState('luca');
  const [currentHost] = useState('portfolio');
  const [currentDir] = useState('~/workspace');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: "-100px" });

  const commands: Record<string, TerminalCommand> = {
    'help': {
      command: 'help',
      output: `Comandos disponibles:
  whoami     - Información sobre mí
  ls         - Listar proyectos
  cat about.md - Leer mi biografía
  skills     - Ver mis habilidades técnicas
  projects   - Explorar mis proyectos
  contact    - Información de contacto
  clear      - Limpiar terminal
  date       - Fecha y hora actual
  echo       - Repetir mensaje
  github     - Abrir mi GitHub
  linkedin   - Abrir mi LinkedIn
  resume     - Descargar mi CV
  matrix     - Efecto Matrix
  weather    - Clima actual
  fortune    - Frase aleatoria motivacional
  exit       - Salir del terminal`
    },
    'whoami': {
      command: 'whoami',
      output: `luca-alonso-froeling

👋 ¡Hola! Soy Luca Alonso Froeling
🎓 Estudiante de 2º año de Ciencias de la Computación
💻 Desarrollador Full Stack apasionado
🚀 Especializado en React, Next.js, Python y más
🌍 Madrid, España
🎯 Buscando oportunidades para crecer profesionalmente`
    },
    'ls': {
      command: 'ls',
      output: `📁 Proyectos disponibles:
  📂 7indoorgolf/     - Sistema de reservas de golf
  📂 etg-website/     - Escuela técnica de golf
  📂 portfolio/       - Este portfolio (¡actual!)
  📂 university/      - Proyectos académicos
  📂 experiments/     - Laboratorio de ideas
  📂 open-source/     - Contribuciones a la comunidad`
    },
    'cat about.md': {
      command: 'cat about.md',
      output: `# Sobre Mí - Luca Alonso Froeling

## 🎯 Mi Historia
Soy un estudiante apasionado de Ciencias de la Computación con una 
fuerte base en desarrollo web moderno. Me encanta crear soluciones 
innovadoras y aprender nuevas tecnologías constantemente.

## 💼 Experiencia Profesional
- Desarrollador Full Stack en proyectos reales
- Especialista en React y Next.js
- Experiencia con APIs y bases de datos
- Trabajo con clientes reales y deadlines

## 🎓 Educación
- 2º año Ciencias de la Computación
- Cursos especializados en desarrollo web
- Certificaciones en tecnologías modernas

## 🌟 Pasiones
- Desarrollo de software innovador
- Aprendizaje continuo
- Contribuir a proyectos open source
- Resolver problemas complejos`
    },
    'skills': {
      command: 'skills',
      output: `🛠️  Mis Habilidades Técnicas:

Frontend:
  ⭐ React (95%)     ████████████████████
  ⭐ Next.js (90%)   ████████████████████
  ⭐ TypeScript (90%) ████████████████████
  ⭐ JavaScript (95%) ████████████████████
  ⭐ Tailwind CSS (90%) ████████████████████

Backend:
  ⭐ Node.js (85%)   ████████████████████
  ⭐ Python (90%)    ████████████████████
  ⭐ MongoDB (80%)   ████████████████████

Herramientas:
  ⭐ Git/GitHub (90%) ████████████████████
  ⭐ Figma (85%)     ████████████████████
  ⭐ Vercel (80%)    ████████████████████
  ⭐ Framer Motion (80%) ████████████████████`
    },
    'projects': {
      command: 'projects',
      output: `🚀 Mis Proyectos Destacados:

1. 7 Indoor Golf (https://7indoorgolf.com/)
   💻 Next.js + React + Tailwind CSS
   🎯 Sistema de reservas completo
   📱 Diseño responsivo y moderno

2. ETG - Escuela Técnica de Golf
   💻 React + Animaciones avanzadas
   🎯 Sitio web profesional
   📱 SEO optimizado

3. Este Portfolio
   💻 Next.js + TypeScript + Framer Motion
   🎯 Terminal interactivo (¡actual!)
   📱 Experiencia única de usuario`
    },
    'contact': {
      command: 'contact',
      output: `📧 Información de Contacto:

📧 Email: luca.alonso.froeling@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/luca-alonso-froeling-64a6a2306/
🐙 GitHub: https://github.com/Lucaalonso1
📍 Ubicación: Madrid, España
🌐 Disponible para: Trabajos remotos y presenciales

💡 ¿Quieres trabajar juntos? ¡Contáctame!`
    },
    'date': {
      command: 'date',
      output: new Date().toLocaleString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    'github': {
      command: 'github',
      output: '🔗 Abriendo GitHub...',
      delay: 1000
    },
    'linkedin': {
      command: 'linkedin',
      output: '🔗 Abriendo LinkedIn...',
      delay: 1000
    },
    'matrix': {
      command: 'matrix',
      output: '🌊 Iniciando efecto Matrix...',
      delay: 500
    },
    'weather': {
      command: 'weather',
      output: `🌤️  Clima en Madrid:
   Temperatura: 22°C
   Condición: Parcialmente nublado
   Humedad: 65%
   Viento: 10 km/h
   
   💡 Perfecto para programar ☕`
    },
    'fortune': {
      command: 'fortune',
      output: `🎲 Frase del día:
   
   "El código limpio siempre parece que fue escrito por alguien 
    que se preocupa." - Robert C. Martin
   
   💡 ¡Mantén tu código limpio y organizado!`
    },
    'resume': {
      command: 'resume',
      output: '📄 Descargando CV...',
      delay: 1000
    }
  };

  useEffect(() => {
    // Mensaje de bienvenida inicial
    const welcomeMessage = `¡Bienvenido al terminal de Luca Alonso! 🚀

Escribe 'help' para ver los comandos disponibles.
Escribe 'whoami' para conocerme mejor.

`;
    
    const welcomeLines = welcomeMessage.split('\n').map(line => ({
      type: 'output' as const,
      content: line,
      timestamp: new Date()
    }));

    setLines(welcomeLines);
    
    // No hacer focus automático para evitar scroll no deseado
    // El usuario puede hacer click en el terminal para activarlo
  }, []);

  useEffect(() => {
    // Auto scroll al final
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Hacer focus solo cuando el terminal esté visible
  useEffect(() => {
    if (isInView && inputRef.current) {
      // Pequeño delay para asegurar que la animación haya terminado
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500);
    }
  }, [isInView]);

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    
    // Agregar comando a la historia
    if (trimmedInput && !commandHistory.includes(trimmedInput)) {
      setCommandHistory(prev => [...prev, trimmedInput]);
    }

    // Agregar línea de comando
    setLines(prev => [...prev, {
      type: 'prompt',
      content: `${currentUser}@${currentHost}:${currentDir}$ ${input}`,
      timestamp: new Date()
    }]);

    setIsTyping(true);

    // Ejecutar comando
    setTimeout(() => {
      if (trimmedInput === 'clear') {
        setLines([]);
      } else if (trimmedInput === 'exit') {
        setLines(prev => [...prev, {
          type: 'output',
          content: '👋 ¡Hasta luego! Gracias por visitar mi portfolio.',
          timestamp: new Date()
        }]);
      } else if (trimmedInput.startsWith('echo ')) {
        const message = input.substring(5);
        setLines(prev => [...prev, {
          type: 'output',
          content: message,
          timestamp: new Date()
        }]);
      } else if (commands[trimmedInput]) {
        const cmd = commands[trimmedInput];
        
        setLines(prev => [...prev, {
          type: 'output',
          content: cmd.output,
          timestamp: new Date()
        }]);

        // Manejar comandos especiales
        if (trimmedInput === 'github') {
          setTimeout(() => window.open('https://github.com/Lucaalonso1', '_blank'), 1000);
        } else if (trimmedInput === 'linkedin') {
          setTimeout(() => window.open('https://www.linkedin.com/in/luca-alonso-froeling-64a6a2306/', '_blank'), 1000);
        } else if (trimmedInput === 'resume') {
          // Aquí podrías agregar la descarga del CV
          setTimeout(() => {
            setLines(prev => [...prev, {
              type: 'output',
              content: '📄 CV descargado exitosamente!',
              timestamp: new Date()
            }]);
          }, 1000);
        }
      } else if (trimmedInput) {
        setLines(prev => [...prev, {
          type: 'output',
          content: `❌ Comando no encontrado: ${input}
💡 Escribe 'help' para ver los comandos disponibles.`,
          timestamp: new Date()
        }]);
      }

      setIsTyping(false);
      
      // Restaurar el foco al input después de ejecutar el comando
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const getPromptColor = () => {
    return 'text-green-400';
  };

  const getOutputColor = (content: string | ReactElement) => {
    if (typeof content === 'string' && content.includes('❌')) {
      return 'text-red-400';
    }
    return 'text-gray-300';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm font-mono hidden sm:block">
            terminal@portfolio
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalRef}
          className="h-80 sm:h-96 overflow-y-auto overflow-x-hidden p-2 sm:p-4 font-mono text-xs sm:text-sm cursor-text"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <AnimatePresence>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-1 break-words overflow-wrap-anywhere"
              >
                {line.type === 'prompt' && (
                  <div className={`${getPromptColor()} text-xs sm:text-sm break-all`}>
                    {typeof line.content === 'string' ? (
                      <>
                        <span className="hidden sm:inline">{line.content}</span>
                        <span className="sm:hidden">{line.content.replace('luca@portfolio:~/workspace', 'luca@portfolio:~')}</span>
                      </>
                    ) : line.content}
                  </div>
                )}
                {line.type === 'output' && (
                  <div className={`${getOutputColor(line.content)} whitespace-pre-wrap text-xs sm:text-sm break-words`}>
                    {line.content}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current Input Line */}
          <div className="flex items-start sm:items-center">
            <span className={`${getPromptColor()} whitespace-nowrap text-xs sm:text-sm`}>
              <span className="hidden sm:inline">{currentUser}@{currentHost}:{currentDir}$</span>
              <span className="sm:hidden">luca@portfolio:~$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-gray-300 outline-none flex-1 ml-1 sm:ml-2 caret-green-400 text-xs sm:text-sm min-w-0"
              placeholder=""
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
            />
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-400 text-xs sm:text-sm"
              >
                |
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveTerminal;
