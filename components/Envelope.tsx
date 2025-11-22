import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1000); // Wait for animation before changing stage
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
        className="relative cursor-pointer z-10 group"
        onClick={handleClick}
      >
        {/* Envelope Body */}
        <motion.div 
          className="w-80 h-52 bg-pink-400 rounded-lg shadow-2xl relative flex items-center justify-center overflow-hidden border-b-4 border-pink-500"
          animate={isOpen ? { y: 100, opacity: 0 } : {}}
        >
          {/* Flap */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[110px] border-l-transparent border-r-transparent border-t-pink-300 origin-top transform transition-transform duration-700 ease-in-out group-hover:scale-y-90"></div>
          
          {/* Seal */}
          <div className="absolute top-20 z-20 bg-red-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-red-600">
            <Heart className="text-white fill-current w-6 h-6" />
          </div>

          <div className="absolute bottom-4 text-white font-bold tracking-widest opacity-80 text-sm">
            BUKAA
          </div>
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 w-full text-center mt-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="text-pink-400 font-medium animate-pulse">Tap to open</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Envelope;