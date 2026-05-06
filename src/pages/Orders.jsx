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
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: '#1024', type: 'Dine-in', table: 'T-05', status: 'Ready', amount: '₹450', time: '12:45 PM', items: 3, date: 'Today', customer: 'Rahul K.' },
    { id: '#1025', type: 'Takeaway', table: '-', status: 'Cooking', amount: '₹120', time: '1:10 PM', items: 1, date: 'Today', customer: 'Guest' },
    { id: '#1026', type: 'Dine-in', table: 'T-02', status: 'Pending', amount: '₹890', time: '1:15 PM', items: 5, date: 'Today', customer: 'Priya S.' },
    { id: '#1027', type: 'Delivery', table: '-', status: 'New', amount: '₹340', time: '1:20 PM', items: 2, date: 'Today', customer: 'Amit V.' },
    { id: '#1028', type: 'Dine-in', table: 'T-08', status: 'Delivered', amount: '₹210', time: '1:05 PM', items: 2, date: 'Today', customer: 'Suresh M.' },
    { id: '#1029', type: 'Takeaway', table: '-', status: 'Cooking', amount: '₹550', time: '1:12 PM', items: 4, date: 'Today', customer: 'Guest' },
    { id: '#1030', type: 'Dine-in', table: 'T-12', status: 'Ready', amount: '₹1,250', time: '12:30 PM', items: 6, date: 'Today', customer: 'Anjali R.' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Cooking': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Ready': return 'bg-green-50 text-success border-green-100';
      case 'Delivered': return 'bg-slate-50 text-text-secondary border-border';
      default: return 'bg-slate-50 text-text-secondary border-border';
    }
  };

  return (
    <div className="space-y-8 relative h-full flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-text-primary">Order History</h2>
          <p className="text-text-secondary mt-1 font-medium">Detailed log of all restaurant orders and their statuses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by ID or Customer..." 
              className="pl-12 pr-4 py-3 bg-white border border-border rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all w-72 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-border rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {['All', 'New', 'Pending', 'Cooking', 'Ready', 'Delivered'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all border-2",
              activeTab === tab 
                ? "bg-primary text-white border-primary shadow-xl shadow-indigo-100" 
                : "bg-white text-text-secondary border-transparent hover:border-primary/20 hover:bg-indigo-50/30"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="card p-0 overflow-hidden flex-1 flex flex-col shadow-2xl border-primary/5">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="text-left text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] border-b border-border bg-slate-50">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer / Table</th>
                <th className="px-8 py-5">Type</th>
                <th className="px-8 py-5">Items</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={order.id} 
                  className="text-sm hover:bg-indigo-50/20 transition-colors group cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-8 py-6">
                    <span className="font-black text-primary text-base">{order.id}</span>
                    <p className="text-[10px] font-bold text-text-secondary mt-1">{order.time}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-text-primary text-base">{order.customer}</p>
                    <p className="text-xs font-bold text-text-secondary mt-1">
                      {order.table !== '-' ? `Table ${order.table}` : 'No Table'}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "badge font-black",
                      order.type === 'Dine-in' ? "bg-indigo-50 text-primary" : 
                      order.type === 'Takeaway' ? "bg-orange-50 text-orange-600" : "bg-purple-50 text-purple-600"
                    )}>
                      {order.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-text-secondary">
                    {order.items} {order.items === 1 ? 'Item' : 'Items'}
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn("badge font-black border-2", getStatusStyle(order.status))}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-text-primary text-lg">{order.amount}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-3 bg-slate-50 text-text-secondary hover:text-primary hover:bg-white hover:shadow-md rounded-2xl border border-transparent hover:border-border transition-all">
                        <Printer className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-slate-50 text-text-secondary hover:text-primary hover:bg-white hover:shadow-md rounded-2xl border border-transparent hover:border-border transition-all">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-border flex items-center justify-between bg-slate-50/50">
          <p className="text-sm font-bold text-text-secondary">Showing <span className="text-text-primary font-black">7</span> of 124 orders</p>
          <div className="flex gap-3">
            <button className="p-2.5 bg-white border border-border rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2.5 bg-white border border-border rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Side Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-[450px] bg-surface shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-border flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black">Order Details</h3>
                  <p className="text-text-secondary font-bold mt-1">{selectedOrder.id} • {selectedOrder.time}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-white rounded-2xl border border-transparent hover:border-border transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 {/* Customer Info */}
                 <div className="p-6 bg-slate-50 rounded-3xl border border-border">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-100">
                          {selectedOrder.customer.charAt(0)}
                       </div>
                       <div>
                          <h4 className="text-xl font-black">{selectedOrder.customer}</h4>
                          <p className="text-sm font-bold text-text-secondary">{selectedOrder.type} • {selectedOrder.table !== '-' ? `Table ${selectedOrder.table}` : 'N/A'}</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 border-dashed">
                       <div>
                          <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Order Status</p>
                          <span className={cn("badge inline-block mt-1 font-black", getStatusStyle(selectedOrder.status))}>{selectedOrder.status}</span>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Date</p>
                          <p className="text-sm font-bold text-text-primary mt-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {selectedOrder.date}</p>
                       </div>
                    </div>
                 </div>

                 {/* Order Items */}
                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-text-secondary uppercase tracking-widest">Order Summary</h4>
                    <div className="space-y-4">
                       {[1, 2, 3].map((_, i) => (
                         <div key={i} className="flex justify-between items-center group">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-sm border border-border group-hover:border-primary transition-colors">
                                  {i === 0 ? 2 : 1}x
                               </div>
                               <div>
                                  <p className="font-bold text-text-primary">{i === 0 ? 'Pepperoni Pizza' : i === 1 ? 'Garlic Bread' : 'Diet Coke'}</p>
                                  <p className="text-xs font-bold text-text-secondary mt-0.5">₹{i === 0 ? 399 : i === 1 ? 149 : 49}</p>
                               </div>
                            </div>
                            <p className="font-black text-text-primary">₹{i === 0 ? 798 : i === 1 ? 149 : 49}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Totals */}
                 <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl">
                    <div className="space-y-4">
                       <div className="flex justify-between text-slate-400 font-bold">
                          <span>SUBTOTAL</span>
                          <span>{selectedOrder.amount}</span>
                       </div>
                       <div className="flex justify-between text-slate-400 font-bold">
                          <span>TAX (GST 5%)</span>
                          <span>₹45</span>
                       </div>
                       <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                          <div>
                             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Paid</p>
                             <h4 className="text-4xl font-black text-primary">{selectedOrder.amount}</h4>
                          </div>
                          <span className="badge bg-green-500/20 text-success border-none font-black px-4 py-2">PAID</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-border flex gap-4 bg-white">
                 <button className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
                    <Printer className="w-4 h-4" /> Print Bill
                 </button>
                 <button className="flex-1 btn-primary py-4 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs">
                    <Download className="w-4 h-4" /> Export PDF
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

