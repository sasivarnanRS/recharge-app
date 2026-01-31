import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { Loader2, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ isOpen, onClose, plan, phone, userId }) => {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setProcessing(true);
      
      // Show processing animation for 5 seconds
      setTimeout(async () => {
        try {
          // Create recharge record
          await api.recharge.record({
              userId,
              planId: plan._id,
              operator: plan.operator,
              amount: plan.price,
              phone: phone
          });
          navigate('/payment-result', { state: { status: 'success', plan, phone } });
        } catch (e) {
          navigate('/payment-result', { state: { status: 'success', plan, phone } });
        }
      }, 5000);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShieldCheck className="text-green-600" />
              Secure Payment
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            {processing ? (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-gray-600">Please wait while we process your recharge...</p>
                <div className="mt-4 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Mobile Number</span>
                    <span className="font-medium text-gray-900">{phone}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Operator</span>
                    <span className="font-medium text-gray-900">{plan.operator}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Plan Validity</span>
                    <span className="font-medium text-gray-900">{plan.validity}</span>
                  </div>
                  <div className="border-t border-dashed pt-4 flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Amount</span>
                    <span className="font-bold text-2xl text-primary">₹{plan.price}</span>
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Processing...
                    </>
                  ) : (
                    `Pay ₹${plan.price}`
                  )}
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  100% Safe & Secure Payment.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;