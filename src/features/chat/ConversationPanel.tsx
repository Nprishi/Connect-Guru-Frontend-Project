"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSendMessageMutation } from "@/hooks/useMutationHooks";
import { useConversationsQuery, useMessagesQuery } from "@/hooks/useQueryHooks";
import { useAuthStore } from "@/store/useAuthStore";

interface ConversationPanelProps {
  title?: string;
  description?: string;
}

export default function ConversationPanel({
  title = "Messages",
  description = "Talk with your teacher or student and keep the conversation moving.",
}: ConversationPanelProps) {
  const currentUser = useAuthStore((state) => state.user);
  const { data: conversations = [] } = useConversationsQuery();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const sendMessageMutation = useSendMessageMutation();

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation._id === selectedConversationId) ?? null,
    [conversations, selectedConversationId],
  );

  const recipientId = selectedConversation?.participants.find((participantId) => participantId !== currentUser?.id);
  const { data: messages = [] } = useMessagesQuery(selectedConversationId ?? undefined);

  const handleSendMessage = () => {
    if (!recipientId || !messageText.trim()) return;

    sendMessageMutation.mutate(
      {
        recipientId,
        content: messageText.trim(),
      },
      {
        onSuccess: () => {
          setMessageText("");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent chats and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            {conversations.length ? (
              conversations.map((conversation) => (
                <button
                  key={conversation._id}
                  type="button"
                  className="w-full rounded-xl border border-slate-200 p-3 text-left"
                  onClick={() => setSelectedConversationId(conversation._id)}
                >
                  <div className="font-medium text-slate-900">Conversation</div>
                  <div className="mt-1 text-xs text-slate-500">{conversation.lastMessage ?? "Start the conversation"}</div>
                </button>
              ))
            ) : (
              <p className="text-sm text-slate-600">No conversations yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>{selectedConversation ? "Conversation" : "Open a conversation"}</CardTitle>
            <CardDescription>Respond to your counterpart here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.length ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`rounded-2xl p-3 ${message.senderId === currentUser?.id ? "bg-violet-50" : "bg-slate-50"}`}
                >
                  <p className="text-sm font-semibold text-slate-900">{message.senderId === currentUser?.id ? "You" : "Them"}</p>
                  <p className="mt-1 text-sm text-slate-600">{message.content}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">Select a conversation to view its messages.</p>
            )}
            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Type a message"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
              />
              <Button onClick={handleSendMessage} disabled={!selectedConversation || sendMessageMutation.isPending}>
                {sendMessageMutation.isPending ? "Sending..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
