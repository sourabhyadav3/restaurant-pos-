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

// Website
import LandingPage from './pages/website/LandingPage';
import DigitalMenu from './pages/website/DigitalMenu';
import Excursions from './pages/website/Excursions';
import Transport from './pages/website/Transport';
import BookTable from './pages/website/BookTable';
import OrderingEntry from './pages/website/OrderingEntry';
import GuestCheckIn from './pages/website/GuestCheckIn';
import GuestDashboard from './pages/website/GuestDashboard';
import GuestMenu from './pages/website/GuestMenu';
import MyBill from './pages/website/MyBill';
import RequestChat from './pages/website/RequestChat';
import ChatReception from './pages/website/ChatReception';

// Auth
import Login from './pages/auth/Login';

// Dashboard - Admin
import Dashboard from './pages/dashboard/admin/Dashboard';
import Tables from './pages/dashboard/admin/Tables';
import Menu from './pages/dashboard/admin/Menu';
import Staff from './pages/dashboard/admin/Staff';
import Reports from './pages/dashboard/admin/Reports';
import Settings from './pages/dashboard/admin/Settings';
import QRManager from './pages/dashboard/admin/QRManager';
import ServiceManager from './pages/dashboard/admin/ServiceManager';
import Tasks from './pages/dashboard/admin/Tasks';
import Inventory from './pages/dashboard/admin/Inventory';

// Dashboard - Waiter
import POS from './pages/dashboard/waiter/POS';
import Orders from './pages/dashboard/waiter/Orders';

// Dashboard - Kitchen
import Kitchen from './pages/dashboard/kitchen/Kitchen';

// Dashboard - Customer
import CustomerHome from './pages/dashboard/customer/CustomerHome';
import CustomerOrderNow from './pages/dashboard/customer/CustomerOrderNow';
import CustomerOrders from './pages/dashboard/customer/CustomerOrders';
import CustomerFavorites from './pages/dashboard/customer/CustomerFavorites';
import CustomerRewards from './pages/dashboard/customer/CustomerRewards';
import CustomerProfile from './pages/dashboard/customer/CustomerProfile';
import CustomerSupport from './pages/dashboard/customer/CustomerSupport';
import CustomerReservations from './pages/dashboard/customer/CustomerReservations';
import CustomerMessages from './pages/dashboard/customer/CustomerMessages';
import CustomerServices from './pages/dashboard/customer/CustomerServices';

// Dashboard - Reception
import Rooms from './pages/dashboard/reception/Rooms';
import Reservations from './pages/dashboard/reception/Reservations';
import GuestFolio from './pages/dashboard/reception/GuestFolio';
import GuestBills from './pages/dashboard/reception/GuestBills';
import Concierge from './pages/dashboard/reception/Concierge';

// Dashboard - Common
import Settlements from './pages/dashboard/common/Settlements';
import Transactions from './pages/dashboard/common/Transactions';
import NotificationsPage from './pages/dashboard/common/Notifications';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === roles.CUSTOMER) return <Navigate to="/customer" />;
    return <Navigate to="/login" />;
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
                      {/* Landing Page */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/menu" element={<DigitalMenu />} />
                      <Route path="/excursions" element={<Excursions />} />
                      <Route path="/transport" element={<Transport />} />
                      <Route path="/book" element={<BookTable />} />
                      <Route path="/order" element={<OrderingEntry />} />
                      <Route path="/checkin" element={<GuestCheckIn />} />
                      <Route path="/guest-app" element={<GuestDashboard />} />
                      <Route path="/guest-menu" element={<GuestMenu />} />
                      <Route path="/my-bill" element={<MyBill />} />
                      <Route path="/request-chat" element={<RequestChat />} />
                      <Route path="/chat" element={<ChatReception />} />
                      
                      {/* Auth */}
                      <Route path="/login" element={<Login />} />
                      
                      {/* Admin/Manager/Staff Routes */}
                      <Route path="/dashboard" element={
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

                      <Route path="/admin-menu" element={
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

                      <Route path="/customer/rewards" element={
                        <ProtectedRoute allowedRoles={[roles.CUSTOMER]}>
                          <MainLayout><CustomerRewards /></MainLayout>
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
