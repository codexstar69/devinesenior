import React from "react";
import { motion } from "framer-motion";
import FamilyPortal from "@/components/portal/FamilyPortal";
import Seo from "@/components/common/Seo";

const Portal: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Seo 
        title="Family Portal | Devine Senior Living"
        description="Access your family portal to stay connected with your loved one's care, activities, and community events at Devine Senior Living."
        canonical="/portal"
      />
      
      <section className="pt-24 pb-12 bg-[#5A3E36]/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6">Family Portal</h1>
            <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
              Stay connected with your loved one's care, activities, and community events through our secure family portal.
            </p>
          </motion.div>
        </div>
      </section>
      
      <FamilyPortal />
    </motion.div>
  );
};

export default Portal;
