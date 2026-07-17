import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { NotificationItem } from "@/types/notification";

export const getNotifications = async (): Promise<NotificationItem[]> => {
  const { data } = await apiClient.get<NotificationItem[]>(
    API_ENDPOINTS.notifications.list,
  );

  return data;
};
