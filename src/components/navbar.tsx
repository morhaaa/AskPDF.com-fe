'use client'
import React from 'react';
import { useRouter } from "next/navigation";


const Navbar: React.FC = () => {

  const router = useRouter();

  return (
    <nav className="bg-gradient-to-br from-gray-800  via-gray-800 to-gray-800/30 p-4 w-full flex justify-between items-center">
      <h3 className="text-white text-lg font-bold">Crypto-Bot</h3>
      <div className="space-x-4">
      <button className="text-white font-medium" onClick={()=>{router.push('/login')}}>
          Login
        </button>
        <button 
            onClick={()=>{router.push('/sign-up')}}    
            className="bg-gradient-to-r from-indigo-600/70 to-indigo-600  hover:bg-violet-900 text-white px-4 py-2 rounded-2xl focus:outline-none focus:shadow-outline-blue font-medium">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
