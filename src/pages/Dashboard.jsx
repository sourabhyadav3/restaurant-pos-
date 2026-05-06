import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Calendar,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const stats = [
    { id: 'revenue', name: 'Today Revenue', value: '₹45,230', icon: TrendingUp, change: '+12.5%', isUp: true, color: 'bg-indigo-50 text-primary' },
    { id: 'orders', name: 'Total Orders', value: '154', icon: ShoppingBag, change: '+8.2%', isUp: true, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'tables', name: 'Active Tables', value: '12/20', icon: Users, change: '60% Occupancy', isUp: null, color: 'bg-orange-50 text-orange-600' },
    { id: 'prep', name: 'Avg. Prep Time', value: '18 min', icon: Clock, change: '-2 min', isUp: true, color: 'bg-rose-50 text-rose-600' },
  ];

  const orders = [
    { id: 124, table: 'T-03', type: 'Dine-in', items: 'Pizza x2, Coke x1', status: 'Cooking', time: '2m ago', amount: '₹750' },
    { id: 125, table: 'Takeaway', type: 'Takeaway', items: 'Burger x1, Fries x1', status: 'Pending', time: '5m ago', amount: '₹320' },
    { id: 126, table: 'T-12', type: 'Dine-in', items: 'Pasta x1, Wine x2', status: 'Ready', time: '8m ago', amount: '₹1,200' },
    { id: 127, table: 'Delivery', type: 'Delivery', items: 'Steak x2, Salad x1', status: 'Cooking', time: '12m ago', amount: '₹2,450' },
    { id: 128, table: 'T-05', type: 'Dine-in', items: 'Pizza x1, Juice x2', status: 'Pending', time: '15m ago', amount: '₹540' },
  ];

  const filteredOrders = activeFilter === 'All' ? orders : orders.filter(o => o.type === activeFilter);

  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-text-primary">Operational Hub</h2>
          <p className="text-text-secondary mt-2 text-lg font-medium flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Wednesday, May 6, 2026
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary py-3.5">
             <Filter className="w-5 h-5" /> Filter View
          </button>
          <button className="btn-primary py-3.5 px-8">
             Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedStat(stat)}
            className="card card-interactive cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className={cn("p-4 rounded-2xl transition-all duration-300 group-hover:scale-110", stat.color)}>
                <stat.icon className="w-7 h-7 stroke-[2.5]" />
              </div>
              {stat.isUp !== null && (
                <div className={cn(
                  "badge",
                  stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              )}
            </div>
            <div className="mt-8 relative z-10">
              <p className="text-text-secondary text-[11px] font-black uppercase tracking-[0.1em]">{stat.name}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-black text-text-primary tracking-tighter">{stat.value}</h3>
              </div>
            </div>
            {/* Visual background element */}
            <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-10 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20", stat.color.split(' ')[0])} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Orders Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <h3 className="text-2xl font-black tracking-tight">Live Orders Feed</h3>
               <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Real-time</span>
               </div>
            </div>
            <div className="flex gap-2">
              {['All', 'Dine-in', 'Takeaway', 'Delivery'].map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all",
                    activeFilter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-text-secondary hover:bg-slate-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-0 overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-text-secondary text-[10px] font-black uppercase tracking-[0.15em] border-b border-slate-50 bg-slate-50/50">
                    <th className="px-8 py-5">Order ID</th>
                    <th className="px-8 py-5">Origin</th>
                    <th className="px-8 py-5">Items / Items Detail</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence mode="popLayout">
                    {filteredOrders.map((order) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={order.id} 
                        className="text-sm hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      >
                        <td className="px-8 py-6 font-black text-text-primary">#{order.id}</td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="font-bold text-text-primary">{order.table}</span>
                              <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mt-1">{order.type}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-text-primary font-medium">{order.items}</p>
                           <p className="text-[11px] text-text-secondary mt-1">{order.time}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "badge border-2",
                            order.status === 'Cooking' ? "bg-orange-50 text-orange-600 border-orange-100" : 
                            order.status === 'Pending' ? "bg-indigo-50 text-primary border-indigo-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-3 font-black text-text-primary text-base">
                              {order.amount}
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                           </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Selling Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight">Top Sellers</h3>
            <button className="text-text-secondary hover:text-primary transition-colors p-2 bg-white rounded-xl shadow-sm border border-border">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="card space-y-8 bg-gradient-to-br from-white to-slate-50/50">
            {[
              { name: 'Margherita Pizza', sales: 84, total: 100, price: '₹299', icon: '🍕' },
              { name: 'Chicken Burger', sales: 65, total: 100, price: '₹189', icon: '🍔' },
              { name: 'Cheese Pasta', sales: 42, total: 100, price: '₹349', icon: '🍝' },
              { name: 'Iced Coffee', sales: 38, total: 100, price: '₹129', icon: '☕' },
            ].map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-black text-text-primary group-hover:text-primary transition-colors leading-tight">{item.name}</p>
                      <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1">{item.sales} Sales</p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-text-primary">{item.price}</p>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${item.sales}%` }}
                     transition={{ duration: 1, ease: 'easeOut' }}
                     className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                   />
                </div>
              </div>
            ))}
            <button className="w-full mt-4 btn-secondary py-4 font-black uppercase tracking-widest text-xs">
              Explore Full Catalog
            </button>
          </div>

          {/* Quick Insights Card */}
          <div className="card bg-primary p-8 text-white relative overflow-hidden group shadow-xl shadow-primary/30">
             <div className="relative z-10">
                <h4 className="text-xl font-black leading-tight">Peak hours <br/>expected at 7 PM</h4>
                <p className="text-indigo-100 text-sm mt-2 font-medium opacity-80">Based on historical data for Wednesdays.</p>
                <button className="mt-6 px-6 py-2.5 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                   Optimize Staff
                </button>
             </div>
             <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* Detail Drawer Overlay */}
      <AnimatePresence>
        {selectedStat && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStat(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-[101] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className={cn("p-4 rounded-2xl", selectedStat.color)}>
                    <selectedStat.icon className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{selectedStat.name}</h3>
                    <p className="text-text-secondary text-sm font-medium">Detailed breakdown for today</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStat(null)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-border">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto pr-2 scrollbar-hide">
                 {/* Mock Chart Area */}
                 <div className="card h-64 bg-slate-50 border-dashed border-2 border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400">
                    <TrendingUp className="w-12 h-12 opacity-20" />
                    <p className="text-sm font-black uppercase tracking-widest italic opacity-40">Analytics Visualization Loading...</p>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-text-secondary uppercase tracking-[0.2em]">Hourly Performance</h4>
                    <div className="space-y-3">
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-border/50 group hover:bg-white hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                               <span className="text-[10px] font-black text-slate-300 uppercase">{12+i}:00 PM</span>
                               <span className="font-bold text-text-primary">Shift Analytics #{i*100}</span>
                            </div>
                            <span className="font-black text-primary">₹{i*1200}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="pt-10 border-t border-slate-50 grid grid-cols-2 gap-4">
                 <button className="btn-secondary py-4 font-black uppercase tracking-widest text-xs">Print Summary</button>
                 <button className="btn-primary py-4 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">Full Analytics</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;


