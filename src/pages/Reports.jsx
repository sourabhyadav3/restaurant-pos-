import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  PieChart, 
  ArrowRight, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  ChevronRight,
  Plus,
  RefreshCw,
  Printer,
  X,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Star
} from 'lucide-react';
import { cn } from '../utils/cn';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('This Month');
  const [activeChartTab, setActiveChartTab] = useState('Revenue');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [toast, setToast] = useState(null);

  // Mock Data Logic
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      showToast('Report data refreshed');
    }, 1000);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Revenue,Orders,Guests\n2024-05-01,45000,120,340\n2024-05-02,52000,145,410";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `restaurant-report-${timeRange.toLowerCase().replace(' ', '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    showToast('CSV Report Downloaded');
  };

  const handlePrint = () => {
    window.print();
    showToast('Print command sent');
  };

  const stats = [
    { id: 'revenue', label: 'Total Revenue', value: '₹12,45,230', trend: '+14.2%', up: true, icon: DollarSign, color: 'primary', description: 'Total gross income from all channels.' },
    { id: 'aov', label: 'Avg Order Value', value: '₹480', trend: '+8.5%', up: true, icon: ShoppingBag, color: 'orange', description: 'Average spending per ticket.' },
    { id: 'guests', label: 'Total Guests', value: '2,840', trend: '-2.4%', up: false, icon: Users, color: 'purple', description: 'Total footfall across all shifts.' },
    { id: 'profit', label: 'Net Profit', value: '₹3,12,000', trend: '+12.1%', up: true, icon: Target, color: 'success', description: 'Earnings after all operational costs.' },
  ];

  const performanceData = [
    { name: 'Rahul Sharma', role: 'Waiter', orders: 145, revenue: '₹42,500', rating: 4.8 },
    { name: 'Priya Singh', role: 'Chef', orders: 280, revenue: '₹1,24,000', rating: 4.9 },
    { name: 'Margherita Pizza', role: 'Top Dish', orders: 420, revenue: '₹1,25,580', rating: 4.7 },
    { name: 'Cheese Burger', role: 'Top Dish', orders: 310, revenue: '₹58,590', rating: 4.5 },
  ];

  const filteredPerformance = performanceData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col overflow-hidden relative">
      {/* Toast Feedback */}
      {toast && (
        <div 
          className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest border",
            toast.type === 'success' ? "bg-primary border-primary/20 text-white" : "bg-rose-600 border-rose-500 text-white"
          )}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
          {toast.message}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0 print:hidden">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight leading-none">Intelligence</h2>
          <p className="text-text-secondary mt-1.5 text-[10px] lg:text-sm font-medium flex items-center gap-2">
            Analytics • <span className="text-primary font-bold">Updated {lastUpdated}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
          <button 
            onClick={handleRefresh}
            className="p-2.5 bg-white border border-border rounded-xl hover:bg-slate-50 shadow-sm shrink-0"
          >
            <RefreshCw className={cn("w-4 h-4 text-text-secondary", isRefreshing && "animate-spin")} />
          </button>
          <button 
            onClick={handlePrint}
            className="p-2.5 bg-white border border-border rounded-xl hover:bg-slate-50 shadow-sm shrink-0"
          >
            <Printer className="w-4 h-4 text-text-secondary" />
          </button>
          <button 
            onClick={() => setShowDateModal(true)}
            className="flex items-center gap-2 px-3 lg:px-4 py-2.5 bg-white border border-border rounded-xl text-[8px] lg:text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm shrink-0"
          >
            <Calendar className="w-4 h-4 text-text-secondary" /> {timeRange}
          </button>
          <button 
            onClick={handleExport}
            className="btn-primary flex items-center gap-2 py-2.5 px-4 lg:px-5 shadow-xl shadow-primary/20 text-[8px] lg:text-[10px] uppercase tracking-widest font-black shrink-0"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 lg:pb-8 pr-1 lg:pr-2 scrollbar-hide space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {stats.map((stat) => (
            <div 
              onClick={() => setSelectedMetric(stat)}
              key={stat.label} 
              className="card group hover:border-primary/20 overflow-hidden relative p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] bg-white cursor-pointer border border-slate-100 shadow-sm active:scale-95 transition-all"
            >
              <div className="flex justify-between items-start mb-3 lg:mb-5">
                <p className="text-text-secondary text-[8px] lg:text-xs font-black uppercase tracking-widest leading-none">{stat.label}</p>
                <div className="text-primary opacity-60">
                  <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 stroke-[2]" />
                </div>
              </div>
              <div className="flex items-end justify-between relative z-10 gap-2">
                <h3 className="text-lg lg:text-3xl font-black text-text-primary tracking-tighter uppercase leading-none">{stat.value}</h3>
                <span className={cn(
                  "px-1.5 lg:px-2.5 py-0.5 lg:py-1 rounded-lg text-[7px] lg:text-[10px] font-black flex items-center gap-0.5 lg:gap-1 shrink-0",
                  stat.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {stat.up ? <ArrowUpRight className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5" /> : <ArrowDownRight className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5" />}
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 card p-5 lg:p-8 min-h-[350px] lg:min-h-[450px] flex flex-col shadow-2xl border-none bg-white rounded-[2rem] lg:rounded-[3rem]">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
                <div>
                   <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto pb-1 scrollbar-hide">
                      {['Revenue', 'Orders', 'Guests'].map(tab => (
                        <button 
                          key={tab}
                          onClick={() => setActiveChartTab(tab)}
                          className={cn(
                            "px-3 lg:px-4 py-1.5 rounded-lg lg:rounded-xl text-[8px] lg:text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                            activeChartTab === tab ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-slate-50"
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                   </div>
                   <p className="text-[8px] lg:text-[10px] font-black text-text-secondary mt-2 lg:mt-3 uppercase tracking-widest italic opacity-60 leading-none">Visualizing performance</p>
                </div>
                <div className="flex gap-4 lg:gap-6">
                   <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-primary shadow-sm shrink-0" />
                      <span className="text-[7px] lg:text-[9px] font-black uppercase tracking-widest text-text-secondary whitespace-nowrap">Current</span>
                   </div>
                   <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-100 shrink-0" />
                      <span className="text-[7px] lg:text-[9px] font-black uppercase tracking-widest text-text-secondary whitespace-nowrap">Benchmark</span>
                   </div>
                </div>
             </div>
             
             <div className="flex-1 flex items-end gap-2 lg:gap-3 px-1 lg:px-4 pb-2 lg:pb-4 h-48 lg:h-64">
                {[60, 45, 80, 55, 90, 70, 85, 40, 75, 65, 95, 80].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 lg:gap-3 group h-full justify-end">
                     <div className="w-full relative h-full flex flex-col justify-end">
                        <div 
                          style={{ height: `${h}%` }}
                          className="w-full bg-slate-50 rounded-lg lg:rounded-2xl group-hover:bg-slate-100"
                        />
                        <div 
                          style={{ height: `${h * 0.7}%` }}
                          className="absolute bottom-0 w-full bg-primary rounded-lg lg:rounded-2xl shadow-lg"
                        />
                     </div>
                     <span className="text-[7px] lg:text-[10px] font-black text-slate-300 group-hover:text-text-primary uppercase tracking-widest">W{i+1}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="card p-6 lg:p-8 min-h-[350px] lg:min-h-[450px] flex flex-col shadow-2xl border-none bg-white rounded-[2rem] lg:rounded-[3rem] relative overflow-hidden">
             <div className="flex justify-between items-start mb-4 lg:mb-6">
                <div>
                   <h4 className="text-base lg:text-lg font-black text-text-primary uppercase tracking-tight">Category Split</h4>
                   <p className="text-[8px] lg:text-[9px] font-black text-text-secondary uppercase tracking-widest mt-1">Top segments</p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-50 rounded-lg lg:rounded-xl flex items-center justify-center text-orange-500">
                   <PieChart className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
             </div>
             
             <div className="flex-1 flex items-center justify-center relative my-2 lg:my-4">
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full border-[12px] lg:border-[18px] border-slate-50 relative flex items-center justify-center shadow-inner">
                   <div className="absolute inset-0 rounded-full border-[12px] lg:border-[18px] border-primary border-t-transparent border-r-transparent rotate-45" />
                   <div className="absolute inset-0 rounded-full border-[12px] lg:border-[18px] border-orange-400 border-b-transparent border-l-transparent -rotate-12 opacity-80" />
                   <div className="text-center bg-white w-20 h-20 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center shadow-xl">
                      <p className="text-2xl lg:text-3xl font-black text-text-primary tracking-tighter">84%</p>
                      <p className="text-[7px] lg:text-[8px] font-black text-text-secondary uppercase tracking-widest">Growth</p>
                   </div>
                </div>
             </div>

             <div className="space-y-3 lg:space-y-4 mt-4 lg:mt-6">
                {[
                   { name: 'Pizzas', val: '42%', color: 'bg-primary' },
                   { name: 'Burgers', val: '28%', color: 'bg-orange-400' },
                   { name: 'Drinks', val: '18%', color: 'bg-indigo-300' },
                   { name: 'Desserts', val: '12%', color: 'bg-slate-200' },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between group cursor-pointer">
                     <div className="flex items-center gap-2 lg:gap-3">
                        <div className={cn("w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full shadow-sm", item.color)} />
                        <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-text-primary">{item.name}</span>
                     </div>
                     <span className="text-[10px] lg:text-xs font-black text-text-primary tracking-tight">{item.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="card p-0 overflow-hidden shadow-2xl border-none bg-white rounded-[2rem] lg:rounded-[3rem]">
           <div className="px-5 py-5 lg:px-8 lg:py-6 border-b border-slate-50 flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-slate-50/20">
              <div>
                <h4 className="text-lg lg:text-xl font-black text-text-primary uppercase tracking-tight leading-none">Intelligence Logs</h4>
                <p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 leading-none">Cross-sectional performance analysis</p>
              </div>
              <div className="relative group w-full lg:w-72">
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary" />
                 <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..." 
                  className="w-full pl-10 pr-4 py-2.5 lg:py-3 bg-white border border-slate-100 rounded-xl lg:rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none shadow-sm text-[9px] lg:text-[10px] font-bold uppercase tracking-widest"
                 />
              </div>
           </div>
           <div className="overflow-x-auto scrollbar-hide pb-2">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="text-left text-slate-400 text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] bg-slate-50/50">
                    <th className="px-6 lg:px-10 py-4 lg:py-5">Domain</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-5">Role</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-5">Units</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-5">Yield</th>
                    <th className="px-6 lg:px-10 py-4 lg:py-5 text-right">Service</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredPerformance.length > 0 ? filteredPerformance.map((row, idx) => (
                    <tr 
                      key={idx} 
                      className="text-[10px] lg:text-xs font-bold hover:bg-slate-50/50 group cursor-pointer active:bg-slate-50"
                    >
                      <td className="px-6 lg:px-10 py-4 lg:py-5">
                         <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary text-white rounded-lg lg:rounded-xl flex items-center justify-center text-[10px] lg:text-xs font-black shadow-lg shadow-primary/20 shrink-0">
                               {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-text-primary text-xs lg:text-sm font-black tracking-tight truncate max-w-[120px]">{row.name}</span>
                         </div>
                      </td>
                      <td className="px-6 lg:px-10 py-4 lg:py-5">
                         <span className="badge bg-indigo-50 text-primary border-none text-[7px] lg:text-[8px] uppercase tracking-widest">{row.role}</span>
                      </td>
                      <td className="px-6 lg:px-10 py-4 lg:py-5 text-text-primary font-black">{row.orders}</td>
                      <td className="px-6 lg:px-10 py-4 lg:py-5 text-primary font-black">{row.revenue}</td>
                      <td className="px-6 lg:px-10 py-4 lg:py-5 text-right">
                         <div className="flex items-center justify-end gap-1 text-yellow-600">
                            <Star className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-current" /> {row.rating}
                         </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="py-20 text-center">
                         <div className="flex flex-col items-center">
                            <AlertCircle className="w-10 h-10 text-slate-200 mb-4" />
                            <h5 className="text-lg font-black text-text-primary uppercase">No records found</h5>
                            <button 
                              onClick={() => setSearchQuery('')}
                              className="mt-4 text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                            >
                              Reset Feed
                            </button>
                         </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-10">
           <div className="card bg-primary text-white p-6 lg:p-10 overflow-hidden relative group rounded-[2rem] lg:rounded-[3rem] shadow-2xl shadow-primary/20 active:scale-[0.98] transition-all">
              <h5 className="text-lg lg:text-xl font-black mb-1 uppercase tracking-tight">Revenue Pulse</h5>
              <p className="text-white/40 text-[7px] lg:text-[9px] font-black uppercase tracking-widest mb-6 lg:mb-10 leading-none">Target: ₹15.0L</p>
              <div className="flex items-end justify-between mb-4">
                 <div className="flex flex-col">
                    <span className="text-[7px] lg:text-[9px] font-black text-white/40 uppercase tracking-widest mb-1 leading-none">Velocity</span>
                    <span className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-none">82<span className="text-sm lg:text-lg ml-0.5">%</span></span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[7px] lg:text-[9px] font-black text-white/40 uppercase tracking-widest mb-1 leading-none">Gap</span>
                    <span className="text-base lg:text-xl font-black text-white/60 leading-none">₹2.7L</span>
                 </div>
              </div>
              <div className="h-3 lg:h-4 bg-white/10 rounded-full overflow-hidden mb-2 shadow-inner">
                 <div 
                   style={{ width: '82%' }}
                   className="h-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.6)] relative"
                 >
                 </div>
              </div>
              <Target className="absolute -bottom-8 lg:-bottom-10 -right-8 lg:-right-10 w-32 lg:w-44 h-32 lg:h-44 text-white opacity-5" />
           </div>

           <div 
             onClick={() => setShowHeatmap(true)}
             className="card p-6 lg:p-10 bg-indigo-50 border-primary/10 flex flex-col justify-center rounded-[2rem] lg:rounded-[3rem] shadow-xl group hover:bg-white cursor-pointer active:scale-[0.98] transition-all"
           >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 shadow-md">
                 <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <h5 className="text-lg lg:text-xl font-black text-text-primary mb-1 lg:mb-1 uppercase tracking-tight">Peak Pulse</h5>
              <p className="text-[10px] lg:text-xs font-bold text-text-secondary mb-4 lg:mb-6 leading-relaxed">
                 Max throughput at <span className="text-primary font-black">7:30 PM</span>.
              </p>
              <button className="text-[8px] lg:text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                 Analyze Traffic <ChevronRight className="w-4 h-4" />
              </button>
           </div>

           <div 
             onClick={() => setShowConfig(true)}
             className="card p-6 lg:p-10 border-dashed border-2 lg:border-4 border-slate-100 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/20 hover:bg-slate-50 rounded-[2rem] lg:rounded-[3rem] bg-white active:scale-[0.98] transition-all"
           >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 lg:mb-4 group-hover:bg-white group-hover:shadow-2xl transition-all">
                 <Plus className="w-6 h-6 lg:w-8 lg:h-8 text-slate-300 group-hover:text-primary" />
              </div>
              <p className="text-[8px] lg:text-[10px] font-black text-text-secondary uppercase tracking-widest leading-none">Configure Feed</p>
           </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedMetric && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-6">
          <div onClick={() => setSelectedMetric(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]" />
          <div 
            className="relative w-full max-w-[520px] max-h-[90vh] lg:max-h-[85vh] bg-white shadow-2xl z-[201] flex flex-col rounded-t-[2.5rem] lg:rounded-[2.5rem] overflow-hidden self-end lg:self-center"
          >
             <div className="px-5 py-4 lg:px-6 lg:py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 shrink-0">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className={cn("p-3 lg:p-4 rounded-xl lg:rounded-2xl text-white shadow-xl shrink-0", selectedMetric.color === 'primary' ? 'bg-primary' : 'bg-orange-500')}>
                     <selectedMetric.icon className="w-5 lg:w-6 h-5 lg:h-6" />
                  </div>
                  <div>
                     <h3 className="text-lg lg:text-2xl font-black uppercase tracking-tight leading-none">{selectedMetric.label}</h3>
                     <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 lg:mt-1 leading-none">Deep Dive Analysis</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMetric(null)} className="p-2 lg:p-3 hover:bg-white rounded-xl lg:rounded-2xl shadow-sm border border-transparent hover:border-slate-100"><X className="w-6 lg:w-7 h-6 lg:h-7 text-slate-400" /></button>
             </div>

             <div className="flex-1 overflow-y-auto px-5 py-6 lg:px-6 lg:py-8 space-y-8 lg:space-y-10 scrollbar-hide">
                <div className="p-5 lg:p-6 bg-slate-50 rounded-[2rem] lg:rounded-[3rem] border border-slate-100 relative overflow-hidden">
                   <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 lg:mb-4">Definition</p>
                   <p className="text-xs lg:text-sm font-bold text-text-secondary leading-relaxed italic">"{selectedMetric.description}"</p>
                   <Zap className="absolute -bottom-8 lg:-bottom-10 -right-8 lg:-right-10 w-32 lg:w-40 h-32 lg:h-40 text-primary opacity-5" />
                </div>

                <div className="space-y-4 lg:space-y-6">
                   <h4 className="text-[9px] lg:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 lg:ml-2">Distribution</h4>
                   <div className="space-y-4 lg:space-y-4">
                      {[
                        { name: 'Dine-in Revenue', val: '₹7.2L', pct: 65, color: 'bg-primary' },
                        { name: 'Takeaway Revenue', val: '₹3.1L', pct: 25, color: 'bg-orange-400' },
                        { name: 'Delivery Revenue', val: '₹1.1L', pct: 10, color: 'bg-indigo-300' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5 lg:space-y-2 group">
                           <div className="flex justify-between items-end">
                              <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-primary">{item.name}</span>
                              <span className="text-xs lg:text-sm font-black text-text-primary">{item.val}</span>
                           </div>
                           <div className="h-1.5 lg:h-2 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                              <div 
                                style={{ width: `${item.pct}%` }}
                                className={cn("h-full rounded-full", item.color)}
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="p-5 lg:p-6 bg-primary rounded-[2rem] lg:rounded-[3rem] text-white shadow-2xl relative group overflow-hidden">
                   <div className="relative z-10">
                      <p className="text-white/40 text-[8px] lg:text-[10px] font-black uppercase tracking-widest mb-1.5 lg:mb-2">Benchmarking</p>
                      <h4 className="text-xl lg:text-3xl font-black tracking-tighter uppercase mb-4 lg:mb-6 leading-none">Delta Delta</h4>
                      <div className="grid grid-cols-2 gap-6 lg:gap-8">
                         <div>
                            <p className="text-[7px] lg:text-[8px] font-black text-white/40 uppercase tracking-widest mb-1 lg:mb-1.5">Ratio</p>
                            <p className="text-xl lg:text-2xl font-black text-white tracking-tighter">+12.4%</p>
                         </div>
                         <div>
                            <p className="text-[7px] lg:text-[8px] font-black text-white/40 uppercase tracking-widest mb-1 lg:mb-1.5">Vector</p>
                            <p className="text-xl lg:text-2xl font-black text-emerald-500 tracking-tighter uppercase">Optimal</p>
                         </div>
                      </div>
                   </div>
                   <BarChart3 className="absolute -bottom-8 lg:-bottom-10 -right-8 lg:-right-10 w-32 lg:w-44 h-32 lg:h-44 text-primary opacity-5" />
                </div>
             </div>

             <div className="px-5 py-5 lg:px-6 lg:py-6 border-t border-slate-50 bg-slate-50/20 shrink-0">
                <button onClick={() => setSelectedMetric(null)} className="w-full py-3.5 lg:py-4.5 bg-primary text-white rounded-xl lg:rounded-2xl font-black text-[9px] lg:text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">Close Intelligence</button>
             </div>
          </div>
        </div>
      )}

      {/* Date Range Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 lg:p-6">
           <div onClick={() => setShowDateModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
           <div 
             className="relative w-full max-w-sm bg-white rounded-t-[2.5rem] lg:rounded-[3rem] p-8 lg:p-10 shadow-2xl overflow-hidden self-end lg:self-center"
           >
             <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shrink-0">
               <Calendar className="w-7 lg:w-8 h-7 lg:h-8" />
             </div>
             <h3 className="text-lg lg:text-2xl font-black text-center uppercase tracking-tight">Temporal Filter</h3>
             <div className="mt-6 lg:mt-8 space-y-2 lg:space-y-3">
                {['Today', 'This Week', 'This Month', 'Last 90 Days', 'Financial Year'].map(range => (
                  <button 
                    key={range}
                    onClick={() => { setTimeRange(range); setShowDateModal(false); showToast(`Filter applied: ${range}`); }}
                    className={cn(
                      "w-full py-3.5 lg:py-4 rounded-xl lg:rounded-2xl font-black uppercase tracking-widest text-[8px] lg:text-[9px] border-2 whitespace-nowrap transition-all",
                      timeRange === range ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" : "bg-white border-slate-50 text-slate-400 hover:border-primary/20"
                    )}
                  >
                    {range}
                  </button>
                ))}
             </div>
             <button onClick={() => setShowDateModal(false)} className="mt-6 lg:mt-8 w-full text-[8px] lg:text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500">Cancel</button>
           </div>
        </div>
      )}

      {/* Heatmap Modal */}
    {showHeatmap && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 lg:p-6">
           <div onClick={() => setShowHeatmap(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
           <div 
             className="relative w-full max-w-4xl bg-white rounded-t-[2.5rem] lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] lg:max-h-[85vh] self-end lg:self-center"
           >
              <div className="p-6 lg:p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 shrink-0">
                 <div className="flex items-center gap-3 lg:gap-4">
                    <div className="p-2.5 lg:p-3 bg-indigo-50 text-primary rounded-xl shrink-0">
                       <Clock className="w-5 lg:w-6 h-5 lg:h-6" />
                    </div>
                    <div>
                       <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight leading-none">Traffic Heatmap</h3>
                       <p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 lg:mt-0.5 leading-none">Real-time occupancy & density</p>
                    </div>
                 </div>
                 <button onClick={() => setShowHeatmap(false)} className="p-2 hover:bg-slate-100 rounded-xl">
                    <X className="w-6 h-6 text-slate-400" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                 <div className="grid grid-cols-24 gap-1 mb-8">
                    {/* Hours markers */}
                    <div className="col-span-24 flex justify-between mb-4 px-2">
                       {['12 AM', '6 AM', '12 PM', '6 PM', '11 PM'].map(h => (
                         <span key={h} className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{h}</span>
                       ))}
                    </div>
                    
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <React.Fragment key={day}>
                         <div className="col-span-2 flex items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
                         </div>
                         <div className="col-span-22 grid grid-cols-24 gap-1 h-8">
                            {Array.from({ length: 24 }).map((_, i) => {
                               // Mock logic for heat intensity
                               const isWeekend = day === 'Sat' || day === 'Sun';
                               const isLunch = i >= 12 && i <= 14;
                               const isDinner = i >= 19 && i <= 21;
                               let intensity = "bg-slate-50";
                               if ((isLunch || isDinner) && isWeekend) intensity = "bg-primary";
                               else if (isLunch || isDinner) intensity = "bg-indigo-300";
                               else if (i >= 9 && i <= 22) intensity = "bg-indigo-100";
                               
                               return (
                                 <div 
                                   key={i} 
                                   className={cn("rounded-sm", intensity)} 
                                 />
                               );
                            })}
                         </div>
                      </React.Fragment>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Busiest Day</p>
                       <h5 className="text-lg font-black text-primary uppercase">Saturday</h5>
                       <p className="text-[10px] font-medium text-text-secondary mt-1">Average 240+ covers</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Wait Time Avg</p>
                       <h5 className="text-lg font-black text-orange-500 uppercase">12 Minutes</h5>
                       <p className="text-[10px] font-medium text-text-secondary mt-1">During peak dinner hours</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Optimal Staffing</p>
                       <h5 className="text-lg font-black text-emerald-500 uppercase">Level 4</h5>
                       <p className="text-[10px] font-medium text-text-secondary mt-1">All stations fully active</p>
                    </div>
                 </div>
              </div>

              <div className="p-6 lg:p-8 border-t border-slate-50 bg-slate-50/30 shrink-0">
                 <button onClick={() => setShowHeatmap(false)} className="w-full py-4 bg-primary text-white rounded-xl lg:rounded-2xl font-black text-[9px] lg:text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">Close Heatmap View</button>
              </div>
           </div>
        </div>
      )}

      {/* Config Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 lg:p-6">
           <div onClick={() => setShowConfig(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
           <div 
             className="relative w-full max-w-md bg-white rounded-t-[2.5rem] lg:rounded-[3rem] shadow-2xl overflow-hidden self-end lg:self-center"
           >
              <div className="p-6 lg:p-8 text-center border-b border-slate-50 bg-slate-50/30 shrink-0">
                 <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shrink-0">
                    <Filter className="w-7 lg:w-8 h-7 lg:h-8" />
                 </div>
                 <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight leading-none">Settings</h3>
                 <p className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 leading-none">Customize your visibility stream</p>
              </div>

              <div className="p-6 lg:p-8 space-y-5 lg:space-y-6 max-h-[50vh] overflow-y-auto scrollbar-hide">
                 {[
                   { name: 'Revenue Pulse', desc: 'Financial velocity', icon: DollarSign },
                   { name: 'Peak Activity', desc: 'Heatmap logs', icon: TrendingUp },
                   { name: 'Staff Intel', desc: 'Performance metrics', icon: Users },
                   { name: 'Category Split', desc: 'Menu segments', icon: PieChart }
                 ].map(widget => (
                    <div key={widget.name} className="flex items-center justify-between group">
                       <div className="flex items-center gap-3 lg:gap-4">
                          <div className="w-9 h-9 lg:w-10 lg:h-10 bg-slate-50 rounded-lg lg:rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary shrink-0">
                             <widget.icon className="w-4.5 lg:w-5 h-4.5 lg:h-5" />
                          </div>
                          <div>
                             <p className="text-[10px] lg:text-[11px] font-black text-text-primary uppercase tracking-tight leading-none">{widget.name}</p>
                             <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 mt-1 leading-none">{widget.desc}</p>
                          </div>
                       </div>
                       <div className="w-10 h-5 lg:w-12 lg:h-6 bg-primary rounded-full relative p-1 cursor-pointer shrink-0">
                          <div className="absolute right-1 top-1 bottom-1 w-3 lg:w-4 bg-white rounded-full shadow-sm" />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="p-6 lg:p-8 pt-0 flex flex-col gap-2 lg:gap-3 shrink-0">
                 <button 
                   onClick={() => { setShowConfig(false); showToast('Dashboard configuration saved'); }}
                   className="w-full py-4 bg-primary text-white rounded-xl lg:rounded-2xl font-black text-[9px] lg:text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20"
                 >
                   Save
                 </button>
                 <button onClick={() => setShowConfig(false)} className="w-full py-3 text-[8px] lg:text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500">Discard</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
