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
  CookingPot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Kitchen = () => {
  const [orders, setOrders] = useState([
    { 
      id: '1024', 
      table: 'T-05', 
      type: 'Dine-in', 
      time: '12 min ago', 
      status: 'Cooking',
      items: [
        { name: 'Margherita Pizza', qty: 2, notes: 'Extra cheese' },
        { name: 'Coca Cola', qty: 1 }
      ]
    },
    { 
      id: '1025', 
      table: 'Takeaway', 
      type: 'Takeaway', 
      time: '8 min ago', 
      status: 'Pending',
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
      case 'Pending': return { border: 'border-orange-200', bg: 'bg-orange-50/50', accent: 'bg-orange-500', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' };
      case 'Cooking': return { border: 'border-primary/20', bg: 'bg-indigo-50/50', accent: 'bg-primary', text: 'text-primary', badge: 'bg-indigo-100 text-primary' };
      case 'Ready': return { border: 'border-success/20', bg: 'bg-green-50/50', accent: 'bg-success', text: 'text-success', badge: 'bg-green-100 text-green-700' };
      default: return { border: 'border-border', bg: 'bg-slate-50', accent: 'bg-slate-400', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' };
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-text-primary flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl text-white shadow-lg">
              <ChefHat className="w-8 h-8" />
            </div>
            KDS <span className="text-text-secondary font-medium">/ Kitchen Display</span>
          </h2>
          <p className="text-text-secondary mt-1 font-medium">Real-time order management for kitchen staff.</p>
        </div>
        <div className="flex gap-4">
          <div className="card py-3 px-6 flex items-center gap-4 bg-white shadow-xl shadow-indigo-100/20 border-primary/10">
            <div className="text-right">
              <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Avg. Prep Time</p>
              <p className="text-xl font-black text-text-primary">18.5m</p>
            </div>
            <div className="p-2 bg-indigo-50 rounded-xl">
              <Timer className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="card py-3 px-6 flex items-center gap-4 bg-white shadow-xl shadow-indigo-100/20 border-primary/10">
            <div className="text-right">
              <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Active Orders</p>
              <p className="text-xl font-black text-text-primary">{orders.filter(o => o.status !== 'Ready').length}</p>
            </div>
            <div className="p-2 bg-orange-50 rounded-xl">
              <CookingPot className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-8 scrollbar-thin">
        <div className="flex gap-8 h-full min-w-max px-2">
          <AnimatePresence mode="popLayout">
            {orders.filter(o => o.status !== 'Ready').map((order) => {
              const config = getStatusConfig(order.status);
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                  key={order.id} 
                  className={cn(
                    "w-96 card flex flex-col p-0 border-2 shadow-2xl overflow-hidden group",
                    config.border, config.bg
                  )}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-inherit relative">
                    <div className={cn("absolute top-0 left-0 w-full h-1.5", config.accent)} />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-text-primary">#{order.id}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-black text-text-secondary px-2 py-0.5 bg-white border border-border rounded-lg">{order.table}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{order.type}</span>
                        </div>
                      </div>
                      <span className={cn("badge", config.badge)}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-text-secondary bg-white/40 px-3 py-2 rounded-xl border border-white/50 backdrop-blur-sm">
                      <Clock className={cn("w-4 h-4", order.status === 'Pending' ? 'text-orange-500' : 'text-primary')} />
                      <span className="text-xs font-black uppercase tracking-wider">{order.time}</span>
                    </div>
                  </div>

                  {/* Card Items */}
                  <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[350px]">
                    {order.items.map((item, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="flex gap-4 group/item"
                      >
                        <div className="w-10 h-10 bg-white border-2 border-border rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm group-hover/item:border-primary transition-colors">
                          {item.qty}x
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-black text-text-primary leading-tight">{item.name}</p>
                          {item.notes && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-danger bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <p className="text-[10px] font-black uppercase tracking-tight italic">{item.notes}</p>
                            </div>
                          )}
                        </div>
                        <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-slate-300 hover:text-success hover:border-success transition-all">
                          <Check className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 bg-white/60 border-t border-inherit backdrop-blur-md">
                    {order.status === 'Pending' ? (
                      <button 
                        onClick={() => updateStatus(order.id, 'Cooking')}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn"
                      >
                        <Play className="w-5 h-5 fill-current group-hover/btn:scale-110 transition-transform" /> 
                        Start Prep
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateStatus(order.id, 'Ready')}
                        className="w-full py-4 bg-success text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-green-200 hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group/btn"
                      >
                        <CheckCircle2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" /> 
                        Mark Ready
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty/Waiting State */}
          <div className="w-96 shrink-0 border-4 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 p-8 text-center group hover:border-primary/20 transition-colors">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
              <Utensils className="w-10 h-10 group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-xl font-black text-slate-400 group-hover:text-text-primary transition-colors">Waiting for orders</h4>
            <p className="text-sm font-bold mt-2 text-slate-300 group-hover:text-text-secondary transition-colors">New orders will appear here automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;

