import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ChefHat,
  CreditCard,
  History,
  Tag,
  Clock,
  MoreVertical,
  X,
  ChevronRight,
  Receipt,
  Users,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const POS = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const categories = ['All', 'Pizza', 'Burgers', 'Pasta', 'Sides', 'Drinks', 'Desserts'];
  
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 299, image: '🍕', description: 'Classic tomato, mozzarella, basil', available: true },
    { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 399, image: '🍕', description: 'Beef pepperoni with extra cheese', available: true },
    { id: 3, name: 'Cheese Burger', category: 'Burgers', price: 189, image: '🍔', description: 'Juicy patty with cheddar', available: true },
    { id: 4, name: 'Chicken Pasta', category: 'Pasta', price: 349, image: '🍝', description: 'Creamy alfredo with grilled chicken', available: true },
    { id: 5, name: 'Coca Cola', category: 'Drinks', price: 49, image: '🥤', description: 'Chilled 300ml', available: true },
    { id: 6, name: 'Chocolate Lava', category: 'Desserts', price: 149, image: '🍰', description: 'Molten chocolate center', available: true },
    { id: 7, name: 'Veggie Pizza', category: 'Pizza', price: 329, image: '🍕', description: 'Garden fresh vegetables', available: true },
    { id: 8, name: 'Double Patty Burger', category: 'Burgers', price: 249, image: '🍔', description: 'Double meat, double cheese', available: true },
    { id: 9, name: 'French Fries', category: 'Sides', price: 99, image: '🍟', description: 'Golden crispy fries', available: true },
    { id: 10, name: 'Iced Coffee', category: 'Drinks', price: 129, image: '☕', description: 'Cold brew with milk', available: true },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, note: '' }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.qty + delta);
        return { ...i, qty: newQty };
      }
      return i;
    }));
  };

  const updateNote = (id, note) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, note } : i));
    setEditingNote(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex gap-10 h-full overflow-hidden pb-10">
      {/* Menu Area */}
      <div className="flex-1 flex flex-col gap-10 overflow-hidden">
        {/* Search & Action Bar */}
        <div className="flex items-center justify-between shrink-0 gap-6">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks, or category..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-border rounded-3xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm font-black text-sm uppercase tracking-wider"
            />
          </div>
          <div className="flex gap-4">
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-4 bg-white border border-border rounded-2xl hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm group">
                <History className="w-6 h-6 text-text-secondary group-hover:text-primary" />
             </motion.button>
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-4 bg-white border border-border rounded-2xl hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm group">
                <Tag className="w-6 h-6 text-text-secondary group-hover:text-primary" />
             </motion.button>
          </div>
        </div>

        {/* Categories with Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide shrink-0 px-2">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border-2",
                activeCategory === cat 
                  ? "bg-primary text-white border-primary shadow-2xl shadow-primary/20" 
                  : "bg-white text-text-secondary border-transparent hover:border-primary/20 hover:bg-indigo-50/50"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Dynamic Menu Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pr-4 pb-12 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10 }}
                key={item.id} 
                onClick={() => addToCart(item)}
                className="card group cursor-pointer border-2 border-transparent hover:border-primary/20 p-6 flex flex-col relative overflow-hidden bg-gradient-to-br from-white to-slate-50/30"
              >
                <div className="flex justify-between items-start mb-6 relative z-10">
                   <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {item.image}
                   </div>
                   <div className="flex flex-col items-end gap-1.5">
                      <span className="badge bg-emerald-50 text-emerald-600 border border-emerald-100">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         Ready
                      </span>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.category}</p>
                   </div>
                </div>

                <div className="flex-1 relative z-10">
                  <h4 className="font-black text-text-primary text-xl leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-text-secondary text-xs mt-2 font-medium line-clamp-2 opacity-70 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-8 flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Price</span>
                     <p className="text-2xl font-black text-text-primary">₹{item.price}</p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30"
                  >
                    <Plus className="w-6 h-6 stroke-[3]" />
                  </motion.div>
                </div>
                
                {/* Visual Glassmorphism Accent */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cart & Billing Section */}
      <div className="w-[480px] flex flex-col shrink-0 h-full relative z-40">
        <div className="card flex-1 flex flex-col p-0 overflow-hidden border-2 border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white rounded-[2.5rem]">
          {/* Cart Header */}
          <div className="p-10 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                    <ShoppingCart className="w-7 h-7" />
                 </div>
                 <div>
                    <h3 className="font-black text-2xl tracking-tight">Active Cart</h3>
                    <p className="text-text-secondary text-sm font-bold uppercase tracking-[0.2em] mt-1">#ORD-202605</p>
                 </div>
              </div>
              <motion.button 
                whileHover={{ rotate: 90 }}
                onClick={() => setCart([])}
                className="p-3 text-slate-300 hover:text-danger hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
              >
                <Trash2 className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Cart Items Scroll */}
          <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {cart.length > 0 ? (
                cart.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    key={item.id} 
                    className="flex flex-col gap-4 group"
                  >
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                          {item.image}
                       </div>
                       <div className="flex-1 min-w-0">
                          <h5 className="font-black text-text-primary text-lg truncate leading-tight">{item.name}</h5>
                          <p className="text-sm text-primary font-black mt-1 tracking-tight">₹{item.price}</p>
                       </div>
                       <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                          <button onClick={() => updateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-text-secondary hover:text-primary shadow-sm">
                             <Minus className="w-5 h-5" />
                          </button>
                          <span className="w-8 text-center text-base font-black text-text-primary">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-text-secondary hover:text-primary shadow-sm">
                             <Plus className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                       <button 
                         onClick={() => setEditingNote(item.id)}
                         className={cn(
                           "flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                           item.note ? "bg-indigo-50 text-primary border border-primary/20" : "bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100"
                         )}
                       >
                          <MessageSquare className="w-3.5 h-3.5" />
                          {item.note || 'Add Special Instruction'}
                       </button>
                       <button onClick={() => removeFromCart(item.id)} className="p-2.5 text-slate-300 hover:text-danger hover:bg-red-50 rounded-xl transition-all">
                          <X className="w-5 h-5" />
                       </button>
                    </div>

                    {editingNote === item.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                        <textarea 
                          autoFocus
                          onBlur={(e) => updateNote(item.id, e.target.value)}
                          defaultValue={item.note}
                          placeholder="e.g. Extra spicy, No onions..."
                          className="w-full mt-2 p-4 bg-slate-50 border border-primary/20 rounded-2xl outline-none text-xs font-bold text-text-primary placeholder:text-slate-300 min-h-[80px]"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-8 shadow-inner relative group">
                    <ShoppingCart className="w-14 h-14 text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                    <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-primary/30 animate-pulse" />
                  </div>
                  <h4 className="font-black text-2xl text-text-primary tracking-tight">Empty Kitchen Ticket</h4>
                  <p className="text-text-secondary text-sm font-medium mt-3 max-w-[240px] leading-relaxed">Delicious items are waiting to be added to the queue!</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Billing Summary Panel */}
          <div className="p-10 bg-slate-900 text-white rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center text-slate-400 text-sm font-black uppercase tracking-[0.2em]">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm font-black uppercase tracking-[0.2em]">
                <span>Tax (GST 5%)</span>
                <span className="text-white">₹{gst}</span>
              </div>
              <div className="pt-8 border-t border-slate-800 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Grand Total</span>
                  <div className="flex items-baseline gap-2">
                     <h4 className="text-5xl font-black text-primary tracking-tighter">₹{total}</h4>
                     <span className="text-xs font-black text-primary/50 uppercase tracking-widest">INR</span>
                  </div>
                </div>
                <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20 backdrop-blur-md">
                   <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-3 py-6 bg-slate-800 border-2 border-slate-700 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-700 hover:border-slate-600 disabled:opacity-50 transition-all group"
              >
                <ChefHat className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" /> 
                Send to KDS
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaymentModal(true)}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-3 py-6 bg-primary text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:bg-primary-dark disabled:opacity-50 transition-all group"
              >
                <CreditCard className="w-7 h-7 group-hover:scale-110 transition-transform" /> 
                Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal with Interactive Steps */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
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
                  <h3 className="text-4xl font-black tracking-tight">Final Settlement</h3>
                  <p className="text-text-secondary font-bold text-base mt-2 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary" /> Invoice #POS-2026-X49
                  </p>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="p-4 hover:bg-white rounded-3xl border border-transparent hover:border-border transition-all shadow-sm">
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="p-12 space-y-12">
                <div className="grid grid-cols-2 gap-8">
                   <div className="p-10 bg-slate-900 rounded-[3rem] border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Total Amount Due</p>
                      <h4 className="text-5xl font-black text-white tracking-tighter">₹{total}</h4>
                      <div className="mt-6 flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/30">
                         Tax Included
                      </div>
                   </div>
                   <div className="p-10 bg-slate-50 rounded-[3rem] border-2 border-border flex flex-col items-center text-center group hover:bg-white transition-all">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Quantity Summary</p>
                      <h4 className="text-5xl font-black text-text-primary tracking-tighter">{cart.reduce((a, b) => a + b.qty, 0)}</h4>
                      <p className="mt-4 text-xs font-bold text-text-secondary">Across {cart.length} unique items</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] ml-2">Choose Payment Channel</h4>
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { name: 'Cash', icon: Receipt, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { name: 'Card', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { name: 'UPI', icon: ChevronRight, color: 'text-primary', bg: 'bg-indigo-50' },
                      { name: 'Split', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((method) => (
                      <motion.button 
                        whileHover={{ y: -5, scale: 1.02 }}
                        key={method.name} 
                        className={cn(
                          "p-8 rounded-[2.5rem] border-4 flex flex-col items-center gap-4 transition-all group", 
                          method.name === 'Cash' ? "border-primary bg-indigo-50/30 shadow-xl shadow-primary/10" : "border-slate-50 bg-slate-50/50 hover:border-primary/20 hover:bg-white"
                        )}
                      >
                        <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12", method.bg)}>
                          <method.icon className={cn("w-8 h-8 stroke-[2.5]", method.color)} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{method.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-8 text-2xl shadow-2xl shadow-primary/40 rounded-[2.5rem] font-black tracking-tight"
                >
                  Pay & Print Receipt
                </motion.button>
                
                <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                   Secure Terminal Transaction 256-bit Encrypted
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POS;
