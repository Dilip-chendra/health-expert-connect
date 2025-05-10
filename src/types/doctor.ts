
export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  degrees: string;
  experience: number;
  languages: string[];
  location: string;
  fees: number;
  consultationType: ('Hospital' | 'Virtual')[];
  facility: 'Apollo Hospital' | 'Other Clinics';
  rating?: number;
  availability?: string;
}

export interface DoctorFilterParams {
  consultationType?: string;
  experienceRange?: string;
  feesRange?: string;
  languages?: string[];
  facility?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedDoctors {
  doctors: Doctor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
