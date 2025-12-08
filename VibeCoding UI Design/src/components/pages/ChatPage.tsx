import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Send, Paperclip } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

export function ChatPage({ onNavigate }: ChatPageProps) {
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sophie Martin",
      photo: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      lastMessage: "See you at the Eiffel Tower tomorrow!",
      time: "2 min ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Marie Laurent",
      photo: "https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      lastMessage: "I can adjust the lunch location if needed",
      time: "1 hour ago",
      unread: 0,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Sophie Martin",
      text: "Hi! I'm excited to be your guide for your Paris trip. I've reviewed your itinerary.",
      time: "10:30 AM",
      isSelf: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Great! I have a few questions about the Louvre tour.",
      time: "10:32 AM",
      isSelf: true,
    },
    {
      id: 3,
      sender: "Sophie Martin",
      text: "Of course! What would you like to know?",
      time: "10:33 AM",
      isSelf: false,
    },
    {
      id: 4,
      sender: "You",
      text: "How long should we plan for the museum? Also, is photography allowed?",
      time: "10:35 AM",
      isSelf: true,
    },
    {
      id: 5,
      sender: "Sophie Martin",
      text: "We'll spend about 3 hours there, which gives us time to see the highlights without rushing. Photography is allowed everywhere except for special exhibitions. I'll make sure you get great photos!",
      time: "10:37 AM",
      isSelf: false,
    },
    {
      id: 6,
      sender: "You",
      text: "Perfect! That sounds great.",
      time: "10:38 AM",
      isSelf: true,
    },
    {
      id: 7,
      sender: "Sophie Martin",
      text: "See you at the Eiffel Tower tomorrow at 9 AM! I'll be wearing a purple scarf. 💜",
      time: "10:40 AM",
      isSelf: false,
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl" style={{ color: "#F7A160" }}>
            Messages
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conv.photo} />
                  <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="truncate">{conv.name}</p>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                    style={{ backgroundColor: "#F7A160" }}
                  >
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1641139984837-a8167f146c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwZ3VpZGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3NzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg">Sophie Martin</h3>
              <p className="text-sm text-gray-600">Paris Tour Guide</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 w-full">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 ${
                    msg.isSelf
                      ? "text-white"
                      : "bg-gray-100"
                  }`}
                  style={msg.isSelf ? { background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)" } : {}}
                >
                  <p className="mb-1">{msg.text}</p>
                  <p className={`text-xs ${msg.isSelf ? "text-white opacity-75" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="w-full flex gap-3">
            <Button variant="outline" size="icon">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  setMessage("");
                }
              }}
            />
            <Button
              style={{
                background: "linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)",
              }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
