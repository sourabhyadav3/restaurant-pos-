import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Table2, 
  Calculator, 
  ClipboardList, 
  CookingPot, 
  UtensilsCrossed, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon
} from 'lucide-react';
import { useAuth, roles } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const MainLayout = ({ children }) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', roles: [roles.ADMIN, roles.MANAGER] },
    { name: 'Tables', icon: Table2, path: '/tables', roles: [roles.ADMIN, roles.MANAGER, roles.WAITER] },
    { name: 'POS', icon: Calculator, path: '/pos', roles: [roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CASHIER] },
    { name: 'Orders', icon: ClipboardList, path: '/orders', roles: [roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CHEF, roles.CASHIER] },
    { name: 'Kitchen', icon: CookingPot, path: '/kitchen', roles: [roles.ADMIN, roles.MANAGER, roles.CHEF] },
    { name: 'Menu', icon: UtensilsCrossed, path: '/menu', roles: [roles.ADMIN, roles.MANAGER] },
    { name: 'Staff', icon: Users, path: '/staff', roles: [roles.ADMIN] },
    { name: 'Reports', icon: BarChart3, path: '/reports', roles: [roles.ADMIN, roles.MANAGER] },
    { name: 'Settings', icon: Settings, path: '/settings', roles: [roles.ADMIN] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  const sidebarVariants = {
    expanded: { width: 220, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    collapsed: { width: 88, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-['Inter']">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        className="bg-white border-r border-border flex flex-col relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
              <CookingPot className="w-6 h-6 stroke-[2.5]" />
            </div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-black tracking-tight text-text-primary whitespace-nowrap"
              >
                Resto<span className="text-primary">OS</span>
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
              )}
            >
              <item.icon className={cn("w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110", !isCollapsed && "stroke-[2]")} />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-sm tracking-wide"
                >
                  {item.name}
                </motion.span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-text-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 shadow-2xl translate-x-[-10px] group-hover:translate-x-0 z-[100]">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 space-y-1 border-t border-slate-50">
          <button 
            onClick={() => setShowRoleSwitcher(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-text-secondary hover:bg-slate-50 hover:text-primary transition-all group"
          >
            <Users className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform" />
            {!isCollapsed && <span className="font-bold text-sm">Switch Role</span>}
          </button>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-text-secondary hover:bg-danger/5 hover:text-danger transition-all group"
          >
            <LogOut className="w-6 h-6 shrink-0 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span className="font-bold text-sm">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-10 w-8 h-8 bg-white border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary shadow-xl hover:scale-110 transition-all z-50"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search orders, tables, menu..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 bg-slate-50 rounded-2xl text-text-secondary hover:text-primary transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white shadow-sm animate-pulse"></span>
            </motion.button>
            
            <div className="h-10 w-[1px] bg-border mx-2"></div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-text-primary leading-none">{user?.name}</p>
                <div className="mt-1.5 flex justify-end">
                   <span className="badge bg-primary-light text-primary border-none text-[9px] py-0.5 font-black uppercase tracking-wider">
                      {user?.role}
                   </span>
                </div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary border-2 border-white shadow-xl cursor-pointer overflow-hidden"
              >
                <UserIcon className="w-6 h-6 stroke-[2.5]" />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-background relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Role Switcher Drawer */}
      <AnimatePresence>
        {showRoleSwitcher && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRoleSwitcher(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[101] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h2 className="text-2xl font-black tracking-tight">Role Switcher</h2>
                    <p className="text-text-secondary text-sm font-medium mt-1">Simulate different user views</p>
                 </div>
                 <button onClick={() => setShowRoleSwitcher(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                    <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="flex-1 space-y-4">
                {Object.values(roles).map((role) => (
                  <motion.button
                    whileHover={{ scale: 1.02, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                    key={role}
                    onClick={() => {
                      login(role);
                      setShowRoleSwitcher(false);
                      navigate('/');
                    }}
                    className={cn(
                      "w-full p-6 rounded-[2rem] border-2 text-left transition-all flex items-center justify-between group",
                      user?.role === role 
                        ? "border-primary bg-indigo-50 text-primary shadow-xl shadow-primary/10" 
                        : "border-slate-50 bg-slate-50/50 hover:border-primary/20 hover:bg-white"
                    )}
                  >
                    <span className="font-black text-sm uppercase tracking-widest">{role}</span>
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center transition-all",
                      user?.role === role ? "bg-primary text-white" : "bg-white text-slate-300 group-hover:text-primary"
                    )}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-50">
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-center italic">
                   Development Mode Overlay
                 </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
