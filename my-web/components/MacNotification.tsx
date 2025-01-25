import { motion } from "framer-motion";
import Image from "next/image";

interface MacNotificationProps {
  title: string;
  message: string;
  icon: string;
  link?: string;
  delay: number;
  extended?: boolean;
}

export const MacNotification = ({ title, message, icon, link, delay, extended }: MacNotificationProps) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative ${link ? 'cursor-pointer hover:bg-black/50 transition-all' : ''}`}
      onClick={handleClick}
    >
      {/* Capa de fondo con menor borrosidad */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg" />
      
      {/* Contenido sin blur */}
      <div className="relative p-3">
        <div className="flex gap-2.5">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={icon}
              alt={title}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-[14px] text-white font-inter drop-shadow-sm">{title}</h3>
              <span className="text-xs text-gray-200 ml-2 font-inter drop-shadow-sm">ahora</span>
            </div>
            <p className={`text-[14px] text-gray-200 mt-0.5 ${extended ? 'leading-relaxed' : 'truncate'} font-inter drop-shadow-sm`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 