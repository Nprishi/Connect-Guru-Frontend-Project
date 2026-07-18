import apiClient from "@/api/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  ChatConversation,
  ChatMessage,
  SendMessagePayload,
} from "@/types/chat";

export const getConversations = async (): Promise<ChatConversation[]> => {
  const { data } = await apiClient.get<ChatConversation[]>(
    API_ENDPOINTS.chat.conversations,
  );

  return data;
};

export const getMessages = async (
  conversationId: string,
): Promise<ChatMessage[]> => {
  const { data } = await apiClient.get<ChatMessage[]>(
    API_ENDPOINTS.chat.messages(conversationId),
  );

  return data;
};

export const sendMessage = async (
  payload: SendMessagePayload,
): Promise<ChatMessage> => {
  const { data } = await apiClient.post<ChatMessage>(
    API_ENDPOINTS.chat.sendMessage,
    payload,
  );

  return data;
};
