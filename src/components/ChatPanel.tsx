import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/types/sensor';
import { sendChatMessage } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const QUICK_ACTIONS = [
  'ช่วยวิเคราะห์ค่า pH ตอนนี้',
  'แนะนำการปรับ TDS',
  'สรุปค่ารายชั่วโมง',
];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(message);
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: 'AI ไม่พร้อม',
        description: 'ลองใหม่อีกครั้งนะ',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Bot className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">ผู้ช่วย iHydro AI 🤖</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <Bot className="w-12 h-12 mx-auto mb-2 text-primary" />
            <p>พิมพ์คำถามหรือเลือกตัวเลือกด่วนด้านล่าง</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-white/10'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-white/10 p-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap">
        {QUICK_ACTIONS.map((action) => (
          <Button
            key={action}
            size="sm"
            variant="secondary"
            onClick={() => handleSend(action)}
            disabled={isLoading}
            className="rounded-full text-xs hover:neon-glow transition-all"
          >
            {action}
          </Button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์คำถาม เช่น 'สรุปค่า 1 ชั่วโมง'"
            disabled={isLoading}
            className="bg-muted/50 border-white/10 focus:border-primary"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="rounded-full neon-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
