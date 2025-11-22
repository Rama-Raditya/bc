import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface LetterProps {
  onNext: () => void;
}

const Letter: React.FC<LetterProps> = ({ onNext }) => {
  const message = `Deear Liaa,

Selamat Ulang Tahun yang ke-18! 🎉

23 November 2025... Hari ini adalah hari yang sangat spesial. Selamat datang di fase dewasa, di mana dunia membuka lebih banyak petualangan untukmu.

Semoga di usiamu yang baru ini, kamu selalu dikelilingi kebahagiaan, cinta, dan tawa. Tetaplah menjadi Liaa yang ceria dan luar biasa.

Jangan lupa untuk terus scroll ya! 👇`;

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    // Faster typing speed for mobile users
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [message]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fff0f5]"
    >
      <motion.div 
        className="bg-white max-w-md w-full p-8 rounded-sm shadow-lg relative border border-gray-100 overflow-y-auto max-h-[80vh]"
        style={{ 
          backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)',
          backgroundSize: '100% 2em',
          boxShadow: '0 10px 30px -10px rgba(255, 182, 193, 0.5)'
        }}
      >
        <h1 className="handwritten text-4xl text-pink-500 mb-6 font-bold text-center">Untuk Liaa 💖</h1>
        <div className="font-serif text-gray-700 text-lg leading-8 whitespace-pre-wrap romantic text-2xl">
          {displayedText}
        </div>
        
        {displayedText.length >= message.length && (
           <div className="mt-8 w-full flex justify-center pb-4">
                <motion.button
                onClick={onNext}
                className="bg-pink-100 p-3 rounded-full shadow-md text-pink-500 hover:bg-pink-200 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ opacity: { duration: 0.5 }, y: { repeat: Infinity, duration: 1.5 } }}
                >
                    <ArrowDown />
                </motion.button>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Letter;