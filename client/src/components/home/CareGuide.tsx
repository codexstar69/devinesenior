import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, File } from "lucide-react";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

const CareGuide: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error('Failed to send guide:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-primary/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-3/5 mb-8 md:mb-0 md:pr-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft()}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Your Guide to Senior Care Options</h2>
            <p className="text-lg text-[#2B2B2B]/80 mb-6">
              Making the right care decision for your loved one can be challenging. Our comprehensive guide helps you understand the options and what to expect.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="text-primary mt-1 mr-3 h-5 w-5" />
                <span>Compare care levels and services</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mt-1 mr-3 h-5 w-5" />
                <span>Understand costs and payment options</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mt-1 mr-3 h-5 w-5" />
                <span>Learn important questions to ask providers</span>
              </li>
              <li className="flex items-start">
                <Check className="text-primary mt-1 mr-3 h-5 w-5" />
                <span>Plan a smooth transition for your loved one</span>
              </li>
            </ul>
            
            {isSubmitted ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 mb-4">
                Thank you! Your guide has been sent to your email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="p-3 rounded-xl border border-[#5A3E36]/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-custom w-full sm:w-auto flex-grow"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-custom"
                >
                  {isSubmitting ? "Sending..." : "Download Free Guide"}
                </Button>
              </form>
            )}
          </motion.div>
          
          <motion.div 
            className="md:w-2/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight()}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#F29D35]/20 rounded-3xl transform rotate-3"></div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Senior Care Guide" 
                  className="rounded-2xl shadow-md w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-glass">
                  <div className="bg-[#F29D35]/10 text-[#F29D35] rounded-full p-2">
                    <File className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareGuide;
