import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.auth.login(data);
      login(res.token, res.user);

      const from = location.state?.from;
      const plan = location.state?.plan;

      if (res.user.role === 'admin') {
        navigate('/admin');
      } else if (from) {
        navigate(from, { state: { plan } });
      } else {
        navigate('/plans');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full glass-effect rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
              })}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg shadow-md transition-colors flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;