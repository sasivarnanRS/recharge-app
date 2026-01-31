import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Download, Search, Calendar, Wifi } from 'lucide-react';

const RechargeHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching history for user:", user._id);
        const data = await api.recharge.getHistory(user._id);
        console.log("History data received:", data);
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setError("Failed to load recharge history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const filteredHistory = history.filter(h =>
    (h.phone && h.phone.includes(filter)) || (h.operator && h.operator.toLowerCase().includes(filter.toLowerCase()))
  );

  const downloadCSV = () => {
    const headers = ['Date', 'Phone', 'Operator', 'Amount', 'Status'];
    const rows = filteredHistory.map(h => [
      new Date(h.date).toLocaleDateString(),
      h.phone,
      h.operator,
      h.amount,
      h.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "recharge_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Please log in to view your recharge history.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Recharge History</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by phone..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <button
              onClick={downloadCSV}
              disabled={filteredHistory.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p>Loading history...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operator</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {record.date ? new Date(record.date).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          <Wifi className="w-4 h-4 text-gray-400" />
                          {record.operator}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phone || record.mobileNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{record.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'success' || record.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                        No history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RechargeHistory;