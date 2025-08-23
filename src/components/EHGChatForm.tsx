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
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Please select a country code"),
  language: z.string().min(1, "Please select a preferred language"),
});

type FormData = z.infer<typeof formSchema>;

const languages = [
  { value: "english", label: "English" },
  { value: "chinese", label: "Chinese" },
  { value: "french", label: "French" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "spanish", label: "Spanish" },
  { value: "vietnamese", label: "Vietnamese" },
];

const countryCodes = [
  { value: "+1", label: "Canada (+1)", country: "Canada" },
  { value: "+33", label: "France (+33)", country: "France" },
  { value: "+49", label: "Germany (+49)", country: "Germany" },
  { value: "+81", label: "Japan (+81)", country: "Japan" },
  { value: "+82", label: "Korea (+82)", country: "Korea" },
  { value: "+65", label: "Singapore (+65)", country: "Singapore" },
  { value: "+34", label: "Spain (+34)", country: "Spain" },
  { value: "+1", label: "United States (+1)", country: "United States" },
  { value: "+84", label: "Vietnam (+84)", country: "Vietnam" },
];

export const EHGChatForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const webhookData = {
        fullName: data.fullName,
        phoneNumber: `${data.countryCode}${data.phoneNumber}`,
        email: data.email,
        language: data.language,
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
        toast({
          title: "Welcome to EHG!",
          description: "Tracy will be with you shortly to assist with your hospitality needs.",
        });
        
        // Here you would typically redirect to the chat interface
        console.log("Form submitted successfully:", webhookData);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Connection Error",
        description: "Unable to start chat. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-elegant)] border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-ehg-gold p-3 rounded-lg">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Tracy - EHG AI Assistant</h3>
          <p className="text-sm text-muted-foreground">Welcome to EHG</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-base font-medium text-foreground mb-2">Let's get started!</h4>
        <p className="text-sm text-muted-foreground">
          Please provide your information to chat with Tracy
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="mt-1"
          />
          {errors.fullName && (
            <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
            Phone Number *
          </Label>
          <div className="flex gap-2 mt-1">
            <Select onValueChange={(value) => setValue("countryCode", value)}>
              <SelectTrigger className="w-32">
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
              placeholder="Phone number"
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
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="language" className="text-sm font-medium text-foreground">
            Preferred Language
          </Label>
          <Select onValueChange={(value) => setValue("language", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="English" />
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
          className="w-full bg-ehg-gold hover:bg-ehg-gold-dark text-white font-medium py-3 rounded-lg transition-all duration-200"
        >
          {isLoading ? "Connecting..." : "Start Chatting with Tracy"}
        </Button>
      </form>
    </div>
  );
};