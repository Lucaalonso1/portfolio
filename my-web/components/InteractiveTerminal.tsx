import React, { useState, useEffect, useRef, ReactElement, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useLanguage } from '@/hooks/useLanguage';

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
  const { t } = useTranslation('common');
  const { currentLanguage } = useLanguage();
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

  const commands: Record<string, TerminalCommand> = useMemo(() => ({
    'help': {
      command: 'help',
      output: `${t('terminal.commands.help.title')}\n${t('terminal.commands.help.list')}`
    },
    'whoami': {
      command: 'whoami',
      output: `${t('terminal.commands.whoami.title')}${t('terminal.commands.whoami.content')}`
    },
    'ls': {
      command: 'ls',
      output: `${t('terminal.commands.ls.title')}\n${t('terminal.commands.ls.content')}`
    },
    'cat about.md': {
      command: 'cat about.md',
      output: `${t('terminal.commands.about.title')}${t('terminal.commands.about.content')}`
    },
    'skills': {
      command: 'skills',
      output: `${t('terminal.commands.skills.title')}${t('terminal.commands.skills.content')}`
    },
    'projects': {
      command: 'projects',
      output: `${t('terminal.commands.projects.title')}${t('terminal.commands.projects.content')}`
    },
    'contact': {
      command: 'contact',
      output: `${t('terminal.commands.contact.title')}${t('terminal.commands.contact.content')}`
    },
    'date': {
      command: 'date',
      output: new Date().toLocaleString(currentLanguage === 'en' ? 'en-US' : 'es-ES', {
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
      output: t('terminal.commands.github'),
      delay: 1000
    },
    'linkedin': {
      command: 'linkedin',
      output: t('terminal.commands.linkedin'),
      delay: 1000
    },
    'matrix': {
      command: 'matrix',
      output: t('terminal.commands.matrix'),
      delay: 500
    },
    'weather': {
      command: 'weather',
      output: `${t('terminal.commands.weather.title')}\n${t('terminal.commands.weather.content')}`
    },
    'fortune': {
      command: 'fortune',
      output: `${t('terminal.commands.fortune.title')}${t('terminal.commands.fortune.content')}`
    },
    'resume': {
      command: 'resume',
      output: t('terminal.commands.resume'),
      delay: 1000
    }
  }), [t, currentLanguage]);

  useEffect(() => {
    // Mensaje de bienvenida inicial
    const welcomeMessage = t('terminal.welcome');
    
    const welcomeLines = welcomeMessage.split('\n').map(line => ({
      type: 'output' as const,
      content: line,
      timestamp: new Date()
    }));

    setLines(welcomeLines);
    
    // No hacer focus automático para evitar scroll no deseado
    // El usuario puede hacer click en el terminal para activarlo
  }, [t]);

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
          content: t('terminal.commands.exit'),
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
              content: t('terminal.commands.resumeSuccess'),
              timestamp: new Date()
            }]);
          }, 1000);
        }
      } else if (trimmedInput) {
        setLines(prev => [...prev, {
          type: 'output',
          content: `${t('terminal.commands.notFound')} ${input}\n${t('terminal.commands.helpHint')}`,
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
