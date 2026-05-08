import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2, UtensilsCrossed, GlassWater, CarFront } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestChat = () => {
  const categories = [
    { 
      icon: Building2, 
      title: 'Reception', 
      desc: 'Room service, questions, checkout', 
      bg: 'bg-blue-50', 
      iconColor: 'text-blue-500', 
      emoji: '🏨'
    },
    { 
      icon: UtensilsCrossed, 
      title: 'Restaurant', 
      desc: 'Food orders, menu questions', 
      bg: 'bg-orange-50', 
      iconColor: 'text-orange-500', 
      emoji: '🍽️'
    },
    { 
      icon: GlassWater, 
      title: 'Bar', 
      desc: 'Drinks, cocktails, bar service', 
      bg: 'bg-purple-50', 
      iconColor: 'text-purple-500', 
      emoji: '🍹'
    },
    { 
      icon: CarFront, 
      title: 'Transport', 
      desc: 'Transfers, airport pickups, taxis', 
      bg: 'bg-emerald-50', 
      iconColor: 'text-emerald-500', 
      emoji: '🚐'
    },
  ];

  return (
    <div className="min-h-screen bg-[#e0f7f3]/50 font-sans pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-5 flex items-center gap-4 sticky top-0 z-50 shadow-sm border-b border-gray-50">
        <Link to="/guest-app" className="text-slate-400 hover:text-slate-800 transition-colors">
          <ChevronLeft size={22} strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">Request & Chat</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manuel g. · Asmara</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-8">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">How can we help you?</h3>
        
        <div className="space-y-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              to={cat.title === 'Reception' ? '/chat' : '#'}
              className="w-full bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-50 shadow-sm hover:border-teal-100 transition-all group text-left block"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-sm`}>
                {cat.emoji}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-[15px] font-black text-slate-800 mb-0.5">{cat.title}</h4>
                <p className="text-[11px] font-bold text-gray-400 leading-tight">
                  {cat.desc}
                </p>
              </div>

              {/* Chevron */}
              <ChevronRight size={16} className="text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </main>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/30 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
};

export default RequestChat;
