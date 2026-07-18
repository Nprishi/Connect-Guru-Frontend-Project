export interface ChatConversation {
  _id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  recipientId: string;
  conversationId: string;
  content: string;
  createdAt: string;
}

export interface SendMessagePayload {
  recipientId: string;
  content: string;
}
