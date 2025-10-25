'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  text: string;
  senderId: string;
  timestamp: string;
}

export default function SocketDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Welcome to the mock WebSocket demo!',
      senderId: 'system',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const isConnected = true; // Mock connection status

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        text: inputMessage.trim(),
        senderId: 'user',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            WebSocket Demo (Mock)
            <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">
              Mock Mode
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-80 w-full border rounded-md p-4">
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className="border-b pb-2 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        {msg.senderId}
                      </p>
                      <p className="text-gray-900">{msg.text}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputMessage.trim()}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
