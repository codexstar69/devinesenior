import React from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/common/PageTransition";
import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import CareGuide from "@/components/home/CareGuide";
import ServicesSection from "@/components/services/ServicesSection";
import CallToAction from "@/components/common/CallToAction";
import Seo from "@/components/common/Seo";

const Home: React.FC = () => {
  return (
    <PageTransition>
      <Seo 
        title="Devine Senior Living | Premium Care For Your Loved Ones"
        description="Devine Senior Living offers compassionate senior care services in a luxury environment. Our approach combines personalized care with premium amenities."
        canonical="/"
      />
      
      <Hero />
      <QuickLinks />
      <WhyChooseUs />
      <TestimonialSlider />
      <CareGuide />
      <ServicesSection />
      <CallToAction />
    </PageTransition>
  );
};

export default Home;
