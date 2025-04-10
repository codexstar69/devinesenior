import React from "react";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { COMPANY_NAME, PHONE_NUMBERS, EMAIL, ADDRESS, WEBSITE, SITE_NAVIGATION, SERVICE_LINKS } from "@/lib/constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5A3E36] py-16 text-white/90 relative"> {/* Added relative positioning to the footer */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-6">
            <div className="flex items-center mb-6">
              <span className="text-white font-display font-bold text-2xl">Devine</span>
              <span className="text-white/80 font-display font-medium text-lg ml-1">Senior Assisted Living</span>
            </div>
            <p className="mb-6">
              Creating exceptional senior living experiences through compassionate care and vibrant communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#F29D35] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#F29D35] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#F29D35] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-[#F29D35] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {SITE_NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="hover:text-[#F29D35] transition-colors cursor-pointer">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service.name}>
                  <Link href={service.href}>
                    <span className="hover:text-[#F29D35] transition-colors cursor-pointer">{service.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/wellness-programs">
                  <span className="hover:text-[#F29D35] transition-colors cursor-pointer">Wellness Programs</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 h-4 w-4 flex-shrink-0" />
                <span>{ADDRESS}</span>
              </li>
              {PHONE_NUMBERS.map((phone, index) => (
                <li key={index} className="flex items-center">
                  <Phone className="mr-3 h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-[#F29D35] transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center">
                <Mail className="mr-3 h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-[#F29D35] transition-colors">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
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