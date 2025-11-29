
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, LogOutIcon } from './icons';

const Header: React.FC = () => {
  const { user, openAuthModal, logout } = useAuth();

  return (
    <header className="w-full py-5 px-4 md:px-8 bg-white sticky top-0 z-40 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">
            SKUBA
          </h1>
      </div>
      
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
               {user.avatarUrl ? (
                 <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200" />
               ) : (
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">{user.name.charAt(0).toUpperCase()}</span>
                 </div>
               )}
               <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Sign Out"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={openAuthModal}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <UserIcon className="w-4 h-4" />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
