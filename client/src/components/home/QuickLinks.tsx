import React from "react";
import { Link } from "wouter";
import { SERVICE_LINKS } from "@/lib/constants";
import { motion } from "framer-motion";
import { fadeInUp, staggeredChildren } from "@/lib/animations";

const QuickLinks: React.FC = () => {
  return (
    <section className="py-6 bg-white/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-wrap justify-center gap-3 md:gap-6"
          variants={staggeredChildren(0.1)}
          initial="hidden"
          animate="visible"
        >
          {SERVICE_LINKS.map((link, index) => (
            <motion.div key={link.name} variants={fadeInUp(index * 0.1)}>
              <Link href={link.href}>
                <a className="px-6 py-3 bg-white shadow-soft rounded-full text-[#5A3E36] hover:bg-primary hover:text-white transition-custom">
                  {link.name}
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QuickLinks;
