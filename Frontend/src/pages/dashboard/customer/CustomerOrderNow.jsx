import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  Heart, 
  Plus, 
  Star, 
  Sparkles,
  UtensilsCrossed,
  X,
  Minus,
  Check,
  ShoppingBag,
  Trash2,
  CreditCard,
  Ticket,
  ChevronRight,
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';
import { cn } from "../../../utils/cn";
import { useMenu } from "../../../context/MenuContext";
import { useCustomer } from "../../../context/CustomerContext";
import { useOrders } from "../../../context/OrdersContext";
import { useHospitality } from "../../../context/HospitalityContext";
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerOrderNow = () => {
  const { items, categoriesList } = useMenu();
  const { 
    cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, 
    favorites, toggleFavorite, profile, appliedCoupon 
  } = useCustomer();
  const { addOrder } = useOrders();
  const { reservations, addToFolio } = useHospitality();
  const location = useLocation();
  const navigate = useNavigate();

  // Check for active room service eligibility
  const activeStay = reservations.find(r => r.guestName === profile.name && r.status === 'Checked In');
  const isRoomService = !!activeStay;
  
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);

  // Modal State for Customization
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  const openItemModal = (item) => {
    setSelectedItem(item);
    setSelectedSize(item.sizes ? item.sizes[0] : { name: 'Regular', price: item.price });
    setQuantity(1);
    setNotes('');
    setShowItemModal(true);
  };

  const handleAddToCartAction = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    addToCart(selectedItem, selectedSize, quantity, notes);
    setShowItemModal(false);
  };


  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const serviceCharge = cartItems.length > 0 ? 25 : 0;
  const total = subtotal + tax + serviceCharge;

  const CartSummary = ({ isMobile = false }) => (
    <div className={cn(
      "flex flex-col h-full bg-white",
      isMobile ? "p-6" : "p-0"
    )}>
       <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
               <ShoppingBag className="w-6 h-6 text-primary" /> Your Cart
            </h3>
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-lg uppercase tracking-widest mt-2 inline-block">{cartItems.length} Items</span>
          </div>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
              title="Clear Cart"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
       </div>

       {cartItems.length === 0 ? (
         <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-100 rounded-[2rem]">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
               <ShoppingBag className="w-8 h-8 text-slate-200" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cart is empty</p>
         </div>
       ) : (
         <>
           <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl group relative">
                   <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {item.image}
                   </div>
                   <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                         <div className="flex justify-between items-start">
                            <h4 className="text-[11px] font-black text-text-primary uppercase truncate pr-4">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="p-1 text-slate-300 hover:text-rose-500 transition-colors">
                               <Trash2 className="w-3 h-3" />
                            </button>
                         </div>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.size}</p>
                      </div>
                      <div className="flex items-center justify-between">
                         <p className="text-xs font-black text-primary tracking-tighter">₹{item.price * item.quantity}</p>
                         <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg shadow-sm">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="text-slate-400 hover:text-primary"><Minus className="w-3 h-3" /></button>
                            <span className="text-[10px] font-black w-2 text-center">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="text-slate-400 hover:text-primary"><Plus className="w-3 h-3" /></button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-text-primary font-black">₹{subtotal.toFixed(0)}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>GST (5%)</span>
                    <span className="text-emerald-500 font-black">₹{tax.toFixed(0)}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Service Fee</span>
                    <span className="text-text-primary font-black">₹{serviceCharge}</span>
                 </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                 <span className="text-xs font-black text-text-primary uppercase tracking-tight">Total Payable</span>
                 <span className="text-2xl font-black text-primary tracking-tighter">₹{total.toFixed(0)}</span>
              </div>
              <button 
                onClick={() => {
                  if (cartItems.length === 0) return;
                  
                  const newOrder = {
                    customer: profile.name,
                    table: isRoomService ? activeStay.targetId : (profile.tableId !== '-' ? `T-${profile.tableId}` : '-'),
                    type: isRoomService ? 'Room Service' : profile.diningType,
                    status: 'Pending',
                    amount: `₹${total.toFixed(0)}`,
                    items: cartItems.length,
                    itemsList: cartItems.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, size: i.size })),
                    source: isRoomService ? 'Room Service' : 'Customer',
                    paymentStatus: isRoomService ? 'Charged to Room' : 'Unpaid'
                  };
                  
                  addOrder(newOrder);
                  
                  if (isRoomService) {
                    addToFolio(profile.name, {
                      description: `Room Service: Order ${newOrder.id}`,
                      amount: total,
                      date: new Date().toLocaleDateString(),
                      type: 'Food'
                    });
                  }

                  clearCart();
                  alert(isRoomService ? `Order Placed! Delivered to Room ${activeStay.targetId}` : 'Order Placed Successfully! Heading to tracking...');
                  navigate('/customer/orders');
                }}
                className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all group"
              >
                Place Order <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
         </>
       )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] lg:h-full gap-8 relative">
      {/* Menu Side */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h2 className="text-2xl lg:text-3xl font-black text-text-primary uppercase tracking-tight leading-none">Order <span className="text-primary">Now</span></h2>
           <div className="flex-1 max-w-md relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food items..." 
                className="w-full pl-11 pr-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all"
              />
           </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {categoriesList.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 whitespace-nowrap transition-all",
                activeCategory === cat 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/10" 
                : "bg-white text-text-secondary border-transparent hover:bg-slate-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Items Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 pb-24 lg:pb-6">
              {filteredItems.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => openItemModal(item)}
                  className="card group cursor-pointer border-none shadow-xl shadow-slate-100/50 p-4 bg-white hover:bg-slate-50 transition-all flex flex-col h-full relative"
                >
                   <div className="absolute top-4 left-4 z-10 w-4 h-4 border-2 border-slate-100 rounded-sm flex items-center justify-center bg-white">
                     <div className={cn("w-2 h-2 rounded-full", item.id % 2 === 0 ? "bg-rose-500" : "bg-emerald-500")} />
                   </div>
                   <div className="h-40 bg-slate-50 rounded-[2rem] flex items-center justify-center text-6xl mb-4 shadow-inner relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                      {item.image}
                      <button 
                        onClick={(e) => handleToggleFavorite(item.id, e)}
                        className={cn(
                          "absolute top-4 right-4 p-2.5 rounded-xl shadow-lg transition-all active:scale-90",
                          favorites.includes(item.id) ? "bg-rose-500 text-white shadow-rose-200" : "bg-white/90 text-slate-300 hover:text-rose-500"
                        )}
                      >
                         <Heart className={cn("w-4 h-4", favorites.includes(item.id) && "fill-current")} />
                      </button>
                   </div>
                   <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 mb-1.5">
                         <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                         <span className="text-[9px] font-black text-slate-400 uppercase">4.8 • {item.category}</span>
                      </div>
                      <h4 className="font-black text-text-primary text-sm uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                      <p className="text-[10px] font-medium text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                   </div>
                   <div className="mt-5 flex items-center justify-between">
                      <p className="text-xl font-black text-text-primary tracking-tighter">₹{item.price}</p>
                      <button className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                         <Plus className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Cart Sidebar (Desktop) */}
      <div className="hidden lg:block w-80 xl:w-96 shrink-0">
         <div className="sticky top-6 card p-8 bg-white border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] h-[calc(100vh-12rem)] flex flex-col">
            <CartSummary />
         </div>
      </div>

      {/* Mobile Cart Bottom Sheet / Floating Action */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-[200]">
         <button 
           onClick={() => setShowMobileCart(true)}
           className="w-full h-16 bg-primary text-white rounded-2xl flex items-center justify-between px-6 shadow-2xl shadow-primary/40 active:scale-[0.98] transition-all"
         >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
               </div>
               <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{cartItems.length} Items</p>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">View Cart Summary</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-lg font-black tracking-tighter">₹{total.toFixed(0)}</p>
            </div>
         </button>
      </div>

      {/* Mobile Cart Drawer Overlay */}
      {showMobileCart && (
        <div className="fixed inset-0 z-[300] lg:hidden">
           <div onClick={() => setShowMobileCart(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] max-h-[85vh] flex flex-col overflow-hidden">
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto my-4" />
              <div className="flex-1 overflow-y-auto px-6 pb-10">
                 <CartSummary isMobile={true} />
              </div>
           </div>
        </div>
      )}

      {/* Customization Modal */}
      {showItemModal && selectedItem && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div onClick={() => setShowItemModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
             <div className="relative h-48 lg:h-56 bg-slate-50 flex items-center justify-center text-6xl lg:text-8xl shrink-0">
                {selectedItem.image}
                <button onClick={() => setShowItemModal(false)} className="absolute top-4 lg:top-6 right-4 lg:right-6 p-2 lg:p-3 bg-white/80 backdrop-blur-md rounded-2xl text-slate-400 hover:text-rose-500 shadow-xl transition-all">
                   <X className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
             </div>
             <div className="p-6 lg:p-10 space-y-6 lg:space-y-8 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                         <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded-md">{selectedItem.category}</span>
                         <div className="flex items-center gap-1 text-[9px] font-black text-yellow-500 uppercase">
                            <Star className="w-3 h-3 fill-current" /> 4.8 Ratings
                         </div>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight">{selectedItem.name}</h3>
                   </div>
                   <div className="sm:text-right shrink-0">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-xl lg:text-2xl font-black text-primary tracking-tighter">₹{selectedSize.price * quantity}</p>
                   </div>
                </div>

                {selectedItem.sizes && (
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Choose Size</p>
                     <div className="flex flex-wrap gap-3">
                        {selectedItem.sizes.map(size => (
                          <button 
                            key={size.name}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "flex-1 min-w-[100px] px-4 py-3 rounded-2xl border-2 transition-all text-center",
                              selectedSize.name === size.name 
                              ? "bg-primary/5 border-primary text-primary" 
                              : "bg-white border-slate-100 text-slate-400"
                            )}
                          >
                             <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{size.name}</p>
                             <p className="text-xs font-bold">₹{size.price}</p>
                          </button>
                        ))}
                     </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity</p>
                      <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl w-fit">
                         <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary shadow-sm"><Minus className="w-4 h-4" /></button>
                         <span className="text-lg font-black text-text-primary">{quantity}</span>
                         <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary shadow-sm"><Plus className="w-4 h-4" /></button>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Special Instructions</p>
                      <input 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any requests?" 
                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20"
                      />
                   </div>
                </div>

                <button 
                  onClick={handleAddToCartAction}
                  className="w-full btn-primary py-4 rounded-2xl lg:rounded-3xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                >
                   <Plus className="w-5 h-5" /> Add to Order
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderNow;
