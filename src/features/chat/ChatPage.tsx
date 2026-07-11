import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const messages = [
  { id: 1, sender: "Maya", text: "Your lesson notes are ready.", time: "10:30" },
  { id: 2, sender: "You", text: "Perfect, I will review them tonight.", time: "10:32" },
];

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Messages</CardTitle>
              <CardDescription>Keep your tutor updated and stay in sync.</CardDescription>
            </div>
            <Badge variant="secondary">Online</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Recent chats and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <div className="rounded-xl border border-slate-200 p-3">Maya Chen</div>
            <div className="rounded-xl border border-slate-200 p-3">David Kim</div>
            <div className="rounded-xl border border-slate-200 p-3">Support team</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Chat with Maya</CardTitle>
            <CardDescription>Respond to your tutor quickly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`rounded-2xl p-3 ${message.sender === "You" ? "bg-blue-50" : "bg-slate-50"}`}>
                <p className="text-sm font-semibold text-slate-900">{message.sender}</p>
                <p className="mt-1 text-sm text-slate-600">{message.text}</p>
                <p className="mt-2 text-xs text-slate-400">{message.time}</p>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Input placeholder="Type a message" />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
