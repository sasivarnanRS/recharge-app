import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { Users, CreditCard, Activity, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalRevenue: 0, totalRecharges: 0 });

  useEffect(() => {
    api.stats.getDashboard().then(setStats);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link to="/admin/plans" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Manage Plans
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Recharges</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalRecharges}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;