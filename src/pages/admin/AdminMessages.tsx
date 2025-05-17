
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockMessages, mockUsers } from "../../data/mockData";
import MessageList from "../../components/messages/MessageList";
import ConversationView from "../../components/messages/ConversationView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SearchIcon } from "lucide-react";
import { Message } from "../../types";

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>("2"); // Default to first mentor
  const [selectedRecipientName, setSelectedRecipientName] = useState<string>("John Doe");
  const [searchQuery, setSearchQuery] = useState("");

  const adminId = "1"; // Admin user ID

  const handleSelectConversation = (userId: string, userName: string) => {
    setSelectedRecipientId(userId);
    setSelectedRecipientName(userName);
    
    // Mark messages as read
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.senderId === userId && msg.recipientId === adminId && !msg.read
          ? { ...msg, read: true }
          : msg
      )
    );
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId: adminId,
      senderName: "Admin User",
      recipientId: selectedRecipientId,
      content,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages([...messages, newMessage]);
    
    toast({
      title: "Message Sent",
      description: `Your message to ${selectedRecipientName} has been sent.`,
    });
  };

  const filteredUsers = mockUsers.filter(user => 
    user.role === "mentor" && 
    (searchQuery === "" || user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with mentors regarding payouts and issues
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-230px)]">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" variant="ghost">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <MessageList
              messages={messages}
              currentUserId={adminId}
              onSelectConversation={handleSelectConversation}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-0 h-full">
            <ConversationView
              messages={messages}
              currentUserId={adminId}
              recipientId={selectedRecipientId}
              recipientName={selectedRecipientName}
              onSendMessage={handleSendMessage}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;
