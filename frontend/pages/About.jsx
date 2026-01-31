import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, Award, Clock, Globe } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About RechargeNow</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's fastest and most reliable mobile recharge platform, serving millions of customers with instant recharges and secure payments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect p-8 rounded-2xl shadow-lg"
          >
            <Zap className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-600">Instant recharges in under 5 seconds with 99.9% success rate across all operators.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect p-8 rounded-2xl shadow-lg"
          >
            <Shield className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-gray-600">Bank-grade security with SSL encryption and PCI DSS compliance for safe transactions.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect p-8 rounded-2xl shadow-lg"
          >
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">10M+ Users</h3>
            <p className="text-gray-600">Trusted by over 10 million users across India for their daily recharge needs.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect p-8 rounded-2xl shadow-lg"
          >
            <Award className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Award Winning</h3>
            <p className="text-gray-600">Recognized as "Best Fintech App 2024" by Digital India Awards.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect p-8 rounded-2xl shadow-lg"
          >
            <Clock className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer support to help you with any recharge issues.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect p-8 rounded-2xl shadow-lg"
          >
            <Globe className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">All Operators</h3>
            <p className="text-gray-600">Support for Jio, Airtel, Vi, BSNL and all major telecom operators in India.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-2xl shadow-lg p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To make mobile recharges simple, fast, and accessible for everyone in India. We believe that staying connected 
            should never be complicated, which is why we've built the most user-friendly recharge platform that works 
            seamlessly across all devices and operators.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;