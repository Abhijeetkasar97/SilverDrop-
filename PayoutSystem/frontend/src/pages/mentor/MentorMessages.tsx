import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import MessageList from "@/components/messages/MessageList";
import ConversationView from "@/components/messages/ConversationView";
import { Message } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const MentorMessages = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const mentorId = currentUser?._id;
  const [messages, setMessages] = useState<Message[]>([]);

  const adminId = "6828939573a88c068be7aeda";
  const adminName = "Admin";

  useEffect(() => {
    const fetchMessages = async () => {
      if (!mentorId) return;

      try {
        const res = await fetch("http://localhost:5000/api/messages", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });

        if (!res.ok) throw new Error("Failed to load messages");

        const data = await res.json();
        setMessages(data);
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive"
        });
      }
    };

    fetchMessages();
  }, [mentorId, currentUser.token, toast]);

  const handleSendMessage = async (content: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ content, recipientId: adminId })
      });

      if (!res.ok) throw new Error("Failed to send message");

      const newMessage: Message = await res.json();
      setMessages((prev) => [...prev, newMessage]);

      toast({
        title: "Message Sent",
        description: "Your message has been sent to the admin."
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const mentorMessages = messages.filter(
    (m) => m.senderId === mentorId || m.recipientId === mentorId
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with administrators regarding your payments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-230px)]">
        <Card>
          <CardContent className="p-4">
            <MessageList messages={mentorMessages} currentUserId={mentorId!} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 h-full overflow-hidden">
          {" "}
          {/* Fixes outer growth */}
          <CardContent className="p-0 h-full">
            <ConversationView
              messages={mentorMessages}
              currentUserId={mentorId!}
              recipientId={adminId}
              recipientName={adminName}
              onSendMessage={handleSendMessage}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorMessages;
