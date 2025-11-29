/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, LockIcon, XIcon } from './icons';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
          >
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
                <XIcon className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white text-center">
              <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <LockIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-serif tracking-wide mb-2">Limit Reached</h2>
              <p className="text-gray-300 text-sm">You've used your 5 free generations.</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Upgrade to Pro</p>
                 <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">₹299</span>
                    <span className="text-gray-500">/ year</span>
                 </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Unlimited virtual try-ons
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  High-resolution downloads
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  All pose variations unlocked
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Priority processing
                </li>
              </ul>

              <button
                onClick={onUpgrade}
                className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-95 duration-200"
              >
                Upgrade Now
              </button>
              <p className="text-xs text-center text-gray-400 mt-4">
                Secure payment processed by SKUBA. Cancel anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;