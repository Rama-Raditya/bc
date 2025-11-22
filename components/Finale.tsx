import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';
import { Camera, Star } from 'lucide-react';

const Finale: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showContent, setShowContent] = useState(false);

  // Ganti dengan foto Liaa dari Google Drive atau URL lain
  // Format Google Drive: https://drive.google.com/uc?id=FILE_ID
  const LIAA_PHOTO_URL = "/lia.jpg";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ['#FF1493', '#FFD700', '#00BFFF', '#FF4500', '#7FFF00', '#EE82EE'];

    const createFirework = (x: number, y: number) => {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        particles.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
          alpha: 1,
          life: Math.random() * 100 + 60
        });
      }
    };

    let animationId: number;
    let frame = 0;
    let fireworkFrameCounter = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame++;
      fireworkFrameCounter++;

      // Clear canvas with fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create random fireworks every 25 frames
      if (fireworkFrameCounter % 25 === 0 && frame < 300) {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.6
        );
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.velocity.y += 0.08; // gravity
        p.alpha -= 0.012;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();

        if (p.life <= 0 || p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
    };

    animate();
    
    // Show content after delay
    const contentTimer = setTimeout(() => setShowContent(true), 1500);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(contentTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-y-auto flex items-center justify-center">
      {/* Canvas for fireworks */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0" 
        style={{ display: 'block' }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 py-12 w-full">
        {/* Photo Card */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={showContent ? { scale: 1, rotate: -3, opacity: 1 } : { scale: 0, rotate: -180, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white p-3 pb-10 rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.3)] transform rotate-2 max-w-xs w-64 md:w-80"
        >
          <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4 border border-gray-200 rounded-sm">
            <img 
              src={LIAA_PHOTO_URL}
              alt="Birthday Girl Liaa" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.backgroundColor = '#f3f4f6';
              }}
            />
            <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
              <Camera className="w-4 h-4 text-pink-500" />
            </div>
          </div>
          <h2 className="handwritten text-3xl text-center text-gray-800">Liaa</h2>
          <p className="text-center text-gray-500 text-xs font-sans tracking-widest mt-1 uppercase">Nov 23 • 18 Years Old</p>
          
          <div className="absolute bottom-3 right-3">
            <Star className="text-yellow-400 fill-current w-5 h-5" />
          </div>
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 text-center text-white"
        >
          <h1 className="text-5xl md:text-6xl handwritten text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-lg leading-tight">
            Happy Birthday!
          </h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-200 font-light max-w-md mx-auto px-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            I Hope You Have a Wonderful Day. 💝
          </motion.p>
          
          <motion.p 
            className="mt-4 text-base md:text-lg text-pink-300 font-light max-w-md mx-auto px-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            23 November 2025 ✨
          </motion.p>

          {/* Button to restart or close */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 2.5, duration: 0.8 }}
            onClick={() => window.location.reload()}
            className="mt-10 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full text-white font-bold transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] transform hover:scale-105 active:scale-95"
          >
            RESTART
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Finale;