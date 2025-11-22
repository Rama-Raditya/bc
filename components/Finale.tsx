import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';
import { Camera, Star } from 'lucide-react';

const Finale: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showContent, setShowContent] = useState(false);

  // Placeholder image - In a real app, the user would replace this URL with Liaa's photo
  const LIAA_PHOTO_URL = "https://picsum.photos/seed/liaa/400/400"; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    // Vibrant colors for fireworks
    const colors = ['#FF1493', '#FFD700', '#00BFFF', '#FF4500', '#7FFF00', '#EE82EE'];

    const createFirework = (x: number, y: number) => {
      const particleCount = 120;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
          alpha: 1,
          life: Math.random() * 80 + 40
        });
      }
    };

    let animationId: number;
    let frame = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame++;

      // Clear canvas with fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create random fireworks
      if (frame % 30 === 0) {
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
        p.velocity.y += 0.06; // gravity
        p.alpha -= 0.015;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        if (p.life <= 0 || p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
    };

    animate();
    setTimeout(() => setShowContent(true), 1500);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={showContent ? { scale: 1, rotate: -3 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-white p-3 pb-10 rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.3)] transform rotate-2 max-w-xs w-64 md:w-80"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                <img 
                    src={LIAA_PHOTO_URL} 
                    alt="Birthday Girl Liaa" 
                    className="w-full h-full object-cover"
                />
                 <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                     <Camera className="w-4 h-4 text-pink-500" />
                 </div>
            </div>
            <h2 className="handwritten text-4xl text-center text-gray-800">Liaa</h2>
            <p className="text-center text-gray-500 text-xs font-sans tracking-widest mt-1 uppercase">Nov 22 • 18 Years Old</p>
            
            <div className="absolute bottom-3 right-3">
                 <Star className="text-yellow-400 fill-current w-5 h-5" />
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 text-center text-white z-20"
        >
            <h1 className="text-5xl md:text-6xl handwritten text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-lg leading-tight">
                Selamat Ulang Tahun!
            </h1>
            <motion.p 
                className="mt-4 text-lg md:text-xl text-gray-200 font-light max-w-md mx-auto px-4"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                Semoga harimu seindah senyumanmu.
            </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Finale;