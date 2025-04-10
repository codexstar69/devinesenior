import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FileText, CheckSquare, BookOpen, CreditCard, Calendar, PhoneCall, Heart, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fadeIn, staggeredChildren } from "@/lib/animations";

const ResourcesSection: React.FC = () => {
  const resources = [
    {
      title: "Family Care Guide",
      description: "A comprehensive guide for families navigating senior care options",
      icon: <FileText className="h-12 w-12 text-primary" />,
      link: "/family-guide",
      color: "bg-primary/10"
    },
    {
      title: "Transition Checklist",
      description: "Step-by-step checklist for a smooth transition to senior living",
      icon: <CheckSquare className="h-12 w-12 text-[#F29D35]" />,
      link: "/transition-checklist",
      color: "bg-[#F29D35]/10"
    },
    {
      title: "Senior Care Blog",
      description: "Articles and insights on senior wellness, care trends and aging",
      icon: <BookOpen className="h-12 w-12 text-[#556B2F]" />,
      link: "/blog",
      color: "bg-[#556B2F]/10"
    },
    {
      title: "Financial Resources",
      description: "Information about payment options, insurance, and financial planning",
      icon: <CreditCard className="h-12 w-12 text-primary" />,
      link: "/financial-resources",
      color: "bg-primary/10"
    }
  ];

  const faqs = [
    {
      question: "What's the difference between assisted living and memory care?",
      answer: "Assisted living provides personal care support to seniors for daily activities, while maintaining a level of independence. Memory care is specialized for those with Alzheimer's and dementia, featuring a secure environment, memory-focused activities, and staff trained specifically in cognitive care approaches."
    },
    {
      question: "How do I know when it's time to consider senior living?",
      answer: "Consider senior living when: safety concerns arise at home, managing daily activities becomes difficult, social isolation increases, health needs require regular attention, or caregiver stress escalates. Our care advisors can help assess your specific situation during a personal consultation."
    },
    {
      question: "What costs can we expect, and are there financial assistance options?",
      answer: "Costs vary based on care level, accommodation type, and services needed. We offer transparent pricing with bundled and à la carte options. Financial assistance may be available through long-term care insurance, veterans benefits, Medicare/Medicaid (for eligible services), and our partnership payment plans. Our financial counselors can help explore all options."
    },
    {
      question: "What is the staff-to-resident ratio and qualifications?",
      answer: "Our staffing ratios exceed industry standards and vary by care level: Assisted Living (1:12 daytime, 1:18 overnight), Memory Care (1:6 daytime, 1:10 overnight), and Skilled Nursing (1:4 daytime, 1:8 overnight). All care staff are certified with specialized training, and we maintain a high retention rate through our career advancement programs."
    },
    {
      question: "Can residents bring their own furniture?",
      answer: "Yes, we encourage residents to personalize their spaces with their own furniture, photos, and cherished belongings. We provide basic furnishings if preferred, but find that familiar items help create a sense of home and support emotional wellbeing during the transition."
    }
  ];

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5A3E36] mb-4">Resources & Guidance</h2>
          <p className="text-lg text-[#2B2B2B]/80 max-w-2xl mx-auto">Helpful tools, information, and support for seniors and their families throughout the care journey.</p>
        </motion.div>

        {/* Resource Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={staggeredChildren(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resources.map((resource, index) => (
            <motion.div key={resource.title} variants={fadeIn()}>
              <Card className="glass rounded-2xl overflow-hidden shadow-glass hover:shadow-md transition-custom h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`${resource.color} w-20 h-20 rounded-xl flex items-center justify-center mb-6`}>
                    {resource.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#5A3E36] mb-3">{resource.title}</h3>
                  <p className="text-[#2B2B2B]/80 mb-6 flex-grow">{resource.description}</p>
                  <Link href={resource.link}>
                    <a className="text-primary hover:text-primary/80 font-medium flex items-center transition-custom mt-auto">
                      Download Resource
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQs */}
        <motion.div 
          className="max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#5A3E36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileQuestion className="h-8 w-8 text-[#5A3E36]" />
            </div>
            <h3 className="text-2xl font-bold text-[#5A3E36] mb-2">Frequently Asked Questions</h3>
            <p className="text-[#2B2B2B]/80">Common questions about senior care and our services</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#5A3E36]/10">
                <AccordionTrigger className="text-[#5A3E36] font-medium text-left hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#2B2B2B]/80 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Support Services */}
        <motion.div 
          className="max-w-4xl mx-auto bg-[#5A3E36]/5 rounded-3xl p-8 md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn()}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 md:pr-8">
              <div className="w-16 h-16 bg-[#556B2F]/10 rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="h-8 w-8 text-[#556B2F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#5A3E36] mb-4">Caregiver Support Program</h3>
              <p className="text-[#2B2B2B]/80 mb-6">
                We understand the challenges facing family caregivers. Our support program offers resources, counseling sessions, and respite options to ensure your wellbeing throughout your caregiving journey.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-[#556B2F] mt-1 mr-3 h-5 w-5" />
                  <span>Monthly caregiver support groups</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#556B2F] mt-1 mr-3 h-5 w-5" />
                  <span>One-on-one counseling options</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#556B2F] mt-1 mr-3 h-5 w-5" />
                  <span>Educational workshops and resources</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-[#556B2F] mt-1 mr-3 h-5 w-5" />
                  <span>Flexible respite care scheduling</span>
                </li>
              </ul>
              <Button asChild className="px-8 py-3 bg-[#556B2F] text-white rounded-full shadow-md hover:bg-[#556B2F]/90 transition-custom">
                <Link href="/caregiver-support">
                  <a>Learn More</a>
                </Link>
              </Button>
            </div>
            <div className="md:w-2/5">
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                  alt="Caregiver support session"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;