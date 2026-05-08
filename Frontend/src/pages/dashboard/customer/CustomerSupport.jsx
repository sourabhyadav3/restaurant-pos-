import React from 'react';
import { HelpCircle, ChevronLeft, Phone, MessageSquare, Mail, Info, Utensils, Zap, ChevronRight, Globe } from 'lucide-react';
import { cn } from "../../../utils/cn";
import { useCustomer } from "../../../context/CustomerContext";
import { useNavigate } from 'react-router-dom';

const CustomerSupport = () => {
  const navigate = useNavigate();
  const { createSupportRequest, supportRequests } = useCustomer();

  const channels = [
    { title: 'Call Waiter', desc: 'Instant assistance', icon: Utensils, color: 'bg-orange-50 text-orange-600', badge: 'Fastest' },
    { title: 'Live Chat', desc: 'Chat with manager', icon: MessageSquare, color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Emergency', desc: 'Direct phone line', icon: Phone, color: 'bg-rose-50 text-rose-600' },
  ];

  const faqs = [
    { q: 'How do I apply points?', a: 'You can apply points during checkout in the billing summary section.' },
    { q: 'Can I cancel my order?', a: 'Orders can only be cancelled within 2 minutes of placement.' },
    { q: 'Is there a service fee?', a: 'A small service fee of ₹25 applies to all dine-in orders.' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-3 px-1">
         <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 lg:hidden">
            <ChevronLeft className="w-5 h-5 text-text-primary" />
         </button>
         <h2 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight">Support Hub</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
         {channels.map(channel => (
            <div 
              key={channel.title} 
              onClick={() => {
                createSupportRequest(channel.title);
                alert(`${channel.title} request sent! Someone will be with you shortly.`);
              }}
              className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50 hover:bg-slate-50 transition-all group cursor-pointer relative overflow-hidden"
            >
               {channel.badge && (
                 <span className="absolute top-4 right-4 px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase tracking-widest rounded-lg">{channel.badge}</span>
               )}
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform", channel.color)}>
                  <channel.icon className="w-6 h-6" />
               </div>
               <h4 className="font-black text-text-primary text-base uppercase tracking-tight leading-none mb-1.5">{channel.title}</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{channel.desc}</p>
            </div>
         ))}
      </div>

      {/* Active Requests */}
      {supportRequests.length > 0 && (
        <div className="space-y-4">
           <h3 className="text-lg font-black uppercase tracking-tight px-1">Active Requests</h3>
           <div className="space-y-3">
              {supportRequests.slice(0, 3).map(req => (
                <div key={req.id} className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                         <Zap className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[11px] font-black uppercase tracking-tight leading-none">{req.type}</p>
                         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: {req.status}</p>
                      </div>
                   </div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-4">
         <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-tight px-1 flex items-center gap-3">
               <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked
            </h3>
            <div className="space-y-4">
               {faqs.map(faq => (
                  <div key={faq.q} className="p-6 bg-white rounded-3xl shadow-sm border border-slate-50 group hover:border-primary/20 transition-all">
                     <p className="text-xs font-black uppercase tracking-tight text-text-primary mb-2 flex items-center justify-between">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                     </p>
                     <p className="text-[10px] font-medium text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-tight px-1 flex items-center gap-3">
               <Info className="w-5 h-5 text-primary" /> Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="card p-5 bg-indigo-600 text-white border-none rounded-3xl shadow-xl shadow-indigo-100 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                  <Globe className="w-8 h-8 mb-4 opacity-40 group-hover:rotate-12 transition-transform" />
                  <h4 className="text-xs font-black uppercase tracking-tight">Global Support</h4>
                  <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mt-1">24/7 Hotline Service</p>
               </div>
               <div className="card p-5 bg-slate-900 text-white border-none rounded-3xl shadow-xl shadow-slate-100 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full -mr-12 -mt-12 blur-2xl" />
                  <Zap className="w-8 h-8 mb-4 opacity-40 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-black uppercase tracking-tight">Report Issue</h4>
                  <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mt-1">Direct feedback node</p>
               </div>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary"><Mail className="w-5 h-5" /></div>
                  <div>
                     <p className="text-[11px] font-black uppercase tracking-tight leading-none">Email Us</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">support@restaurant.com</p>
                  </div>
               </div>
               <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div>
         </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

export default CustomerSupport;
