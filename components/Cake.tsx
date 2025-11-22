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
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-pink-900 via-purple-900 to-pink-900 text-white p-4 relative overflow-y-auto"
    >
      {/* Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            />
         ))}
      </div>

      {/* Header */}
      <div className="z-10 text-center mt-8 mb-8 relative">
        <h2 className="text-4xl md:text-5xl handwritten mb-3 text-pink-100">Make a Wish</h2>
        <p className="text-pink-200 text-sm md:text-base font-light">
          {candlesBlown ? "Semoga terkabul..." : "Ketuk kue untuk meniup lilin!"}
        </p>
      </div>

      {/* Interactive Cake SVG Container */}
      <div 
        className="relative cursor-pointer transform hover:scale-110 transition-transform duration-300 select-none w-full flex justify-center z-20 mb-8"
        onClick={blowCandles}
        style={{ minHeight: '400px', maxWidth: '450px', margin: '0 auto' }}
      >
        <div className="relative w-80 h-96">
          <svg 
            viewBox="0 0 400 550" 
            className="w-full h-full drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bottom Cake Layer - Chocolate */}
            <defs>
              <linearGradient id="cakeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#654321', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="frosting1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#D4A76A', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#C19A6B', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="cakeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#A0522D', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
              </linearGradient>
              <radialGradient id="shine" cx="35%" cy="35%">
                <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
              </radialGradient>
            </defs>

            {/* Layer 3 - Bottom (Chocolate) */}
            <g>
              <rect x="30" y="350" width="340" height="130" rx="20" fill="url(#cakeGradient1)" />
              <ellipse cx="200" cy="350" rx="170" ry="35" fill="url(#frosting1)" />
              <path d="M 40 365 Q 50 360 60 365" stroke="#E8D4C4" strokeWidth="3" fill="none" />
              <path d="M 100 365 Q 110 360 120 365" stroke="#E8D4C4" strokeWidth="3" fill="none" />
              <path d="M 160 365 Q 170 360 180 365" stroke="#E8D4C4" strokeWidth="3" fill="none" />
              <path d="M 220 365 Q 230 360 240 365" stroke="#E8D4C4" strokeWidth="3" fill="none" />
              <path d="M 280 365 Q 290 360 300 365" stroke="#E8D4C4" strokeWidth="3" fill="none" />
              <path d="M 340 365 Q 350 360 360 365" stroke="#E8D4C4" strokeWidth="3" fill="none" />
            </g>

            {/* Layer 2 - Middle (Different Chocolate) */}
            <g>
              <rect x="55" y="250" width="290" height="100" rx="18" fill="url(#cakeGradient2)" />
              <ellipse cx="200" cy="250" rx="145" ry="30" fill="url(#frosting1)" />
              <path d="M 70 260 Q 80 255 90 260" stroke="#E8D4C4" strokeWidth="2.5" fill="none" />
              <path d="M 130 260 Q 140 255 150 260" stroke="#E8D4C4" strokeWidth="2.5" fill="none" />
              <path d="M 190 260 Q 200 255 210 260" stroke="#E8D4C4" strokeWidth="2.5" fill="none" />
              <path d="M 250 260 Q 260 255 270 260" stroke="#E8D4C4" strokeWidth="2.5" fill="none" />
              <path d="M 310 260 Q 320 255 330 260" stroke="#E8D4C4" strokeWidth="2.5" fill="none" />
            </g>

            {/* Layer 1 - Top (Light Chocolate) */}
            <g>
              <rect x="80" y="160" width="240" height="90" rx="16" fill="url(#cakeGradient1)" />
              <ellipse cx="200" cy="160" rx="120" ry="28" fill="url(#frosting1)" />
              <path d="M 100 168 Q 110 163 120 168" stroke="#E8D4C4" strokeWidth="2" fill="none" />
              <path d="M 155 168 Q 165 163 175 168" stroke="#E8D4C4" strokeWidth="2" fill="none" />
              <path d="M 210 168 Q 220 163 230 168" stroke="#E8D4C4" strokeWidth="2" fill="none" />
              <path d="M 265 168 Q 275 163 285 168" stroke="#E8D4C4" strokeWidth="2" fill="none" />
            </g>

            {/* Decorative Berries/Gems on top */}
            <circle cx="110" cy="155" r="7" fill="#DC143C" />
            <circle cx="160" cy="150" r="6" fill="#FF1493" />
            <circle cx="200" cy="148" r="8" fill="#DC143C" />
            <circle cx="240" cy="150" r="6" fill="#FF1493" />
            <circle cx="290" cy="155" r="7" fill="#DC143C" />

            {/* Gold decorative elements */}
            <circle cx="75" cy="250" r="5" fill="#FFD700" opacity="0.7" />
            <circle cx="325" cy="250" r="5" fill="#FFD700" opacity="0.7" />
            <circle cx="70" cy="350" r="4" fill="#FFD700" opacity="0.6" />
            <circle cx="330" cy="350" r="4" fill="#FFD700" opacity="0.6" />

            {/* Shine/Gloss Effect */}
            <ellipse cx="150" cy="180" rx="60" ry="20" fill="url(#shine)" />
            <ellipse cx="180" cy="270" rx="50" ry="15" fill="url(#shine)" opacity="0.3" />

            {/* Candle Sticks - Thicker and more visible */}
            <line x1="130" y1="130" x2="130" y2="30" stroke="#DAA520" strokeWidth="6" strokeLinecap="round" />
            <line x1="200" y1="125" x2="200" y2="15" stroke="#DAA520" strokeWidth="6" strokeLinecap="round" />
            <line x1="270" y1="130" x2="270" y2="30" stroke="#DAA520" strokeWidth="6" strokeLinecap="round" />

            {/* Candle flame guides (decorative) */}
            <circle cx="130" cy="28" r="4" fill="#FFD700" opacity="0.3" />
            <circle cx="200" cy="13" r="4" fill="#FFD700" opacity="0.3" />
            <circle cx="270" cy="28" r="4" fill="#FFD700" opacity="0.3" />
          </svg>

          {/* Interactive Overlay Flames */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-start justify-center">
            {!candlesBlown && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full flex items-start justify-center pt-2"
              >
                {/* Left Candle Flame */}
                <motion.div 
                  className="absolute text-orange-400 drop-shadow-[0_0_25px_rgba(255,165,0,1)]"
                  style={{ left: '25%' }}
                  animate={{ scale: [0.95, 1.25, 1, 0.95], rotate: [-4, 4, -2, 0], y: [0, -5, 0, -2] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                >
                  <Flame className="w-12 h-12 fill-orange-500 stroke-yellow-300 stroke-2" />
                </motion.div>
                
                {/* Center Candle Flame - Biggest */}
                <motion.div 
                  className="text-orange-600 drop-shadow-[0_0_30px_rgba(255,140,0,1)]"
                  animate={{ scale: [1, 1.3, 0.9, 1.1], rotate: [3, -3, 2, -1], y: [0, -8, 2, -3] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Flame className="w-16 h-16 fill-red-500 stroke-yellow-300 stroke-2" />
                </motion.div>

                {/* Right Candle Flame */}
                <motion.div 
                  className="absolute text-orange-400 drop-shadow-[0_0_25px_rgba(255,165,0,1)]"
                  style={{ right: '25%' }}
                  animate={{ scale: [1.05, 1.2, 0.95, 1.05], rotate: [2, -4, 3, -1], y: [0, -6, 1, -2] }}
                  transition={{ duration: 0.75, repeat: Infinity }}
                >
                  <Flame className="w-12 h-12 fill-orange-500 stroke-yellow-300 stroke-2" />
                </motion.div>
              </motion.div>
            )}

            {/* Smoke Effect on Blow */}
            {candlesBlown && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.7, 0], y: -120, scale: 3 }}
                transition={{ duration: 2.8 }}
                className="text-gray-300 pt-4"
              >
                <span className="text-6xl filter blur-sm">💨</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Wish Reveal Section */}
      <div className="w-full max-w-md px-4 mb-10 z-20 relative">
        {candlesBlown && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl text-center border-2 border-pink-400/50 w-full shadow-2xl"
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
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 rounded-full text-white font-bold transition-all shadow-[0_0_30px_rgba(236,72,153,0.6)] transform hover:scale-110 active:scale-95 w-full text-lg"
                        >
                            Lihat Kejutan Terakhir! 🎆
                        </button>
                    </>
                )}
            </motion.div>
        )}
      </div>

      {/* Spacing for scroll */}
      <div className="h-10 relative"></div>
    </motion.div>
  );
};

export default Cake;