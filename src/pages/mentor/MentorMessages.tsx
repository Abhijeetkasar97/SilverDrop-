
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockMessages } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import MessageList from "../../components/messages/MessageList";
import ConversationView from "../../components/messages/ConversationView";
import { Message } from "../../types";
import { useToast } from "@/components/ui/use-toast";

const MentorMessages = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const mentorId = currentUser?.id;
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // Filter messages for the current mentor
  const mentorMessages = messages.filter(
    (m) => m.senderId === mentorId || m.recipientId === mentorId
  );

  const adminId = "1"; // Admin user ID always 1
  const adminName = "Admin";

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId: mentorId!,
      senderName: currentUser!.name,
      recipientId: adminId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, newMessage]);
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the admin.",
    });
  };

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
            <MessageList
              messages={mentorMessages}
              currentUserId={mentorId!}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
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
