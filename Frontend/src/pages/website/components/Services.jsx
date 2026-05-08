import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Truck, Clock, ShieldCheck } from 'lucide-react';

const ecosystem = [
  {
    title: 'Instant QR Ordering',
    desc: 'Zero wait time. Guests scan, browse, and order directly from their table.',
    img: '/Immagine 2026-04-16 042531.png',
    tag: 'Revolutionary'
  },
  {
    title: 'Smart Payments',
    desc: 'Seamless UPI and Card integrations for lightning-fast checkouts.',
    img: '/Immagine 2026-04-16 042508.png',
    tag: 'Secure'
  },
  {
    title: 'Ultra Fast Wifi',
    desc: 'Keep your guests connected with our managed high-speed network.',
    img: '/Modern Black and White Wifi Poster (2).jpg',
    tag: 'Connected'
  }
];

const Services = () => {
  return (
    <section className="py-32 relative overflow-hidden" id="services">
      <div className="absolute top-0 right-0 w-96 h-96 bg-landing-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-landing-primary font-black uppercase tracking-[0.3em] text-xs"
        >
          Technology at Heart
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-black font-display mt-4 mb-20 text-white uppercase tracking-tighter">
          The <span className="text-landing-primary italic">Smart</span> Ecosystem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ecosystem.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="glass-card group p-0 overflow-hidden hover:border-landing-primary/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden bg-white flex items-center justify-center p-8">
                 <img src={item.img} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-landing-primary">
                    {item.tag}
                 </div>
              </div>
              <div className="p-8 text-left">
                <h3 className="text-xl font-black mb-3 text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-xs font-medium">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[9px] font-black text-landing-primary uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                   Learn More <span className="w-8 h-px bg-landing-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
