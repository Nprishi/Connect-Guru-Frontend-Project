export interface CoursePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  durationInHours: number;
  sessions: number;
  isActive: boolean;
  teacherId?: string;
}
