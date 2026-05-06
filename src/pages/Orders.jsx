import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Timer,
  ChevronRight,
  X,
  Printer,
  Download,
  Calendar,
  ChevronLeft,
  ShoppingBag,
  ExternalLink,
  MapPin,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    { id: '#1024', type: 'Dine-in', table: 'T-05', status: 'Ready', amount: '₹450', time: '12:45 PM', items: 3, date: 'Today', customer: 'Rahul K.', payment: 'UPI' },
    { id: '#1025', type: 'Takeaway', table: '-', status: 'Cooking', amount: '₹120', time: '1:10 PM', items: 1, date: 'Today', customer: 'Guest', payment: 'Cash' },
    { id: '#1026', type: 'Dine-in', table: 'T-02', status: 'Pending', amount: '₹890', time: '1:15 PM', items: 5, date: 'Today', customer: 'Priya S.', payment: 'Card' },
    { id: '#1027', type: 'Delivery', table: '-', status: 'New', amount: '₹340', time: '1:20 PM', items: 2, date: 'Today', customer: 'Amit V.', payment: 'UPI' },
    { id: '#1028', type: 'Dine-in', table: 'T-08', status: 'Delivered', amount: '₹210', time: '1:05 PM', items: 2, date: 'Today', customer: 'Suresh M.', payment: 'Cash' },
    { id: '#1029', type: 'Takeaway', table: '-', status: 'Cooking', amount: '₹550', time: '1:12 PM', items: 4, date: 'Today', customer: 'Guest', payment: 'Card' },
    { id: '#1030', type: 'Dine-in', table: 'T-12', status: 'Ready', amount: '₹1,250', time: '12:30 PM', items: 6, date: 'Today', customer: 'Anjali R.', payment: 'UPI' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Cooking': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Ready': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Delivered': return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-slate-50 text-text-secondary border-border';
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesTab = activeTab === 'All' || o.status === activeTab;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-10 relative h-full flex flex-col overflow-hidden pb-10">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 shrink-0">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-text-primary uppercase tracking-[0.05em]">Order Central</h2>
          <p className="text-text-secondary mt-2 text-lg font-medium">Manage and audit your restaurant's order lifecycle.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, customer..." 
              className="pl-14 pr-6 py-4 bg-white border border-border rounded-3xl text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all w-80 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-border rounded-3xl text-[10px] font-black uppercase tracking-widest hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-5 h-5" /> Filter Log
          </button>
        </div>
      </div>

      {/* Modern Tab System */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide shrink-0">
        {['All', 'New', 'Pending', 'Cooking', 'Ready', 'Delivered'].map(tab => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2",
              activeTab === tab 
                ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-200 scale-105" 
                : "bg-white text-text-secondary border-transparent hover:border-primary/20 hover:bg-indigo-50/30"
            )}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Premium Table Card */}
      <div className="card p-0 overflow-hidden flex-1 flex flex-col shadow-2xl shadow-slate-200/50 border-none bg-white rounded-[2.5rem]">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="text-left text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50 bg-slate-50/50 backdrop-blur-md">
                <th className="px-10 py-6">Ticket Details</th>
                <th className="px-10 py-6">Source / Table</th>
                <th className="px-10 py-6">Fulfillment</th>
                <th className="px-10 py-6">Log Status</th>
                <th className="px-10 py-6 text-right">Settlement</th>
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
                    className="text-sm hover:bg-slate-50 transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-50 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                         </div>
                         <div>
                            <span className="font-black text-text-primary text-lg tracking-tighter">{order.id}</span>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1.5">{order.time}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="font-black text-text-primary text-base leading-tight">{order.customer}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                        {order.table !== '-' ? `TABLE ${order.table}` : 'WALK-IN'}
                      </p>
                    </td>
                    <td className="px-10 py-8">
                      <div className={cn(
                        "badge font-black uppercase tracking-[0.1em] border-2",
                        order.type === 'Dine-in' ? "bg-indigo-50 text-primary border-indigo-100" : 
                        order.type === 'Takeaway' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      )}>
                        {order.type}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={cn("badge font-black border-2 py-1.5", getStatusStyle(order.status))}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-3 font-black text-text-primary text-xl tracking-tighter">
                          {order.amount}
                          <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Footer Stats */}
        <div className="px-10 py-8 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-6">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Displaying <span className="text-text-primary">{filteredOrders.length}</span> entries</p>
             <div className="h-4 w-[2px] bg-slate-200" />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Log <span className="text-text-primary">124</span></p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm disabled:opacity-30">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Side Panel */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[520px] bg-white shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 shrink-0">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl relative">
                     <ShoppingBag className="w-8 h-8" />
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Order Audit</h3>
                    <p className="text-text-secondary font-black uppercase tracking-widest text-[10px] mt-1.5 flex items-center gap-2">
                       {selectedOrder.id} <span className="w-1.5 h-1.5 rounded-full bg-slate-200" /> {selectedOrder.time}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-4 hover:bg-white rounded-[1.5rem] border border-transparent hover:border-slate-100 transition-all shadow-sm">
                  <X className="w-8 h-8 text-text-secondary" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
                 {/* Identity Summary */}
                 <div className="p-8 bg-slate-50 rounded-[3rem] border-2 border-slate-100 flex flex-col gap-8 relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center text-2xl font-black shadow-xl border border-slate-50">
                             {selectedOrder.customer.charAt(0)}
                          </div>
                          <div>
                             <h4 className="text-2xl font-black tracking-tight">{selectedOrder.customer}</h4>
                             <p className="text-xs font-bold text-text-secondary flex items-center gap-2 mt-1 uppercase tracking-widest">
                                <MapPin className="w-3.5 h-3.5" /> {selectedOrder.type}
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className={cn("badge px-4 py-2 font-black uppercase tracking-widest border-2", getStatusStyle(selectedOrder.status))}>
                             {selectedOrder.status}
                          </span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 pt-8 border-t-2 border-white relative z-10">
                       <div className="p-5 bg-white rounded-2xl shadow-sm">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Payment Mode</p>
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center text-primary">
                                <CreditCard className="w-4 h-4" />
                             </div>
                             <p className="text-sm font-black text-text-primary uppercase tracking-widest">{selectedOrder.payment}</p>
                          </div>
                       </div>
                       <div className="p-5 bg-white rounded-2xl shadow-sm">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Logic</p>
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                                <Timer className="w-4 h-4" />
                             </div>
                             <p className="text-sm font-black text-text-primary uppercase tracking-widest">Normal</p>
                          </div>
                       </div>
                    </div>
                    <Sparkles className="absolute -bottom-8 -right-8 w-40 h-40 text-primary opacity-[0.03] -rotate-12" />
                 </div>

                 {/* Order Contents */}
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">Kitchen Receipt List</h4>
                       <span className="text-[10px] font-black text-primary px-3 py-1 bg-indigo-50 rounded-full">{selectedOrder.items} ITEMS TOTAL</span>
                    </div>
                    <div className="space-y-4">
                       {[1, 2, 3].map((_, i) => (
                         <div key={i} className="flex justify-between items-center group p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-5">
                               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-base border-2 border-slate-50 group-hover:border-primary/20 transition-all shadow-sm">
                                  {i === 0 ? 2 : 1}x
                               </div>
                               <div>
                                  <p className="font-black text-text-primary text-base leading-none">{i === 0 ? 'Pepperoni Pizza' : i === 1 ? 'Garlic Bread' : 'Diet Coke'}</p>
                                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Unit: ₹{i === 0 ? 399 : i === 1 ? 149 : 49}</p>
                               </div>
                            </div>
                            <p className="font-black text-text-primary text-lg tracking-tighter">₹{i === 0 ? 798 : i === 1 ? 149 : 49}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Financial Summary */}
                 <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="space-y-5 relative z-10">
                       <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          <span>Subtotal Gross</span>
                          <span className="text-white">{selectedOrder.amount}</span>
                       </div>
                       <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                          <span>VAT / GST (5%)</span>
                          <span className="text-white">₹45.00</span>
                       </div>
                       <div className="pt-10 border-t border-slate-800 flex justify-between items-end">
                          <div>
                             <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Net Settlement</p>
                             <div className="flex items-baseline gap-2">
                                <h4 className="text-5xl font-black text-primary tracking-tighter">{selectedOrder.amount}</h4>
                                <span className="text-xs font-black text-primary/50">INR</span>
                             </div>
                          </div>
                          <div className="badge bg-emerald-500/20 text-emerald-500 border-none font-black px-6 py-2.5 rounded-2xl shadow-xl shadow-emerald-500/10">
                             PAID
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 border-t border-slate-50 flex gap-4 bg-white shrink-0">
                 <button className="flex-1 btn-secondary py-5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem]">
                    <Printer className="w-5 h-5" /> Print Receipt
                 </button>
                 <button className="flex-1 btn-primary py-5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] shadow-2xl shadow-primary/20">
                    <ExternalLink className="w-5 h-5" /> Full Audit
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
