import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateBirthdayWish } from '../utils/gemini';
import { Sparkles, Flame } from 'lucide-react';

interface CakeProps {
  onComplete: () => void;
}

const Cake: React.FC<CakeProps> = ({ onComplete }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishText, setWishText] = useState<string | null>(null);
  const [loadingWish, setLoadingWish] = useState(false);

  const blowCandles = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      loadWish();
    }
  };

  const loadWish = async () => {
    setLoadingWish(true);
    const wish = await generateBirthdayWish("Liaa", 18);
    setWishText(wish);
    setLoadingWish(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-start bg-pink-900 text-white p-4 relative overflow-y-auto"
    >
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-50"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
            />
         ))}
      </div>

      {/* Header */}
      <div className="z-10 text-center mt-8 mb-6">
        <h2 className="text-4xl md:text-5xl handwritten mb-3 text-pink-100">Make a Wish</h2>
        <p className="text-pink-200 text-sm md:text-base font-light">
          {candlesBlown ? "Semoga terkabul..." : "Ketuk kue untuk meniup lilin!"}
        </p>
      </div>

      {/* Interactive Cake SVG Container */}
      <div 
        className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300 select-none w-full flex justify-center z-20 mb-8"
        onClick={blowCandles}
        style={{ minHeight: '350px', maxWidth: '400px', margin: '0 auto' }}
      >
        <div className="relative w-64 h-80">
          <svg 
            viewBox="0 0 400 500" 
            className="w-full h-full drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cake Base Layer 1 (Bottom) */}
            <rect x="50" y="300" width="300" height="100" rx="15" fill="#8B4513" />
            <ellipse cx="200" cy="300" rx="150" ry="30" fill="#A0522D" />
            
            {/* Cake Base Layer 2 (Middle) */}
            <rect x="70" y="200" width="260" height="100" rx="15" fill="#D2691E" />
            <ellipse cx="200" cy="200" rx="130" ry="25" fill="#CD853F" />
            
            {/* Cake Top Layer */}
            <rect x="90" y="100" width="220" height="100" rx="15" fill="#8B4513" />
            <ellipse cx="200" cy="100" rx="110" ry="22" fill="#A0522D" />
            
            {/* Frosting Decorations */}
            <circle cx="150" cy="150" r="12" fill="#FFD700" opacity="0.8" />
            <circle cx="200" cy="130" r="12" fill="#FFD700" opacity="0.8" />
            <circle cx="250" cy="150" r="12" fill="#FFD700" opacity="0.8" />
            
            {/* Candles - Sticks */}
            <line x1="140" y1="80" x2="140" y2="20" stroke="#DAA520" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="75" x2="200" y2="10" stroke="#DAA520" strokeWidth="8" strokeLinecap="round" />
            <line x1="260" y1="80" x2="260" y2="20" stroke="#DAA520" strokeWidth="8" strokeLinecap="round" />
            
            {/* Shine Effect */}
            <ellipse cx="180" cy="140" rx="40" ry="20" fill="white" opacity="0.1" />
          </svg>

          {/* Interactive Overlay Flames - Positioned outside SVG */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-start justify-center pt-2">
            {!candlesBlown && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full flex items-start justify-center"
              >
                {/* Left Candle Flame */}
                <motion.div 
                  className="absolute text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.95)]"
                  style={{ left: '15%', top: '5%' }}
                  animate={{ scale: [1, 1.2, 0.95, 1], rotate: [-3, 3, -2, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Flame className="w-10 h-10 fill-orange-500 stroke-yellow-300" />
                </motion.div>
                
                {/* Center Candle Flame */}
                <motion.div 
                  className="text-orange-500 drop-shadow-[0_0_25px_rgba(255,140,0,0.95)]"
                  style={{ top: '2%' }}
                  animate={{ scale: [1.1, 1, 1.3, 1.1], rotate: [2, -2, 1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  <Flame className="w-12 h-12 fill-red-500 stroke-yellow-300" />
                </motion.div>

                {/* Right Candle Flame */}
                <motion.div 
                  className="absolute text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.95)]"
                  style={{ right: '15%', top: '5%' }}
                  animate={{ scale: [0.95, 1.15, 1, 0.95], rotate: [-2, 3, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Flame className="w-10 h-10 fill-orange-500 stroke-yellow-300" />
                </motion.div>
              </motion.div>
            )}

            {/* Smoke Effect on Blow */}
            {candlesBlown && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: -80, scale: 2 }}
                transition={{ duration: 2.5 }}
                className="text-gray-200 pt-4"
              >
                <span className="text-5xl filter blur-sm">💨</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Wish Reveal Section */}
      <div className="w-full max-w-md px-4 mb-10 z-20">
        {candlesBlown && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center border border-pink-500/30 w-full shadow-xl"
            >
                {loadingWish ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-pink-200">
                        <Sparkles className="animate-spin w-6 h-6" />
                        <span className="text-sm tracking-wider">Sedang merangkai doa...</span>
                    </div>
                ) : (
                    <>
                        <h3 className="text-pink-200 font-semibold mb-4 text-sm uppercase tracking-widest">Doa & Harapan</h3>
                        <p className="font-serif text-base md:text-lg italic mb-8 text-white leading-relaxed">
                            "{wishText}"
                        </p>
                        <button 
                            onClick={onComplete}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full text-white font-bold transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] transform hover:scale-105 active:scale-95 w-full"
                        >
                            NEXT! 🎆
                        </button>
                    </>
                )}
            </motion.div>
        )}
      </div>

      {/* Spacing for scroll */}
      <div className="h-10"></div>
    </motion.div>
  );
};

export default Cake;