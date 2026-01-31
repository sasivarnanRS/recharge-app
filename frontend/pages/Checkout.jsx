import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { detectOperator, getOperatorColor } from '../utils/operator-detect';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';
import { Smartphone, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const plan = location.state?.plan;
  const { user } = useAuth();
  
  const [detectedOp, setDetectedOp] = useState('Unknown');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validPhone, setValidPhone] = useState('');

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });

  const phoneValue = watch('phone');

  // Auto detect effect
  React.useEffect(() => {
    if (phoneValue) {
      setDetectedOp(detectOperator(phoneValue));
    }
  }, [phoneValue]);

  if (!plan) return <Navigate to="/plans" />;

  const onSubmit = (data) => {
    setValidPhone(data.phone);
    setIsModalOpen(true);
  };

  const isOpMatch = detectedOp === 'Unknown' || detectedOp === plan.operator;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Plan Summary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Summary</h2>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${getOperatorColor(plan.operator)}`}>
              {plan.operator}
            </div>
            <div className="flex justify-between items-end mb-4">
              <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
              <span className="text-gray-500 font-medium">{plan.validity}</span>
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Data</span>
                <span className="font-semibold">{plan.data}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Benefits</span>
                <span className="font-semibold text-right">{plan.benefits.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Input Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Details</h2>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter a valid 10-digit Indian mobile number'
                      }
                    })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                    placeholder="98765 43210"
                    maxLength={10}
                  />
                  {detectedOp !== 'Unknown' && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getOperatorColor(detectedOp)}`}>
                        {detectedOp}
                      </span>
                    </div>
                  )}
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                
                {phoneValue && detectedOp !== 'Unknown' && detectedOp !== plan.operator && (
                  <p className="text-yellow-600 text-xs mt-2 flex items-center gap-1">
                    ⚠️ Number looks like {detectedOp}, but plan is {plan.operator}.
                  </p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Price</span>
                  <span>₹{plan.price}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-blue-200 pt-2">
                  <span>Total Pay</span>
                  <span>₹{plan.price}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="w-full bg-primary hover:bg-secondary disabled:bg-gray-300 text-white font-bold py-3 rounded-lg shadow-md transition-all"
              >
                Proceed to Pay
              </button>
            </form>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plan}
        phone={validPhone}
        userId={user?._id || 'guest'}
      />
    </div>
  );
};

export default Checkout;