
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    {
      title: 'For Patients',
      links: [
        { name: 'Find Doctors', href: '#' },
        { name: 'Book Lab Tests', href: '#' },
        { name: 'Order Medicines', href: '#' },
        { name: 'Consult Online', href: '#' },
        { name: 'Medical Records', href: '#' },
      ],
    },
    {
      title: 'For Doctors',
      links: [
        { name: 'Join as a Doctor', href: '#' },
        { name: 'Success Stories', href: '#' },
        { name: 'Doctor Resources', href: '#' },
        { name: 'Practice Solutions', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Health Blog', href: '#' },
        { name: 'Health Wiki', href: '#' },
        { name: 'FAQs', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-600 hover:text-medical-600 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-medical-500 text-white font-bold rounded-md px-3 py-1">
                <span>Health</span>
                <span className="text-xs bg-white text-medical-700 px-1 rounded ml-1">PRO</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} HealthPRO. All rights reserved.
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center md:text-left">
            The content on this website is for informational purposes only and is not a substitute for medical advice, diagnosis, or treatment.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
