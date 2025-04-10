import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { MapPin, Clock, Phone, Mail, InfoIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
// Remove schema import as we're using a local form schema
// import { insertInquirySchema } from "../../../shared/schema";
import { PHONE_NUMBERS, EMAIL, ADDRESS, BUSINESS_HOURS, INQUIRY_TYPES } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  inquiryType: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(value => value === true, {
    message: "You must agree to be contacted"
  })
});

type FormData = z.infer<typeof formSchema>;

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
      consent: false
    }
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const { consent, ...inquiryData } = data;
      return apiRequest("POST", "/api/inquiries", inquiryData);
    },
    onSuccess: () => {
      toast({
        title: "Form submitted",
        description: "We've received your inquiry and will contact you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto flex flex-col lg:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Contact Us</h2>
            <p className="text-lg text-[#2B2B2B]/80 mb-8">
              We're here to answer your questions and help you find the right care solution for your loved one.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#5A3E36] font-medium">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#5A3E36] font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com"
                            type="email"
                            className="w-full p-3 rounded-xl border border-[#5A3E36]/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-custom" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#5A3E36] font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="(555) 123-4567"
                          type="tel"
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
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#5A3E36] font-medium">How can we help?</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full p-3 rounded-xl border border-[#5A3E36]/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-custom">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {INQUIRY_TYPES.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#5A3E36] font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please share any specific questions or information..."
                          className="w-full p-3 rounded-xl border border-[#5A3E36]/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-custom min-h-[120px]" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[#2B2B2B]/80">
                          I consent to Devine Senior Assisted Living collecting my submitted information to contact me.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-custom"
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="lg:w-1/2">
            <div className="h-64 md:h-96 lg:h-full rounded-2xl overflow-hidden shadow-glass mb-8">
              {/* Google Maps would be embedded here with proper API key */}
              <div className="w-full h-full bg-[#F7F5F2] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" 
                  alt="Map location of Devine Senior Assisted Living" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6 shadow-glass">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[#5A3E36] mb-2">Visit Us</h4>
                  <address className="not-italic text-[#2B2B2B]/80 mb-4 flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>{ADDRESS}</span>
                  </address>
                  <div className="flex flex-col space-y-2 mb-2">
                    {PHONE_NUMBERS.map((phone, index) => (
                      <div key={index} className="flex items-center">
                        <Phone className="text-primary mr-3 h-5 w-5" />
                        <a href={`tel:${phone}`} className="text-primary hover:underline">{phone}</a>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-primary mr-3 h-5 w-5" />
                    <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-[#5A3E36] mb-2">Hours</h4>
                  <ul className="space-y-2 text-[#2B2B2B]/80">
                    {BUSINESS_HOURS.map((hours, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{hours.day}:</span>
                        <span>{hours.hours}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-[#2B2B2B]/70 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-1" />
                    Tours available by appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
