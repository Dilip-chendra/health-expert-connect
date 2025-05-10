
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex items-center space-x-1 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
            )}
            
            {item.isCurrent ? (
              <span className="text-gray-700" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-medical-500 hover:text-medical-700"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
