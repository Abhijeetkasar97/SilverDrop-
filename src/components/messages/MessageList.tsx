
import React from "react";
import { Message } from "../../types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onSelectConversation?: (userId: string, userName: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onSelectConversation,
}) => {
  // Group messages by conversation
  const conversations = messages.reduce((acc, message) => {
    const conversationPartnerId = message.senderId === currentUserId ? message.recipientId : message.senderId;
    const partnerName = message.senderId === currentUserId ? "To: " + message.recipientId : message.senderName;
    
    if (!acc[conversationPartnerId]) {
      acc[conversationPartnerId] = {
        partnerId: conversationPartnerId,
        partnerName,
        messages: [],
      };
    }
    acc[conversationPartnerId].messages.push(message);
    return acc;
  }, {} as Record<string, { partnerId: string; partnerName: string; messages: Message[] }>);

  // Sort conversations by the timestamp of the most recent message
  const sortedConversations = Object.values(conversations).sort((a, b) => {
    const latestA = a.messages.reduce((latest, msg) => {
      const msgTime = new Date(msg.timestamp).getTime();
      return msgTime > latest ? msgTime : latest;
    }, 0);
    
    const latestB = b.messages.reduce((latest, msg) => {
      const msgTime = new Date(msg.timestamp).getTime();
      return msgTime > latest ? msgTime : latest;
    }, 0);
    
    return latestB - latestA;
  });

  // Format timestamp to show time if today, or date if not
  const formatTimestamp = (timestamp: string) => {
    const msgDate = new Date(timestamp);
    const today = new Date();
    
    if (
      msgDate.getDate() === today.getDate() &&
      msgDate.getMonth() === today.getMonth() &&
      msgDate.getFullYear() === today.getFullYear()
    ) {
      return msgDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return msgDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="space-y-1">
      {sortedConversations.map((conversation) => {
        const latestMessage = conversation.messages.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0];
        
        const unreadCount = conversation.messages.filter(
          msg => msg.senderId !== currentUserId && !msg.read
        ).length;

        return (
          <div
            key={conversation.partnerId}
            className="flex items-center justify-between px-4 py-3 hover:bg-muted rounded-md cursor-pointer"
            onClick={() => onSelectConversation && onSelectConversation(conversation.partnerId, conversation.partnerName)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium truncate">{conversation.partnerName}</p>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(latestMessage.timestamp)}
                </span>
              </div>
              <p className="text-sm truncate text-muted-foreground">
                {latestMessage.content}
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="ml-2 bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
