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
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const POS = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const categories = ['All', 'Pizza', 'Burgers', 'Pasta', 'Sides', 'Drinks', 'Desserts'];
  
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 299, image: '🍕', description: 'Classic tomato, mozzarella, basil' },
    { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 399, image: '🍕', description: 'Beef pepperoni with extra cheese' },
    { id: 3, name: 'Cheese Burger', category: 'Burgers', price: 189, image: '🍔', description: 'Juicy patty with cheddar' },
    { id: 4, name: 'Chicken Pasta', category: 'Pasta', price: 349, image: '🍝', description: 'Creamy alfredo with grilled chicken' },
    { id: 5, name: 'Coca Cola', category: 'Drinks', price: 49, image: '🥤', description: 'Chilled 300ml' },
    { id: 6, name: 'Chocolate Lava', category: 'Desserts', price: 149, image: '🍰', description: 'Molten chocolate center' },
    { id: 7, name: 'Veggie Pizza', category: 'Pizza', price: 329, image: '🍕', description: 'Garden fresh vegetables' },
    { id: 8, name: 'Double Patty Burger', category: 'Burgers', price: 249, image: '🍔', description: 'Double meat, double cheese' },
    { id: 9, name: 'French Fries', category: 'Sides', price: 99, image: '🍟', description: 'Golden crispy fries' },
    { id: 10, name: 'Iced Coffee', category: 'Drinks', price: 129, image: '☕', description: 'Cold brew with milk' },
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
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

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex gap-8 h-full overflow-hidden">
      {/* Menu Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm font-medium"
            />
          </div>
          <div className="flex gap-3">
            <button className="p-3.5 bg-white border border-border rounded-2xl hover:bg-slate-50 transition-all shadow-sm group">
              <History className="w-5 h-5 text-text-secondary group-hover:text-primary" />
            </button>
            <button className="p-3.5 bg-white border border-border rounded-2xl hover:bg-slate-50 transition-all shadow-sm group">
              <Tag className="w-5 h-5 text-text-secondary group-hover:text-primary" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border-2",
                activeCategory === cat 
                  ? "bg-primary text-white border-primary shadow-xl shadow-indigo-100 scale-105" 
                  : "bg-white text-text-secondary border-transparent hover:border-primary/20 hover:bg-indigo-50/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pr-4 pb-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                key={item.id} 
                onClick={() => addToCart(item)}
                className="card group cursor-pointer border-2 border-transparent hover:border-primary/20 p-5 flex flex-col relative overflow-hidden"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-text-primary text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-text-secondary text-xs mt-1 font-medium line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xl font-black text-text-primary">₹{item.price}</p>
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:rotate-90 transition-transform duration-500">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cart Area */}
      <div className="w-[420px] flex flex-col shrink-0 h-full">
        <div className="card flex-1 flex flex-col p-0 overflow-hidden border-2 border-primary/10 shadow-2xl">
          <div className="p-8 border-b border-border bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-2xl flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-primary" /> Cart
              </h3>
              <button className="text-text-secondary hover:text-danger transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">Order #POS-7742</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.length > 0 ? (
                cart.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-black text-text-primary truncate">{item.name}</h5>
                      <p className="text-sm text-primary font-black mt-0.5">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white rounded-xl border-2 border-border p-1 shadow-sm">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-text-secondary">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-black">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:bg-slate-50 rounded-lg transition-all text-text-secondary">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <ShoppingCart className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="font-black text-xl text-text-primary">Your cart is empty</p>
                  <p className="text-text-secondary text-sm font-medium mt-2 max-w-[200px]">Looks like you haven't added anything yet!</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8 bg-slate-900 text-white rounded-t-[3rem] shadow-2xl">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 font-bold">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold">
                <span>Tax (GST 5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                <div>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Payable</p>
                  <h4 className="text-4xl font-black text-primary">₹{total}</h4>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-1 rounded mb-2">AUTO-SAVED</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 py-4 bg-slate-800 border border-slate-700 rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 disabled:opacity-50 transition-all"
              >
                <ChefHat className="w-5 h-5 text-primary" /> 
                KDS
              </button>
              <button 
                onClick={() => setShowPaymentModal(true)}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 py-4 bg-primary text-white rounded-3xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
              >
                <CreditCard className="w-5 h-5" /> 
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-surface rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-border flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-3xl font-black">Checkout</h3>
                  <p className="text-text-secondary font-bold mt-1">Select your preferred payment method</p>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="p-3 hover:bg-white rounded-full border border-transparent hover:border-border transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-10 space-y-10">
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-6 bg-slate-50 rounded-3xl border-2 border-border flex flex-col items-center text-center">
                      <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Amount due</p>
                      <h4 className="text-4xl font-black text-text-primary">₹{total}</h4>
                   </div>
                   <div className="p-6 bg-indigo-50 rounded-3xl border-2 border-primary/20 flex flex-col items-center text-center">
                      <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">Total Items</p>
                      <h4 className="text-4xl font-black text-primary">{cart.reduce((a, b) => a + b.qty, 0)}</h4>
                   </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-text-secondary uppercase tracking-widest">Payment Method</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: 'Cash', icon: Receipt, color: 'text-green-600', bg: 'bg-green-50' },
                      { name: 'Card', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { name: 'UPI', icon: ChevronRight, color: 'text-primary', bg: 'bg-indigo-50' },
                      { name: 'Split', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((method) => (
                      <button key={method.name} className={cn("p-5 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all group", method.name === 'Cash' ? "border-primary bg-indigo-50/50" : "border-border hover:border-primary/50 hover:bg-slate-50")}>
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", method.bg)}>
                          <method.icon className={cn("w-6 h-6", method.color)} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-primary py-6 text-xl shadow-2xl shadow-indigo-500/20 rounded-3xl font-black">
                  Complete Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POS;

