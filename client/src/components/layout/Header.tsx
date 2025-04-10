import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_NAME, SITE_NAVIGATION } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-custom",
      isScrolled && "shadow-md"
    )}>
      <div className="glass py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-primary font-display font-bold text-2xl">Devine</span>
                <span className="text-[#5A3E36] font-display font-medium text-lg ml-1">Senior Assisted Living</span>
              </a>
            </Link>
          </div>
          
          <nav className="hidden lg:flex space-x-8">
            {SITE_NAVIGATION.map((item) => (
              <Link href={item.href} key={item.name}>
                <a className={cn(
                  "text-[#5A3E36] hover:text-primary font-medium transition-custom",
                  location === item.href && "text-primary"
                )}>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/contact">
              <Button className="px-5 py-2 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-custom">
                Contact Us
              </Button>
            </Link>
            <button 
              className="lg:hidden text-[#5A3E36]" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden glass shadow-glass"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeIn()}
          >
            <div className="px-4 py-5 space-y-4">
              {SITE_NAVIGATION.map((item) => (
                <Link href={item.href} key={item.name}>
                  <a 
                    className={cn(
                      "block text-[#5A3E36] font-medium px-3 py-2 rounded-lg hover:bg-white/50 transition-custom",
                      location === item.href && "text-primary bg-white/30"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
