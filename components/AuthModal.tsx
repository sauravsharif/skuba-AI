
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, UserIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup, isLoading } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLoginView && !name) {
      setError('Please enter your name');
      return;
    }

    try {
      if (isLoginView) {
        // In a real app, password would be verified
        await login(email); 
      } else {
        await signup(name, email);
      }
      // Reset form on success
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <UserIcon className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLoginView ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">
                  {isLoginView 
                    ? 'Enter your details to sign in to your account' 
                    : 'Join SKUBA to save your outfits and more'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginView && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                {isLoginView ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setError('');
                  }}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {isLoginView ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
