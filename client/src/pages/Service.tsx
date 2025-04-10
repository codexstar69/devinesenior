import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock, DollarSign, Calendar, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SAMPLE_SERVICES } from "@/lib/constants";
import { Service as ServiceType } from "@/lib/types";
import { fadeIn, staggeredChildren, fadeInUp, springFromTop } from "@/lib/animations";
import CallToAction from "@/components/common/CallToAction";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/common/PageTransition";

const Service: React.FC<{ slug?: string }> = ({ slug }) => {
  const [match, params] = useRoute('/services/:slug');
  const currentSlug = slug || params?.slug || "";

  const { data: services } = useQuery<ServiceType[]>({
    queryKey: ["/api/services"],
    initialData: SAMPLE_SERVICES,
  });

  if (!currentSlug) {
    return (
      <PageTransition>
        <Seo 
          title="Our Services | Devine Senior Living"
          description="Explore our comprehensive senior care services including assisted living, memory care, skilled nursing, rehabilitation, and respite care."
          canonical="/services"
        />

        <section className="pt-24 pb-12 bg-[#5A3E36]/5">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={springFromTop()}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6">Our Care Services</h1>
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
              {services?.map((service, index) => (
                <motion.div 
                  key={service.id} 
                  variants={fadeInUp(0.1 * index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="glass rounded-2xl overflow-hidden shadow-glass hover:shadow-md transition-custom h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                      <motion.img 
                        src={service.image || `https://via.placeholder.com/700x400?text=${service.title}`} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <h3 className="text-white text-xl font-bold p-6">{service.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <p className="text-[#2B2B2B]/80 mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            viewport={{ once: true }}
                          >
                            <span className="text-primary text-lg mr-2">•</span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <Link href={`/services/${service.slug}`} className="mt-auto">
                        <motion.a 
                          className="text-primary hover:text-primary/80 font-medium flex items-center transition-custom"
                          whileHover={{ x: 5 }}
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.a>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <CallToAction />
      </PageTransition>
    );
  }

  const service = services?.find(s => s.slug === currentSlug);

  if (!service) {
    return (
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Service Not Found
            </motion.h1>
            <motion.p 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The service you're looking for doesn't exist or has been removed.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild>
                <Link href="/services">
                  <a>Back to Services</a>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Seo 
        title={`${service.title} | Devine Senior Living`}
        description={service.description}
        canonical={`/services/${service.slug}`}
      />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div 
              className="lg:w-2/3"
              initial="hidden"
              animate="visible"
              variants={fadeInUp()}
            >
              <div className="mb-8">
                <Link href="/services">
                  <motion.a 
                    className="text-primary hover:text-primary/80 inline-flex items-center mb-6"
                    whileHover={{ x: -5 }}
                  >
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Back to Services
                  </motion.a>
                </Link>
                <motion.h1 
                  className="text-4xl md:text-5xl font-display font-bold text-[#5A3E36] mb-6"
                  variants={springFromTop()}
                >
                  {service.title}
                </motion.h1>
                <motion.div 
                  className="relative rounded-2xl overflow-hidden h-64 md:h-80 lg:h-96 mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    src={service.image || `https://via.placeholder.com/1200x600?text=${service.title}`} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                <motion.div 
                  className="prose prose-lg max-w-none"
                  variants={staggeredChildren(0.1)}
                >
                  <motion.p 
                    className="text-lg text-[#2B2B2B]/80 mb-6"
                    variants={fadeInUp()}
                  >
                    {service.description}
                  </motion.p>

                  <motion.h2 
                    className="text-2xl font-bold text-[#5A3E36] mb-4"
                    variants={fadeInUp()}
                  >
                    How We Help
                  </motion.h2>
                  <motion.p 
                    className="text-[#2B2B2B]/80 mb-6"
                    variants={fadeInUp()}
                  >
                    Our {service.title.toLowerCase()} program is designed to provide comprehensive support while promoting dignity and independence. Our experienced team creates personalized care plans that adapt to changing needs, ensuring residents receive the right level of assistance at all times.
                  </motion.p>

                  <motion.h2 
                    className="text-2xl font-bold text-[#5A3E36] mb-4"
                    variants={fadeInUp()}
                  >
                    Key Features
                  </motion.h2>
                  <motion.ul 
                    className="space-y-4 mb-8"
                    variants={staggeredChildren(0.1)}
                  >
                    {service.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        variants={fadeInUp()}
                      >
                        <span className="text-primary text-lg mr-2 mt-1">•</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.h2 
                    className="text-2xl font-bold text-[#5A3E36] mb-4"
                    variants={fadeInUp()}
                  >
                    Our Approach
                  </motion.h2>
                  <motion.p 
                    className="text-[#2B2B2B]/80 mb-6"
                    variants={fadeInUp()}
                  >
                    At Devine Senior Living, we believe in a holistic approach to {service.title.toLowerCase()}. Beyond addressing physical needs, we focus on emotional wellbeing, social engagement, and cognitive stimulation. Our team members are specially trained to provide compassionate care that respects each resident's unique preferences and life history.
                  </motion.p>

                  <motion.div 
                    className="my-10 bg-[#F7F5F2] p-6 rounded-xl border border-primary/10"
                    variants={fadeInUp()}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold text-[#5A3E36] mb-3">
                      Meet with a Care Advisor
                    </h3>
                    <p className="mb-4">
                      Our care advisors can provide personalized guidance about our {service.title.toLowerCase()} options and help determine the best fit for your loved one's needs.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild className="bg-primary text-white rounded-full">
                        <Link href="/contact">Schedule a Consultation</Link>
                      </Button>
                      <Button asChild variant="outline" className="border-primary text-primary rounded-full">
                        <Link href="/contact">Request Information</Link>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/3"
              initial="hidden"
              animate="visible"
              variants={fadeInUp(0.2)}
            >
              <div className="sticky top-28">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass rounded-2xl shadow-glass overflow-hidden mb-8">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#5A3E36] mb-4">Service Overview</h3>
                      <motion.ul 
                        className="space-y-4"
                        variants={staggeredChildren(0.1)}
                      >
                        <motion.li 
                          className="flex items-start"
                          variants={fadeInUp()}
                          whileHover={{ x: 3 }}
                        >
                          <Clock className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Care Level</p>
                            <p className="text-[#2B2B2B]/70 text-sm">
                              {service.title === "Assisted Living" && "Low to moderate assistance"}
                              {service.title === "Memory Care" && "Specialized dementia support"}
                              {service.title === "Skilled Nursing" && "24-hour medical care"}
                              {service.title === "Rehabilitation" && "Recovery-focused therapy"}
                              {service.title === "Respite Care" && "Short-term comprehensive care"}
                              {service.title === "Wellness Programs" && "Health maintenance & prevention"}
                            </p>
                          </div>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          variants={fadeInUp()}
                          whileHover={{ x: 3 }}
                        >
                          <DollarSign className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Pricing</p>
                            <p className="text-[#2B2B2B]/70 text-sm">
                              Contact us for personalized pricing based on care assessment and accommodation preferences
                            </p>
                          </div>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          variants={fadeInUp()}
                          whileHover={{ x: 3 }}
                        >
                          <Calendar className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Availability</p>
                            <p className="text-[#2B2B2B]/70 text-sm">
                              Limited spaces available - contact us for current openings
                            </p>
                          </div>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          variants={fadeInUp()}
                          whileHover={{ x: 3 }}
                        >
                          <Clipboard className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Assessment Process</p>
                            <p className="text-[#2B2B2B]/70 text-sm">
                              Personalized care assessment conducted by our clinical team to determine appropriate care plan
                            </p>
                          </div>
                        </motion.li>
                      </motion.ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass rounded-2xl shadow-glass overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#5A3E36] mb-4">Ready to Learn More?</h3>
                      <p className="text-[#2B2B2B]/80 mb-6">
                        Schedule a tour or consultation with our team to explore our {service.title.toLowerCase()} options.
                      </p>
                      <motion.div 
                        className="space-y-3"
                        variants={staggeredChildren(0.1)}
                      >
                        <motion.div variants={fadeInUp()}>
                          <Button asChild className="w-full bg-primary text-white rounded-full">
                            <Link href="/contact">Schedule a Tour</Link>
                          </Button>
                        </motion.div>
                        <motion.div variants={fadeInUp()}>
                          <Button asChild variant="outline" className="w-full border-primary text-primary rounded-full">
                            <a href="tel:+18005551234">Call (800) 555-1234</a>
                          </Button>
                        </motion.div>
                      </motion.div>

                      <motion.div 
                        className="mt-6 pt-6 border-t border-[#5A3E36]/10"
                        variants={fadeInUp()}
                      >
                        <h4 className="font-medium text-[#5A3E36] mb-3">Download Resources</h4>
                        <motion.ul 
                          className="space-y-2"
                          variants={staggeredChildren(0.1)}
                        >
                          <motion.li variants={fadeInUp()} whileHover={{ x: 3 }}>
                            <Link href="/resources">
                              <a className="text-primary hover:text-primary/80 flex items-center">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                {service.title} Brochure
                              </a>
                            </Link>
                          </motion.li>
                          <motion.li variants={fadeInUp()} whileHover={{ x: 3 }}>
                            <Link href="/resources">
                              <a className="text-primary hover:text-primary/80 flex items-center">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Pricing Guide
                              </a>
                            </Link>
                          </motion.li>
                          <motion.li variants={fadeInUp()} whileHover={{ x: 3 }}>
                            <Link href="/resources">
                              <a className="text-primary hover:text-primary/80 flex items-center">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Family Checklist
                              </a>
                            </Link>
                          </motion.li>
                        </motion.ul>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CallToAction />
    </PageTransition>
  );
};

export default Service;