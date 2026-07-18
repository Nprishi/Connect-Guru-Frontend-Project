export interface AdminDashboard {
  totalUsers: number;
  totalTeachers: number;
  totalStudents: number;
  totalBookings: number;
  totalRevenue: number;
}

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

export interface UpdateUserStatusPayload {
  status: string;
}
