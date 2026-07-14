export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  createdAt: string;
  type?: "admin" | "system" | "teacher" | "student";
  isRead?: boolean;
  link?: string;
}
