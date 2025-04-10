import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fadeIn, fadeInUp } from "@/lib/animations";

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    bio: "Dr. Johnson brings over 20 years of geriatric care experience and a passion for creating innovative senior wellness programs.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Michael Roberts",
    role: "Executive Director",
    bio: "With a background in hospitality and healthcare administration, Michael leads our communities with a focus on resident satisfaction and operational excellence.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Teresa Martinez",
    role: "Director of Memory Care",
    bio: "Teresa specializes in creating innovative programs that enhance cognitive function and emotional wellbeing for seniors with memory challenges.",
    image: "https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
  }
];

const timelineItems = [
  {
    year: "1990",
    title: "Founding Vision",
    description: "Devine Senior Living was founded with a mission to transform senior care through personalized attention."
  },
  {
    year: "2003",
    title: "Expansion of Services",
    description: "Added memory care and rehabilitation services to meet growing community needs."
  },
  {
    year: "2012",
    title: "Award-Winning Care",
    description: "Recognized with national excellence in senior care award for our innovative programs."
  },
  {
    year: "2020",
    title: "New Era of Excellence",
    description: "Launched state-of-the-art facility with enhanced technology for resident well-being."
  }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn(0.2)}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">About Devine Senior Living</h2>
          <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">A legacy of excellence in senior care spanning over three decades.</p>
        </motion.div>

        {/* Mission & Values */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto bg-[#5A3E36]/5 rounded-2xl p-10 shadow-soft text-center">
            <motion.h3 
              className="text-2xl font-bold text-[#5A3E36] mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp(0.1)}
            >
              Our Mission
            </motion.h3>
            <motion.p 
              className="text-xl text-[#2B2B2B]/90 italic mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp(0.2)}
            >
              "To create vibrant communities where seniors thrive through personalized care, meaningful connections, and purposeful living."
            </motion.p>

            <motion.h3 
              className="text-2xl font-bold text-[#5A3E36] mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp(0.3)}
            >
              Core Values
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="glass rounded-xl p-6 shadow-glass"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp(0.4)}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-[#5A3E36] mb-2">Compassion</h4>
                <p className="text-[#2B2B2B]/80 text-sm">We lead with empathy in every interaction, honoring each resident's unique journey.</p>
              </motion.div>

              <motion.div 
                className="glass rounded-xl p-6 shadow-glass"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp(0.5)}
              >
                <div className="w-12 h-12 bg-[#F29D35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F29D35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-[#5A3E36] mb-2">Excellence</h4>
                <p className="text-[#2B2B2B]/80 text-sm">We pursue the highest standards in care, service, and community experience.</p>
              </motion.div>

              <motion.div 
                className="glass rounded-xl p-6 shadow-glass"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp(0.6)}
              >
                <div className="w-12 h-12 bg-[#556B2F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#556B2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-[#5A3E36] mb-2">Dignity</h4>
                <p className="text-[#2B2B2B]/80 text-sm">We respect and honor the inherent worth of every person in our community.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#5A3E36] mb-8 text-center">Our Journey</h3>

          <div className="max-w-4xl mx-auto relative">
            <div className="hidden md:block timeline-line"></div>

            {timelineItems.map((item, index) => (
              <motion.div 
                key={item.year} 
                className="relative mb-12 md:mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn(index * 0.1)}
              >
                <div className="timeline-item md:pl-0 pl-10 relative flex md:flex-row flex-col md:items-center">
                  <div className="md:hidden timeline-dot"></div>
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:w-1/2 md:pr-10 md:text-right">
                        <div className="glass rounded-xl p-6 shadow-glass md:ml-auto">
                          <h4 className="text-xl font-bold text-primary mb-2">{item.year}</h4>
                          <h5 className="text-lg font-medium text-[#5A3E36] mb-2">{item.title}</h5>
                          <p className="text-[#2B2B2B]/80">{item.description}</p>
                        </div>
                      </div>
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
                      <div className="md:w-1/2 md:pl-10"></div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 md:pr-10"></div>
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
                      <div className="md:w-1/2 md:pl-10">
                        <div className="glass rounded-xl p-6 shadow-glass">
                          <h4 className="text-xl font-bold text-primary mb-2">{item.year}</h4>
                          <h5 className="text-lg font-medium text-[#5A3E36] mb-2">{item.title}</h5>
                          <p className="text-[#2B2B2B]/80">{item.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl font-bold text-[#5A3E36] mb-8 text-center">Leadership Team</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="text-center relative group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn(index * 0.1)}
              >
                <div className="mb-4 relative overflow-hidden rounded-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/80 flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white/90 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-white hover:text-[#F29D35] transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-white hover:text-[#F29D35] transition-colors">
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[#5A3E36]">{member.name}</h4>
                <p className="text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;