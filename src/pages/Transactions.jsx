import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  X, 
  ChevronRight, 
  CreditCard, 
  Calendar, 
  MoreVertical,
  CheckCircle2,
  Trash2,
  Bed,
  Users,
  Clock,
  Printer,
  Download,
  Wallet,
  ArrowUpRight,
  UtensilsCrossed,
  ArrowDownLeft
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useHospitality } from '../context/HospitalityContext';

const Transactions = () => {
  const { folios } = useHospitality();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolio, setSelectedFolio] = useState(null);

  // Focus on Settled folios as "Transactions"
  const settledFolios = folios.filter(f => f.status === 'Settled');
  
  const filteredTransactions = settledFolios.filter(f => 
    f.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = settledFolios.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header Area */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
            <History className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-text-primary uppercase tracking-wider">Transaction Ledger</h2>
            <p className="text-text-secondary text-sm font-bold mt-1">Audit trail of settled hospitality accounts</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
           <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Settled</p>
                 <p className="text-lg font-black text-emerald-500 tracking-tighter">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                 <ArrowUpRight className="w-4 h-4" />
              </div>
           </div>
          <div className="relative group min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by ID or Guest..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Folios List */}
        <div className="flex-1 overflow-hidden lg:card bg-transparent lg:bg-white border-none lg:shadow-xl lg:shadow-slate-100/50 lg:rounded-[2.5rem]">
           <div className="h-full overflow-y-auto scrollbar-hide">
              <table className="w-full border-collapse hidden lg:table">
                 <thead>
                    <tr className="text-left bg-slate-50/50 border-b border-slate-100">
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Guest</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Settled On</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                       <th className="px-8 py-5"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredTransactions.map((folio) => (
                      <tr key={folio.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => setSelectedFolio(folio)}>
                         <td className="px-8 py-5">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">#{folio.id}</span>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-text-primary">
                                  <Users className="w-4 h-4" />
                                </div>
                               <p className="text-sm font-black text-text-primary uppercase tracking-tight">{folio.guestName}</p>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <p className="text-xs font-bold text-slate-500 uppercase">Today</p>
                         </td>
                         <td className="px-8 py-5">
                            <span className="text-lg font-black text-emerald-500 tracking-tighter">₹{folio.total}</span>
                         </td>
                         <td className="px-8 py-5">
                            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2 w-fit">
                               <CheckCircle2 className="w-3 h-3" /> Paid
                            </span>
                         </td>
                         <td className="px-8 py-5 text-right">
                            <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-primary transition-all">
                               <Printer className="w-4 h-4" />
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
              {filteredTransactions.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-20 opacity-40">
                   <History className="w-16 h-16 mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-widest">No settled transactions found</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
