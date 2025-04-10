export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  stars: number;
  image?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  image?: string;
  slug: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  image?: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    email?: string;
  };
}

export interface NavItem {
  name: string;
  href: string;
}

export interface WhyChooseUsCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface MenuItem {
  title: string;
  description: string;
}
