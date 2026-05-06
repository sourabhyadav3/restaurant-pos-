import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Plus, 
  ChefHat, 
  Receipt,
  Search,
  Filter,
  X,
  ChevronRight,
  CreditCard,
  History,
  Calendar,
  MoreVertical,
  UtensilsCrossed
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showBilling, setShowBilling] = useState(false);
  const [activeFloor, setActiveFloor] = useState('Ground Floor');
  
  const floors = ['Ground Floor', 'Rooftop', 'Indoor VIP'];

  const tables = [
    { id: 1, name: 'T-01', status: 'available', capacity: 2, orders: [] },
    { id: 2, name: 'T-02', status: 'occupied', capacity: 4, orders: ['Pepperoni Pizza', 'Diet Coke'], time: '20m ago', total: 450 },
    { id: 3, name: 'T-03', status: 'reserved', capacity: 6, time: '19:30', reservedBy: 'Mr. Sharma' },
    { id: 4, name: 'T-04', status: 'available', capacity: 4, orders: [] },
    { id: 5, name: 'T-05', status: 'occupied', capacity: 2, orders: ['Classic Burger', 'French Fries'], time: '12m ago', total: 320 },
    { id: 6, name: 'T-06', status: 'available', capacity: 8, orders: [] },
    { id: 7, name: 'T-07', status: 'occupied', capacity: 4, orders: ['Penne Pasta', 'Red Wine'], time: '45m ago', total: 890 },
    { id: 8, name: 'T-08', status: 'available', capacity: 2, orders: [] },
    { id: 9, name: 'T-09', status: 'occupied', capacity: 4, orders: ['Club Sandwich', 'Cold Coffee'], time: '5m ago', total: 420 },
    { id: 10, name: 'T-10', status: 'available', capacity: 2, orders: [] },
    { id: 11, name: 'T-11', status: 'reserved', capacity: 4, time: '20:00', reservedBy: 'Ms. Anjali' },
    { id: 12, name: 'T-12', status: 'available', capacity: 6, orders: [] },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'available': return { color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', accent: 'emerald' };
      case 'occupied': return { color: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', accent: 'rose' };
      case 'reserved': return { color: 'bg-primary', bg: 'bg-indigo-50', text: 'text-primary', border: 'border-indigo-100', accent: 'indigo' };
      default: return { color: 'bg-slate-300', bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-100', accent: 'slate' };
    }
  };

  return (
    <div className="flex h-full gap-10 relative pb-10">
      {/* Floor View Main Area */}
      <div className="flex-1 space-y-10 overflow-y-auto pr-4 scrollbar-hide">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-text-primary">Floor Management</h2>
            <p className="text-text-secondary mt-2 text-lg font-medium">Coordinate your restaurant seating in real-time.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {['available', 'occupied', 'reserved'].map(status => {
              const config = getStatusConfig(status);
              return (
                <div key={status} className={cn("flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all", config.bg, config.text, config.border)}>
                  <span className={cn("w-2.5 h-2.5 rounded-full shadow-sm", config.color)}></span>
                  {status}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floor Selection */}
        <div className="flex items-center justify-between">
           <div className="flex gap-4">
              {floors.map(floor => (
                <button 
                  key={floor}
                  onClick={() => setActiveFloor(floor)}
                  className={cn(
                    "px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all border-2",
                    activeFloor === floor ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-white text-text-secondary border-transparent hover:border-primary/20 hover:bg-slate-50"
                  )}
                >
                  {floor}
                </button>
              ))}
           </div>
           <div className="flex gap-4">
              <button className="p-4 bg-white border border-border rounded-2xl shadow-sm text-text-secondary hover:text-primary transition-all">
                 <History className="w-6 h-6" />
              </button>
              <button className="btn-primary py-4 px-8">
                 Add New Table
              </button>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {tables.map((table) => {
            const config = getStatusConfig(table.status);
            const isSelected = selectedTable?.id === table.id;
            
            return (
              <motion.div 
                layout
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={cn(
                  "card cursor-pointer relative overflow-hidden group border-2 transition-all duration-500 bg-gradient-to-br from-white to-slate-50/50",
                  isSelected ? "border-primary shadow-2xl shadow-primary/10" : "border-transparent"
                )}
              >
                <div className={cn("absolute top-0 left-0 w-full h-2", config.color)}></div>
                <div className="flex justify-between items-start mb-10">
                  <span className="text-3xl font-black text-text-primary tracking-tighter">{table.name}</span>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl text-text-secondary font-black text-[10px] shadow-sm uppercase tracking-widest">
                    <Users className="w-3.5 h-3.5" /> {table.capacity}
                  </div>
                </div>
                
                {table.status === 'occupied' ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 w-fit px-2 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5" /> 
                      {table.time}
                    </div>
                    <div className="space-y-2">
                      {table.orders.slice(0, 2).map((order, i) => (
                        <p key={i} className="text-xs font-black text-text-primary truncate">{order}</p>
                      ))}
                      {table.orders.length > 2 && (
                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">+ {table.orders.length - 2} Items</p>
                      )}
                    </div>
                    <div className="pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill total</span>
                      <span className="text-lg font-black text-primary">₹{table.total}</span>
                    </div>
                  </div>
                ) : table.status === 'reserved' ? (
                  <div className="mt-8">
                    <div className="p-4 bg-indigo-50/50 rounded-2xl border-2 border-indigo-100/50 relative overflow-hidden">
                      <p className="text-[9px] font-black text-primary uppercase tracking-[0.25em]">Reserved @ {table.time}</p>
                      <p className="text-sm font-black text-text-primary mt-2 truncate">{table.reservedBy}</p>
                      <Calendar className="absolute -bottom-2 -right-2 w-12 h-12 text-primary/10 -rotate-12" />
                    </div>
                  </div>
                ) : (
                  <div className="mt-14 flex flex-col items-center justify-center py-6 text-slate-200 group-hover:text-primary transition-colors duration-500 relative">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-primary/30 group-hover:bg-white transition-all">
                       <Plus className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] mt-4 opacity-40 group-hover:opacity-100">Open Session</span>
                  </div>
                )}

                {/* Status Dot in BG */}
                <div className={cn("absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-10 transition-all duration-700", config.bg)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Table Side Drawer */}
      <AnimatePresence>
        {selectedTable && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTable(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-6">
                  <div className={cn("w-16 h-16 rounded-[2rem] flex items-center justify-center font-black text-2xl text-white shadow-2xl", getStatusConfig(selectedTable.status).color)}>
                    {selectedTable.name}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Active Session</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className={cn("badge px-3 py-1", getStatusConfig(selectedTable.status).bg, getStatusConfig(selectedTable.status).text)}>
                        {selectedTable.status}
                       </span>
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: #TBL-{selectedTable.id}04</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTable(null)}
                  className="p-4 hover:bg-white rounded-3xl border border-transparent hover:border-border transition-all shadow-sm"
                >
                  <X className="w-8 h-8 text-text-secondary" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
                {selectedTable.status === 'occupied' ? (
                  <>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">Items Ordered</h4>
                        <div className="flex items-center gap-2 text-primary font-black text-[11px] uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">
                           <History className="w-3.5 h-3.5" /> Log
                        </div>
                      </div>
                      <div className="space-y-4">
                        {selectedTable.orders.map((item, i) => (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i} 
                            className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-transparent hover:border-slate-100"
                          >
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-base border-2 border-slate-100 group-hover:border-primary/20 transition-colors">
                                1x
                              </div>
                              <div>
                                <p className="text-base font-black text-text-primary leading-tight">{item}</p>
                                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                   <UtensilsCrossed className="w-3 h-3" /> Kitchen Confirmed
                                </p>
                              </div>
                            </div>
                            <span className="text-base font-black text-text-primary tracking-tight">₹{i === 0 ? 350 : 100}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                      <div className="space-y-5 relative z-10">
                        <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          <span>Net Subtotal</span>
                          <span className="text-white">₹{selectedTable.total}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          <span>Service Tax (5%)</span>
                          <span className="text-white">₹{Math.round(selectedTable.total * 0.05)}</span>
                        </div>
                        <div className="pt-8 border-t border-slate-800 flex justify-between items-end">
                          <div>
                             <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Total Due</p>
                             <h4 className="text-5xl font-black text-primary tracking-tighter">₹{Math.round(selectedTable.total * 1.05)}</h4>
                          </div>
                          <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20">
                             <Receipt className="w-7 h-7 text-primary" />
                          </div>
                        </div>
                      </div>
                      <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </>
                ) : selectedTable.status === 'reserved' ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-indigo-50/50 rounded-[3rem] border-4 border-dashed border-primary/20">
                    <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mb-8">
                      <Clock className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <h4 className="text-3xl font-black text-text-primary tracking-tight">Table Reserved</h4>
                    <p className="text-text-secondary font-medium mt-4 max-w-[280px] leading-relaxed italic">
                       Reserved for <span className="font-black text-primary">{selectedTable.reservedBy}</span> at <span className="font-black text-primary uppercase tracking-widest">{selectedTable.time}</span>
                    </p>
                    <div className="mt-12 w-full space-y-4">
                       <button className="w-full btn-primary py-5 text-base font-black tracking-widest uppercase">Mark as Arrived</button>
                       <button className="w-full btn-secondary py-5 text-base font-black tracking-widest uppercase text-danger border-none hover:bg-red-50 transition-all">Cancel Booking</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200 group/empty">
                    <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mb-8 group-hover/empty:scale-110 transition-transform duration-500">
                      <Users className="w-10 h-10 text-slate-300 group-hover/empty:text-primary transition-colors" />
                    </div>
                    <h4 className="text-3xl font-black text-text-primary tracking-tight">Table Available</h4>
                    <p className="text-text-secondary font-medium mt-4 max-w-[250px] leading-relaxed">Perfectly set up for up to <span className="font-black text-text-primary">{selectedTable.capacity} guests</span>. Ready for new orders.</p>
                    <button className="w-full btn-primary py-6 text-base font-black tracking-widest uppercase mt-12 shadow-2xl shadow-primary/30">Open New Table</button>
                  </div>
                )}
              </div>

              {selectedTable.status === 'occupied' && (
                <div className="p-10 bg-white border-t border-slate-50 space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-3 py-6 text-xl shadow-2xl shadow-primary/30"
                  >
                    <Plus className="w-7 h-7 stroke-[3]" /> Add Items
                  </motion.button>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      className="btn-secondary flex flex-col items-center justify-center gap-2 py-6 rounded-[2rem] border-2 group"
                    >
                      <ChefHat className="w-7 h-7 text-slate-400 group-hover:text-primary transition-colors" /> 
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">To Kitchen</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setShowBilling(true)}
                      className="btn-secondary flex flex-col items-center justify-center gap-2 py-6 rounded-[2rem] border-2 bg-indigo-50 border-primary/20 text-primary group"
                    >
                      <Receipt className="w-7 h-7 group-hover:scale-110 transition-transform" /> 
                      <span className="text-[10px] font-black uppercase tracking-widest">Final Bill</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern Billing Modal */}
      <AnimatePresence>
        {showBilling && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBilling(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h3 className="text-4xl font-black tracking-tight">Table Receipt</h3>
                  <p className="text-text-secondary font-bold text-base mt-2 flex items-center gap-2 uppercase tracking-widest">
                    <Receipt className="w-5 h-5 text-primary" /> Table {selectedTable?.name} • Invoice #7702
                  </p>
                </div>
                <button onClick={() => setShowBilling(false)} className="p-4 hover:bg-white rounded-3xl border border-transparent hover:border-border transition-all shadow-sm">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <div className="p-12 space-y-10">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] ml-2">Settlement Method</h4>
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { name: 'Cash', icon: Receipt, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { name: 'Card', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { name: 'UPI', icon: ChevronRight, color: 'text-primary', bg: 'bg-indigo-50' },
                    ].map((method) => (
                      <motion.button 
                        whileHover={{ y: -5, scale: 1.02 }}
                        key={method.name} 
                        className={cn(
                          "p-10 rounded-[3rem] border-4 flex flex-col items-center gap-4 transition-all group", 
                          method.name === 'Cash' ? "border-primary bg-indigo-50/30 shadow-xl shadow-primary/10" : "border-slate-50 bg-slate-50/50 hover:border-primary/20 hover:bg-white"
                        )}
                      >
                        <div className={cn("w-14 h-14 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12", method.bg)}>
                          <method.icon className={cn("w-7 h-7 stroke-[2.5]", method.color)} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{method.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="p-10 bg-slate-50 rounded-[3rem] border-2 border-border flex items-center justify-between group hover:bg-white transition-all shadow-inner">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Payable Amount</span>
                      <h4 className="text-5xl font-black text-text-primary tracking-tighter">₹{Math.round(selectedTable?.total * 1.05)}</h4>
                   </div>
                   <div className="w-16 h-16 bg-white rounded-3xl border border-border flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8 text-slate-200" />
                   </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-8 text-2xl shadow-2xl shadow-primary/40 rounded-[2.5rem] font-black tracking-tight"
                >
                  Finalize & Print
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tables;
