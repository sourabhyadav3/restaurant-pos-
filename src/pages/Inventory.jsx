import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  ChevronRight,
  TrendingUp,
  Activity,
  History,
  Trash2,
  Edit2,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useHospitality } from '../context/HospitalityContext';

const Inventory = () => {
  const { inventory, addInventoryItem, updateStock, deleteInventoryItem } = useHospitality();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Kitchen', 'Bar', 'Rooms', 'Maintenance'];

  const filteredInventory = inventory.filter(item => {
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Low Stock': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Out of Stock': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Package className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-text-primary uppercase tracking-wider">Stock <span className="text-primary">Control</span></h2>
            <p className="text-text-secondary text-sm font-bold mt-1">Manage hospitality & POS inventory</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary h-[48px] px-6 rounded-2xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
             <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1 shrink-0">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 whitespace-nowrap transition-all",
                activeTab === cat 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/10" 
                : "bg-white text-text-secondary border-transparent hover:bg-slate-50 shadow-sm"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inventory List */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide">
           {filteredInventory.length === 0 ? (
             <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-4">
                   <Package className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest">No inventory items found</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-10">
                {filteredInventory.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer group relative overflow-hidden"
                  >
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-inner group-hover:bg-primary group-hover:text-white transition-all">
                           {item.category === 'Kitchen' ? '🍳' : item.category === 'Bar' ? '🍷' : item.category === 'Rooms' ? '🛏️' : '🔧'}
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shadow-sm",
                          getStatusColor(item.status)
                        )}>
                           {item.status}
                        </span>
                     </div>

                     <div className="relative z-10">
                        <h4 className="text-lg font-black text-text-primary uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.id} • {item.category}</p>
                     </div>

                     <div className="grid grid-cols-2 gap-4 my-6 relative z-10">
                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Current Stock</p>
                           <p className="text-xl font-black text-text-primary tracking-tighter">{item.stock} <span className="text-[10px] font-bold text-slate-300 ml-1">{item.unit}</span></p>
                        </div>
                        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Min. Threshold</p>
                           <p className="text-xl font-black text-slate-300 tracking-tighter">{item.minStock} <span className="text-[10px] font-bold text-slate-200 ml-1">{item.unit}</span></p>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                           <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                           <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Rate: +12%</span>
                        </div>
                        <p className="text-sm font-black text-primary">₹{item.price.toLocaleString()}</p>
                     </div>

                     <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <InventoryModal 
          onClose={() => setShowAddModal(false)}
          onSave={addInventoryItem}
          categories={categories.filter(c => c !== 'All')}
        />
      )}

      {/* Stock Update Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
           <div onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
           <div className="relative w-full max-w-md bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
              <div className="p-6 lg:p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="w-12 lg:w-14 h-12 lg:h-14 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-primary/20 shrink-0">
                       <Package className="w-6 lg:w-7 h-6 lg:h-7" />
                    </div>
                    <div>
                       <h3 className="text-lg lg:text-xl font-black text-text-primary uppercase tracking-tight truncate max-w-[150px] sm:max-w-none">{selectedItem.name}</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {selectedItem.id}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white rounded-2xl shadow-sm"><X className="w-6 h-6" /></button>
              </div>

              <div className="p-6 lg:p-8 space-y-8 text-center overflow-y-auto scrollbar-hide">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Inventory</p>
                    <div className="flex items-baseline justify-center gap-2">
                       <h4 className="text-4xl lg:text-5xl font-black text-text-primary tracking-tighter">{selectedItem.stock}</h4>
                       <span className="text-lg lg:text-xl font-black text-slate-300 uppercase tracking-tight">{selectedItem.unit}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => { updateStock(selectedItem.id, 10); setSelectedItem(null); }}
                      className="group p-5 lg:p-6 bg-emerald-50 hover:bg-emerald-500 rounded-2xl lg:rounded-3xl border border-emerald-100 transition-all text-center flex flex-col items-center gap-3"
                    >
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-all shadow-sm">
                          <Plus className="w-5 h-5" />
                       </div>
                       <p className="text-[10px] font-black text-emerald-700 group-hover:text-white uppercase tracking-widest">Add +10</p>
                    </button>
                    <button 
                      onClick={() => { updateStock(selectedItem.id, -10); setSelectedItem(null); }}
                      className="group p-5 lg:p-6 bg-rose-50 hover:bg-rose-500 rounded-2xl lg:rounded-3xl border border-rose-100 transition-all text-center flex flex-col items-center gap-3"
                    >
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-all shadow-sm">
                          <Trash2 className="w-5 h-5" />
                       </div>
                       <p className="text-[10px] font-black text-rose-700 group-hover:text-white uppercase tracking-widest">Remove -10</p>
                    </button>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-50 flex flex-col sm:flex-row gap-3 lg:gap-4 bg-white shrink-0">
                 <button 
                   onClick={() => { deleteInventoryItem(selectedItem.id); setSelectedItem(null); }}
                   className="flex-1 py-4 bg-white border border-slate-100 text-rose-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-50 transition-all active:scale-95"
                 >
                    Delete Product
                 </button>
                 <button onClick={() => setSelectedItem(null)} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest">Close</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const InventoryModal = ({ onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Kitchen',
    stock: 0,
    unit: 'pcs',
    minStock: 10,
    price: 0
  });

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
       <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
       <div className="relative w-full max-w-xl bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
          <div className="px-6 lg:px-8 py-5 lg:py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/20 shrink-0">
             <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Onboard Product</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Hospitality asset registration</p>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-white rounded-2xl transition-all shadow-sm"><X className="w-6 h-6" /></button>
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); onSave(formData); onClose(); }} 
            className="p-6 lg:p-8 space-y-6 overflow-y-auto scrollbar-hide"
          >
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                   <input 
                     type="text" 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     placeholder="e.g. Arabica Coffee"
                     className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                     required 
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                   <select 
                     value={formData.category}
                     onChange={(e) => setFormData({...formData, category: e.target.value})}
                     className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm appearance-none"
                   >
                      {categories.map(c => <option key={c}>{c}</option>)}
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                   <input 
                     type="number" 
                     value={formData.stock}
                     onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                     className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                     required 
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit</label>
                   <input 
                     type="text" 
                     value={formData.unit}
                     onChange={(e) => setFormData({...formData, unit: e.target.value})}
                     placeholder="kg/pcs/ltr"
                     className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                     required 
                   />
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Threshold</label>
                   <input 
                     type="number" 
                     value={formData.minStock}
                     onChange={(e) => setFormData({...formData, minStock: parseInt(e.target.value)})}
                     className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                     required 
                   />
                </div>
             </div>

             <div className="space-y-1.5">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Unit Price (₹)</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none font-bold text-sm" 
                  required 
                />
             </div>

             <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all">Add to Stock</button>
             </div>
          </form>
       </div>
    </div>
  );
};

export default Inventory;
