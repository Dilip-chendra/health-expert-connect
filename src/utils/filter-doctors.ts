
import { Doctor, DoctorFilterParams } from "@/types/doctor";

export function filterDoctors(doctors: Doctor[], filters: DoctorFilterParams): {
  filtered: Doctor[];
  total: number;
} {
  let filtered = [...doctors];

  // Filter by consultation type
  if (filters.consultationType) {
    filtered = filtered.filter((doctor) =>
      doctor.consultationType.includes(filters.consultationType as "Hospital" | "Virtual")
    );
  }

  // Filter by experience range
  if (filters.experienceRange) {
    const [min, max] = filters.experienceRange.split("-").map(Number);
    filtered = filtered.filter((doctor) => {
      if (!max) {
        return doctor.experience >= min;
      }
      return doctor.experience >= min && doctor.experience <= max;
    });
  }

  // Filter by fees range
  if (filters.feesRange) {
    const [min, max] = filters.feesRange.split("-").map(Number);
    filtered = filtered.filter((doctor) => {
      if (!max) {
        return doctor.fees >= min;
      }
      return doctor.fees >= min && doctor.fees <= max;
    });
  }

  // Filter by languages
  if (filters.languages && filters.languages.length > 0) {
    filtered = filtered.filter((doctor) =>
      filters.languages!.some(lang => doctor.languages.includes(lang))
    );
  }

  // Filter by facility
  if (filters.facility) {
    filtered = filtered.filter((doctor) => doctor.facility === filters.facility);
  }

  return {
    filtered,
    total: filtered.length,
  };
}

export function paginateDoctors(doctors: Doctor[], page = 1, limit = 5): Doctor[] {
  const startIndex = (page - 1) * limit;
  return doctors.slice(startIndex, startIndex + limit);
}
