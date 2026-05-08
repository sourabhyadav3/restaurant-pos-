import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Truck, Clock, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'Quality Food',
    desc: 'We provide the best quality food in town with fresh ingredients.',
    icon: Utensils,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    title: 'Fast Delivery',
    desc: 'Get your food delivered at your doorstep within 30 minutes.',
    icon: Truck,
    color: 'bg-landing-primary/10 text-landing-primary'
  },
  {
    title: '24/7 Service',
    desc: 'Our kitchen is open day and night for your hunger cravings.',
    icon: Clock,
    color: 'bg-landing-secondary/10 text-landing-secondary'
  },
  {
    title: 'Safe & Clean',
    desc: 'We follow strict safety protocols and hygiene standards.',
    icon: ShieldCheck,
    color: 'bg-emerald-500/10 text-emerald-500'
  }
];

const Services = () => {
  return (
    <section className="py-24" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-landing-primary font-bold uppercase tracking-widest text-sm">Our Services</span>
        <h2 className="text-4xl md:text-5xl font-bold font-display mt-2 mb-16 text-white">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 hover:translate-y-[-10px] transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
