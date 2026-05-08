import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, roles } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import { OrdersProvider } from './context/OrdersContext';
import { CustomerProvider } from './context/CustomerContext';
import { HospitalityProvider } from './context/HospitalityContext';
import { CommunicationProvider } from './context/CommunicationContext';
import { NotificationProvider } from './context/NotificationContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import POS from './pages/POS';
import Orders from './pages/Orders';
import Kitchen from './pages/Kitchen';
import Menu from './pages/Menu';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import CustomerHome from './pages/CustomerHome';
import CustomerOrderNow from './pages/CustomerOrderNow';
import CustomerOrders from './pages/CustomerOrders';
import CustomerFavorites from './pages/CustomerFavorites';
import CustomerProfile from './pages/CustomerProfile';
import CustomerSupport from './pages/CustomerSupport';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import CustomerReservations from './pages/CustomerReservations';
import GuestFolio from './pages/GuestFolio';
import GuestBills from './pages/GuestBills';
import Settlements from './pages/Settlements';
import Transactions from './pages/Transactions';
import CustomerMessages from './pages/CustomerMessages';
import Concierge from './pages/Concierge';
import QRManager from './pages/QRManager';
import NotificationsPage from './pages/Notifications';
import CustomerServices from './pages/CustomerServices';
import ServiceManager from './pages/ServiceManager';
import Tasks from './pages/Tasks';
import Inventory from './pages/Inventory';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
};

const ThemeHandler = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('resto-theme') || 'indigo';
    const themes = {
      indigo: { primary: '#6366F1', dark: '#4F46E5', light: '#EEF2FF' },
      emerald: { primary: '#10B981', dark: '#059669', light: '#ECFDF5' },
      rose: { primary: '#F43F5E', dark: '#E11D48', light: '#FFF1F2' },
      amber: { primary: '#F59E0B', dark: '#D97706', light: '#FFFBEB' },
    };
    const theme = themes[savedTheme] || themes.indigo;
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-dark', theme.dark);
    document.documentElement.style.setProperty('--primary-light', theme.light);
  }, []);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MenuProvider>
          <OrdersProvider>
            <CustomerProvider>
              <HospitalityProvider>
                <CommunicationProvider>
                  <ThemeHandler />
                  <Router>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      
                      {/* Admin/Manager/Staff Routes */}
                      <Route path="/" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CHEF]}>
                          <MainLayout><Dashboard /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/tables" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER]}>
                          <MainLayout><Tables /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/pos" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CASHIER]}>
                          <MainLayout><POS /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/orders" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CHEF, roles.CASHIER]}>
                          <MainLayout><Orders /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/kitchen" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CHEF]}>
                          <MainLayout><Kitchen /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/tasks" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER, roles.CHEF]}>
                          <MainLayout><Tasks /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/inventory" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CHEF]}>
                          <MainLayout><Inventory /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/menu" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
                          <MainLayout><Menu /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/staff" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                          <MainLayout><Staff /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/reports" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
                          <MainLayout><Reports /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/rooms" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
                          <MainLayout><Rooms /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/reservations" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER]}>
                          <MainLayout><Reservations /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/folio" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CASHIER]}>
                          <MainLayout><GuestFolio /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/guest-bills" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CASHIER]}>
                          <MainLayout><GuestBills /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/settlements" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CASHIER]}>
                          <MainLayout><Settlements /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/transactions" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.CASHIER]}>
                          <MainLayout><Transactions /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/concierge" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER]}>
                          <MainLayout><Concierge /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/services" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER, roles.WAITER]}>
                          <MainLayout><ServiceManager /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/qr-manager" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN, roles.MANAGER]}>
                          <MainLayout><QRManager /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/notifications" element={
                        <ProtectedRoute>
                          <MainLayout><NotificationsPage /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/settings" element={
                        <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                          <MainLayout><Settings /></MainLayout>
                        </ProtectedRoute>
                      } />

                      {/* Customer Routes */}
                      <Route path="/customer" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerHome /></MainLayout>
                        </ProtectedRoute>
                      } />
                      
                      <Route path="/customer/order" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerOrderNow /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/customer/orders" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerOrders /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/customer/reservations" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerReservations /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/customer/services" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerServices /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/customer/favorites" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerFavorites /></MainLayout>
                        </ProtectedRoute>
                      } />


                      <Route path="/customer/profile" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerProfile /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/customer/support" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerSupport /></MainLayout>
                        </ProtectedRoute>
                      } />

                      <Route path="/customer/messages" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerMessages /></MainLayout>
                        </ProtectedRoute>
                      } />
                      
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Router>
                </CommunicationProvider>
              </HospitalityProvider>
            </CustomerProvider>
          </OrdersProvider>
        </MenuProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
