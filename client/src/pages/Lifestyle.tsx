import React from "react";
import { motion } from "framer-motion";
import LifestyleSection from "@/components/lifestyle/LifestyleSection";
import CallToAction from "@/components/common/CallToAction";
import Seo from "@/components/common/Seo";

const Lifestyle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Seo 
        title="Life at Devine | Devine Senior Living"
        description="Experience the vibrant lifestyle at Devine Senior Living with enriching activities, delicious dining, and community engagement opportunities."
        canonical="/lifestyle"
      />
      
      <section className="pt-24 pb-12 bg-[#5A3E36]/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6">Life at Devine</h1>
            <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
              Discover the engaging, fulfilling, and joy-filled lifestyle our residents experience every day at Devine Senior Living.
            </p>
          </motion.div>
        </div>
      </section>
      
      <LifestyleSection />
      <CallToAction />
    </motion.div>
  );
};

export default Lifestyle;
