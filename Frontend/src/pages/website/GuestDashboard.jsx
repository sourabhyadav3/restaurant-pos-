import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  MapPin, 
  Utensils, 
  Wine, 
  Compass, 
  Car, 
  MessageSquare, 
  Receipt, 
  ChefHat,
  GlassWater
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GuestDashboard = () => {
  const services = [
    { icon: Utensils, title: 'Restaurant', desc: 'Breakfast, Lunch & Dinner', color: 'text-orange-500', bg: 'bg-orange-50', link: '/guest-menu' },
    { icon: Wine, title: 'Bar & Drinks', desc: 'Cocktails & Beverages', color: 'text-purple-500', bg: 'bg-purple-50', link: '/guest-menu' },
    { icon: Compass, title: 'Excursions', desc: 'Adventures & Activities', color: 'text-emerald-500', bg: 'bg-emerald-50', link: '/excursions' },
    { icon: Car, title: 'Transport', desc: 'Transfers & Hire', color: 'text-blue-500', bg: 'bg-blue-50', link: '/transport' },
    { icon: MessageSquare, title: 'Reception', desc: 'Ask for anything', color: 'text-teal-500', bg: 'bg-teal-50', link: '/request-chat' },
    { icon: Receipt, title: 'My Bill', desc: 'View & pay charges', color: 'text-amber-600', bg: 'bg-amber-50', link: '/my-bill' },
  ];

  return (
    <div className="min-h-screen bg-[#e0f7f3]/50 font-sans pb-20">
      {/* Top Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <img src="/1000464407-removebg-preview.png" alt="Logo" className="w-5 h-auto brightness-0 invert" />
          </div>
          <span className="text-lg font-black uppercase tracking-tighter text-slate-800">Gila House</span>
        </div>

        {/* Welcome Toast - Floating Style */}
        <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-md shadow-gray-100">
          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">
             ✓
          </div>
          <span className="text-[10px] font-bold text-slate-600 tracking-tight">Welcome, MANUEL! 🎉</span>
        </div>

        <button className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-gray-100 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6">
        {/* Greeting Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-[2rem] p-6 text-white shadow-xl shadow-orange-100 mb-6 overflow-hidden relative"
        >
          <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Thursday 7 May</p>
          <h2 className="text-2xl font-black mb-4 tracking-tight leading-tight">Good morning, MANUEL!</h2>
          
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg">
            <MapPin size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">Asmara</span>
          </div>
        </motion.div>

        {/* Quick Order Section */}
        <section className="mb-8">
          <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Quick Order</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/guest-menu" className="bg-orange-50/60 hover:bg-orange-50 transition-colors rounded-[1.5rem] p-5 flex flex-col items-center text-center border border-orange-100/30">
              <div className="w-11 h-11 bg-orange-400 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-orange-200">
                <ChefHat size={22} />
              </div>
              <span className="text-[13px] font-black text-slate-800 mb-0.5">Order to Room</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Full menu</span>
            </Link>

            <Link to="/guest-menu" className="bg-purple-50/60 hover:bg-purple-50 transition-colors rounded-[1.5rem] p-5 flex flex-col items-center text-center border border-purple-100/30">
              <div className="w-11 h-11 bg-purple-500 rounded-xl flex items-center justify-center text-white mb-3 shadow-md shadow-purple-200">
                <GlassWater size={22} />
              </div>
              <span className="text-[13px] font-black text-slate-800 mb-0.5">Bar Drinks</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Cocktails & more</span>
            </Link>
          </div>
        </section>

        {/* Our Services Grid */}
        <section>
          <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Our Services</h3>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={service.link} className="bg-white hover:shadow-lg hover:shadow-teal-900/5 transition-all rounded-[1.5rem] p-4 flex flex-col border border-gray-50 h-full group">
                  <div className={`w-10 h-10 ${service.bg} rounded-xl flex items-center justify-center ${service.color} mb-3 group-hover:scale-105 transition-transform`}>
                    <service.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[13px] font-black text-slate-800 mb-0.5">{service.title}</span>
                  <span className="text-[9px] font-bold text-gray-400 leading-tight line-clamp-1">{service.desc}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Bottom Bar - Consistent */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full py-3 px-8 shadow-2xl z-50 flex items-center gap-10">
         <Link to="/" className="text-gray-400"><Compass size={20} /></Link>
         <Link to="/menu" className="text-orange-500 font-black text-xs uppercase tracking-widest">App</Link>
         <Link to="/login" className="text-gray-400"><Receipt size={20} /></Link>
      </div>
    </div>
  );
};

export default GuestDashboard;
