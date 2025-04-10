import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SAMPLE_SERVICES } from "@/lib/constants";
import { Service } from "@/lib/types";
import { fadeIn, staggeredChildren } from "@/lib/animations";

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <Card className="glass rounded-2xl overflow-hidden shadow-glass hover:shadow-md transition-custom">
      <div className="h-48 relative">
        <img 
          src={service.image || `https://via.placeholder.com/700x400?text=${service.title}`} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h3 className="text-white text-xl font-bold p-6">{service.title}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-[#2B2B2B]/80 mb-4">{service.description}</p>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <Circle className="text-xs text-primary mt-1 mr-2 h-3 w-3 fill-current" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={`/services/${service.slug}`}>
          <a className="text-primary hover:text-primary/80 font-medium flex items-center transition-custom">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

const ServicesSection: React.FC = () => {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    initialData: SAMPLE_SERVICES,
  });

  if (isLoading) {
    return <div className="py-20 text-center">Loading services...</div>;
  }

  return (
    <section id="services" className="py-20 bg-[#5A3E36]/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Our Care Services</h2>
          <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
            Comprehensive care options designed to support residents through every stage of their senior journey.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggeredChildren(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services?.map((service) => (
            <motion.div key={service.id} variants={fadeIn()}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Button asChild className="px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-custom">
            <Link href="/pricing">
              <a>View Pricing Options</a>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
