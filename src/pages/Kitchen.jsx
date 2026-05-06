import React, { useState } from 'react';
import { 
  Clock, 
  ChefHat, 
  CheckCircle2, 
  Timer, 
  AlertCircle,
  Play,
  Check,
  ChevronRight,
  Utensils,
  CookingPot,
  Bell,
  Search,
  Sparkles,
  Zap,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Kitchen = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [orders, setOrders] = useState([
    { 
      id: '1024', 
      table: 'T-05', 
      type: 'Dine-in', 
      time: '12 min ago', 
      status: 'Cooking',
      priority: 'high',
      items: [
        { name: 'Margherita Pizza', qty: 2, notes: 'Extra cheese, Well done' },
        { name: 'Coca Cola', qty: 1 }
      ]
    },
    { 
      id: '1025', 
      table: 'Takeaway', 
      type: 'Takeaway', 
      time: '8 min ago', 
      status: 'Pending',
      priority: 'medium',
      items: [
        { name: 'Chicken Burger', qty: 1, notes: 'No onions' },
        { name: 'French Fries', qty: 1 }
      ]
    },
    { 
      id: '1026', 
      table: 'T-02', 
      type: 'Dine-in', 
      time: '5 min ago', 
      status: 'Pending',
      priority: 'low',
      items: [
        { name: 'Cheese Pasta', qty: 1 },
        { name: 'Garlic Bread', qty: 1 },
        { name: 'Iced Tea', qty: 2 }
      ]
    },
    { 
      id: '1027', 
      table: 'T-08', 
      type: 'Dine-in', 
      time: '2 min ago', 
      status: 'Pending',
      priority: 'medium',
      items: [
        { name: 'Veggie Burger', qty: 2 },
        { name: 'Coke', qty: 2 }
      ]
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending': return { border: 'border-orange-200', bg: 'bg-orange-50/30', accent: 'bg-orange-500', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' };
      case 'Cooking': return { border: 'border-primary/20', bg: 'bg-indigo-50/30', accent: 'bg-primary', text: 'text-primary', badge: 'bg-indigo-100 text-primary' };
      case 'Ready': return { border: 'border-emerald-200', bg: 'bg-emerald-50/30', accent: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' };
      default: return { border: 'border-border', bg: 'bg-slate-50', accent: 'bg-slate-400', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' };
    }
  };

  const filteredOrders = activeTab === 'Active' 
    ? orders.filter(o => o.status !== 'Ready') 
    : orders.filter(o => o.status === 'Ready');

  return (
    <div className="h-full flex flex-col gap-10 overflow-hidden pb-10">
      {/* KDS Header Area */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 shrink-0">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 bg-primary rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-primary/30 relative">
              <ChefHat className="w-8 h-8 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full border-4 border-white animate-pulse" />
           </div>
           <div>
              <h2 className="text-4xl font-black tracking-tight text-text-primary uppercase tracking-[0.05em]">Kitchen Control</h2>
              <p className="text-text-secondary mt-1 font-bold flex items-center gap-2 text-base">
                 <Zap className="w-4 h-4 text-warning" /> High Efficiency Mode Active
              </p>
           </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
           {/* Metric Cards */}
           <div className="card py-3 px-6 flex items-center gap-6 bg-white shadow-2xl shadow-indigo-100/40 border-primary/10">
              <div className="text-right">
                 <p className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Queue Time</p>
                 <p className="text-2xl font-black text-text-primary tracking-tighter">14.2<span className="text-sm font-bold text-slate-300 ml-1">min</span></p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                 <Timer className="w-6 h-6" />
              </div>
           </div>
           
           <div className="card py-3 px-6 flex items-center gap-6 bg-white shadow-2xl shadow-indigo-100/40 border-primary/10">
              <div className="text-right">
                 <p className="text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Load Level</p>
                 <p className="text-2xl font-black text-emerald-600 tracking-tighter">Normal</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                 <Utensils className="w-6 h-6" />
              </div>
           </div>

           <div className="h-14 w-[1px] bg-slate-200 mx-2" />

           <motion.button whileHover={{ scale: 1.05 }} className="p-4 bg-white border border-border rounded-2xl shadow-sm text-text-secondary hover:text-primary relative group">
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 w-3 h-3 bg-danger rounded-full border-4 border-white shadow-sm" />
           </motion.button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between shrink-0">
         <div className="flex bg-white p-1.5 rounded-[1.5rem] border-2 border-slate-50 shadow-sm gap-2">
            {['Active', 'Ready'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-3 rounded-[1rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                  activeTab === tab ? "bg-slate-900 text-white shadow-xl" : "text-text-secondary hover:bg-slate-50"
                )}
              >
                {tab} Feed
              </button>
            ))}
         </div>
         <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by ticket ID or table..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-[1.5rem] focus:ring-4 focus:ring-primary/10 outline-none transition-all text-xs font-black uppercase tracking-widest placeholder:text-slate-300"
            />
         </div>
      </div>

      {/* Tickets Scrollable Area */}
      <div className="flex-1 overflow-x-auto pb-10 scrollbar-hide">
        <div className="flex gap-10 h-full min-w-max px-2">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const config = getStatusConfig(order.status);
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    key={order.id} 
                    className={cn(
                      "w-[420px] card flex flex-col p-0 border-4 shadow-2xl shadow-slate-200/50 overflow-hidden group/card relative",
                      config.border, config.bg
                    )}
                  >
                    {/* Status Light */}
                    <div className={cn("h-2 w-full", config.accent)} />
                    
                    {/* Ticket Header */}
                    <div className="p-8 border-b border-inherit relative bg-white/40">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3">
                             <h3 className="text-4xl font-black text-text-primary tracking-tighter">#{order.id}</h3>
                             {order.priority === 'high' && (
                               <span className="flex items-center gap-1 bg-rose-500 text-white px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest animate-bounce">
                                 High Priority
                               </span>
                             )}
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs font-black text-white px-3 py-1.5 bg-slate-900 rounded-xl shadow-lg">{order.table}</span>
                            <div className="h-4 w-[1.5px] bg-slate-300" />
                            <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{order.type}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <span className={cn("badge px-4 py-1.5 shadow-sm", config.badge)}>
                             {order.status}
                           </span>
                           <div className="p-2 bg-white rounded-xl border border-border shadow-sm">
                              <MoreVertical className="w-4 h-4 text-slate-300" />
                           </div>
                        </div>
                      </div>
                      
                      {/* Timer Bar */}
                      <div className="mt-8 flex items-center justify-between gap-4">
                         <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-[1rem] border border-border shadow-sm shrink-0">
                            <Clock className={cn("w-4 h-4", order.status === 'Pending' ? 'text-orange-500' : 'text-primary animate-spin-slow')} />
                            <span className="text-[11px] font-black text-text-primary uppercase tracking-widest">{order.time}</span>
                         </div>
                         <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: order.status === 'Cooking' ? '65%' : '15%' }}
                               className={cn("h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]", config.accent)} 
                            />
                         </div>
                      </div>
                    </div>

                    {/* Order List */}
                    <div className="flex-1 p-8 space-y-6 overflow-y-auto max-h-[400px] scrollbar-hide">
                      {order.items.map((item, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx} 
                          className="flex gap-6 group/item relative"
                        >
                          <div className="w-14 h-14 bg-white border-4 border-slate-50 rounded-2xl flex items-center justify-center font-black text-lg text-text-primary shrink-0 shadow-xl group-hover/item:border-primary/20 transition-all">
                            {item.qty}
                            <span className="text-[10px] ml-0.5 text-slate-300">x</span>
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-lg font-black text-text-primary leading-none group-hover/item:text-primary transition-colors">{item.name}</p>
                            {item.notes && (
                              <div className="mt-3 flex flex-col gap-1">
                                 <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" /> Special Request
                                 </p>
                                 <p className="text-[11px] font-bold text-text-secondary bg-white p-2 rounded-xl border border-border mt-1 shadow-sm italic">
                                    "{item.notes}"
                                 </p>
                              </div>
                            )}
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-200 hover:text-emerald-500 hover:border-emerald-500 transition-all shadow-sm bg-white"
                          >
                            <Check className="w-5 h-5 stroke-[3]" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Footer */}
                    <div className="p-8 bg-white/80 border-t border-inherit backdrop-blur-md">
                      {order.status === 'Pending' ? (
                        <motion.button 
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateStatus(order.id, 'Cooking')}
                          className="w-full py-5 bg-slate-900 text-white rounded-3xl text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-slate-400/20 hover:bg-black transition-all flex items-center justify-center gap-4 group/btn"
                        >
                          <Play className="w-6 h-6 fill-current group-hover/btn:scale-125 transition-transform" /> 
                          Acknowledge & Start
                        </motion.button>
                      ) : (
                        <motion.button 
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateStatus(order.id, 'Ready')}
                          className="w-full py-5 bg-emerald-600 text-white rounded-3xl text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-emerald-400/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 group/btn"
                        >
                          <CheckCircle2 className="w-6 h-6 group-hover/btn:scale-125 transition-transform" /> 
                          Dispatch Order
                        </motion.button>
                      )}
                    </div>
                    
                    {/* Visual Decor */}
                    <CookingPot className="absolute -bottom-6 -left-6 w-32 h-32 text-black/5 -rotate-12 pointer-events-none group-hover/card:scale-110 transition-transform duration-700" />
                  </motion.div>
                );
              })
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-20 min-w-[600px]">
                 <div className="w-40 h-40 bg-slate-50 rounded-[3rem] shadow-inner flex items-center justify-center mb-10 relative">
                    <Sparkles className="w-20 h-20 text-slate-200" />
                    <ChefHat className="absolute w-10 h-10 text-primary opacity-20 -top-2 -right-2 rotate-12" />
                 </div>
                 <h4 className="text-4xl font-black text-text-primary tracking-tight">Station Clear</h4>
                 <p className="text-text-secondary text-lg font-medium mt-4 max-w-sm leading-relaxed">
                    Great work! No pending tickets at the moment. Take a breather or prep your station.
                 </p>
                 <button className="mt-10 btn-secondary py-4 px-10 border-2 font-black uppercase tracking-widest text-xs">Refresh Station</button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
