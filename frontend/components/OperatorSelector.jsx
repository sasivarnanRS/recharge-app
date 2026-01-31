import React from 'react';
import { motion } from 'framer-motion';
import { getOperatorColor } from '../utils/operator-detect';
import { Wifi } from 'lucide-react';

const operators = ['All', 'Jio', 'Airtel', 'Vi', 'BSNL'];

const OperatorSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex overflow-x-auto py-4 gap-2 md:gap-4 justify-start md:justify-center no-scrollbar px-4">
      {operators.map((op) => {
        const isSelected = selected === op;
        const colorClass = op === 'All' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 
          op === 'Jio' ? 'jio-gradient' :
          op === 'Airtel' ? 'airtel-gradient' :
          op === 'Vi' ? 'vi-gradient' :
          op === 'BSNL' ? 'bsnl-gradient' : 'bg-gray-600';
        
        return (
          <motion.button
            key={op}
            onClick={() => onSelect(op)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative px-6 py-2 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300
              ${isSelected ? 'shadow-lg ring-2 ring-offset-2 ring-white/50 text-white' : 'glass-effect text-gray-700 hover:bg-white/80'}
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 rounded-full ${colorClass}`}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className={`relative z-10 flex items-center gap-2 ${isSelected ? 'text-white' : ''}`}>
              {op !== 'All' && <Wifi className="w-4 h-4" />}
              {op}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default OperatorSelector;