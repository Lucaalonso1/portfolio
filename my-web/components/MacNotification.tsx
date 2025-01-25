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
      className={`bg-black/40 backdrop-blur-md rounded-lg p-3 shadow-lg w-full max-w-md
        ${link ? 'cursor-pointer hover:bg-black/50 transition-all' : ''}`}
      onClick={handleClick}
    >
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
            <h3 className="font-medium text-[13px] text-white">{title}</h3>
            <span className="text-xs text-gray-400 ml-2">now</span>
          </div>
          <p className={`text-[13px] text-gray-300 mt-0.5 ${extended ? 'leading-relaxed' : 'truncate'}`}>
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 