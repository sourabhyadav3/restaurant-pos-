import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const stats = [
    { name: 'Today Revenue', value: '₹45,230', icon: TrendingUp, change: '+12.5%', isUp: true },
    { name: 'Total Orders', value: '154', icon: ShoppingBag, change: '+8.2%', isUp: true },
    { name: 'Active Tables', value: '12/20', icon: Users, change: '60% Occupancy', isUp: null },
    { name: 'Avg. Prep Time', value: '18 min', icon: Clock, change: '-2 min', isUp: true },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">Dashboard Overview</h2>
          <p className="text-text-secondary mt-1 text-lg">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">Export Report</button>
          <button className="btn-primary">Daily Checklist</button>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div 
            variants={item}
            key={stat.name} 
            className="card card-hover cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 bg-indigo-50 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.isUp !== null && (
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                  stat.isUp ? "bg-green-50 text-success" : "bg-red-50 text-danger"
                )}>
                  {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              )}
            </div>
            <div className="mt-6">
              <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider">{stat.name}</p>
              <h3 className="text-3xl font-bold text-text-primary mt-1 tracking-tight">{stat.value}</h3>
              {stat.isUp === null && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%] rounded-full" />
                  </div>
                  <span className="text-xs font-bold text-text-secondary">60%</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl">Live Orders Feed</h3>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-bold text-success">Real-time</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-text-secondary text-xs uppercase tracking-widest border-b border-border">
                  <th className="pb-4 font-bold">Order ID</th>
                  <th className="pb-4 font-bold">Table</th>
                  <th className="pb-4 font-bold">Items</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: 124, table: 'T-03', items: 'Pizza x2, Coke x1', status: 'Cooking', time: '2m ago' },
                  { id: 125, table: 'T-08', items: 'Burger x1, Fries x1', status: 'Pending', time: '5m ago' },
                  { id: 126, table: 'T-12', items: 'Pasta x1, Wine x2', status: 'Ready', time: '8m ago' },
                  { id: 127, table: 'T-01', items: 'Steak x2, Salad x1', status: 'Cooking', time: '12m ago' },
                  { id: 128, table: 'T-05', items: 'Pizza x1, Juice x2', status: 'Pending', time: '15m ago' },
                ].map((order) => (
                  <tr key={order.id} className="text-sm hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 font-bold text-text-primary">#{order.id}</td>
                    <td className="py-5 font-medium text-text-secondary">{order.table}</td>
                    <td className="py-5 text-text-primary font-medium">{order.items}</td>
                    <td className="py-5">
                      <span className={cn(
                        "badge",
                        order.status === 'Cooking' ? "bg-orange-50 text-orange-600" : 
                        order.status === 'Pending' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-success"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 text-right font-bold text-text-secondary group-hover:text-text-primary transition-colors">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl">Top Selling</h3>
            <button className="text-text-secondary hover:text-primary transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { name: 'Margherita Pizza', sales: '84 sales', price: '₹299', color: 'bg-orange-100 text-orange-600' },
              { name: 'Chicken Burger', sales: '65 sales', price: '₹189', color: 'bg-blue-100 text-blue-600' },
              { name: 'Chocolate Brownie', sales: '42 sales', price: '₹149', color: 'bg-pink-100 text-pink-600' },
              { name: 'Iced Americano', sales: '38 sales', price: '₹129', color: 'bg-emerald-100 text-emerald-600' },
              { name: 'Caesar Salad', sales: '29 sales', price: '₹249', color: 'bg-amber-100 text-amber-600' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300", item.color)}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{item.name}</p>
                    <p className="text-xs text-text-secondary font-medium">{item.sales}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-text-primary">{item.price}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 btn-secondary">
            View Analytics
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;


