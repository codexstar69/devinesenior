import React from "react";
import { Link } from "wouter";
import { ChevronDown, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/30 z-10"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1573496546038-82f9c39f6365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
          alt="Senior residents enjoying community activities" 
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Hero Content */}
      <motion.div 
        className="relative z-20 text-center px-4 max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Exceptional Care for <br className="hidden md:block" />
          <span className="text-[#F29D35]">Extraordinary Lives</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
          At Devine Senior Living, we create personalized care experiences that celebrate the richness of every resident's journey.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Button asChild size="lg" className="px-8 py-3 bg-primary text-white rounded-full shadow-md text-lg font-medium hover:bg-primary/90 transition-custom">
            <Link href="/services">
              <a>Explore Our Services</a>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 bg-white/90 text-[#5A3E36] rounded-full shadow-md text-lg font-medium hover:bg-white transition-custom">
            <a href="#virtual-tour">
              <Play className="mr-2 h-4 w-4" /> Virtual Tour
            </a>
          </Button>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        whileHover={{ y: 5 }}
        whileTap={{ y: 5 }}
      >
        <ChevronDown className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
