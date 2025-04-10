import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";
import { Testimonial } from "@/lib/types";
import { fadeIn } from "@/lib/animations";

const TestimonialSlide: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="testimonial-slide w-full md:w-1/2 lg:w-1/3 flex-none px-4">
      <Card className="glass rounded-2xl p-8 shadow-glass h-full flex flex-col">
        <CardContent className="p-0">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img 
                src={testimonial.image || "https://via.placeholder.com/200?text=Resident"} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#5A3E36]">{testimonial.name}</h4>
              <p className="text-sm text-[#2B2B2B]/60">{testimonial.role}</p>
            </div>
          </div>
          <div className="mb-4 text-[#F29D35] flex">
            {Array.from({ length: testimonial.stars }).map((_, i) => (
              <Star key={i} className="fill-current h-4 w-4" />
            ))}
          </div>
          <p className="text-[#2B2B2B]/80 italic flex-grow">{testimonial.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const TestimonialSlider: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [slideWidth, setSlideWidth] = useState(33.33);
  const [maxPosition, setMaxPosition] = useState(0);
  
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    initialData: SAMPLE_TESTIMONIALS,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideWidth(100);
      } else if (window.innerWidth < 1024) {
        setSlideWidth(50);
      } else {
        setSlideWidth(33.33);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (testimonials) {
      setMaxPosition(Math.max(0, testimonials.length - Math.floor(100 / slideWidth)));
    }
  }, [testimonials, slideWidth]);

  const goToPrev = () => {
    setPosition(Math.max(0, position - 1));
  };

  const goToNext = () => {
    setPosition(Math.min(maxPosition, position + 1));
  };

  if (isLoading) {
    return <div className="py-20 text-center">Loading testimonials...</div>;
  }

  return (
    <section className="py-20 bg-[#5A3E36]/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Life at Devine</h2>
          <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">Hear what our residents and their families have to say about their experience.</p>
        </motion.div>
        
        <div className="relative">
          <div className="testimonial-container overflow-hidden">
            <div 
              className="testimonial-wrapper flex transition-transform duration-500"
              style={{ transform: `translateX(-${position * slideWidth}%)` }}
            >
              {testimonials?.map((testimonial) => (
                <TestimonialSlide key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
          
          <button 
            onClick={goToPrev}
            disabled={position === 0}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-custom z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={goToNext}
            disabled={position >= maxPosition}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-custom z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-center mt-10">
          <Link href="/testimonials">
            <a className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-custom">
              Read More Stories
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
