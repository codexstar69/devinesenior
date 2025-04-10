import React from "react";
import { motion } from "framer-motion";
import AboutSection from "@/components/about/AboutSection";
import CallToAction from "@/components/common/CallToAction";
import Seo from "@/components/common/Seo";

const About: React.FC = () => {
  return (
    <PageTransition>
      <Seo 
        title="About Us | Devine Senior Living"
        description="Learn about Devine Senior Living's legacy of excellence in senior care, our mission, values, and dedicated leadership team."
        canonical="/about"
      />
      
      <section className="pt-24 pb-12 bg-[#5A3E36]/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6">About Devine Senior Living</h1>
            <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
              A legacy of excellence in senior care spanning over three decades, driven by compassion and innovation.
            </p>
          </motion.div>
        </div>
      </section>
      
      <AboutSection />
      <CallToAction />
    </PageTransition>
  );
};

export default About;
