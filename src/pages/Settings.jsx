import React from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  Database,
  Smartphone,
  ChevronRight,
  Store,
  Clock,
  ShieldCheck,
  Receipt,
  Layout,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Settings = () => {
  const sections = [
    { 
      title: 'Restaurant Profile', 
      icon: Store, 
      desc: 'Update your business identity and hours',
      items: [
        { name: 'Business Information', desc: 'Name, address, and contact details' },
        { name: 'Operating Hours', desc: 'Manage opening and closing times' },
        { name: 'Branding', desc: 'Logo, colors, and receipt templates' },
      ]
    },
    { 
      title: 'Account & Security', 
      icon: ShieldCheck, 
      desc: 'Manage permissions and login safety',
      items: [
        { name: 'Team Permissions', desc: 'Define what each role can access' },
        { name: 'Security Keys', desc: '2FA and password management' },
        { name: 'Login Logs', desc: 'Track active sessions and history' },
      ]
    },
    { 
      title: 'Payments & Billing', 
      icon: Receipt, 
      desc: 'Subscription and tax configurations',
      items: [
        { name: 'Tax Rates', desc: 'Configure GST/VAT percentages' },
        { name: 'Payment Methods', desc: 'Setup UPI, Cards, and Cash' },
        { name: 'Invoices', desc: 'Download past subscription bills' },
      ]
    },
    { 
      title: 'Display & Preferences', 
      icon: Layout, 
      desc: 'Customize your dashboard experience',
      items: [
        { name: 'Theme Settings', desc: 'Light, dark, and custom accents' },
        { name: 'Language', desc: 'Select system default language' },
        { name: 'Sound Alerts', desc: 'Configure KDS and order sounds' },
      ]
    },
  ];

  return (
    <div className="space-y-10 max-w-6xl h-full overflow-y-auto pb-10 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-text-primary">System Settings</h2>
          <p className="text-text-secondary mt-1 font-medium">Configure and customize your restaurant POS platform.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-4 bg-white border border-border rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
             Discard
          </button>
          <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
             Save All Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={section.title} 
            className="card p-0 overflow-hidden shadow-2xl border-primary/5 flex flex-col"
          >
            <div className="p-8 border-b border-border bg-slate-50/50 flex items-center gap-5">
              <div className="p-4 bg-white rounded-[1.5rem] shadow-sm text-primary">
                <section.icon className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                 <h3 className="text-lg font-black text-text-primary">{section.title}</h3>
                 <p className="text-xs font-bold text-text-secondary mt-0.5">{section.desc}</p>
              </div>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item) => (
                <button 
                  key={item.name} 
                  className="w-full flex items-center justify-between px-8 py-6 hover:bg-indigo-50/30 transition-all group text-left"
                >
                  <div>
                    <h4 className="text-sm font-black text-text-primary group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-xs font-medium text-text-secondary mt-1">{item.desc}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all">
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
         <div className="card bg-slate-50 border-2 border-border p-8 flex items-center gap-6 group hover:border-primary/20 transition-all cursor-pointer">
            <div className="p-4 bg-white rounded-2xl shadow-sm text-text-secondary group-hover:text-primary transition-colors">
               <HelpCircle className="w-6 h-6" />
            </div>
            <div>
               <h5 className="font-black text-text-primary">Help Center</h5>
               <p className="text-xs font-bold text-text-secondary mt-1">Documentation & Support</p>
            </div>
         </div>
         <div className="card bg-slate-50 border-2 border-border p-8 flex items-center gap-6 group hover:border-primary/20 transition-all cursor-pointer">
            <div className="p-4 bg-white rounded-2xl shadow-sm text-text-secondary group-hover:text-primary transition-colors">
               <Globe className="w-6 h-6" />
            </div>
            <div>
               <h5 className="font-black text-text-primary">API Access</h5>
               <p className="text-xs font-bold text-text-secondary mt-1">Integrate third-party apps</p>
            </div>
         </div>
         <div className="card bg-red-50 border-2 border-red-100 p-8 flex items-center gap-6 group hover:bg-red-100/50 transition-all cursor-pointer">
            <div className="p-4 bg-white rounded-2xl shadow-sm text-danger group-hover:scale-110 transition-transform">
               <LogOut className="w-6 h-6" />
            </div>
            <div>
               <h5 className="font-black text-danger">Sign Out</h5>
               <p className="text-xs font-bold text-red-400 mt-1">Exit from your session</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Settings;

