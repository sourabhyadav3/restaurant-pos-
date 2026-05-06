import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  BadgeCheck,
  UserCheck,
  Filter,
  Shield,
  Clock,
  ChevronRight,
  Star,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Staff = () => {
  const [activeTab, setActiveTab] = useState('All');

  const staffMembers = [
    { id: 1, name: 'Rahul Sharma', role: 'Waiter', shift: 'Morning', status: 'Active', email: 'rahul@example.com', phone: '+91 9876543210', joined: 'Mar 2024', rating: '4.8', avatar: 'RS' },
    { id: 2, name: 'Priya Singh', role: 'Chef', shift: 'Evening', status: 'Active', email: 'priya@example.com', phone: '+91 9876543211', joined: 'Jan 2024', rating: '4.9', avatar: 'PS' },
    { id: 3, name: 'Amit Kumar', role: 'Cashier', shift: 'Morning', status: 'On Leave', email: 'amit@example.com', phone: '+91 9876543212', joined: 'Feb 2024', rating: '4.5', avatar: 'AK' },
    { id: 4, name: 'Sneha Patel', role: 'Manager', shift: 'General', status: 'Active', email: 'sneha@example.com', phone: '+91 9876543213', joined: 'Oct 2023', rating: '5.0', avatar: 'SP' },
    { id: 5, name: 'Vikram Das', role: 'Waiter', shift: 'Evening', status: 'Active', email: 'vikram@example.com', phone: '+91 9876543214', joined: 'Apr 2024', rating: '4.7', avatar: 'VD' },
    { id: 6, name: 'Anjali Gupta', role: 'Chef', shift: 'Morning', status: 'Active', email: 'anjali@example.com', phone: '+91 9876543215', joined: 'May 2024', rating: '4.6', avatar: 'AG' },
  ];

  const roles = ['All', 'Admin', 'Manager', 'Chef', 'Waiter', 'Cashier'];

  return (
    <div className="space-y-8 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-text-primary">Staff Directory</h2>
          <p className="text-text-secondary mt-1 font-medium">Manage your restaurant team, roles and schedules.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-4 bg-white border border-border rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
             <Filter className="w-4 h-4" /> Filters
           </button>
           <button className="btn-primary flex items-center gap-2 py-4 px-8 shadow-2xl shadow-indigo-200">
             <Plus className="w-5 h-5 stroke-[3]" /> Add Member
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={cn(
              "px-6 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all border-2",
              activeTab === role 
                ? "bg-primary text-white border-primary shadow-xl shadow-indigo-100" 
                : "bg-white text-text-secondary border-transparent hover:border-primary/20 hover:bg-indigo-50/30"
            )}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-8 pr-2 scrollbar-thin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {staffMembers.map((member, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={member.id} 
                className="card group border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                   <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 shadow-sm",
                      member.status === 'Active' ? "bg-green-50 text-success border-green-100" : "bg-red-50 text-danger border-red-100"
                    )}>
                      {member.status}
                    </span>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-primary font-black text-2xl border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-text-primary leading-none group-hover:text-primary transition-colors">{member.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="flex items-center gap-1 text-xs font-black text-text-secondary uppercase tracking-widest">
                          <Shield className="w-3 h-3 text-primary" /> {member.role}
                       </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100 border-dashed">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Shift</p>
                      <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                         <Clock className="w-4 h-4 text-primary" /> {member.shift}
                      </p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Performance</p>
                      <p className="text-sm font-bold text-text-primary flex items-center gap-2 text-yellow-600">
                         <Star className="w-4 h-4 fill-yellow-500" /> {member.rating}
                      </p>
                   </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 text-sm font-bold text-text-secondary bg-slate-50 p-3 rounded-2xl border border-transparent group-hover:border-primary/10 transition-all">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                       <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-bold text-text-secondary bg-slate-50 p-3 rounded-2xl border border-transparent group-hover:border-primary/10 transition-all">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                       <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                   <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Joined {member.joined}</p>
                   <button className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform">
                      Details <ChevronRight className="w-4 h-4" />
                   </button>
                </div>

                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Staff;

