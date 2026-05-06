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
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showBilling, setShowBilling] = useState(false);
  
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
      case 'available': return { color: 'bg-success', bg: 'bg-green-50', text: 'text-success', border: 'border-green-100' };
      case 'occupied': return { color: 'bg-danger', bg: 'bg-red-50', text: 'text-danger', border: 'border-red-100' };
      case 'reserved': return { color: 'bg-primary', bg: 'bg-indigo-50', text: 'text-primary', border: 'border-indigo-100' };
      default: return { color: 'bg-slate-300', bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-100' };
    }
  };

  return (
    <div className="flex h-full gap-8 relative">
      {/* Floor View */}
      <div className="flex-1 space-y-8 overflow-y-auto pr-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">Floor Management</h2>
            <p className="text-text-secondary mt-1">Real-time table status and order tracking.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['available', 'occupied', 'reserved'].map(status => {
              const config = getStatusConfig(status);
              return (
                <div key={status} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider", config.bg, config.text, config.border)}>
                  <span className={cn("w-2 h-2 rounded-full", config.color)}></span>
                  {status}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-8">
          {tables.map((table) => {
            const config = getStatusConfig(table.status);
            const isSelected = selectedTable?.id === table.id;
            
            return (
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={cn(
                  "card cursor-pointer relative overflow-hidden group border-2 transition-all duration-300",
                  isSelected ? "border-primary ring-4 ring-indigo-50" : "border-transparent hover:shadow-xl"
                )}
              >
                <div className={cn("absolute top-0 left-0 w-full h-1", config.color)}></div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-2xl font-black text-text-primary">{table.name}</span>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg text-text-secondary font-bold text-xs">
                    <Users className="w-3 h-3" /> {table.capacity}
                  </div>
                </div>
                
                {table.status === 'occupied' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                      <Clock className="w-3.5 h-3.5 text-danger" /> 
                      {table.time}
                    </div>
                    <div className="space-y-1">
                      {table.orders.slice(0, 2).map((order, i) => (
                        <p key={i} className="text-xs font-bold text-text-primary line-clamp-1">{order}</p>
                      ))}
                      {table.orders.length > 2 && (
                        <p className="text-[10px] font-black text-primary">+{table.orders.length - 2} MORE ITEMS</p>
                      )}
                    </div>
                    <div className="pt-3 border-t border-dashed border-border flex items-center justify-between">
                      <span className="text-xs font-bold text-text-secondary">TOTAL</span>
                      <span className="text-sm font-black text-primary">₹{table.total}</span>
                    </div>
                  </div>
                ) : table.status === 'reserved' ? (
                  <div className="mt-8">
                    <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Reserved @ {table.time}</p>
                      <p className="text-xs font-bold text-text-primary mt-1 truncate">{table.reservedBy}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-12 flex flex-col items-center justify-center py-4 text-slate-300 group-hover:text-primary transition-colors duration-300">
                    <Plus className="w-10 h-10 mb-2 opacity-20 group-hover:opacity-100" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Open Table</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Table Detail Sidebar (Drawer-like) */}
      <AnimatePresence>
        {selectedTable && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="w-[400px] h-full bg-surface border-l border-border flex flex-col shadow-2xl relative z-30"
          >
            <div className="p-6 border-b border-border flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg", getStatusConfig(selectedTable.status).color)}>
                  {selectedTable.name}
                </div>
                <div>
                  <h3 className="text-xl font-bold">Table Details</h3>
                  <span className={cn("badge mt-1 inline-block", getStatusConfig(selectedTable.status).bg, getStatusConfig(selectedTable.status).text)}>
                    {selectedTable.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTable(null)}
                className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-border transition-all"
              >
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {selectedTable.status === 'occupied' ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-text-secondary uppercase tracking-widest">Current Order</h4>
                      <span className="text-xs font-bold text-primary bg-indigo-50 px-2 py-1 rounded-lg">#ORD-4582</span>
                    </div>
                    <div className="space-y-3">
                      {selectedTable.orders.map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-sm border border-border">
                              1x
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-primary">{item}</p>
                              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-0.5">Dine-in</p>
                            </div>
                          </div>
                          <span className="text-sm font-black text-text-primary">₹{i === 0 ? 350 : 100}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                    <div className="space-y-3">
                      <div className="flex justify-between text-slate-400 text-sm font-bold">
                        <span>SUBTOTAL</span>
                        <span>₹{selectedTable.total}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-sm font-bold">
                        <span>GST (5%)</span>
                        <span>₹{Math.round(selectedTable.total * 0.05)}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-700 flex justify-between">
                        <span className="text-lg font-bold">TOTAL</span>
                        <span className="text-2xl font-black text-primary">₹{Math.round(selectedTable.total * 1.05)}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : selectedTable.status === 'reserved' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-indigo-50/30 rounded-3xl border border-dashed border-primary/30">
                  <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mb-6">
                    <Clock className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Table Reserved</h4>
                  <p className="text-sm text-text-secondary mt-2">Reserved for <span className="font-bold text-primary">{selectedTable.reservedBy}</span> at <span className="font-bold text-primary">{selectedTable.time}</span></p>
                  <button className="btn-primary mt-8 w-full">Mark as Arrived</button>
                  <button className="btn-secondary mt-3 w-full border-none text-danger hover:bg-red-50">Cancel Reservation</button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                  <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mb-6">
                    <Users className="w-10 h-10 text-slate-300" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary">Table Available</h4>
                  <p className="text-sm text-text-secondary mt-2 max-w-[200px]">Open this table to start taking new orders.</p>
                  <button className="btn-primary mt-8 w-full shadow-indigo-200">Open Table</button>
                </div>
              )}
            </div>

            {selectedTable.status === 'occupied' && (
              <div className="p-6 bg-white border-t border-border space-y-3">
                <button className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg">
                  <Plus className="w-5 h-5" /> Add Items
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="btn-secondary flex items-center justify-center gap-2 py-3">
                    <ChefHat className="w-4 h-4" /> Kitchen
                  </button>
                  <button 
                    onClick={() => setShowBilling(true)}
                    className="btn-secondary flex items-center justify-center gap-2 py-3 bg-indigo-50 text-primary border-primary/20 hover:bg-indigo-100"
                  >
                    <Receipt className="w-4 h-4" /> Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal Mockup */}
      <AnimatePresence>
        {showBilling && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBilling(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-surface rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-border flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black">Generate Bill</h3>
                  <p className="text-text-secondary font-medium">Table {selectedTable?.name} • Bill #4582</p>
                </div>
                <button onClick={() => setShowBilling(false)} className="p-2 hover:bg-white rounded-full border border-transparent hover:border-border transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-text-secondary uppercase tracking-widest">Select Payment Method</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'Cash', icon: Receipt, color: 'bg-green-50 text-green-600' },
                      { name: 'Card', icon: CreditCard, color: 'bg-blue-50 text-blue-600' },
                      { name: 'UPI', icon: ChevronRight, color: 'bg-primary/10 text-primary' },
                    ].map((method) => (
                      <button key={method.name} className={cn("p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all group", method.name === 'Cash' ? "border-primary bg-indigo-50" : "border-border hover:border-primary/50")}>
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", method.color)}>
                          <method.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-border">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Amount Payable</span>
                    <span className="text-3xl font-black text-primary">₹{Math.round(selectedTable?.total * 1.05)}</span>
                  </div>
                </div>

                <button className="w-full btn-primary py-5 text-xl shadow-xl shadow-indigo-200">
                  Confirm Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tables;

