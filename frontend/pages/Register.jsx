import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.auth.register(data);
      login(res.token, res.user);
      navigate('/plans');
      navigate('/plans');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ rotate: -2, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-teal-100 via-emerald-50 to-green-100 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full glass-effect rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Get started with RechargeNow</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' }
              })}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
              })}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Min 8 chars, 1 uppercase, 1 number"
                }
              })}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg shadow-md transition-colors flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;