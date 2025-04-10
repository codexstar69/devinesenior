import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/lib/animations";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          Begin Your Devine Journey Today
        </motion.h2>
        <motion.p 
          className="text-white/90 text-lg max-w-2xl mx-auto mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.1)}
        >
          Take the first step toward exceptional care and vibrant senior living. Schedule a personal tour to experience the Devine difference.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.2)}
        >
          <Button asChild size="lg" variant="secondary" className="px-8 py-3 bg-white text-primary rounded-full shadow-md text-lg font-medium hover:bg-white/90 transition-custom">
            <Link href="/contact">
              <a>Schedule a Tour</a>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full shadow-md text-lg font-medium hover:bg-white/10 transition-custom">
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
