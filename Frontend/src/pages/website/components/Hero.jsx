import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Play, ShoppingCart } from 'lucide-react';
import pizzaImg from '../../../assets/landing/pizza.png';
import burgerImg from '../../../assets/landing/burger.png';
import heroBg from '../../../assets/landing/hero-bg.png';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 lg:pt-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('/1000464403.jpg')` }}
      >
        <div className="absolute inset-0 bg-dark/85 lg:bg-gradient-to-r lg:from-dark lg:via-dark/90 lg:to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
<<<<<<< HEAD
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
=======
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-display leading-[0.9] mb-6 md:mb-8 text-white uppercase tracking-tighter">
              The Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-landing-primary to-landing-secondary italic">
                Experience
              </span>
            </h1>
            <p className="text-sm md:text-xl text-gray-400 mb-8 md:mb-10 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0">
              Transform your restaurant with our ultra-fast, QR-driven management suite. Premium UI, seamless ordering, and real-time analytics.
>>>>>>> 72e0472723fa663ac06ad33cce1f06777cb39915
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
              <a href="#reservation" className="w-full sm:w-auto btn-premium px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black group text-center">
                Book A Table
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform inline" />
              </a>
              <Link 
                to="/order"
                className="inline-flex items-center gap-3 bg-white border border-orange-200/50 px-6 py-4 rounded-full shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-105 transition-all duration-500 group"
              >
                <ShoppingCart size={18} className="text-orange-500" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-orange-500">Order Now — Pay Later or Online</span>
                <ChevronRight size={14} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <div className="relative mt-20 lg:mt-0">
            {/* Main Visual Container */}
            <div className="relative w-full aspect-square flex items-center justify-center">
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-landing-primary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />

<<<<<<< HEAD
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
=======
              {/* 1. Main Atmosphere Photo (Base) */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: 5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 w-[95%] lg:w-[90%] h-[95%] lg:h-[90%] rounded-[2rem] md:rounded-[4rem] overflow-hidden border-4 md:border-[16px] border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              >
                <img src="/1000464401.jpg" alt="Ambiance" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </motion.div>
>>>>>>> 72e0472723fa663ac06ad33cce1f06777cb39915

              {/* 2. Floating Accents */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 right-0 -mr-4 lg:-mr-10 z-20"
              >
                <div className="glass-card px-4 py-3 border-landing-primary/20 backdrop-blur-xl">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Gila House Ecosystem Active</span>
                   </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 left-0 -ml-4 lg:-ml-10 z-20"
              >
                <div className="glass-card px-4 py-3 border-white/10 backdrop-blur-xl">
                   <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Smart Hospitality</span>
                   </div>
                </div>
              </motion.div>

            </div>
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
