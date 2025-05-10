
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doctor } from '@/types/doctor';
import { Badge } from '@/components/ui/badge';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="border rounded-lg p-4 md:p-6 mb-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={doctor.photo} alt={doctor.name} />
            <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-500">{doctor.experience} YEARS</span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-medical-700 flex items-center">
            {doctor.name}
            <span className="ml-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L10.2 5.8L16 6.8L12 11.3L13.2 16L8 13.8L2.8 16L4 11.3L0 6.8L5.8 5.8L8 0Z" fill="#FFB800"/>
              </svg>
            </span>
          </h3>
          
          <div className="text-sm text-gray-600 mt-1 mb-2">
            {doctor.specialization}
          </div>
          
          <div className="text-xs text-gray-500 mb-1">
            {doctor.degrees}
          </div>
          
          <div className="text-xs text-gray-500 mb-2">
            {doctor.location}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {doctor.languages.map((language) => (
              <Badge key={language} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
            {doctor.consultationType.map((type) => (
              <Badge key={type} className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between">
          <div className="text-xl font-semibold text-gray-800">₹{doctor.fees}</div>
          
          <Button variant="outline" className="mt-4 w-full border-medical-500 text-medical-500 hover:bg-medical-50">
            Consult Online
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
