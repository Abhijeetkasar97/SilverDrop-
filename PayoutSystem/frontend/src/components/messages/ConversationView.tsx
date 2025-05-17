
import React, { useState, useRef, useEffect } from "react";
import { Message } from "../../types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ConversationViewProps {
  messages: Message[];
  currentUserId: string;
  recipientId: string;
  recipientName: string;
  onSendMessage: (content: string) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  messages,
  currentUserId,
  recipientId,
  recipientName,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === currentUserId && msg.recipientId === recipientId) ||
      (msg.senderId === recipientId && msg.recipientId === currentUserId)
  );

  // Sort messages by timestamp
  const sortedMessages = [...filteredMessages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-4 py-3">
        <h3 className="font-semibold">{recipientName}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.senderId === currentUserId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70 text-right">
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="resize-none"
            rows={2}
          />
          <Button type="submit" className="shrink-0">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationView;
