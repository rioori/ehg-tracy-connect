import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Smile, Paperclip, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Message {
  id: string;
  content: string;
  sender: "user" | "tracy";
  timestamp: Date;
}

interface UserData {
  fullName: string;
  phoneNumber: string;
  email: string;
  countryCode: string;
  language: string;
}

interface EHGChatInterfaceProps {
  userData: UserData;
  onBack: () => void;
}

const emojis = ["😊", "😍", "👍", "❤️", "😂", "🙏", "✨", "🎉", "👋", "💯", "🔥", "😎", "🤝", "💼", "🏨"];

export const EHGChatInterface = ({ userData, onBack }: EHGChatInterfaceProps) => {
  const getWelcomeMessage = (language: string, fullName: string) => {
    const messages = {
      english: `Hi ${fullName}! I'm Tracy, your AI assistant from Elegance Hospitality Group. How can I help you today?`,
      chinese: `您好 ${fullName}！我是Tracy，您在优雅酒店集团的AI助理。今天我能为您做些什么？`,
      french: `Bonjour ${fullName}! Je suis Tracy, votre assistante IA d'Elegance Hospitality Group. Comment puis-je vous aider aujourd'hui?`,
      japanese: `こんにちは ${fullName}さん！私はTracy、エレガンス・ホスピタリティ・グループのAIアシスタントです。今日はどのようにお手伝いできますか？`,
      korean: `안녕하세요 ${fullName}님! 저는 엘레간스 호스피탤리티 그룹의 AI 어시스턴트 Tracy입니다. 오늘 어떻게 도와드릴까요?`,
      spanish: `¡Hola ${fullName}! Soy Tracy, tu asistente de IA de Elegance Hospitality Group. ¿Cómo puedo ayudarte hoy?`,
      vietnamese: `Xin chào ${fullName}! Tôi là Tracy, trợ lý AI của bạn từ Elegance Hospitality Group. Hôm nay tôi có thể giúp gì cho bạn?`,
    };
    return messages[language as keyof typeof messages] || messages.english;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: getWelcomeMessage(userData.language, userData.fullName),
      sender: "tracy",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const webhookData = {
        fullName: userData.fullName,
        phoneNumber: `${userData.countryCode}${userData.phoneNumber}`,
        email: userData.email,
        language: userData.language,
        message: inputMessage,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("https://n8n.anchi.io.vn/webhook-test/20bb0440-5bfe-4f26-9718-85e0e7a94e2c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        const data = await response.text();
        
        const tracyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data || "I received your message. Let me help you with that!",
          sender: "tracy",
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, tracyMessage]);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        sender: "tracy",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-[var(--shadow-elegant)] border border-border h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-ehg-gold p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg animate-pulse">
              <Bot className="h-5 w-5 text-ehg-gold" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Tracy - EHG AI Assistant</h3>
              <p className="text-white/80 text-sm">Online • Chatting with {userData.fullName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "tracy" && (
                <div className="bg-ehg-gold p-2 rounded-full h-8 w-8 flex items-center justify-center animate-fade-in">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 animate-scale-in ${
                  message.sender === "user"
                    ? "bg-ehg-gold text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium">
                    {message.sender === "user" ? userData.fullName : "Tracy"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="bg-ehg-navy p-2 rounded-full h-8 w-8 flex items-center justify-center animate-fade-in">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="bg-ehg-gold p-2 rounded-full h-8 w-8 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-muted text-foreground rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium">Tracy</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
                className="p-1 h-8 w-8 hover:bg-background"
              >
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </Button>
              
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="border-0 bg-transparent focus-visible:ring-0 flex-1"
              />
              
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-1 h-8 w-8 hover:bg-background"
                  >
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" align="end">
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji) => (
                      <Button
                        key={emoji}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEmojiSelect(emoji)}
                        className="h-8 w-8 p-0 text-lg hover:bg-muted"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-ehg-gold hover:bg-ehg-gold-dark text-white h-10 w-10 p-0 rounded-lg transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
        />
      </div>
    </div>
  );
};