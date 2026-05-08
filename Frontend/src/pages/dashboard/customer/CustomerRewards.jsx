import React from 'react';
import { Gift, ChevronLeft, Star, Sparkles, Trophy, ArrowRight, Clock } from 'lucide-react';
import { cn } from "../../../utils/cn";
import { useCustomer } from "../../../context/CustomerContext";
import { useNavigate } from 'react-router-dom';

const CustomerRewards = () => {
  const navigate = useNavigate();
  const { cartItems, setAppliedCoupon } = useCustomer();
  const points = 1250; // Mock current points

  const rewards = [
    { title: 'Free Drink', points: 500, icon: '🥤', color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Free Burger', points: 1500, icon: '🍔', color: 'bg-orange-50 text-orange-600' },
    { title: '₹500 Voucher', points: 5000, icon: '🎟️', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-3 px-1">
         <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 lg:hidden">
            <ChevronLeft className="w-5 h-5 text-text-primary" />
         </button>
         <h2 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight">Your Rewards</h2>
      </div>

      <div className="card p-8 lg:p-12 bg-slate-900 text-white border-none rounded-[3rem] shadow-2xl shadow-slate-200 relative overflow-hidden text-center">
         <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full -ml-32 -mt-32 blur-3xl animate-pulse" />
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -mr-32 -mb-32 blur-3xl animate-pulse" />
         
         <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-2xl border border-white/5 rotate-3">
               🏆
            </div>
             <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">Available Points</p>
                <h3 className="text-5xl lg:text-7xl font-black tracking-tighter">{points.toLocaleString()}</h3>
             </div>
             <button 
               onClick={() => {
                 if (cartItems.length === 0) {
                   alert('Add items to your cart first to redeem rewards!');
                   navigate('/customer/order');
                 } else {
                   alert('Points Redeemed! Discount applied to cart.');
                   setAppliedCoupon({ code: 'POINTS', discount: 100 });
                   navigate('/customer/order');
                 }
               }}
               className="px-8 py-3.5 bg-primary rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
             >
                Redeem Now
             </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
         {rewards.map(reward => (
            <div key={reward.title} className="card p-6 bg-white border-none shadow-xl shadow-slate-100/50 hover:bg-slate-50 transition-all group flex flex-col items-center text-center">
               <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform", reward.color)}>
                  {reward.icon}
               </div>
               <h4 className="font-black text-text-primary text-base uppercase tracking-tight mb-1">{reward.title}</h4>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{reward.points} Points Needed</p>
                <div className="w-full h-1.5 bg-slate-50 rounded-full mt-6 overflow-hidden">
                   <div className="h-full bg-primary" style={{ width: `${Math.min(100, (points/reward.points)*100)}%` }} />
                </div>
                <p className="text-[9px] font-bold text-primary mt-3 uppercase tracking-widest">{Math.min(100, Math.floor((points/reward.points)*100))}% Completed</p>
            </div>
         ))}
      </div>
    </div>
  );
};

export default CustomerRewards;
