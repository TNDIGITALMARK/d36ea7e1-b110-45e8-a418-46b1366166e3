'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Image,
  Video,
  Smile,
  MoreVertical,
  DollarSign,
  Calendar,
  Phone,
  VideoIcon,
  Clock,
  Check,
  CheckCheck,
  X,
  Download,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockMessages, mockConversations, mockCreators, Message } from '@/lib/mock-data';
import { formatTimeAgo, formatCurrency } from '@/lib/platform-utils';

interface MessagingSystemProps {
  currentUserId: string;
  userType: 'creator' | 'client';
  conversationId?: string;
}

export function MessagingSystem({ currentUserId, userType, conversationId }: MessagingSystemProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tipAmount, setTipAmount] = useState('');
  const [showTipDialog, setShowTipDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversation = mockConversations.find(c => c.id === conversationId);
  const otherUser = userType === 'creator'
    ? { id: 'client1', name: 'Client User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40' }
    : mockCreators.find(c => c.id === conversation?.creatorId) || mockCreators[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;

    const message: Message = {
      id: Date.now().toString(),
      conversationId: conversationId || 'conv1',
      senderId: currentUserId,
      content: newMessage,
      type: selectedFile ? (selectedFile.type.startsWith('image/') ? 'image' : 'video') : 'text',
      timestamp: new Date().toISOString(),
      isRead: false,
      mediaUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setSelectedFile(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendTip = () => {
    if (!tipAmount || isNaN(Number(tipAmount))) return;

    const tipMessage: Message = {
      id: Date.now().toString(),
      conversationId: conversationId || 'conv1',
      senderId: currentUserId,
      content: `Sent a tip of ${formatCurrency(Number(tipAmount))}`,
      type: 'payment',
      timestamp: new Date().toISOString(),
      isRead: false,
      paymentAmount: Number(tipAmount)
    };

    setMessages(prev => [...prev, tipMessage]);
    setTipAmount('');
    setShowTipDialog(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-creator-muted/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{otherUser.name}</h3>
            <p className="text-sm text-muted-foreground">
              {userType === 'client' && 'isOnline' in otherUser && otherUser.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <VideoIcon className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DollarSign className="h-4 w-4 mr-2" />
                Send Payment Request
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <X className="h-4 w-4 mr-2" />
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages
            .filter(m => m.conversationId === (conversationId || 'conv1'))
            .map((message) => {
              const isOwn = message.senderId === currentUserId;
              return (
                <div key={message.id} className={`flex gap-3 ${isOwn ? 'justify-end' : ''}`}>
                  {!isOwn && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                      <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[70%] ${isOwn ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-creator-primary text-white ml-auto'
                          : 'bg-creator-muted/20 text-foreground'
                      } ${message.type === 'payment' ? 'border border-creator-secondary' : ''}`}
                    >
                      {message.type === 'text' && (
                        <p className="text-sm">{message.content}</p>
                      )}

                      {message.type === 'image' && message.mediaUrl && (
                        <div className="space-y-2">
                          <img
                            src={message.mediaUrl}
                            alt="Shared image"
                            className="rounded-lg max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                          />
                          {message.content && <p className="text-sm">{message.content}</p>}
                        </div>
                      )}

                      {message.type === 'video' && message.mediaUrl && (
                        <div className="space-y-2">
                          <div className="relative rounded-lg overflow-hidden bg-black/10">
                            <video
                              src={message.mediaUrl}
                              className="max-w-full h-auto"
                              controls
                              style={{ maxHeight: '200px' }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                                <Play className="h-6 w-6 text-white ml-1" />
                              </div>
                            </div>
                          </div>
                          {message.content && <p className="text-sm">{message.content}</p>}
                        </div>
                      )}

                      {message.type === 'payment' && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-creator-secondary" />
                          <span className="text-sm font-medium">{message.content}</span>
                        </div>
                      )}
                    </div>

                    <div className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${isOwn ? 'justify-end' : ''}`}>
                      <span>{formatTimeAgo(message.timestamp)}</span>
                      {isOwn && (
                        <div className="flex items-center">
                          {message.isRead ? (
                            <CheckCheck className="h-3 w-3 text-creator-primary" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isOwn && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40" alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* File Preview */}
      {selectedFile && (
        <div className="p-3 border-t border-creator-muted/20 bg-creator-muted/5">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {selectedFile.type.startsWith('image/') ? (
                  <Image className="h-4 w-4" />
                ) : (
                  <Video className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <Badge variant="outline" className="text-xs">
                  {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-creator-muted/20">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <Image className="h-4 w-4 mr-2" />
                Send Photo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <Video className="h-4 w-4 mr-2" />
                Send Video
              </DropdownMenuItem>
              {userType === 'client' && (
                <DropdownMenuItem onClick={() => setShowTipDialog(true)}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Send Tip
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Message Input */}
          <div className="flex-1">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[40px] max-h-[120px] resize-none border-creator-muted/20 focus:border-creator-primary/50 focus:ring-creator-primary/20"
              rows={1}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !selectedFile}
            className="bg-creator-primary hover:bg-creator-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Tip Dialog */}
      <Dialog open={showTipDialog} onOpenChange={setShowTipDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send a Tip</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 25].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => setTipAmount(amount.toString())}
                  className="w-full"
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Custom amount"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
            />
            <Button
              className="w-full"
              onClick={handleSendTip}
              disabled={!tipAmount || isNaN(Number(tipAmount)) || Number(tipAmount) <= 0}
            >
              Send {tipAmount && !isNaN(Number(tipAmount)) ? formatCurrency(Number(tipAmount)) : 'Tip'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}