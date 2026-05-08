import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileText,
  Plus,
  Sparkles,
  Bed,
  Table2,
  MessageSquare,
  Activity,
  Heart,
  PieChart,
  BarChart3,
  CookingPot,
  Package,
  CreditCard,
  History
} from 'lucide-react';
import { cn } from "../../../utils/cn";
import { useAuth, roles } from "../../../context/AuthContext";
import { useMenu, categoryIconMap } from "../../../context/MenuContext";
import { useOrders } from "../../../context/OrdersContext";
import { useHospitality } from "../../../context/HospitalityContext";
import { useCommunication } from "../../../context/CommunicationContext";
import { useNotifications } from "../../../context/NotificationContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { categoriesList, addItem } = useMenu();
  const { orders } = useOrders();
  const { rooms, tables, reservations, activityLog, folios, inventory } = useHospitality();
  const { activeChats } = useCommunication();
  const { notifications } = useNotifications();

  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemIcon, setNewItemIcon] = useState('🍽️');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [toast, setToast] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [revenueViewMode, setRevenueViewMode] = useState('Weekly');

  const weeklyData = [
    { label: 'Mon', value: 4500 },
    { label: 'Tue', value: 6500 },
    { label: 'Wed', value: 3500 },
    { label: 'Thu', value: 8500 },
    { label: 'Fri', value: 4500 },
    { label: 'Sat', value: 9500 },
    { label: 'Sun', value: 7500 },
  ];

  const monthlyData = [
    { label: 'Week 1', value: 32000 },
    { label: 'Week 2', value: 45000 },
    { label: 'Week 3', value: 28000 },
    { label: 'Week 4', value: 54000 },
  ];

  const currentRevenueData = revenueViewMode === 'Weekly' ? weeklyData : monthlyData;
  const maxRevenue = Math.max(...currentRevenueData.map(d => d.value), 1);

  const isChef = user?.role === roles.CHEF;

  // Analytics Calculations
  const totalRestaurantRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, curr) => acc + parseInt(curr.amount.replace('₹', '') || 0), 0);
  
  const totalRoomRevenue = reservations
    .filter(r => r.status === 'Confirmed' || r.status === 'Checked In' || r.status === 'Completed')
    .reduce((acc, curr) => acc + (curr.price || 0), 0);

  const totalRevenue = totalRestaurantRevenue + totalRoomRevenue;
  const activeGuests = reservations.filter(r => r.status === 'Checked In').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const occupancyRate = ((occupiedRooms / rooms.length) * 100).toFixed(1);
  const kitchenLoad = orders.filter(o => ['Pending', 'Cooking'].includes(o.status)).length;
  const activeChatsCount = activeChats.length;
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  // Kitchen Specific Metrics
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const cookingOrders = orders.filter(o => o.status === 'Cooking').length;
  const readyOrders = orders.filter(o => o.status === 'Ready').length;
  const lowStockAlerts = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length;

  const stats = isChef ? [
    { id: 'pending', name: 'Pending Orders', value: pendingOrders.toString(), icon: Clock, change: 'Urgent', isUp: false, color: 'bg-orange-50 text-orange-600' },
    { id: 'cooking', name: 'Cooking Orders', value: cookingOrders.toString(), icon: CookingPot, change: 'In Progress', isUp: true, color: 'bg-indigo-50 text-primary' },
    { id: 'ready', name: 'Ready Orders', value: readyOrders.toString(), icon: CheckCircle2, change: 'Completed', isUp: true, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'stock', name: 'Low Stock Alerts', value: lowStockAlerts.toString(), icon: Package, change: 'Action Needed', isUp: false, color: 'bg-rose-50 text-rose-600' },
  ] : [
    { id: 'revenue', name: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, change: '+12.5%', isUp: true, color: 'bg-indigo-50 text-primary' },
    { id: 'occupancy', name: 'Occupancy Rate', value: `${occupancyRate}%`, icon: Bed, change: `${occupiedRooms}/${rooms.length} Rooms`, isUp: true, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'guests', name: 'Active Guests', value: activeGuests.toString(), icon: Users, change: '+5 Today', isUp: true, color: 'bg-orange-50 text-orange-600' },
    { id: 'kitchen', name: 'Kitchen Load', value: kitchenLoad.toString(), icon: Activity, change: 'High Demand', isUp: false, color: 'bg-rose-50 text-rose-600' },
  ];

  const showToastMessage = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddItem = (newItem) => {
    addItem(newItem);
    setShowAddItemModal(false);
    setNewItemIcon('🍽️');
    setNewItemCategory('');
    showToastMessage('Item added to POS menu successfully');
  };

  const updateAutoIcon = (category) => {
    const normalized = category.toLowerCase().trim().replace(/s$/, '');
    const mappedIcon = categoryIconMap[normalized];
    if (mappedIcon) {
      setNewItemIcon(mappedIcon);
    } else {
      const partialMatch = Object.keys(categoryIconMap).find(key => normalized.includes(key));
      setNewItemIcon(partialMatch ? categoryIconMap[partialMatch] : '🍽️');
    }
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6 relative pb-10">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 bg-primary text-white rounded-2xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest border border-primary/20">
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System Live • {isChef ? 'Kitchen Online' : 'All Modules Active'}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-text-primary tracking-tight uppercase">
            {isChef ? 'Kitchen' : 'Command'} <span className="text-primary">{isChef ? 'Ops Center' : 'Center'}</span>
          </h1>
          <p className="text-text-secondary text-xs lg:text-sm font-medium mt-1">
            {isChef ? 'Real-time kitchen throughput & stock monitoring' : 'Executive overview of hospitality & POS operations'}
          </p>
        </div>
        <div className="flex items-center gap-3">
           {!isChef && (
             <button onClick={() => setShowAddItemModal(true)} className="btn-primary h-11 px-6 rounded-xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">
                <Plus className="w-4 h-4" /> Add Item
             </button>
           )}
           <button className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-primary transition-all shadow-sm"><RefreshCw className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="card p-5 bg-white border-none shadow-xl shadow-slate-100/50 group hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer overflow-hidden relative">
             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700" />
             <div className="flex justify-between items-start mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", stat.color)}>
                   <stat.icon className={cn("w-6 h-6 stroke-[2]", stat.id === 'cooking' && "animate-spin-slow")} />
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                  stat.isUp ? "text-emerald-500 bg-emerald-50" : "text-rose-500 bg-rose-50"
                )}>
                   {stat.change}
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
                <h3 className="text-2xl font-black text-text-primary tracking-tighter mt-1">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Live Status Section */}
        <div className="xl:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rooms & Tables Status Grid */}
              <div className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                       <Bed className="w-4 h-4 text-primary" /> Rooms Status
                    </h3>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest">View Map</button>
                 </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 lg:gap-3">
                    {rooms.map(room => (
                      <div 
                        key={room.id}
                        title={`${room.name}: ${room.status}`}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center text-[9px] lg:text-[10px] font-black transition-all",
                          room.status === 'Available' ? "bg-emerald-50 text-emerald-600" :
                          room.status === 'Occupied' ? "bg-primary text-white shadow-lg shadow-primary/20" :
                          "bg-amber-50 text-amber-600"
                        )}
                      >
                         {room.name.slice(-3)}
                      </div>
                    ))}
                 </div>
                 <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <span className="text-[8px] font-black uppercase text-slate-400">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                       <span className="text-[8px] font-black uppercase text-slate-400">Occupied</span>
                    </div>
                 </div>
              </div>

              <div className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                       <Table2 className="w-4 h-4 text-orange-500" /> Tables Status
                    </h3>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest">Manage</button>
                 </div>
                 <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 lg:gap-3">
                    {tables.map(table => (
                      <div 
                        key={table.id}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center text-[9px] lg:text-[10px] font-black transition-all",
                          table.status === 'available' ? "bg-emerald-50 text-emerald-600" :
                          table.status === 'occupied' ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" :
                          "bg-rose-50 text-rose-600"
                        )}
                      >
                         {table.name.replace('T-', '')}
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Live Revenue Chart (Simple CSS implementation) */}
           <div className="card p-6 lg:p-8 bg-white border-none shadow-xl shadow-slate-100/50 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                 <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Revenue Trends</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily Hospitality Income Breakdown</p>
                 </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setRevenueViewMode('Weekly')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        revenueViewMode === 'Weekly' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                      )}
                    >
                      Weekly
                    </button>
                    <button 
                      onClick={() => setRevenueViewMode('Monthly')}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                        revenueViewMode === 'Monthly' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                      )}
                    >
                      Monthly
                    </button>
                  </div>
              </div>
              <div className="h-48 flex items-end gap-3 lg:gap-6 px-2 lg:px-4 overflow-x-auto scrollbar-hide">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={revenueViewMode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex items-end gap-3 lg:gap-6 h-full"
                  >
                    {currentRevenueData.map((data, i) => (
                      <div key={i} className="min-w-[32px] flex-1 flex flex-col items-center gap-3 group h-full">
                          <div className="w-full relative h-full flex items-end">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${(data.value / maxRevenue) * 100}%` }}
                              className="w-full bg-primary rounded-xl relative min-h-[4px]"
                            >
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-primary text-[8px] font-black whitespace-nowrap">
                                  ₹{data.value.toLocaleString()}
                                </div>
                            </motion.div>
                          </div>
                          <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.05) }}
                            className="text-[8px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap"
                          >
                            {data.label}
                          </motion.span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
           </div>

           {/* Recent Activity Section */}
           <div className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> Live Operational Log
                 </h3>
                 <button className="p-2 text-slate-300 hover:text-primary transition-all"><MoreVertical className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                 {activityLog.slice(0, 4).map((log, idx) => (
                   <div key={idx} className="flex items-center gap-4 group">
                      <div className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        log.type === 'success' ? "bg-emerald-500" : log.type === 'error' ? "bg-rose-500" : "bg-primary"
                      )} />
                      <p className="flex-1 text-xs font-bold text-text-primary">{log.message}</p>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{log.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Operational Stats & Alerts */}
        <div className="space-y-6">
           {/* Quick Stats Grid */}
           <div className="grid grid-cols-2 gap-4">
              <div className="card p-5 bg-gradient-to-br from-indigo-500 to-primary text-white border-none shadow-xl shadow-primary/30">
                 <MessageSquare className="w-6 h-6 mb-4 opacity-50" />
                 <h4 className="text-2xl font-black">{activeChatsCount}</h4>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Guest Chats</p>
              </div>
              <div className="card p-5 bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none shadow-xl shadow-rose-500/30">
                 <AlertCircle className="w-6 h-6 mb-4 opacity-50" />
                 <h4 className="text-2xl font-black">{unreadNotifications}</h4>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Pending Alerts</p>
              </div>
           </div>

           {/* Revenue Source Breakdown */}
           <div className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Revenue Mix</h3>
              <div className="space-y-5">
                 {[
                   { name: 'Restaurant', val: totalRestaurantRevenue, max: totalRevenue, color: 'bg-primary' },
                   { name: 'Rooms', val: totalRoomRevenue, max: totalRevenue, color: 'bg-emerald-500' },
                   { name: 'Services', val: 1240, max: totalRevenue, color: 'bg-amber-500' }
                 ].map((src, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                         <span>{src.name}</span>
                         <span className="text-text-primary">₹{src.val.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                         <div 
                           className={cn("h-full rounded-full transition-all duration-1000", src.color)} 
                           style={{ width: `${(src.val / src.max) * 100}%` }} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Recent Orders List */}
           <div className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-sm font-black uppercase tracking-widest">Recent Orders</h3>
                 <button className="text-[9px] font-black text-primary uppercase tracking-widest">Full Feed</button>
              </div>
              <div className="space-y-4">
                 {recentOrders.map(order => (
                   <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-xs shadow-sm">
                            {order.id.slice(1, 2)}
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-text-primary uppercase leading-none">{order.id}</p>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{order.table}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-text-primary">{order.amount}</p>
                         <span className={cn(
                           "text-[7px] font-black uppercase tracking-[0.2em]",
                           order.status === 'Ready' ? "text-emerald-500" : "text-amber-500"
                         )}>{order.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Add Item Modal (Preserved Functionality) */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div onClick={() => setShowAddItemModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-[520px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div>
                <h3 className="text-xl font-black tracking-tight uppercase">New Menu Item</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">POS Inventory Creation</p>
              </div>
              <button onClick={() => setShowAddItemModal(false)} className="p-2 hover:bg-white rounded-2xl transition-all shadow-sm"><X className="w-6 h-6" /></button>
            </div>
            
            <form 
              className="p-8 space-y-6 overflow-y-auto scrollbar-hide"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get('name');
                const category = newItemCategory;
                const price = parseFloat(formData.get('price'));
                const image = newItemIcon;
                const description = formData.get('description');
                
                if (!name || !category || isNaN(price) || price <= 0) {
                  showToastMessage('Please fill all required fields correctly', 'error');
                  return;
                }
                
                handleAddItem({ name, category, price, image, description });
              }}
            >
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Item Name *</label>
                    <input name="name" type="text" placeholder="e.g. Garlic Bread" className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category *</label>
                    <input 
                      name="category" 
                      type="text" 
                      list="categories" 
                      value={newItemCategory}
                      onChange={(e) => {
                        setNewItemCategory(e.target.value);
                        updateAutoIcon(e.target.value);
                      }}
                      placeholder="e.g. Sides" 
                      className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                      required 
                    />
                    <datalist id="categories">
                      {categoriesList.filter(c => c !== 'All').map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (₹) *</label>
                    <input name="price" type="number" step="0.01" placeholder="99.00" className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Emoji / Icon</label>
                    <input 
                      name="image" 
                      type="text" 
                      value={newItemIcon}
                      onChange={(e) => setNewItemIcon(e.target.value)}
                      placeholder="🍟" 
                      className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                    />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea name="description" placeholder="Short description..." className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm min-h-[100px] resize-none" />
               </div>

               <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowAddItemModal(false)} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/30 active:scale-95 transition-all">Create Item</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
