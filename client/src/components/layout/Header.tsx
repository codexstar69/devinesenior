import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Info, Briefcase, Heart, Book, Phone, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_NAME, SITE_NAVIGATION } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeIn, fadeInUp, staggeredChildren } from "@/lib/animations";

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
          <motion.div 
            className="flex items-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp(0.1)}
          >
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <motion.span 
                  className="text-primary font-display font-bold text-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Devine
                </motion.span>
                <span className="text-[#5A3E36] font-display font-medium text-lg ml-1">Senior Assisted Living</span>
              </div>
            </Link>
          </motion.div>

          <motion.nav 
            className="hidden lg:flex space-x-8"
            initial="hidden"
            animate="visible"
            variants={staggeredChildren()}
          >
            {SITE_NAVIGATION.map((item, index) => (
              <motion.div key={item.name} variants={fadeInUp(0.1 * (index + 1))}>
                <Link href={item.href}>
                  <motion.div 
                    className={cn(
                      "text-[#5A3E36] hover:text-primary font-medium transition-custom cursor-pointer",
                      location === item.href && "text-primary"
                    )}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div 
            className="flex items-center space-x-4"
            initial="hidden"
            animate="visible"
            variants={fadeInUp(0.2)}
          >
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button className="px-5 py-2 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-custom">
                  Contact Us
                </Button>
              </motion.div>
            </Link>
            <motion.button 
              className="lg:hidden text-[#5A3E36]" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </motion.div>
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
            <motion.div 
              className="px-4 py-5 space-y-4"
              variants={staggeredChildren(0.05)}
              initial="hidden"
              animate="visible"
            >
              {SITE_NAVIGATION.map((item, index) => (
                <motion.div key={item.name} variants={fadeInUp(0.05 * index)}>
                  <Link href={item.href}>
                    <motion.div 
                      className={cn(
                        "block text-[#5A3E36] font-medium px-3 py-2 rounded-lg hover:bg-white/50 transition-custom cursor-pointer",
                        location === item.href && "text-primary bg-white/30"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;