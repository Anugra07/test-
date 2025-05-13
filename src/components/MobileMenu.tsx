
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden text-xl" aria-label="Open Menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </SheetTrigger>
      
      <SheetContent className="bg-gray-900 text-gray-100 border-green-500/20" side="right">
        <div className="flex flex-col mt-12 space-y-6">
          <a href="#" className="text-lg hover:text-green-400 transition pb-2 border-b border-gray-700">Home</a>
          <a href="#" className="text-lg hover:text-green-400 transition pb-2 border-b border-gray-700">About</a>
          <a href="#" className="text-lg hover:text-green-400 transition pb-2 border-b border-gray-700">Success Stories</a>
          <a href="#" className="text-lg hover:text-green-400 transition pb-2 border-b border-gray-700">Contact</a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
