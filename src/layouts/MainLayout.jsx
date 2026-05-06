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

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? '80px' : '260px' }}
        className="bg-surface border-r border-border flex flex-col relative z-20"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-[40px] h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
              R
            </div>
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl text-text-primary tracking-tight whitespace-nowrap"
              >
                RestoPOS
              </motion.h1>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-indigo-100" 
                  : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
              )}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <button 
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full text-text-secondary hover:bg-slate-50 rounded-xl transition-all duration-200",
              showRoleSwitcher && "bg-slate-50 text-primary"
            )}
          >
            <Users className="w-5 h-5 min-w-[20px]" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Switch Role</span>}
          </button>

          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 px-4 py-3 w-full text-text-secondary hover:text-danger hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5 min-w-[20px]" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary shadow-sm z-30"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Role Switcher Drawer */}
      <AnimatePresence>
        {showRoleSwitcher && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRoleSwitcher(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-80 bg-surface shadow-2xl z-50 p-6"
            >
              <h2 className="text-xl font-bold mb-6">Switch Role (Demo)</h2>
              <div className="space-y-3">
                {Object.values(roles).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      login(role);
                      setShowRoleSwitcher(false);
                      navigate('/');
                    }}
                    className={cn(
                      "w-full p-4 rounded-2xl border text-left transition-all",
                      user?.role === role 
                        ? "border-primary bg-indigo-50 text-primary font-bold" 
                        : "border-border hover:border-primary hover:bg-slate-50"
                    )}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search orders, tables..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-secondary hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-surface"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-secondary font-medium px-2 py-0.5 bg-slate-100 rounded-full inline-block mt-1 uppercase tracking-wider">
                  {user?.role}
                </p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary border border-border">
                <UserIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <motion.div
            key={user?.role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

