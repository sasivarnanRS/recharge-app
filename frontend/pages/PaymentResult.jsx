import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Home } from 'lucide-react';

const PaymentResult = () => {
  const location = useLocation();
  const { status, plan, phone } = location.state || { status: 'failed' };
  const isSuccess = status === 'success';

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          >
            {isSuccess ? (
              <CheckCircle className="w-24 h-24 text-green-500" />
            ) : (
              <XCircle className="w-24 h-24 text-red-500" />
            )}
          </motion.div>
        </div>

        <h1 className={`text-3xl font-bold mb-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h1>
        
        <p className="text-gray-500 mb-8">
          {isSuccess 
            ? `Your recharge of ₹${plan?.price} for ${phone} was successful.` 
            : 'Something went wrong. Please try again.'}
        </p>

        <div className="flex flex-col gap-3">
            {isSuccess && (
                <Link to="/history" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors">
                    View Receipt
                </Link>
            )}
            <Link to="/plans" className="bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
             <Home className="w-4 h-4" /> Go Home
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentResult;