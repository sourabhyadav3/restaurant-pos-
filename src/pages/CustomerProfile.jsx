import React, { useState, useEffect } from 'react';
import { 
 User, 
 ChevronLeft, 
 MapPin, 
 Phone, 
 Mail, 
 ChevronRight, 
 Settings, 
 LogOut, 
 Shield, 
 CreditCard, 
 Bell, 
 ArrowRight, 
 Star,
 X,
 Plus,
 Trash2,
 CheckCircle2,
 AlertCircle,
 Clock,
 Key,
 Smartphone,
 Globe,
 Wallet,
 Zap,
 MessageSquare,
 HelpCircle
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCustomer } from '../context/CustomerContext';

const CustomerProfile = () => {
 const navigate = useNavigate();
 const { logout } = useAuth();
 const { profile, updateProfile, createSupportRequest } = useCustomer();
 const [isEditing, setIsEditing] = useState(false);
 const [editData, setEditData] = useState(profile);
 const [activeModal, setActiveModal] = useState(null); // 'payments', 'addresses', 'notifications', 'privacy', 'settings', 'signout', 'support'
 const [toast, setToast] = useState(null);
 const [editingPayment, setEditingPayment] = useState(null);

 // Local state for profile features
 const [paymentMethods, setPaymentMethods] = useState(() => {
 const saved = localStorage.getItem('resto-profile-payments');
 return saved ? JSON.parse(saved) : [
 { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
 { id: 2, type: 'MasterCard', last4: '8888', expiry: '08/24', isDefault: false }
 ];
 });

 const [addresses, setAddresses] = useState(() => {
 const saved = localStorage.getItem('resto-profile-addresses');
 return saved ? JSON.parse(saved) : [
 { id: 1, label: 'Home', address: '123 Luxury Avenue, Penthouse 4', isDefault: true },
 { id: 2, label: 'Office', address: 'Tech Park, Building B, 12th Floor', isDefault: false }
 ];
 });

 const [notifPrefs, setNotifPrefs] = useState(() => {
 const saved = localStorage.getItem('resto-profile-notifications');
 return saved ? JSON.parse(saved) : {
 orderUpdates: true,
 reservationUpdates: true,
 roomServiceUpdates: false,
 offers: true
 };
 });

 useEffect(() => {
 localStorage.setItem('resto-profile-payments', JSON.stringify(paymentMethods));
 }, [paymentMethods]);

 useEffect(() => {
 localStorage.setItem('resto-profile-addresses', JSON.stringify(addresses));
 }, [addresses]);

 useEffect(() => {
 localStorage.setItem('resto-profile-notifications', JSON.stringify(notifPrefs));
 }, [notifPrefs]);

 const showToast = (message, type = 'success') => {
 setToast({ message, type });
 setTimeout(() => setToast(null), 3000);
 };

 const menuItems = [
 { label: 'Payment Methods', icon: CreditCard, color: 'text-indigo-500 bg-indigo-50', key: 'payments' },
 { label: 'Address Book', icon: MapPin, color: 'text-rose-500 bg-rose-50', key: 'addresses' },
 { label: 'Notifications', icon: Bell, color: 'text-orange-500 bg-orange-50', key: 'notifications' },
 { label: 'Privacy & Security', icon: Shield, color: 'text-emerald-500 bg-emerald-50', key: 'privacy' },
 ];

 const Modal = ({ title, onClose, children }) => (
 <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
 <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />
 <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in flex flex-col max-h-[90vh]">
 <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/20 shrink-0">
 <div>
 <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">{title}</h3>
 </div>
 <button onClick={onClose} className="p-2 rounded-xl shadow-sm text-slate-300">
 <X className="w-6 h-6" />
 </button>
 </div>
 <div className="p-8 overflow-y-auto scrollbar-hide flex-1 text-left">
 {children}
 </div>
 </div>
 </div>
 );

 return (
 <div className="space-y-6 lg:space-y-8 pb-20 lg:pb-10 relative">
 {/* Toast Notification */}
 {toast && (
 <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest border bg-white animate-in slide-in-from-top-4 ">
 {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
 <span className="text-text-primary">{toast.message}</span>
 </div>
 )}

 <div className="flex items-center gap-3 px-1 text-left">
 <button onClick={() => navigate(-1)} className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 lg:hidden">
 <ChevronLeft className="w-5 h-5 text-text-primary" />
 </button>
 <h2 className="text-xl lg:text-2xl font-black text-text-primary uppercase tracking-tight">Your Profile</h2>
 </div>

 <div className="card p-6 lg:p-10 bg-white border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] lg:rounded-[3rem] flex flex-col items-center md:flex-row md:items-start gap-8 lg:gap-12 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
 
 <div className="relative">
 <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-[2rem] lg:rounded-[3rem] flex items-center justify-center text-primary text-4xl lg:text-5xl font-black shadow-inner border-4 border-white">
 {profile.name[0]}
 </div>
 </div>

 <div className="flex-1 space-y-4 text-center md:text-left w-full">
 {isEditing ? (
 <div className="space-y-4 max-w-md mx-auto md:mx-0 text-left">
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
 <div className="flex gap-3 pt-2 justify-center md:justify-start">
 <button 
 onClick={() => {
 updateProfile(editData);
 setIsEditing(false);
 showToast('Profile updated successfully');
 }}
 className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 "
 >
 Save Profile
 </button>
 <button 
 onClick={() => {
 setEditData(profile);
 setIsEditing(false);
 }}
 className="px-6 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest "
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
 <span className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl"><Mail className="w-3.5 h-3.5 text-primary" /> {profile.email}</span>
 <span className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl"><Phone className="w-3.5 h-3.5 text-primary" /> {profile.phone}</span>
 </div>
 <div className="pt-4 flex justify-center md:justify-start">
 <button 
 onClick={() => setIsEditing(true)}
 className="px-6 py-2 bg-white border border-slate-100 rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400 "
 >
 Edit Profile
 </button>
 </div>
 </>
 )}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 text-left">
 <div className="space-y-3">
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4">Account Settings</p>
 {menuItems.map(item => (
 <button 
 key={item.label} 
 onClick={() => setActiveModal(item.key)}
 className="w-full card p-4 bg-white border-none shadow-sm group flex items-center justify-between"
 >
 <div className="flex items-center gap-4">
 <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.color)}>
 <item.icon className="w-5 h-5" />
 </div>
 <span className="text-[11px] font-black uppercase tracking-tight text-text-primary ">{item.label}</span>
 </div>
 <ChevronRight className="w-4 h-4 text-slate-300 " />
 </button>
 ))}
 </div>

 <div className="space-y-6 text-left">
 <div>
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4">Session Control</p>
 <button 
 onClick={() => setActiveModal('signout')}
 className="w-full card p-5 bg-rose-50 border-none shadow-sm group flex items-center justify-between"
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

 <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[3rem] shadow-2xl relative overflow-hidden text-left border-none">
 <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
 <div className="flex items-center gap-4 mb-4 relative z-10">
 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary backdrop-blur-md">
 <HelpCircle className="w-6 h-6" />
 </div>
 <h4 className="text-xl font-black uppercase tracking-tight leading-none">Help & Feedback</h4>
 </div>
 <p className="text-xs font-bold text-slate-100 uppercase tracking-widest leading-relaxed relative z-10 w-full mb-6">
 Your feedback helps us grow. Please share your experience with us.
 </p>
 <button 
 onClick={() => setActiveModal('support')}
 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary relative z-10 bg-white/5 px-6 py-3 rounded-xl w-fit"
 >
 Contact Support <ArrowRight className="w-5 h-5" />
 </button>
 </div>
 </div>
 </div>

 {/* Modals */}
 {activeModal === 'payments' && (
 <Modal title="Payment Methods" onClose={() => setActiveModal(null)}>
  <div className="space-y-4">
    {editingPayment ? (
      <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Edit Card Details</h5>
        <div className="space-y-3">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Card Type</label>
            <select 
              value={editingPayment.type}
              onChange={(e) => setEditingPayment({...editingPayment, type: e.target.value})}
              className="w-full mt-1 px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary"
            >
              <option>Visa</option>
              <option>MasterCard</option>
              <option>AMEX</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Last 4 Digits</label>
            <input 
              type="text" 
              maxLength="4"
              value={editingPayment.last4}
              onChange={(e) => setEditingPayment({...editingPayment, last4: e.target.value.replace(/\D/g, '')})}
              className="w-full mt-1 px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Expiry (MM/YY)</label>
            <input 
              type="text" 
              placeholder="MM/YY"
              value={editingPayment.expiry}
              onChange={(e) => setEditingPayment({...editingPayment, expiry: e.target.value})}
              className="w-full mt-1 px-4 py-3 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button 
            onClick={() => {
              setPaymentMethods(paymentMethods.map(p => p.id === editingPayment.id ? editingPayment : p));
              setEditingPayment(null);
              showToast('Payment method updated');
            }}
            className="flex-1 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Save Changes
          </button>
          <button 
            onClick={() => setEditingPayment(null)}
            className="flex-1 py-3 bg-white border border-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <>
        {paymentMethods.map(pm => (
          <div key={pm.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-[10px] font-black uppercase text-indigo-600">{pm.type}</span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-black text-text-primary uppercase truncate">•••• {pm.last4}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 whitespace-nowrap">Expires {pm.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setEditingPayment(pm)}
                className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  setPaymentMethods(paymentMethods.filter(p => p.id !== pm.id));
                  showToast('Payment method removed');
                }}
                className="p-2.5 bg-rose-50 text-rose-500 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <button 
          onClick={() => {
            const newId = Date.now();
            setEditingPayment({ id: newId, type: 'Visa', last4: '', expiry: '', isDefault: false });
          }}
          className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-slate-400"
        >
          <Plus className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Add New Card</span>
        </button>
      </>
    )}
  </div>
 </Modal>
 )}

 {activeModal === 'addresses' && (
 <Modal title="Address Book" onClose={() => setActiveModal(null)}>
 <div className="space-y-4">
 {addresses.map(addr => (
 <div key={addr.id} className="p-5 bg-slate-50 rounded-2xl relative group text-left">
 <div className="flex items-start justify-between mb-3">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center">
 <MapPin className="w-4 h-4" />
 </div>
 <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{addr.label}</span>
 </div>
 <button 
 onClick={() => {
 setAddresses(addresses.filter(a => a.id !== addr.id));
 showToast('Address deleted');
 }}
 className="p-2 opacity-0 transition-opacity text-rose-500"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase">{addr.address}</p>
 {addr.isDefault && (
 <div className="absolute bottom-4 right-5 text-[8px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
 <CheckCircle2 className="w-3 h-3" /> Primary
 </div>
 )}
 </div>
 ))}
 <button 
 onClick={() => {
 const newAddr = { id: Date.now(), label: 'Other', address: 'Custom Address, Street 404', isDefault: false };
 setAddresses([...addresses, newAddr]);
 showToast('Address added (Mock)');
 }}
 className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-slate-400 group"
 >
 <Plus className="w-4 h-4 " />
 <span className="text-[10px] font-black uppercase tracking-widest">Add New Address</span>
 </button>
 </div>
 </Modal>
 )}

 {activeModal === 'notifications' && (
 <Modal title="Notification Preferences" onClose={() => setActiveModal(null)}>
 <div className="space-y-2">
 {[
 { key: 'orderUpdates', label: 'Order Updates', desc: 'Real-time kitchen & delivery status' },
 { key: 'reservationUpdates', label: 'Reservation Updates', desc: 'Booking confirmations & reminders' },
 { key: 'roomServiceUpdates', label: 'Room Service', desc: 'In-room request tracking' },
 { key: 'offers', label: 'Offers & Promotions', desc: 'Exclusive deals and news' }
 ].map(pref => (
 <div key={pref.key} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl text-left">
 <div className="space-y-1">
 <p className="text-[11px] font-black uppercase tracking-tight text-text-primary">{pref.label}</p>
 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{pref.desc}</p>
 </div>
 <button 
 onClick={() => setNotifPrefs({...notifPrefs, [pref.key]: !notifPrefs[pref.key]})}
 className={cn(
 "w-12 h-6 rounded-full relative ",
 notifPrefs[pref.key] ? "bg-primary" : "bg-slate-200"
 )}
 >
 <div className={cn(
 "absolute top-1 w-4 h-4 bg-white rounded-full ",
 notifPrefs[pref.key] ? "left-7 shadow-lg" : "left-1"
 )} />
 </button>
 </div>
 ))}
 <div className="pt-4">
 <button 
 onClick={() => { setActiveModal(null); showToast('Preferences saved'); }}
 className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 "
 >
 Save Preferences
 </button>
 </div>
 </div>
 </Modal>
 )}

 {activeModal === 'privacy' && (
 <Modal title="Privacy & Security" onClose={() => setActiveModal(null)}>
 <div className="space-y-8 text-left">
 <div className="space-y-4">
 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Change Password</h4>
 <div className="space-y-3">
 <div className="space-y-1.5">
 <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Current Password</label>
 <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20" />
 </div>
 <div className="space-y-1.5">
 <label className="text-[9px] font-black uppercase text-slate-400 ml-1">New Password</label>
 <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20" />
 </div>
 <button 
 onClick={() => showToast('Password changed successfully')}
 className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] "
 >
 Update Password
 </button>
 </div>
 </div>

 <div className="p-5 bg-emerald-50 rounded-2xl flex items-center justify-between border border-emerald-100">
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
 <Shield className="w-5 h-5" />
 </div>
 <div>
 <p className="text-[11px] font-black uppercase text-emerald-900">Two-Factor Auth</p>
 <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Secured via SMS</p>
 </div>
 </div>
 <button className="w-12 h-6 rounded-full bg-emerald-500 relative">
 <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-lg" />
 </button>
 </div>

 <div className="space-y-4">
 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Active Sessions</h4>
 <div className="space-y-2">
 {[
 { device: 'iPhone 15 Pro', location: 'London, UK', status: 'Current Device', icon: Smartphone },
 { device: 'MacBook Pro 16', location: 'London, UK', status: '2 days ago', icon: Globe }
 ].map((session, i) => (
 <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
 <session.icon className="w-5 h-5" />
 </div>
 <div className="text-left">
 <p className="text-xs font-black text-text-primary uppercase">{session.device}</p>
 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{session.location} • {session.status}</p>
 </div>
 </div>
 {i !== 0 && <button className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Revoke</button>}
 </div>
 ))}
 </div>
 </div>
 </div>
 </Modal>
 )}

 {activeModal === 'signout' && (
 <Modal title="Confirm Sign Out" onClose={() => setActiveModal(null)}>
 <div className="text-center space-y-8 py-4">
 <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-500 mx-auto shadow-inner">
 <LogOut className="w-10 h-10" />
 </div>
 <div className="space-y-2">
 <h4 className="text-xl font-black uppercase tracking-tight text-text-primary leading-none">Are you sure?</h4>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">You will need to login again to access <br /> your personalized orders and profile.</p>
 </div>
 <div className="flex flex-col gap-3">
 <button 
 onClick={() => {
 logout();
 navigate('/login');
 }}
 className="w-full py-5 bg-rose-500 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-rose-200 "
 >
 Confirm Sign Out
 </button>
 <button 
 onClick={() => setActiveModal(null)}
 className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] "
 >
 Cancel
 </button>
 </div>
 </div>
 </Modal>
 )}

 {activeModal === 'support' && (
 <Modal title="Contact Support" onClose={() => setActiveModal(null)}>
 <form 
 onSubmit={(e) => {
 e.preventDefault();
 const formData = new FormData(e.target);
 createSupportRequest(formData.get('subject'), formData.get('message'));
 setActiveModal(null);
 showToast('Support request submitted');
 }}
 className="space-y-6 text-left"
 >
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
 <input name="subject" required placeholder="What can we help you with?" className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20" />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
 <textarea name="message" required rows={5} placeholder="Type your message here..." className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-xs font-bold outline-none border-2 border-transparent focus:border-primary/20 resize-none" />
 </div>
 <button 
 type="submit"
 className="w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
 >
 <MessageSquare className="w-5 h-5" /> Submit Request
 </button>
 </form>
 </Modal>
 )}
 </div>
 );
};

export default CustomerProfile;
