import React, { useState } from 'react';
import { User, ChevronLeft, MapPin, Phone, Mail, ChevronRight, Settings, LogOut, Shield, CreditCard, Bell, ArrowRight, Star } from 'lucide-react';
import { cn } from "../../../utils/cn";
import { useNavigate } from 'react-router-dom';
import { useAuth, roles } from "../../../context/AuthContext";
import { useCustomer } from "../../../context/CustomerContext";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, updateProfile } = useCustomer();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  const menuItems = [
    { label: 'Payment Methods', icon: CreditCard, color: 'text-indigo-500 bg-indigo-50' },
    { label: 'Address Book', icon: MapPin, color: 'text-rose-500 bg-rose-50' },
    { label: 'Notifications', icon: Bell, color: 'text-orange-500 bg-orange-50' },
    { label: 'Privacy & Security', icon: Shield, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'System Settings', icon: Settings, color: 'text-slate-400 bg-slate-50' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 pb-20 lg:pb-10">
      <div className="flex items-center gap-3 px-1">
         <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 lg:hidden">
            <ChevronLeft className="w-5 h-5 text-text-primary" />
         </button>
         <h2 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight">Your Profile</h2>
      </div>

      <div className="card p-6 lg:p-10 bg-white border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] lg:rounded-[3rem] flex flex-col items-center md:flex-row md:items-start gap-8 lg:gap-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
         
         <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-[2rem] lg:rounded-[3rem] flex items-center justify-center text-primary text-4xl lg:text-5xl font-black shadow-inner border-4 border-white">
               R
            </div>
            <button className="absolute bottom-1 right-1 p-2.5 bg-white rounded-xl shadow-lg border border-slate-50 text-slate-400 hover:text-primary transition-all active:scale-90">
               <Settings className="w-4 h-4" />
            </button>
         </div>

          <div className="flex-1 space-y-4 text-center md:text-left w-full">
             {isEditing ? (
               <div className="space-y-4 max-w-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                        <input 
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Table Number</label>
                        <input 
                          value={editData.tableId}
                          onChange={(e) => setEditData({...editData, tableId: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20"
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Email</label>
                        <input 
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Phone</label>
                        <input 
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20"
                        />
                     </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                     <button 
                       onClick={() => {
                         updateProfile(editData);
                         setIsEditing(false);
                       }}
                       className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
                     >
                        Save Profile
                     </button>
                     <button 
                       onClick={() => {
                         setEditData(profile);
                         setIsEditing(false);
                       }}
                       className="px-6 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
             ) : (
               <>
                  <div>
                     <h3 className="text-2xl lg:text-3xl font-black text-text-primary uppercase tracking-tight leading-none">{profile.name}</h3>
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2 leading-none flex items-center justify-center md:justify-start gap-2">
                        <Star className="w-3 h-3 fill-current" /> Gold Member • Table {profile.tableId}
                     </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                     <span className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl"><Mail className="w-3.5 h-3.5" /> {profile.email}</span>
                     <span className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl"><Phone className="w-3.5 h-3.5" /> {profile.phone}</span>
                  </div>
                  <div className="pt-4 flex justify-center md:justify-start">
                     <button 
                       onClick={() => setIsEditing(true)}
                       className="px-6 py-2 bg-white border border-slate-100 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all"
                     >
                        Edit Profile
                     </button>
                  </div>
               </>
             )}
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
         <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4">Account Settings</p>
            {menuItems.map(item => (
               <button key={item.label} className="w-full card p-4 bg-white border-none shadow-sm hover:shadow-xl hover:bg-slate-50 transition-all group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.color)}>
                        <item.icon className="w-5 h-5" />
                     </div>
                     <span className="text-[11px] font-black uppercase tracking-tight text-text-primary group-hover:text-primary transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
               </button>
            ))}
         </div>

         <div className="space-y-6">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4">Session Control</p>
               <button 
                 onClick={() => {
                   logout();
                   navigate('/login');
                 }}
                 className="w-full card p-5 bg-rose-50 border-none shadow-sm hover:shadow-rose-100 hover:bg-rose-100 transition-all group flex items-center justify-between"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                        <LogOut className="w-6 h-6" />
                     </div>
                     <div className="text-left">
                        <span className="text-sm font-black uppercase tracking-tight text-rose-900 leading-none block">Sign Out</span>
                        <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mt-1.5 block">Clear your active session</span>
                     </div>
                  </div>
               </button>
            </div>

            <div className="card p-6 bg-slate-900 text-white border-none rounded-[2rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
               <h4 className="text-base font-black uppercase tracking-tight leading-none mb-1">Help & Feedback</h4>
               <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">Your feedback helps us grow. Please share your experience with us.</p>
               <button onClick={() => navigate('/customer/support')} className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                  Contact Support <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};


export default CustomerProfile;
