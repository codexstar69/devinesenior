import React from "react";
import { motion } from "framer-motion";
import ContactSection from "@/components/contact/ContactSection";
import Seo from "@/components/common/Seo";

const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Seo 
        title="Contact Us | Devine Senior Living"
        description="Get in touch with Devine Senior Living to schedule a tour, request information, or learn more about our senior care services."
        canonical="/contact"
      />
      
      <section className="pt-24 pb-12 bg-[#5A3E36]/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6">Contact Us</h1>
            <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
              We're here to answer your questions and help you find the right care solution for your loved one.
            </p>
          </motion.div>
        </div>
      </section>
      
      <ContactSection />
    </motion.div>
  );
};

export default Contact;
