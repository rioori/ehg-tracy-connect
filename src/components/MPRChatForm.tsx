import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phoneNumber: z.string().min(8, "Vui lòng nhập số điện thoại hợp lệ"),
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  countryCode: z.string().min(1, "Vui lòng chọn mã quốc gia"),
  language: z.string().min(1, "Vui lòng chọn ngôn ngữ"),
});

type FormData = z.infer<typeof formSchema>;

const languages = [
  { value: "vietnamese", label: "Tiếng Việt" },
  { value: "english", label: "English" },
  { value: "chinese", label: "中文" },
];

const countryCodes = [
  { value: "+84", label: "Việt Nam (+84)", country: "Vietnam" },
  { value: "+1", label: "United States (+1)", country: "United States" },
  { value: "+65", label: "Singapore (+65)", country: "Singapore" },
  { value: "+86", label: "China (+86)", country: "China" },
];

interface MPRChatFormProps {
  onFormSubmit: (data: FormData) => void;
}

export const MPRChatForm = ({ onFormSubmit }: MPRChatFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: "+84",
      language: "vietnamese",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      toast({
        title: "Chào mừng đến với MPR!",
        description: "AI Assistant sẽ hỗ trợ bạn tìm kiếm báo cáo phù hợp.",
      });
      
      onFormSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Lỗi kết nối",
        description: "Không thể bắt đầu chat. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-elegant)] border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-mpr-blue to-mpr-purple p-3 rounded-lg">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">MPR AI Assistant</h3>
          <p className="text-sm text-muted-foreground">Tìm kiếm báo cáo thông minh</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-base font-medium text-foreground mb-2">Bắt đầu trò chuyện!</h4>
        <p className="text-sm text-muted-foreground">
          Vui lòng cung cấp thông tin để chat với AI Assistant
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Họ và tên *
          </Label>
          <Input
            id="fullName"
            placeholder="Nhập họ tên của bạn"
            {...register("fullName")}
            className="mt-1"
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
            Số điện thoại *
          </Label>
          <div className="flex gap-2 mt-1">
            <Select onValueChange={(value) => setValue("countryCode", value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="+84" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {countryCodes.map((code) => (
                  <SelectItem key={`${code.value}-${code.country}`} value={code.value}>
                    {code.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phoneNumber"
              placeholder="Số điện thoại"
              {...register("phoneNumber")}
              className="flex-1"
            />
          </div>
          {errors.countryCode && (
            <p className="text-xs text-destructive mt-1">{errors.countryCode.message}</p>
          )}
          {errors.phoneNumber && (
            <p className="text-xs text-destructive mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Nhập email của bạn"
            {...register("email")}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="language" className="text-sm font-medium text-foreground">
            Ngôn ngữ ưa thích
          </Label>
          <Select onValueChange={(value) => setValue("language", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Tiếng Việt" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-border">
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.language && (
            <p className="text-xs text-destructive mt-1">{errors.language.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-mpr-blue to-mpr-purple hover:opacity-90 text-white font-medium py-3 rounded-lg transition-all duration-200"
        >
          {isLoading ? "Đang kết nối..." : "Bắt đầu chat với AI Assistant"}
        </Button>
      </form>
    </div>
  );
};
