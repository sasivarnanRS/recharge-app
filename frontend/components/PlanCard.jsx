import React from 'react';
import { motion } from 'framer-motion';
import { getOperatorBorder, getOperatorColor } from '../utils/operator-detect';
import { Check, Info, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const operatorColor = getOperatorColor(plan.operator);
  const operatorBorder = getOperatorBorder(plan.operator);

  const handleRecharge = () => {
    if (isAuthenticated) {
      navigate('/checkout', { state: { plan } });
    } else {
      navigate('/login', { state: { from: '/checkout', plan } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className={`glass-effect rounded-xl shadow-lg border-l-4 ${operatorBorder} p-6 relative overflow-hidden group`}
    >
      {plan.offers && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-300 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
          {plan.offers}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">₹{plan.price}</h3>
          <p className="text-sm text-gray-500 font-medium">{plan.operator}</p>
        </div>
        <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
          <Smartphone className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Validity</p>
          <p className="font-semibold text-gray-800">{plan.validity}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Data</p>
          <p className="font-semibold text-gray-800">{plan.data}</p>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        {plan.benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleRecharge}
        className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition-all active:scale-95 ${plan.operator === 'Jio' ? 'jio-gradient' :
            plan.operator === 'Airtel' ? 'airtel-gradient' :
              plan.operator === 'Vi' ? 'vi-gradient' :
                plan.operator === 'BSNL' ? 'bsnl-gradient' :
                  'bg-gray-600'
          } hover:opacity-90`}
      >
        Recharge Now
      </button>
    </motion.div>
  );
};

export default PlanCard;