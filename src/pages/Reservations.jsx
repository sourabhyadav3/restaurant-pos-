import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Table2 as TableIcon,
  Bed,
  Car,
  CalendarCheck,
  TrendingUp,
  Activity,
  History,
  CheckCircle,
  XCircle,
  LogIn,
  ClipboardList,
  Sparkles
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useHospitality } from '../context/HospitalityContext';

const Reservations = () => {
  const { 
    reservations, 
    approveReservation, 
    rejectReservation, 
    checkInReservation, 
    completeReservation, 
    cancelReservation,
    deleteReservation,
    activityLog 
  } = useHospitality();
  
  const [selectedRes, setSelectedRes] = useState(null);
  const [showAddRes, setShowAddRes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const resStatuses = ['Pending', 'Confirmed', 'Checked In', 'Completed', 'Cancelled'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Checked In': return 'bg-indigo-50 text-primary border-indigo-100';
      case 'Completed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Table': return TableIcon;
      case 'Room': return Bed;
      case 'Transport': return Car;
      default: return Calendar;
    }
  };

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || res.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: 'Pending Bookings', value: reservations.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Confirmed Today', value: reservations.filter(r => r.status === 'Confirmed').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Guests', value: reservations.filter(r => r.status === 'Checked In').length, icon: User, color: 'text-primary', bg: 'bg-indigo-50' },
    { label: 'Total Volume', value: reservations.length, icon: TrendingUp, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header Area */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <CalendarCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-text-primary uppercase tracking-wider">Hospitality Desk</h2>
            <p className="text-text-secondary text-sm font-bold mt-1">Manage reservations and guest stays</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search guest or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 bg-white border border-slate-100 rounded-2xl outline-none shadow-sm text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </div>
          <button 
             onClick={() => setShowAddRes(true)}
            className="btn-primary h-[48px] px-6 rounded-2xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" /> New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {stats.map((stat, i) => (
           <div key={i} className="card bg-white border-none shadow-xl shadow-slate-100/50 p-5 flex items-center gap-4 rounded-[2rem]">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                 <h3 className="text-xl font-black text-text-primary mt-0.5">{stat.value}</h3>
              </div>
           </div>
         ))}
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Main Content: Reservations List */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1 shrink-0">
            {['All', ...resStatuses].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 whitespace-nowrap transition-all",
                  activeTab === tab 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/10" 
                  : "bg-white text-text-secondary border-transparent hover:bg-slate-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden lg:card bg-transparent lg:bg-white border-none lg:shadow-xl lg:shadow-slate-100/50 lg:rounded-[2.5rem]">
            <div className="h-full overflow-y-auto scrollbar-hide">
              {/* Desktop Table View */}
              <table className="w-full border-collapse hidden lg:table">
                <thead>
                  <tr className="text-left bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Guest</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredReservations.map((res) => {
                    const TypeIcon = getTypeIcon(res.type);
                    return (
                      <tr key={res.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => setSelectedRes(res)}>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-text-primary">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-text-primary uppercase tracking-tight">{res.guestName}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{res.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                              <TypeIcon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black text-text-primary uppercase tracking-widest">{res.type} • {res.targetId}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-[11px] font-bold text-text-primary">
                          {res.date} • {res.time}
                        </td>
                        <td className="px-8 py-5">
                          <span className={cn("px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border", getStatusBadge(res.status))}>
                            {res.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button 
                            className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-primary hover:border-primary transition-all shadow-sm"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4 pb-20">
                {filteredReservations.map((res) => {
                  const TypeIcon = getTypeIcon(res.type);
                  return (
                    <div 
                      key={res.id} 
                      onClick={() => setSelectedRes(res)}
                      className="card bg-white p-5 rounded-[2rem] shadow-lg shadow-slate-200/40 border-none space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-text-primary">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-text-primary uppercase tracking-tight">{res.guestName}</p>
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{res.id}</p>
                          </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border", getStatusBadge(res.status))}>
                          {res.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center text-primary">
                            <TypeIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest">{res.type} • {res.targetId}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                           <Clock className="w-3.5 h-3.5 text-slate-300" />
                           <span className="text-[9px] font-bold text-slate-500 uppercase">{res.time}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{res.date}</span>
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredReservations.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-center opacity-40">
                   <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-4">
                      <CalendarCheck className="w-10 h-10 text-slate-200" />
                   </div>
                   <p className="text-xs font-black uppercase tracking-widest">No reservations found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Activity Log */}
        <div className="hidden 2xl:flex w-[320px] flex-col gap-4 overflow-hidden">
           <div className="card bg-white border-none shadow-xl shadow-slate-100/50 p-6 rounded-[2.5rem] flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-6 shrink-0">
                 <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-black uppercase tracking-widest">Live Activity</h3>
                 </div>
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
                 {activityLog.map((log) => (
                   <div key={log.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-100 last:before:hidden">
                      <div className={cn("absolute left-[-4px] top-1.5 w-2 h-2 rounded-full", log.type === 'success' ? 'bg-emerald-500' : log.type === 'error' ? 'bg-rose-500' : 'bg-primary')} />
                      <p className="text-[11px] font-bold text-text-primary leading-relaxed uppercase tracking-tight">{log.message}</p>
                      <p className="text-[9px] font-bold text-slate-300 mt-1 uppercase tracking-widest">{log.time}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Modals */}
      {showAddRes && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div onClick={() => setShowAddRes(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 shrink-0">
              <h3 className="text-xl font-black uppercase tracking-tight">New Reservation</h3>
              <button onClick={() => setShowAddRes(false)} className="p-2 hover:bg-white rounded-xl transition-all"><X className="w-6 h-6" /></button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const guestName = formData.get('guestName');
                const type = formData.get('type');
                const targetId = formData.get('targetId');
                const date = formData.get('date');
                const time = formData.get('time');
                const guests = parseInt(formData.get('guests'));

                if (!guestName || !targetId || !date || !time) return;

                addReservation({
                  guestName,
                  type,
                  targetId,
                  date,
                  time,
                  guests,
                  status: 'Pending',
                  notes: formData.get('notes')
                });
                setShowAddRes(false);
              }}
              className="p-8 space-y-6 overflow-y-auto scrollbar-hide"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Guest Name</label>
                  <input name="guestName" required placeholder="Guest full name" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Guests</label>
                  <input name="guests" type="number" min="1" required defaultValue={2} className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Booking Type</label>
                  <select name="type" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all">
                    <option value="Table">Table Reservation</option>
                    <option value="Room">Room Booking</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit ID / Table Name</label>
                  <input name="targetId" required placeholder="e.g. RM-101 or T-01" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
                  <input name="date" type="date" required className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time</label>
                  <input name="time" type="time" required className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Special Notes</label>
                <textarea name="notes" placeholder="Any special requests..." className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 h-24 resize-none transition-all" />
              </div>

              <button type="submit" className="w-full btn-primary py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 active:scale-95 transition-all">
                Create Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <div onClick={() => setSelectedRes(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-10 duration-300">
            <div className="p-6 lg:p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 lg:w-14 h-12 lg:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                   {React.createElement(getTypeIcon(selectedRes.type), { className: "w-6 h-6 lg:w-7 lg:h-7" })}
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight">{selectedRes.guestName}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedRes.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRes(null)} className="p-3 hover:bg-white rounded-2xl transition-all"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-6 lg:p-8 space-y-6 lg:space-y-8 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Badge</p>
                  <div className="flex mt-2">
                    <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border", getStatusBadge(selectedRes.status))}>
                      {selectedRes.status}
                    </span>
                  </div>
                </div>
                <div className="sm:text-right space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Assignment</p>
                  <p className="text-base lg:text-lg font-black text-text-primary uppercase mt-1">{selectedRes.targetId || 'Unassigned'}</p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
                 <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                       <Calendar className="w-6 h-6 text-primary" />
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stay Details</p>
                          <p className="text-sm font-black text-text-primary">{selectedRes.date} at {selectedRes.time}</p>
                       </div>
                    </div>
                    <div className="sm:text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Guests</p>
                       <p className="text-xl font-black text-text-primary">{selectedRes.guests}</p>
                    </div>
                 </div>
                 {selectedRes.notes && (
                   <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-t border-slate-100 pt-4 mt-4">
                      "{selectedRes.notes}"
                   </p>
                 )}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                 {selectedRes.status === 'Pending' && (
                   <>
                     <button 
                       onClick={() => { approveReservation(selectedRes.id); setSelectedRes(null); }}
                       className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                     >
                       <CheckCircle className="w-4 h-4" /> Approve
                     </button>
                     <button 
                       onClick={() => { rejectReservation(selectedRes.id); setSelectedRes(null); }}
                       className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                     >
                       <XCircle className="w-4 h-4" /> Reject
                     </button>
                   </>
                 )}

                 {selectedRes.status === 'Confirmed' && (
                   <>
                     <button 
                       onClick={() => { checkInReservation(selectedRes.id); setSelectedRes(null); }}
                       className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                     >
                       <LogIn className="w-4 h-4" /> Check In
                     </button>
                     <button 
                       onClick={() => { cancelReservation(selectedRes.id); setSelectedRes(null); }}
                       className="w-full sm:w-auto px-6 py-4 bg-rose-50 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                     >
                       Cancel
                     </button>
                   </>
                 )}

                 {selectedRes.status === 'Checked In' && (
                   <button 
                     onClick={() => { completeReservation(selectedRes.id); setSelectedRes(null); }}
                     className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     <Sparkles className="w-4 h-4" /> Mark Completed
                   </button>
                 )}

                 {(selectedRes.status === 'Completed' || selectedRes.status === 'Cancelled') && (
                    <button 
                      onClick={() => { 
                        if(confirm('Archive this record?')) {
                          deleteReservation(selectedRes.id); 
                          setSelectedRes(null); 
                        }
                      }}
                      className="w-full py-4 bg-rose-50 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Archive Booking
                    </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
