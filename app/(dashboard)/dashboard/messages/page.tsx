"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Search,
  Paperclip,
  MoreVertical,
  ArrowLeft,
  User,
} from "lucide-react";
import { BaseCard as Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials, formatRelativeTime } from "@/lib/utils";

interface Conversation {
  _id: string;
  participant: {
    _id: string;
    name: string;
    image?: string;
    role: string;
  };
  project?: {
    _id: string;
    title: string;
  };
  lastMessage?: {
    content: string;
    createdAt: string;
    read: boolean;
  };
  unreadCount: number;
}

interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  read: boolean;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for now
  useEffect(() => {
    // Simulate loading conversations
    setLoading(false);
    setConversations([]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
    // TODO: Implement send message API
    setNewMessage("");
  };

  const selectedConversationData = conversations.find(
    (c) => c._id === selectedConversation
  );

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex h-full gap-6">
        {/* Conversations List */}
        <Card
          className={cn(
            "w-full md:w-80 flex-shrink-0 flex flex-col",
            isMobileView && selectedConversation && "hidden md:flex"
          )}
        >
          <CardHeader className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-3">
                    <div className="h-10 w-10 bg-slate-700 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-700 rounded w-3/4" />
                      <div className="h-3 bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center">
                <User className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No conversations yet</p>
                <p className="text-sm text-slate-500 mt-1">
                  Messages from your editors will appear here
                </p>
              </div>
            ) : (
              <div className="p-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation._id}
                    onClick={() => {
                      setSelectedConversation(conversation._id);
                      setIsMobileView(true);
                    }}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors text-left",
                      selectedConversation === conversation._id && "bg-slate-800/50"
                    )}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.participant.image} />
                      <AvatarFallback>
                        {getInitials(conversation.participant.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white truncate">
                          {conversation.participant.name}
                        </p>
                        {conversation.lastMessage && (
                          <span className="text-xs text-slate-500">
                            {formatRelativeTime(conversation.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      {conversation.project && (
                        <p className="text-xs text-emerald-400 truncate">
                          {conversation.project.title}
                        </p>
                      )}
                      {conversation.lastMessage && (
                        <p className="text-sm text-slate-400 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      )}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="default" className="ml-2">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card
          className={cn(
            "flex-1 flex flex-col",
            !selectedConversation && "hidden md:flex"
          )}
        >
          {selectedConversationData ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => {
                      setSelectedConversation(null);
                      setIsMobileView(false);
                    }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar>
                    <AvatarImage src={selectedConversationData.participant.image} />
                    <AvatarFallback>
                      {getInitials(selectedConversationData.participant.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {selectedConversationData.participant.name}
                    </p>
                    {selectedConversationData.project && (
                      <p className="text-sm text-slate-400">
                        Re: {selectedConversationData.project.title}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={cn(
                        "flex gap-3",
                        message.sender._id === session?.user?.id && "flex-row-reverse"
                      )}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.sender.image} />
                        <AvatarFallback>
                          {getInitials(message.sender.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "max-w-[70%] rounded-lg p-3",
                          message.sender._id === session?.user?.id
                            ? "bg-emerald-500/20 text-white"
                            : "bg-slate-800 text-white"
                        )}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatRelativeTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">Select a conversation</p>
                <p className="text-sm text-slate-500 mt-1">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function MessageSquare(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
