import React from "react";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US_CARDS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { FaUserMd, FaMedal, FaHeart, FaUtensils, FaHome, FaCalendarCheck } from "react-icons/fa";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "user-md":
      return <FaUserMd className="text-primary text-2xl" />;
    case "medal":
      return <FaMedal className="text-[#F29D35] text-2xl" />;
    case "heart":
      return <FaHeart className="text-[#556B2F] text-2xl" />;
    case "utensils":
      return <FaUtensils className="text-primary text-2xl" />;
    case "home":
      return <FaHome className="text-[#F29D35] text-2xl" />;
    case "calendar-check":
      return <FaCalendarCheck className="text-[#556B2F] text-2xl" />;
    default:
      return null;
  }
};

const getColorClass = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-primary/10";
    case "accent":
      return "bg-[#F29D35]/10";
    case "green":
      return "bg-[#556B2F]/10";
    default:
      return "bg-primary/10";
  }
};

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Families Choose Devine
          </motion.h2>
          <motion.p 
            className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our approach to senior care combines luxury, compassion, and clinical excellence to create a truly distinguished living experience.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_CARDS.map((card, index) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <Card 
                key={card.title}
                //@ts-ignore - ref is correctly typed for HTML elements
                ref={ref}
                className={`glass rounded-2xl p-8 shadow-glass hover:shadow-md transition-custom ${isVisible ? 'reveal active' : 'reveal'}`}
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${getColorClass(card.color)} rounded-full flex items-center justify-center mb-6`}>
                    {getIcon(card.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-[#5A3E36] mb-3">{card.title}</h3>
                  <p className="text-[#2B2B2B]/80">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
