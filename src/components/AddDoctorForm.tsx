
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Doctor } from '@/types/doctor';
import { toast } from 'sonner';

const AddDoctorForm = ({ onAddDoctor }: { onAddDoctor: (doctor: Partial<Doctor>) => Promise<void> }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    degrees: '',
    experience: '',
    location: '',
    fees: '',
    languages: {
      English: false,
      Hindi: false,
      Telugu: false,
    },
    consultationType: {
      Hospital: false,
      Virtual: false,
    },
    facility: 'Apollo Hospital' as 'Apollo Hospital' | 'Other Clinics',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [language]: checked,
      },
    }));
  };

  const handleConsultationTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consultationType: {
        ...prev.consultationType,
        [type]: checked,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Convert languages and consultationTypes objects to arrays
      const languages = Object.keys(formData.languages).filter(
        lang => formData.languages[lang as keyof typeof formData.languages]
      );
      
      const consultationType = Object.keys(formData.consultationType).filter(
        type => formData.consultationType[type as keyof typeof formData.consultationType]
      ) as ("Hospital" | "Virtual")[];
      
      if (languages.length === 0) {
        toast.error('Please select at least one language');
        return;
      }
      
      if (consultationType.length === 0) {
        toast.error('Please select at least one consultation type');
        return;
      }
      
      const newDoctor: Partial<Doctor> = {
        name: formData.name,
        photo: '/placeholder.svg',
        specialization: formData.specialization,
        degrees: formData.degrees,
        experience: Number(formData.experience),
        languages,
        location: formData.location,
        fees: Number(formData.fees),
        consultationType,
        facility: formData.facility,
      };
      
      await onAddDoctor(newDoctor);
      
      // Reset form
      setFormData({
        name: '',
        specialization: '',
        degrees: '',
        experience: '',
        location: '',
        fees: '',
        languages: {
          English: false,
          Hindi: false,
          Telugu: false,
        },
        consultationType: {
          Hospital: false,
          Virtual: false,
        },
        facility: 'Apollo Hospital',
      });
      
      toast.success('Doctor added successfully');
    } catch (error) {
      toast.error('Failed to add doctor');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Dr. Full Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization*
            </label>
            <Input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              placeholder="General Physician"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degrees*
            </label>
            <Input
              name="degrees"
              value={formData.degrees}
              onChange={handleChange}
              required
              placeholder="MBBS, MD"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years)*
            </label>
            <Input
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              required
              min="1"
              placeholder="5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="City, State"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consultation Fee (₹)*
            </label>
            <Input
              name="fees"
              type="number"
              value={formData.fees}
              onChange={handleChange}
              required
              min="0"
              placeholder="500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages*
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="lang-english-add"
                  checked={formData.languages.English}
                  onCheckedChange={(checked) => handleLanguageChange('English', checked === true)}
                />
                <label htmlFor="lang-english-add" className="ml-2 text-sm text-gray-600">
                  English
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="lang-hindi-add"
                  checked={formData.languages.Hindi}
                  onCheckedChange={(checked) => handleLanguageChange('Hindi', checked === true)}
                />
                <label htmlFor="lang-hindi-add" className="ml-2 text-sm text-gray-600">
                  Hindi
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="lang-telugu-add"
                  checked={formData.languages.Telugu}
                  onCheckedChange={(checked) => handleLanguageChange('Telugu', checked === true)}
                />
                <label htmlFor="lang-telugu-add" className="ml-2 text-sm text-gray-600">
                  Telugu
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Type*
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="consult-hospital"
                  checked={formData.consultationType.Hospital}
                  onCheckedChange={(checked) => handleConsultationTypeChange('Hospital', checked === true)}
                />
                <label htmlFor="consult-hospital" className="ml-2 text-sm text-gray-600">
                  Hospital Visit
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="consult-virtual"
                  checked={formData.consultationType.Virtual}
                  onCheckedChange={(checked) => handleConsultationTypeChange('Virtual', checked === true)}
                />
                <label htmlFor="consult-virtual" className="ml-2 text-sm text-gray-600">
                  Virtual Consultation
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facility*
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="facility-apollo"
                  name="facility"
                  value="Apollo Hospital"
                  checked={formData.facility === 'Apollo Hospital'}
                  onChange={handleChange}
                  className="h-4 w-4 text-medical-600 focus:ring-medical-500"
                />
                <label htmlFor="facility-apollo" className="ml-2 text-sm text-gray-600">
                  Apollo Hospital
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="facility-other"
                  name="facility"
                  value="Other Clinics"
                  checked={formData.facility === 'Other Clinics'}
                  onChange={handleChange}
                  className="h-4 w-4 text-medical-600 focus:ring-medical-500"
                />
                <label htmlFor="facility-other" className="ml-2 text-sm text-gray-600">
                  Other Clinics
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-medical-500 hover:bg-medical-600" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Doctor'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
