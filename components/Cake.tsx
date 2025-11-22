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
      className="min-h-screen flex flex-col items-center justify-center bg-pink-900 text-white p-4 relative overflow-hidden"
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

      <div className="z-10 text-center mb-8 mt-10">
        <h2 className="text-3xl md:text-5xl handwritten mb-4 text-pink-100">Make a Wish</h2>
        <p className="text-pink-200 text-sm md:text-base font-light">
          {candlesBlown ? "Semoga terkabul..." : "Ketuk kue untuk meniup lilin!"}
        </p>
      </div>

      {/* Interactive Cake SVG Container */}
      <div 
        className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300 select-none w-full max-w-sm z-20"
        onClick={blowCandles}
      >
        <svg 
          viewBox="0 0 400 500" 
          className="w-full h-auto drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cake Base Layer 1 */}
          <rect x="50" y="300" width="300" height="80" rx="15" fill="#D4A574" />
          <ellipse cx="200" cy="300" rx="150" ry="25" fill="#E8C4A0" />
          
          {/* Cake Base Layer 2 */}
          <rect x="70" y="220" width="260" height="80" rx="15" fill="#C9956D" />
          <ellipse cx="200" cy="220" rx="130" ry="20" fill="#DDB896" />
          
          {/* Cake Top Layer */}
          <rect x="90" y="140" width="220" height="80" rx="15" fill="#D4A574" />
          <ellipse cx="200" cy="140" rx="110" ry="18" fill="#E8C4A0" />
          
          {/* Cake Frosting Swirls */}
          <path d="M 100 200 Q 120 180 140 200" stroke="#F4D4B0" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 260 200 Q 280 180 300 200" stroke="#F4D4B0" strokeWidth="8" fill="none" strokeLinecap="round" />
          
          {/* Candles - Stick */}
          <line x1="140" y1="100" x2="140" y2="50" stroke="#DAA520" strokeWidth="6" />
          <line x1="200" y1="95" x2="200" y2="30" stroke="#DAA520" strokeWidth="6" />
          <line x1="260" y1="100" x2="260" y2="50" stroke="#DAA520" strokeWidth="6" />
          
          {/* Decorative Elements - Berries/Cherries */}
          <circle cx="120" cy="180" r="8" fill="#DC143C" />
          <circle cx="280" cy="180" r="8" fill="#DC143C" />
          <circle cx="200" cy="170" r="8" fill="#DC143C" />
          
          {/* Shine Effect */}
          <ellipse cx="180" cy="160" rx="30" ry="15" fill="white" opacity="0.15" />
        </svg>

        {/* Interactive Overlay Flames */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center" style={{ top: '-80px' }}>
          {!candlesBlown && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full flex items-start justify-center pt-12"
            >
              {/* Left Candle Flame */}
              <motion.div 
                className="absolute text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.95)]"
                style={{ left: '25%' }}
                animate={{ scale: [1, 1.2, 0.95, 1], rotate: [-3, 3, -2, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <Flame className="w-12 h-12 fill-orange-500 stroke-yellow-300" />
              </motion.div>
              
              {/* Center Candle Flame */}
              <motion.div 
                className="text-orange-500 drop-shadow-[0_0_25px_rgba(255,140,0,0.95)]"
                animate={{ scale: [1.1, 1, 1.3, 1.1], rotate: [2, -2, 1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              >
                <Flame className="w-14 h-14 fill-red-500 stroke-yellow-300" />
              </motion.div>

              {/* Right Candle Flame */}
              <motion.div 
                className="absolute text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.95)]"
                style={{ right: '25%' }}
                animate={{ scale: [0.95, 1.15, 1, 0.95], rotate: [-2, 3, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Flame className="w-12 h-12 fill-orange-500 stroke-yellow-300" />
              </motion.div>
            </motion.div>
          )}

          {/* Smoke Effect on Blow */}
          {candlesBlown && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.6, 0], y: -100, scale: 2 }}
              transition={{ duration: 2.5 }}
              className="text-gray-200"
            >
              <span className="text-5xl filter blur-sm">💨</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Wish Reveal Section */}
      <div className="min-h-[150px] w-full max-w-md mt-12 flex items-center justify-center px-4 pb-10">
        {candlesBlown && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center border border-pink-500/30 w-full shadow-xl"
            >
                {loadingWish ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-pink-200">
                        <Sparkles className="animate-spin w-6 h-6" />
                        <span className="text-sm tracking-wider">Sedang merangkai doa...</span>
                    </div>
                ) : (
                    <>
                        <h3 className="text-pink-200 font-semibold mb-2 text-sm uppercase tracking-widest">Doa & Harapan</h3>
                        <p className="font-serif text-lg md:text-xl italic mb-6 text-white leading-relaxed">
                            "{wishText}"
                        </p>
                        <button 
                            onClick={onComplete}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full text-white font-bold transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] transform hover:scale-105 active:scale-95"
                        >
                            Lihat Kejutan Terakhir! 🎆
                        </button>
                    </>
                )}
            </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Cake;