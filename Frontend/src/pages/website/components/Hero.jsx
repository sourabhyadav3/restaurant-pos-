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
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-dark/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-landing-primary/10 text-landing-primary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-landing-primary/20"
            >
              🚀 Fast Order & Best Quality
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6 text-white">
              Delicious Food <br />
              <span className="text-transparent bg-clip-text bg-gradient-premium">
                Delivered Fast
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Experience the finest gourmet cuisine with our lightning-fast order system. Fresh ingredients, expert chefs, and premium service.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-premium flex items-center group">
                Order Now
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center space-x-3 px-8 py-3 font-semibold text-white hover:text-landing-primary transition-colors">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center group">
                  <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
                </div>
                <span>Explore Menu</span>
              </button>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            {/* Animated Food Cards */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <img src={pizzaImg} alt="Featured Food" className="w-[80%] mx-auto rotate-12 drop-shadow-[0_35px_35px_rgba(255,77,77,0.3)] animate-float" />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-0 right-0 glass-card p-4 flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-landing-primary/20 rounded-xl flex items-center justify-center">
                <img src={burgerImg} alt="icon" className="w-8" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Fast Order</p>
                <p className="text-sm font-bold text-white">Lightning Service</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
              className="absolute bottom-10 left-0 glass-card p-4 flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-landing-secondary/20 rounded-xl flex items-center justify-center text-landing-secondary text-xl">
                ⭐
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Top Rated</p>
                <p className="text-sm font-bold text-white">4.9/5 Average</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
