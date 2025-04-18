import React from "react";
import { motion } from "framer-motion";
import ResourcesSection from "@/components/resources/ResourcesSection";
import CallToAction from "@/components/common/CallToAction";
import Seo from "@/components/common/Seo";

const Resources: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Seo 
        title="Resources & Guidance | Devine Senior Living"
        description="Access helpful resources, guides, and information to support your senior care journey from Devine Senior Living."
        canonical="/resources"
      />
      
      <section className="pt-24 pb-12 bg-[#5A3E36]/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6">Resources & Guidance</h1>
            <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
              Helpful tools, information, and support for seniors and their families throughout the care journey.
            </p>
          </motion.div>
        </div>
      </section>
      
      <ResourcesSection />
      <CallToAction />
    </motion.div>
  );
};

export default Resources;
