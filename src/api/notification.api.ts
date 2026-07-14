import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { NotificationItem } from "@/types/notification";

export async function getNotifications() {
  return apiClient.get<NotificationItem[]>(API_ENDPOINTS.notifications.list);
}
