import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PlanCard from '../components/PlanCard';
import OperatorSelector from '../components/OperatorSelector';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState('All');

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await api.plans.getAll(selectedOperator === 'All' ? undefined : selectedOperator);
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [selectedOperator]);

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-emerald-100 via-lime-50 to-yellow-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Plans</h1>
        <p className="text-gray-500">Find the best prepaid plans for your need</p>
      </div>

      <div className="mb-10">
        <OperatorSelector selected={selectedOperator} onSelect={setSelectedOperator} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No plans found for this operator.
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </motion.div>
      )}
      </div>
    </motion.div>
  );
};

export default Plans;