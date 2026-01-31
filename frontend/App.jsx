import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Plans from './pages/Plans';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import PaymentResult from './pages/PaymentResult';
import RechargeHistory from './pages/RechargeHistory';
import AdminDashboard from './pages/AdminDashboard';
import AdminPlans from './pages/AdminPlans';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />} />
            
            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-result" element={<PaymentResult />} />
              <Route path="/history" element={<RechargeHistory />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="plans" element={<AdminPlans />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;