import { motion } from "framer-motion";
import Image from "next/image";

interface MacNotificationProps {
  title: string;
  message: string;
  icon: string;
  link?: string;
  delay: number;
}

export const MacNotification = ({ title, message, icon, link, delay }: MacNotificationProps) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white/80 backdrop-blur-md rounded-lg p-3 shadow-lg 
        ${link ? 'cursor-pointer hover:bg-white/90 transition-all' : ''}`}
      onClick={handleClick}
    >
      <div className="flex gap-2.5">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-sm text-gray-800">{title}</h3>
          <p className="text-xs text-gray-600 truncate">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}; 