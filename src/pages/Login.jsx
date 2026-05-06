import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, roles } from '../context/AuthContext';
import { Mail, Lock, LogIn, Utensils } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Determine role based on email for testing
      let role = roles.ADMIN;
      if (email.includes('manager')) role = roles.MANAGER;
      if (email.includes('waiter')) role = roles.WAITER;
      if (email.includes('chef')) role = roles.CHEF;
      if (email.includes('cashier')) role = roles.CASHIER;
      
      login(role);
      setLoading(false);
      
      // Redirect based on role according to FLOW.md
      switch (role) {
        case roles.ADMIN:
        case roles.MANAGER: navigate('/'); break;
        case roles.WAITER: navigate('/tables'); break;
        case roles.CHEF: navigate('/kitchen'); break;
        case roles.CASHIER: navigate('/pos'); break;
        default: navigate('/');
      }
    }, 1000);
  };

  const handleDemoLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      setLoading(false);
      
      // Redirect based on role according to FLOW.md
      switch (role) {
        case roles.ADMIN:
        case roles.MANAGER: navigate('/'); break;
        case roles.WAITER: navigate('/tables'); break;
        case roles.CHEF: navigate('/kitchen'); break;
        case roles.CASHIER: navigate('/pos'); break;
        default: navigate('/');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[1000px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border">
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">RestoPOS</h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-black leading-tight">
                Empower Your <br />
                Restaurant Team.
              </h2>
              <p className="text-indigo-100 text-lg">
                The ultimate all-in-one POS, KDS, and management system for modern restaurants.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 pt-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-indigo-400 flex items-center justify-center text-[10px] font-bold">
                  U{i}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center text-[10px] font-bold">
                +10k
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-indigo-100">Trusted by over 10,000+ restaurant owners worldwide.</p>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>
        
        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-text-primary">Sign In</h3>
            <p className="text-text-secondary mt-2">Enter your credentials to access your dashboard.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@restopos.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-text-primary">Password</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-8"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" /> Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-text-secondary font-black tracking-widest">Demo Access</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 pt-2">
              {Object.keys(roles).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleDemoLogin(role)}
                  className="px-2 py-3 bg-slate-50 border border-border rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-indigo-100 transition-all duration-200"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">
              Powered by <span className="text-primary">RestoPOS v1.0</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
