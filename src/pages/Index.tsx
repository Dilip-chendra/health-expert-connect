
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import DoctorCard from '@/components/DoctorCard';
import Pagination from '@/components/Pagination';
import Breadcrumb from '@/components/Breadcrumb';
import AddDoctorForm from '@/components/AddDoctorForm';
import { Doctor, DoctorFilterParams } from '@/types/doctor';
import { filterDoctors, paginateDoctors } from '@/utils/filter-doctors';
import { doctors as initialDoctors } from '@/data/doctors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [filters, setFilters] = useState<DoctorFilterParams>({
    page: 1,
    limit: 5,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total pages
  const totalPages = Math.ceil(totalDoctors / (filters.limit || 5));

  // Apply filters and pagination
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter doctors
        const { filtered, total } = filterDoctors(doctors, filters);
        setTotalDoctors(total);
        
        // Apply pagination
        const paginatedDoctors = paginateDoctors(
          filtered,
          filters.page || 1,
          filters.limit || 5
        );
        
        setFilteredDoctors(paginatedDoctors);
      } catch (error) {
        console.error('Error filtering doctors', error);
        toast.error('Error filtering doctors');
      } finally {
        setIsLoading(false);
      }
    };
    
    applyFilters();
  }, [doctors, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: DoctorFilterParams) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle adding a new doctor
  const handleAddDoctor = async (newDoctor: Partial<Doctor>) => {
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const doctorToAdd: Doctor = {
        id: `${doctors.length + 1}`,
        name: newDoctor.name || '',
        photo: newDoctor.photo || '/placeholder.svg',
        specialization: newDoctor.specialization || '',
        degrees: newDoctor.degrees || '',
        experience: newDoctor.experience || 0,
        languages: newDoctor.languages || [],
        location: newDoctor.location || '',
        fees: newDoctor.fees || 0,
        consultationType: newDoctor.consultationType || [],
        facility: newDoctor.facility || 'Apollo Hospital',
      };
      
      setDoctors(prev => [...prev, doctorToAdd]);
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding doctor', error);
      return Promise.reject(error);
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: filters.limit,
    });
  };

  // Schema.org JSON-LD data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Health PRO Online Doctor Consultations",
    "description": "Find and consult with general physicians online. Book appointments with verified doctors.",
    "medicalSpecialty": "General Practice",
    "availableService": {
      "@type": "MedicalTherapy",
      "name": "Online Doctor Consultation"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    }
  };

  return (
    <>
      <Helmet>
        <title>Consult General Physicians Online | Health PRO</title>
        <meta name="description" content="Book appointments with general physicians online. Connect with verified doctors for virtual or in-person consultations." />
        <meta name="keywords" content="General Physician, Online Doctor Consultation, Health PRO, Virtual Doctor Visit" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Doctors', href: '/doctors' },
            { label: 'General Physicians', href: '#', isCurrent: true },
          ]}
        />
        
        <div className="flex flex-col md:flex-row justify-between items-start mt-6">
          <div>
            <h1 className="text-2xl font-bold">
              Consult General Physicians Online - Internal Medicine Specialists
            </h1>
            <p className="text-gray-600 mt-2">
              ({totalDoctors} doctors)
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-medical-500 hover:bg-medical-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <AddDoctorForm onAddDoctor={handleAddDoctor} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="all">All Doctors</TabsTrigger>
                <TabsTrigger value="relevance">Relevance</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="relative w-24 h-24">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-medical-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div className="absolute top-2 left-2 w-20 h-20 border-4 border-t-medical-300 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                {filteredDoctors.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg border text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h2>
                    <p className="text-gray-500">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {filteredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                      ))}
                    </div>
                    
                    <Pagination
                      currentPage={filters.page || 1}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">About General Physicians</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              General medicine is a medical specialty that focuses on the prevention, diagnosis, and treatment of internal diseases in adults. This specialty encompasses a wide range of acute and chronic conditions, including heart problems, lung problems, liver problems, and neurological disorders. General medicine plays a crucial role in healthcare by providing comprehensive medical care, managing complex conditions, and establishing holistic or preventative healthcare.
            </p>
            <p className="mb-4">
              A general physician is a qualified medical doctor who specializes in the diagnosis, treatment, and prevention of adult diseases. To become a general physician in the Indian subcontinent, one must complete a Bachelor of Medicine, Bachelor of Surgery (MBBS) degree and has a wide range of medical knowledge and skills. They serve a vital role in preventative care when patients have multiple or complex presentations.
            </p>
            <h3 className="text-lg font-medium my-3">What Do General Physicians Do?</h3>
            <p>General physicians (GPs) are the first point of contact for patients seeking medical care. Some of the key responsibilities of doctors include:</p>
            <ul className="list-disc pl-5 my-3 space-y-1">
              <li>Conducting thorough physical examinations and collecting medical histories to accurately diagnose health issues</li>
              <li>Ordering and interpreting diagnostic tests, such as blood work, imaging studies, and biopsies, to identify underlying conditions</li>
              <li>Developing personalized treatment plans that may include medications, lifestyle modifications, or referrals to specialists when necessary</li>
              <li>Providing preventive care, such as vaccinations and health screenings, to help patients maintain optimal health and prevent the onset of diseases</li>
              <li>Educating patients about their health conditions, treatment options, and self-care strategies to promote better health outcomes</li>
              <li>Collaborating with other healthcare professionals, such as specialists and nurses, to ensure comprehensive and coordinated patient care</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Index;
