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

  // NOTE FOR USER:
  // The link you provided is a webpage, not a direct image link.
  // To use your specific illustration:
  // 1. Download the image from: https://www.freepik.com/free-psd/3d-rendering-birthday-home-illustration_165584113.htm
  // 2. Save the downloaded file (e.g., 'liaa-cake.jpg') into your 'public' folder.
  // 3. Change the line below to: const CAKE_IMAGE_URL = "/liaa-cake.jpg";
  //
  // Currently using a high-quality 3D cake placeholder that matches the vibe:
  const CAKE_IMAGE_URL = "https://img.freepik.com/free-psd/3d-rendering-birthday-cake-isolated_23-2151147002.jpg";

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

      {/* Interactive Cake Image Container */}
      <div className="relative cursor-pointer transform hover:scale-105 transition-transform duration-300 select-none tap-highlight-transparent max-w-sm w-full aspect-square flex items-center justify-center" onClick={blowCandles}>
        
        {/* The 3D Cake Illustration */}
        <img 
          src={CAKE_IMAGE_URL} 
          alt="3D Birthday Cake" 
          className="w-full h-full object-contain drop-shadow-2xl z-0 relative rounded-xl"
        />

        {/* Interactive Overlay Flames - Positioned to look like they are on top of the cake */}
        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none z-10">
            {/* Central Flame Cluster */}
            {!candlesBlown && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4"
              >
                 {/* We create a cluster of flames since we don't know exact candle positions */}
                 <div className="relative">
                    <motion.div 
                      className="absolute -left-6 top-2 text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.9)]"
                      animate={{ scale: [1, 1.1, 0.9, 1], rotate: [-2, 2, -1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                       <Flame className="w-10 h-10 fill-orange-500 stroke-yellow-200" />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute left-0 -top-4 text-orange-500 drop-shadow-[0_0_15px_rgba(255,140,0,0.9)]"
                      animate={{ scale: [1.1, 1, 1.2, 1.1], rotate: [2, -2, 1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    >
                       <Flame className="w-12 h-12 fill-red-500 stroke-yellow-200" />
                    </motion.div>

                    <motion.div 
                      className="absolute left-6 top-2 text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.9)]"
                      animate={{ scale: [0.9, 1.1, 1, 0.9], rotate: [-1, 3, -2, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                       <Flame className="w-10 h-10 fill-orange-500 stroke-yellow-200" />
                    </motion.div>
                 </div>
              </motion.div>
            )}

            {/* Smoke Effect on Blow */}
            {candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -80, scale: 1.5 }}
                  transition={{ duration: 2 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-gray-300"
                >
                  <span className="text-4xl filter blur-[2px]">💨</span>
                </motion.div>
            )}
        </div>
      </div>

      {/* Wish Reveal Section */}
      <div className="min-h-[150px] w-full max-w-md mt-8 flex items-center justify-center px-4 pb-10">
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