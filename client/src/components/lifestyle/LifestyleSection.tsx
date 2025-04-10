import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Clock, Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SAMPLE_EVENTS } from "@/lib/constants";
import { Event } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";
import { fadeIn, staggeredChildren } from "@/lib/animations";

const LifestyleSection: React.FC = () => {
  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    initialData: SAMPLE_EVENTS,
  });

  return (
    <section id="lifestyle" className="py-20 bg-[#5A3E36]/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Life at Devine</h2>
          <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">
            Explore the rich experiences, activities, and amenities that make up daily life in our community.
          </p>
        </motion.div>

        {/* Gallery Masonry */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggeredChildren()}
        >
          <div className="flex flex-wrap -mx-2">
            <motion.div className="px-2 w-full md:w-1/3 mb-4" variants={fadeIn()}>
              <div className="rounded-2xl overflow-hidden h-80 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1595654402082-95fe0e5a237e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Art Class" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Art Class</span>
                </div>
              </div>
            </motion.div>
            <div className="px-2 w-full md:w-1/3 mb-4">
              <motion.div className="rounded-2xl overflow-hidden h-40 relative group mb-4" variants={fadeIn()}>
                <img 
                  src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80" 
                  alt="Garden Terrace" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Garden Terrace</span>
                </div>
              </motion.div>
              <motion.div className="rounded-2xl overflow-hidden h-36 relative group" variants={fadeIn()}>
                <img 
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Fitness Class" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Fitness Class</span>
                </div>
              </motion.div>
            </div>
            <motion.div className="px-2 w-full md:w-1/3 mb-4" variants={fadeIn()}>
              <div className="rounded-2xl overflow-hidden h-80 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Fine Dining" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Fine Dining</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="px-8 py-3 bg-white shadow-soft rounded-full text-primary font-medium hover:bg-primary hover:text-white transition-custom">
              <Link href="/gallery">
                <a>View Full Gallery</a>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-bold text-[#5A3E36] mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn()}
          >
            Upcoming Events
          </motion.h3>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggeredChildren(0.1)}
          >
            {events?.map((event) => (
              <motion.div key={event.id} variants={fadeIn()}>
                <Card className="glass rounded-2xl overflow-hidden shadow-glass">
                  <div className="h-48 relative">
                    <img 
                      src={event.image || `https://via.placeholder.com/700x400?text=${event.title}`} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-center py-2 px-4 rounded-lg">
                      <span className="block text-sm">{new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                      <span className="block text-2xl font-bold">{new Date(event.date).getDate()}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-[#5A3E36] mb-2">{event.title}</h4>
                    <p className="text-[#2B2B2B]/80 mb-4">{event.description}</p>
                    <div className="flex items-center text-sm text-[#2B2B2B]/70">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="px-8 py-3 bg-white shadow-soft rounded-full text-primary font-medium hover:bg-primary hover:text-white transition-custom">
              <Link href="/calendar">
                <a>View Full Calendar</a>
              </Link>
            </Button>
          </div>
        </div>

        {/* Dining Experience */}
        <div>
          <motion.h3 
            className="text-2xl font-bold text-[#5A3E36] mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn()}
          >
            Dining Experience
          </motion.h3>

          <div className="flex flex-col md:flex-row">
            <motion.div 
              className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn()}
            >
              <div className="rounded-2xl overflow-hidden h-96 relative">
                <img 
                  src="https://images.unsplash.com/photo-1616669944447-d65d41334b12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" 
                  alt="Devine Dining Room" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0.2)}
            >
              <h4 className="text-xl font-bold text-[#5A3E36] mb-4">Culinary Excellence</h4>
              <p className="text-[#2B2B2B]/80 mb-6">
                Our dining program offers chef-prepared meals that combine nutrition with exceptional taste. Each menu is crafted by our culinary team with input from nutritionists to ensure delicious options that support health and wellness.
              </p>

              <Card className="glass rounded-xl p-6 shadow-glass mb-6">
                <CardContent className="p-0">
                  <h5 className="font-bold text-[#5A3E36] mb-2">Sample Menu Highlights</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Utensils className="text-primary mt-1 mr-3 h-4 w-4" />
                      <span>Herb-crusted salmon with roasted seasonal vegetables</span>
                    </li>
                    <li className="flex items-start">
                      <Utensils className="text-primary mt-1 mr-3 h-4 w-4" />
                      <span>Mediterranean chicken with quinoa pilaf</span>
                    </li>
                    <li className="flex items-start">
                      <Utensils className="text-primary mt-1 mr-3 h-4 w-4" />
                      <span>Classic pot roast with root vegetables</span>
                    </li>
                    <li className="flex items-start">
                      <Utensils className="text-primary mt-1 mr-3 h-4 w-4" />
                      <span>Seasonal fruit cobbler with fresh whipped cream</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button asChild className="px-6 py-2 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-custom">
                  <Link href="/dining">
                    <a>View Full Menu</a>
                  </Link>
                </Button>
                <Link href="/dietary">
                  <a className="text-primary hover:text-primary/80 font-medium flex items-center transition-custom">
                    Dietary Accommodations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;