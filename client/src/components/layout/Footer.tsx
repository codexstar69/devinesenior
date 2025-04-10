import React from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_NAME, PHONE_NUMBERS, EMAIL, ADDRESS, WEBSITE, SITE_NAVIGATION, SERVICE_LINKS } from "@/lib/constants";
import { fadeInUp, staggeredChildren, fadeIn } from "@/lib/animations";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5A3E36] py-16 text-white/90 relative"> {/* Added relative positioning to the footer */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp(0.1)}
          >
            <div className="flex items-center mb-6">
              <motion.span 
                className="text-white font-display font-bold text-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Devine
              </motion.span>
              <span className="text-white/80 font-display font-medium text-lg ml-1">Senior Assisted Living</span>
            </div>
            <motion.p 
              className="mb-6"
              variants={fadeInUp(0.2)}
            >
              Creating exceptional senior living experiences through compassionate care and vibrant communities.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={staggeredChildren(0.05)}
            >
              {[
                { icon: <Facebook size={20} />, url: "#" },
                { icon: <Instagram size={20} />, url: "#" },
                { icon: <Twitter size={20} />, url: "#" },
                { icon: <Linkedin size={20} />, url: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="text-white hover:text-[#F29D35] transition-colors"
                  variants={fadeIn(0.1 * index)}
                  whileHover={{ y: -3, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp(0.2)}
          >
            <motion.h4 
              className="text-lg font-bold mb-6"
              variants={fadeInUp(0.1)}
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              className="space-y-3"
              variants={staggeredChildren(0.03)}
            >
              {SITE_NAVIGATION.map((item, index) => (
                <motion.li 
                  key={item.name}
                  variants={fadeInUp(0.05 * index)}
                >
                  <Link href={item.href}>
                    <motion.span 
                      className="hover:text-[#F29D35] transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp(0.3)}
          >
            <motion.h4 
              className="text-lg font-bold mb-6"
              variants={fadeInUp(0.1)}
            >
              Services
            </motion.h4>
            <motion.ul 
              className="space-y-3"
              variants={staggeredChildren(0.03)}
            >
              {SERVICE_LINKS.map((service, index) => (
                <motion.li 
                  key={service.name}
                  variants={fadeInUp(0.05 * index)}
                >
                  <Link href={service.href}>
                    <motion.span 
                      className="hover:text-[#F29D35] transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {service.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={fadeInUp(0.3)}>
                <Link href="/services/wellness-programs">
                  <motion.span 
                    className="hover:text-[#F29D35] transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Wellness Programs
                  </motion.span>
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp(0.4)}
          >
            <motion.h4 
              className="text-lg font-bold mb-6"
              variants={fadeInUp(0.1)}
            >
              Contact
            </motion.h4>
            <motion.ul 
              className="space-y-4"
              variants={staggeredChildren(0.05)}
            >
              <motion.li 
                className="flex items-start"
                variants={fadeInUp(0.1)}
                whileHover={{ x: 3 }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                </motion.div>
                <span>{ADDRESS}</span>
              </motion.li>
              
              {PHONE_NUMBERS.map((phone, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  variants={fadeInUp(0.15 + 0.05 * index)}
                  whileHover={{ x: 3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone className="mr-3 h-4 w-4 flex-shrink-0" />
                  </motion.div>
                  <motion.a 
                    href={`tel:${phone}`} 
                    className="hover:text-[#F29D35] transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {phone}
                  </motion.a>
                </motion.li>
              ))}
              
              <motion.li 
                className="flex items-center"
                variants={fadeInUp(0.3)}
                whileHover={{ x: 3 }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail className="mr-3 h-4 w-4 flex-shrink-0" />
                </motion.div>
                <motion.a 
                  href={`mailto:${EMAIL}`} 
                  className="hover:text-[#F29D35] transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {EMAIL}
                </motion.a>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>

        <div className="pt-8 mt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/privacy">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </Link>
            <Link href="/accessibility">
              <span className="hover:text-white transition-colors cursor-pointer">Accessibility</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;