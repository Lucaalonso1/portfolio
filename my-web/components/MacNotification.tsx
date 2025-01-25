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
      {/* Capa de fondo con blur */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-md rounded-lg" />
      
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
              <h3 className="font-medium text-[13px] text-white font-['SF_Pro_Text',-apple-system,BlinkMacSystemFont,system-ui]">{title}</h3>
              <span className="text-xs text-gray-400/90 ml-2 font-['SF_Pro_Text',-apple-system,BlinkMacSystemFont,system-ui]">now</span>
            </div>
            <p className={`text-[13px] text-gray-300 mt-0.5 ${extended ? 'leading-relaxed' : 'truncate'} font-['SF_Pro_Text',-apple-system,BlinkMacSystemFont,system-ui]`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 