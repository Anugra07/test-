
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 mt-auto bg-black/60 backdrop-blur-md border-t border-green-500/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <div className="text-2xl text-green-500 mr-2">🐺</div>
            <span className="text-lg font-bold tracking-wider">WOLF STREET VENTURES</span>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-green-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-green-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-green-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
          <div className="md:flex md:space-x-6 mb-4 md:mb-0 text-center md:text-left">
            <a href="#" className="block mb-2 md:mb-0 text-sm text-gray-400 hover:text-green-400 transition">Terms of Service</a>
            <a href="#" className="block mb-2 md:mb-0 text-sm text-gray-400 hover:text-green-400 transition">Privacy Policy</a>
            <a href="#" className="block text-sm text-gray-400 hover:text-green-400 transition">Cookie Policy</a>
          </div>
          <div className="text-sm text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} Wolf Street Ventures. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
