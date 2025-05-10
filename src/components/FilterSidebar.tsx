
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { DoctorFilterParams } from '@/types/doctor';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  filters: DoctorFilterParams;
  onFilterChange: (filters: DoctorFilterParams) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const handleConsultTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      consultationType: value,
      page: 1, // Reset to first page when filter changes
    });
  };

  const handleExperienceRangeChange = (value: string) => {
    onFilterChange({
      ...filters,
      experienceRange: value,
      page: 1,
    });
  };

  const handleFeesRangeChange = (value: string) => {
    onFilterChange({
      ...filters,
      feesRange: value,
      page: 1,
    });
  };

  const handleLanguageChange = (value: string, checked: boolean) => {
    const currentLanguages = filters.languages || [];
    
    let newLanguages;
    if (checked) {
      newLanguages = [...currentLanguages, value];
    } else {
      newLanguages = currentLanguages.filter((lang) => lang !== value);
    }
    
    onFilterChange({
      ...filters,
      languages: newLanguages.length > 0 ? newLanguages : undefined,
      page: 1,
    });
  };

  const handleFacilityChange = (value: string) => {
    onFilterChange({
      ...filters,
      facility: value,
      page: 1,
    });
  };

  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          className="text-medical-600 hover:text-medical-800 text-sm p-0 h-auto"
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>

      {/* Mode of Consult */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Mode of Consult</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hospital-visit" 
              checked={filters.consultationType === 'Hospital'}
              onCheckedChange={(checked) => {
                if (checked) handleConsultTypeChange('Hospital');
              }}
            />
            <label htmlFor="hospital-visit" className="text-sm text-gray-600 cursor-pointer">Hospital Visit</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="online-consult" 
              checked={filters.consultationType === 'Virtual'}
              onCheckedChange={(checked) => {
                if (checked) handleConsultTypeChange('Virtual');
              }}
            />
            <label htmlFor="online-consult" className="text-sm text-gray-600 cursor-pointer">Online Consult</label>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Experience (In Years)</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="exp-0-5" 
              checked={filters.experienceRange === '0-5'}
              onCheckedChange={(checked) => {
                if (checked) handleExperienceRangeChange('0-5');
              }}
            />
            <label htmlFor="exp-0-5" className="text-sm text-gray-600 cursor-pointer">0-5</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="exp-5-10" 
              checked={filters.experienceRange === '5-10'}
              onCheckedChange={(checked) => {
                if (checked) handleExperienceRangeChange('5-10');
              }}
            />
            <label htmlFor="exp-5-10" className="text-sm text-gray-600 cursor-pointer">5-10</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="exp-10" 
              checked={filters.experienceRange === '10-'}
              onCheckedChange={(checked) => {
                if (checked) handleExperienceRangeChange('10-');
              }}
            />
            <label htmlFor="exp-10" className="text-sm text-gray-600 cursor-pointer">10+</label>
          </div>
        </div>
      </div>

      {/* Fees */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Fees (In Rupees)</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fees-0-500" 
              checked={filters.feesRange === '0-500'}
              onCheckedChange={(checked) => {
                if (checked) handleFeesRangeChange('0-500');
              }}
            />
            <label htmlFor="fees-0-500" className="text-sm text-gray-600 cursor-pointer">₹0-₹500</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fees-500-1000" 
              checked={filters.feesRange === '500-1000'}
              onCheckedChange={(checked) => {
                if (checked) handleFeesRangeChange('500-1000');
              }}
            />
            <label htmlFor="fees-500-1000" className="text-sm text-gray-600 cursor-pointer">₹500-₹1000</label>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Language</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lang-english" 
              checked={filters.languages?.includes('English')}
              onCheckedChange={(checked) => {
                handleLanguageChange('English', checked === true);
              }}
            />
            <label htmlFor="lang-english" className="text-sm text-gray-600 cursor-pointer">English</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lang-hindi" 
              checked={filters.languages?.includes('Hindi')}
              onCheckedChange={(checked) => {
                handleLanguageChange('Hindi', checked === true);
              }}
            />
            <label htmlFor="lang-hindi" className="text-sm text-gray-600 cursor-pointer">Hindi</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lang-telugu" 
              checked={filters.languages?.includes('Telugu')}
              onCheckedChange={(checked) => {
                handleLanguageChange('Telugu', checked === true);
              }}
            />
            <label htmlFor="lang-telugu" className="text-sm text-gray-600 cursor-pointer">Telugu</label>
          </div>
        </div>
      </div>

      {/* Facility */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Facility</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="apollo-hospital" 
              checked={filters.facility === 'Apollo Hospital'}
              onCheckedChange={(checked) => {
                if (checked) handleFacilityChange('Apollo Hospital');
              }}
            />
            <label htmlFor="apollo-hospital" className="text-sm text-gray-600 cursor-pointer">Apollo Hospital</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="other-clinics" 
              checked={filters.facility === 'Other Clinics'}
              onCheckedChange={(checked) => {
                if (checked) handleFacilityChange('Other Clinics');
              }}
            />
            <label htmlFor="other-clinics" className="text-sm text-gray-600 cursor-pointer">Other Clinics</label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
