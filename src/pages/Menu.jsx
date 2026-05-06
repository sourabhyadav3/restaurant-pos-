import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Filter,
  Image as ImageIcon,
  ChevronRight,
  Star,
  Settings2,
  X,
  Camera,
  Layers,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: '₹299', status: 'In Stock', rating: '4.8', image: '🍕', description: 'Classic tomato, mozzarella, basil' },
    { id: 2, name: 'Cheese Burger', category: 'Burgers', price: '₹189', status: 'In Stock', rating: '4.5', image: '🍔', description: 'Juicy patty with cheddar' },
    { id: 3, name: 'Chicken Pasta', category: 'Pasta', price: '₹349', status: 'Low Stock', rating: '4.7', image: '🍝', description: 'Creamy alfredo with grilled chicken' },
    { id: 4, name: 'Iced Americano', category: 'Drinks', price: '₹129', status: 'In Stock', rating: '4.2', image: '☕', description: 'Double shot cold brew' },
    { id: 5, name: 'Chocolate Brownie', category: 'Desserts', price: '₹149', status: 'Out of Stock', rating: '4.9', image: '🍰', description: 'Warm with vanilla scoop' },
  ];

  const categories = [
    { name: 'All Items', icon: Layers },
    { name: 'Pizza', icon: Tag },
    { name: 'Burgers', icon: Tag },
    { name: 'Pasta', icon: Tag },
    { name: 'Main Course', icon: Tag },
    { name: 'Drinks', icon: Tag },
    { name: 'Desserts', icon: Tag },
  ];

  return (
    <div className="space-y-8 flex flex-col h-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-text-primary">Menu Catalog</h2>
          <p className="text-text-secondary mt-1 font-medium">Manage dishes, pricing, and stock availability.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2 py-4 px-8 shadow-2xl shadow-indigo-200"
        >
          <Plus className="w-5 h-5 stroke-[3]" /> Add New Item
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-full md:w-72 space-y-3 shrink-0">
          <div className="p-2 bg-slate-50 border border-border rounded-[2rem] space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-4 group",
                  activeCategory === cat.name 
                    ? "bg-primary text-white shadow-xl shadow-indigo-100" 
                    : "bg-transparent text-text-secondary hover:bg-white hover:text-primary"
                )}
              >
                <cat.icon className={cn("w-5 h-5", activeCategory === cat.name ? "text-white" : "text-slate-300 group-hover:text-primary")} />
                {cat.name}
              </button>
            ))}
          </div>
          <div className="p-6 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2rem] text-center">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Settings2 className="w-6 h-6 text-primary" />
             </div>
             <p className="text-xs font-black text-text-primary uppercase tracking-widest">Category Settings</p>
             <p className="text-[10px] font-bold text-text-secondary mt-1">Manage categories & tags</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items by name, category or price..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-[1.5rem] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm text-sm font-bold"
              />
            </div>
            <button className="p-4 bg-white border border-border rounded-[1.5rem] hover:bg-slate-50 transition-all shadow-sm group">
              <Filter className="w-5 h-5 text-text-secondary group-hover:text-primary" />
            </button>
          </div>

          <div className="card p-0 overflow-hidden flex-1 flex flex-col shadow-2xl border-primary/5">
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr className="text-left text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] border-b border-border bg-slate-50">
                    <th className="px-8 py-5">Item Details</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Price</th>
                    <th className="px-8 py-5">Availability</th>
                    <th className="px-8 py-5">Rating</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="text-sm hover:bg-indigo-50/20 transition-colors group cursor-pointer">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-border group-hover:scale-110 transition-transform">
                            {item.image}
                          </div>
                          <div>
                             <span className="font-black text-text-primary text-base">{item.name}</span>
                             <p className="text-xs font-bold text-text-secondary mt-0.5 line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="badge bg-slate-100 text-text-secondary font-black border-none">{item.category}</span>
                      </td>
                      <td className="px-8 py-6 font-black text-text-primary text-lg">{item.price}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "badge font-black border-2",
                          item.status === 'In Stock' ? "bg-green-50 text-success border-green-100" :
                          item.status === 'Low Stock' ? "bg-orange-50 text-orange-600 border-orange-100" :
                          "bg-red-50 text-danger border-red-100"
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 font-black text-text-primary bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100 w-fit">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> {item.rating}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 bg-white text-text-secondary hover:text-primary hover:shadow-md rounded-2xl border border-border transition-all">
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button className="p-3 bg-white text-text-secondary hover:text-danger hover:shadow-md rounded-2xl border border-border transition-all">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
         {showAddModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl bg-surface rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                <div className="p-10 border-b border-border flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="text-3xl font-black">Add Menu Item</h3>
                    <p className="text-text-secondary font-bold mt-1">Create a new dish for your restaurant catalog</p>
                  </div>
                  <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white rounded-full border border-transparent hover:border-border transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto scrollbar-thin">
                   <div className="flex gap-8">
                      <div className="w-32 h-32 bg-slate-100 rounded-[2rem] border-4 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-primary transition-colors">
                         <Camera className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
                         <span className="text-[10px] font-black text-slate-300 group-hover:text-primary uppercase tracking-widest">Upload</span>
                      </div>
                      <div className="flex-1 space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Item Name</label>
                            <input type="text" placeholder="e.g. Classic Margherita" className="w-full px-6 py-4 bg-slate-50 border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Price (₹)</label>
                               <input type="number" placeholder="299" className="w-full px-6 py-4 bg-slate-50 border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Category</label>
                               <select className="w-full px-6 py-4 bg-slate-50 border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold appearance-none">
                                  <option>Pizza</option>
                                  <option>Burgers</option>
                                  <option>Pasta</option>
                               </select>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Description</label>
                      <textarea placeholder="Tell your customers about this dish..." rows="3" className="w-full px-6 py-4 bg-slate-50 border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold"></textarea>
                   </div>
                </div>

                <div className="p-10 border-t border-border flex gap-4">
                   <button onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary py-5 rounded-2xl font-black uppercase tracking-widest">Cancel</button>
                   <button className="flex-1 btn-primary py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100">Create Item</button>
                </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;

