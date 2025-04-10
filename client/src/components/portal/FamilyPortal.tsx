import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, MessageSquare, FileText, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { fadeIn } from "@/lib/animations";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

const FamilyPortal: React.FC = () => {
  const { toast } = useToast();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = (data: LoginFormData) => {
    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Login functionality",
        description: "The login system will be implemented in the next phase.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <section id="portal" className="py-20 bg-[#5A3E36]/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Family Portal</h2>
          <p className="text-lg text-[#2B2B2B]/80">
            Stay connected with your loved one's care, activities, and community events through our secure family portal.
          </p>
        </motion.div>
        
        <Card className="max-w-xl mx-auto glass rounded-2xl p-8 shadow-glass">
          <CardContent className="p-0">
            <div className="flex mb-6">
              <button 
                className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg ${isLoginActive ? 'bg-primary text-white' : 'bg-white text-[#5A3E36]'}`}
                onClick={() => setIsLoginActive(true)}
              >
                Log In
              </button>
              <button 
                className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg ${!isLoginActive ? 'bg-primary text-white' : 'bg-white text-[#5A3E36]'}`}
                onClick={() => setIsLoginActive(false)}
              >
                Register
              </button>
            </div>
            
            {isLoginActive ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-[#5A3E36] font-medium mb-2">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com"
                            type="email"
                            className="w-full p-3 rounded-xl border border-[#5A3E36]/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-custom" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-[#5A3E36] font-medium mb-2">Password</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="••••••••"
                            type="password"
                            className="w-full p-3 rounded-xl border border-[#5A3E36]/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-custom" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="mr-2 h-4 w-4 rounded text-primary focus:ring-primary/50"
                        {...form.register("rememberMe")}
                      />
                      <label htmlFor="remember" className="text-[#2B2B2B]/80 text-sm">
                        Remember me
                      </label>
                    </div>
                    <a href="#reset-password" className="text-primary hover:text-primary/80 text-sm">
                      Forgot password?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-custom"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold text-[#5A3E36] mb-4">Create Your Account</h3>
                <p className="text-[#2B2B2B]/80 mb-6">
                  Please contact our administrator to set up your family portal account.
                </p>
                <Button 
                  className="px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-custom"
                  onClick={() => window.location.href = "/contact"}
                >
                  Contact Administrator
                </Button>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-[#5A3E36]/10 text-center">
              <h4 className="font-medium text-[#5A3E36] mb-4">Portal Features</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm">Calendar</span>
                </div>
                <div className="p-4 rounded-lg bg-white/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm">Messaging</span>
                </div>
                <div className="p-4 rounded-lg bg-white/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm">Billing</span>
                </div>
                <div className="p-4 rounded-lg bg-white/50 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm">Care Plan</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FamilyPortal;
