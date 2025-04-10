import React from "react";
import { Link } from "wouter";
import { Phone, Calendar } from "lucide-react";
import { PHONE_NUMBERS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FloatingContactBar: React.FC = () => {
  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-40 flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <a 
        href={`tel:${PHONE_NUMBERS[0]}`}
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-glass text-primary hover:bg-primary hover:text-white transition-custom"
        aria-label="Call us"
      >
        <Phone className="h-5 w-5" />
      </a>
      <Button asChild className="flex items-center justify-center px-5 py-3 bg-primary text-white rounded-full shadow-glass hover:bg-primary/90 transition-custom">
        <Link href="/contact">
          <a>
            <span className="hidden md:inline mr-2">Contact Us</span>
            <Calendar className="h-5 w-5 md:ml-1" />
          </a>
        </Link>
      </Button>
    </motion.div>
  );
};

export default FloatingContactBar;
