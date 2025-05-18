import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MessageList from "../../components/messages/MessageList";
import ConversationView from "../../components/messages/ConversationView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SearchIcon } from "lucide-react";
import { Message, User } from "../../types";
import { useAuth } from "@/context/AuthContext";

const AdminMessages = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const adminId = currentUser?._id || ""; // Use logged in admin's id

  const [messages, setMessages] = useState<Message[]>([]);
  const [mentors, setMentors] = useState<User[]>([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [selectedRecipientName, setSelectedRecipientName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch mentors and messages on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mentors
        const usersRes = await fetch("http://localhost:5000/api/admin/mentors", {
          method: "GET",
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        });
        if (!usersRes.ok) throw new Error("Failed to fetch mentors");
        const usersData: User[] = await usersRes.json();
        setMentors(usersData);

        // Fetch messages
        const messagesRes = await fetch("http://localhost:5000/api/messages", {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        });
        if (!messagesRes.ok) throw new Error("Failed to fetch messages");
        const messagesData: Message[] = await messagesRes.json();
        setMessages(messagesData);

        // Set default selected recipient as first mentor if available
        if (usersData.length > 0) {
          setSelectedRecipientId(usersData[0]._id || usersData[0].id); // depending on your schema
          setSelectedRecipientName(usersData[0].name);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.token) {
      fetchData();
    }
  }, [currentUser, toast]);

  // Filter mentors based on search query
  const filteredMentors = mentors.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Conversation messages between admin and selected mentor
  const conversationMessages = messages.filter(
    msg =>
      selectedRecipientId &&
      ((msg.senderId === adminId && msg.recipientId === selectedRecipientId) ||
        (msg.senderId === selectedRecipientId && msg.recipientId === adminId))
  );

  const handleSelectConversation = (userId: string, userName: string) => {
    setSelectedRecipientId(userId);
    setSelectedRecipientName(userName);

    // Mark unread messages as read locally (optional)
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.senderId === userId && msg.recipientId === adminId && !msg.read
          ? { ...msg, read: true }
          : msg
      )
    );
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !selectedRecipientId) return;

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({
          content,
          recipientId: selectedRecipientId,
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");

      const newMessage: Message = await res.json();
      setMessages(prev => [...prev, newMessage]);

      toast({
        title: "Message Sent",
        description: `Your message to ${selectedRecipientName} has been sent.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (!selectedRecipientId) {
    return <div>No mentors found.</div>;
  }

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
              <Button size="icon" variant="ghost" onClick={() => {}}>
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>

            <MessageList
              messages={messages}
              users={filteredMentors}
              currentUserId={adminId}
              onSelectConversation={handleSelectConversation}
              selectedUserId={selectedRecipientId}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 h-full overflow-hidden">
          <CardContent className="p-0 h-full">
            <ConversationView
              messages={conversationMessages}
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
