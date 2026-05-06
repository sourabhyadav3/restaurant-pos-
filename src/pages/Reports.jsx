import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Calendar,
  PieChart,
  ArrowRight,
  DollarSign,
  Users,
  ShoppingBag,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Reports = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹12,45,230', trend: '+14.2%', up: true, icon: DollarSign, color: 'primary' },
    { label: 'Avg Order Value', value: '₹480', trend: '+8.5%', up: true, icon: ShoppingBag, color: 'orange' },
    { label: 'Total Guests', value: '2,840', trend: '-2.4%', up: false, icon: Users, color: 'purple' },
    { label: 'Net Profit', value: '₹3,12,000', trend: '+12.1%', up: true, icon: Target, color: 'success' },
  ];

  return (
    <div className="space-y-10 h-full overflow-y-auto pb-10 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-text-primary">Business Insights</h2>
          <p className="text-text-secondary mt-1 font-medium">Track your restaurant's financial performance and growth trends.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-4 bg-white border border-border rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm group">
            <Calendar className="w-5 h-5 text-text-secondary group-hover:text-primary" /> Last 30 Days
          </button>
          <button className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            <Download className="w-5 h-5" /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className="card group hover:border-primary/20 transition-all duration-500 overflow-hidden relative"
          >
            <div className="flex justify-between items-start mb-6">
               <div className={cn(
                 "p-4 rounded-2xl shadow-inner",
                 stat.color === 'primary' ? 'bg-indigo-50 text-primary' :
                 stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                 stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-success'
               )}>
                 <stat.icon className="w-6 h-6" />
               </div>
               <button className="p-2 text-slate-300 hover:text-text-primary transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
               </button>
            </div>
            <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-text-primary">{stat.value}</h3>
              <span className={cn(
                "px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1",
                stat.up ? "bg-green-50 text-success" : "bg-red-50 text-danger"
              )}>
                {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.trend}
              </span>
            </div>
            {/* Background pattern */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-8 h-[450px] flex flex-col shadow-2xl border-primary/5">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h4 className="text-xl font-black text-text-primary">Revenue Overview</h4>
                 <p className="text-xs font-bold text-text-secondary mt-1">Comparison between this month and last month</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Current</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Previous</span>
                 </div>
              </div>
           </div>
           {/* Chart Mockup */}
           <div className="flex-1 flex items-end gap-3 px-4">
              {[60, 45, 80, 55, 90, 70, 85, 40, 75, 65, 95, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                   <div className="w-full relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05 + 0.5, type: 'spring', damping: 15 }}
                        className="w-full bg-slate-100 rounded-t-lg group-hover:bg-slate-200 transition-colors"
                      />
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 0.7}%` }}
                        transition={{ delay: i * 0.05 + 0.7, type: 'spring', damping: 15 }}
                        className="absolute bottom-0 w-full bg-primary rounded-t-lg shadow-lg group-hover:scale-y-105 transition-transform"
                      />
                   </div>
                   <span className="text-[10px] font-black text-slate-300 group-hover:text-text-primary transition-colors uppercase tracking-widest">W{i+1}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="card p-8 h-[450px] flex flex-col shadow-2xl border-primary/5 relative overflow-hidden">
           <h4 className="text-xl font-black text-text-primary mb-2">Category Split</h4>
           <p className="text-xs font-bold text-text-secondary">Top performing food categories</p>
           
           <div className="flex-1 flex items-center justify-center relative my-10">
              <div className="w-56 h-56 rounded-full border-[20px] border-indigo-50 relative flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-[20px] border-primary border-t-transparent border-r-transparent rotate-45" />
                 <div className="absolute inset-0 rounded-full border-[20px] border-orange-400 border-b-transparent border-l-transparent -rotate-12 opacity-80" />
                 <div className="text-center">
                    <p className="text-3xl font-black text-text-primary">84%</p>
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Growth</p>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              {[
                { name: 'Pizzas', val: '42%', color: 'bg-primary' },
                { name: 'Burgers', val: '28%', color: 'bg-orange-400' },
                { name: 'Drinks', val: '18%', color: 'bg-purple-400' },
                { name: 'Others', val: '12%', color: 'bg-slate-200' },
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                      <span className="text-xs font-black uppercase tracking-widest text-text-secondary">{item.name}</span>
                   </div>
                   <span className="text-sm font-black text-text-primary">{item.val}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
         <div className="card bg-slate-900 text-white p-8 overflow-hidden relative group">
            <h5 className="text-lg font-black mb-1">Weekly Goal</h5>
            <p className="text-slate-400 text-xs font-bold mb-8">Target Revenue: ₹5,00,000</p>
            <div className="flex items-end justify-between mb-4">
               <span className="text-4xl font-black text-primary">78%</span>
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">₹3,90,000</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '78%' }}
                 transition={{ duration: 1, ease: 'easeOut' }}
                 className="h-full bg-primary shadow-[0_0_20px_rgba(99,102,241,0.5)]"
               />
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <Target className="w-24 h-24" />
            </div>
         </div>

         <div className="card p-8 bg-indigo-50 border-primary/20 flex flex-col justify-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
               <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h5 className="text-lg font-black text-text-primary mb-2">Peak Hours</h5>
            <p className="text-sm font-bold text-text-secondary mb-4 leading-relaxed">Your restaurant is most active between <span className="text-primary font-black">7:00 PM - 9:30 PM</span> daily.</p>
            <button className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
               View Heatmap <ChevronRight className="w-4 h-4" />
            </button>
         </div>

         <div className="card p-8 border-dashed border-2 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/20 hover:bg-slate-50 transition-all">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all">
               <Plus className="w-8 h-8 text-slate-300 group-hover:text-primary" />
            </div>
            <p className="text-sm font-black text-text-secondary uppercase tracking-widest">Add Custom Widget</p>
         </div>
      </div>
    </div>
  );
};

export default Reports;

