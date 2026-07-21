export interface Package {
  _id: string;
  teacherId: string;
  name: string;
  description: string;
  price: number;
  durationInHours: number;
  sessions: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  teacher?: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export type CoursePackage = Package;

export interface PackageResponse {
  message: string;
  data: Package;
}

export interface PackagesResponse {
  message: string;
  data: Package[];
}

export interface CreatePackagePayload {
  name: string;
  description: string;
  price: number;
  durationInHours: number;
  sessions: number;
  isActive?: boolean;
}

export interface UpdatePackagePayload extends Partial<CreatePackagePayload> {}
