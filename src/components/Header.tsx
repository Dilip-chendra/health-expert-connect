
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Header = () => {
  const menuItems = [
    { name: 'Buy Medicines', href: '#' },
    { name: 'Find Doctors', href: '#' },
    { name: 'Lab Tests', href: '#' },
    { name: 'Circle Membership', href: '#' },
    { name: 'Health Records', href: '#' },
    { name: 'Diabetes Reversal', href: '#' },
    { name: 'Buy Insurance', href: '#', isNew: true },
  ];

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-medical-500 text-white font-bold rounded-md px-3 py-1">
                <span>Health</span>
                <span className="text-xs bg-white text-medical-700 px-1 rounded ml-1">PRO</span>
              </div>
            </Link>
            <div className="hidden sm:flex items-center ml-4">
              <div className="text-sm mr-2">
                <span className="text-gray-500">Select Location</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Doctors, Specialists, Conditions etc."
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-medical-400"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <Button variant="outline" className="border-medical-500 text-medical-500 hover:bg-medical-50">
              Login
            </Button>
          </div>
        </div>

        <nav className="mt-4">
          <ul className="flex overflow-x-auto gap-x-6 text-sm whitespace-nowrap pb-2">
            {menuItems.map((item) => (
              <li key={item.name} className="flex-shrink-0">
                <Link 
                  to={item.href}
                  className={`hover:text-medical-600 ${
                    item.name === 'Find Doctors' ? 'text-medical-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {item.isNew && (
                    <span className="ml-1 bg-green-100 text-green-800 text-xs px-1 rounded">new</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
