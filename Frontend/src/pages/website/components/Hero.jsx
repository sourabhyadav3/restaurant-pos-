import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import pizzaImg from '../../../assets/landing/pizza.png';
import burgerImg from '../../../assets/landing/burger.png';
import heroBg from '../../../assets/landing/hero-bg.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('/1000464403.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl mb-8 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-landing-primary animate-pulse" />
              <span className="text-sm font-black uppercase tracking-widest text-gray-300">Next-Gen POS Ecosystem</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black font-display leading-[0.9] mb-8 text-white uppercase tracking-tighter">
              The Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-landing-primary to-landing-secondary italic">
                Experience
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0">
              Transform your restaurant with our ultra-fast, QR-driven management suite. Premium UI, seamless ordering, and real-time analytics.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <button className="btn-premium px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-black group">
                Get Started Now
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center space-x-4 px-6 py-4 font-black uppercase text-[10px] tracking-widest text-white hover:text-landing-primary transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-landing-primary transition-all">
                  <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>

          <div className="relative">
            {/* Main Featured Photo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="rounded-[3rem] overflow-hidden border-[12px] border-white/5 shadow-[0_50px_100px_-20px_rgba(255,77,77,0.3)]">
                <img src="/1000464401.jpg" alt="Dining Experience" className="w-full h-[600px] object-cover scale-110 hover:scale-100 transition-all duration-[3s]" />
              </div>
            </motion.div>

            {/* Floating QR 1 */}
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-12 -right-6 lg:-right-12 glass-card p-4 shadow-2xl z-20 border-landing-primary/20"
            >
              <div className="bg-white p-2 rounded-2xl">
                 <img src="/Immagine 2026-04-16 042531.png" alt="Smart QR" className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl object-contain" />
              </div>
              <p className="text-[9px] font-black text-center mt-3 uppercase tracking-widest text-landing-primary">Scan to Order</p>
            </motion.div>

            {/* Floating QR 2 */}
            <motion.div
              animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 lg:-left-12 glass-card p-4 shadow-2xl z-20 border-white/10"
            >
              <div className="bg-white p-2 rounded-2xl">
                 <img src="/Immagine 2026-04-16 042508.png" alt="Smart Payment" className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-contain" />
              </div>
              <p className="text-[8px] font-black text-center mt-2 uppercase tracking-widest text-gray-400">Easy Checkout</p>
            </motion.div>

            {/* Smart Poster Element */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute top-1/2 -right-4 lg:-right-20 -translate-y-1/2 glass-card p-3 shadow-2xl z-20 overflow-hidden group"
            >
              <img src="/Modern Black and White Wifi Poster (2).jpg" alt="Wifi Poster" className="w-20 lg:w-28 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-landing-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </section>
  );
};

export default Hero;
