import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
        >
          Recharge in <span className="text-primary">Seconds</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          The fastest way to recharge your mobile. All operators, secure payments, and instant activation.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/plans" className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-secondary transition-all hover:scale-105">
            View Plans
          </Link>
          <Link to="/about" className="px-8 py-4 bg-white text-gray-800 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-50 transition-all hover:scale-105">
            Learn More
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="glass-effect p-6 rounded-2xl shadow-lg">
            <Zap className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Instant</h3>
            <p className="text-gray-600">Recharges happen in real-time. No waiting periods.</p>
          </div>
          <div className="glass-effect p-6 rounded-2xl shadow-lg">
            <Shield className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Secure</h3>
            <p className="text-gray-600">Bank-grade security for all your payments.</p>
          </div>
          <div className="glass-effect p-6 rounded-2xl shadow-lg">
            <Smartphone className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Universal</h3>
            <p className="text-gray-600">Supports Jio, Airtel, Vi, and BSNL seamlessly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;