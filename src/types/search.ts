export interface TeacherSearchParams {
  q?: string;
  subject?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

export interface PackageSearchParams {
  q?: string;
  teacherId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface GlobalSearchResult {
  items: unknown[];
  total: number;
}

export interface TeacherSearchResult {
  items: unknown[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PackageSearchResult {
  items: unknown[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TeacherRecommendation {
  id: string;
}
