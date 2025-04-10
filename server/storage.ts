import { 
  users, type User, type InsertUser,
  testimonials, type Testimonial, type InsertTestimonial,
  services, type Service, type InsertService,
  events, type Event, type InsertEvent,
  inquiries, type Inquiry, type InsertInquiry
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Inquiry operations
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private testimonialMap: Map<number, Testimonial>;
  private serviceMap: Map<number, Service>;
  private eventMap: Map<number, Event>;
  private inquiryMap: Map<number, Inquiry>;
  
  private userId: number;
  private testimonialId: number;
  private serviceId: number;
  private eventId: number;
  private inquiryId: number;

  constructor() {
    this.users = new Map();
    this.testimonialMap = new Map();
    this.serviceMap = new Map();
    this.eventMap = new Map();
    this.inquiryMap = new Map();
    
    this.userId = 1;
    this.testimonialId = 1;
    this.serviceId = 1;
    this.eventId = 1;
    this.inquiryId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email ?? null,
      fullName: insertUser.fullName ?? null,
      role: insertUser.role ?? null 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialMap.values())
      .filter(testimonial => testimonial.isActive)
      .sort((a, b) => a.id - b.id);
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonialMap.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      image: insertTestimonial.image ?? null,
      role: insertTestimonial.role ?? null,
      stars: insertTestimonial.stars ?? null,
      isActive: insertTestimonial.isActive ?? null
    };
    this.testimonialMap.set(id, testimonial);
    return testimonial;
  }
  
  // Service operations
  async getServices(): Promise<Service[]> {
    return Array.from(this.serviceMap.values())
      .filter(service => service.isActive)
      .sort((a, b) => a.id - b.id);
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.serviceMap.get(id);
  }
  
  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.serviceMap.values()).find(
      (service) => service.slug === slug && service.isActive
    );
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceId++;
    const service: Service = { 
      ...insertService, 
      id,
      image: insertService.image ?? null,
      isActive: insertService.isActive ?? null,
      features: insertService.features ?? null
    };
    this.serviceMap.set(id, service);
    return service;
  }
  
  // Event operations
  async getEvents(): Promise<Event[]> {
    return Array.from(this.eventMap.values())
      .filter(event => event.isActive)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.eventMap.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const event: Event = { 
      ...insertEvent, 
      id,
      image: insertEvent.image ?? null,
      isActive: insertEvent.isActive ?? null,
      startTime: insertEvent.startTime ?? null,
      endTime: insertEvent.endTime ?? null
    };
    this.eventMap.set(id, event);
    return event;
  }
  
  // Inquiry operations
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiryMap.values())
      .sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return b.id - a.id;
      });
  }
  
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiryMap.get(id);
  }
  
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      message: insertInquiry.message ?? null,
      phone: insertInquiry.phone ?? null,
      inquiryType: insertInquiry.inquiryType ?? null,
      createdAt: new Date() 
    };
    this.inquiryMap.set(id, inquiry);
    return inquiry;
  }
  
  // Initialize sample data
  private initializeSampleData() {
    // Sample testimonials
    const sampleTestimonials = [
      {
        name: "Eleanor J.",
        role: "Resident since 2021",
        content: "Moving to Devine was the best decision. The staff treats me like family, and I've made wonderful friends. The activities keep me engaged and I feel healthier than I have in years.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        isActive: true
      },
      {
        name: "Susan M.",
        role: "Daughter of Resident",
        content: "The peace of mind we've gained knowing Dad is in such good hands is priceless. The staff communicates with us regularly, and his care plan is exactly what he needs. We couldn't be happier with our choice.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        isActive: true
      },
      {
        name: "Robert T.",
        role: "Resident since 2020",
        content: "After my wife passed, I was hesitant about moving into a community. Now I can't imagine being anywhere else. The care is exceptional, and the dining is superb. I feel like I'm in a luxury resort with healthcare.",
        stars: 5,
        image: "https://images.unsplash.com/photo-1553867745-6e038d085e86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
        isActive: true
      }
    ];
    
    sampleTestimonials.forEach(testimonial => {
      const id = this.testimonialId++;
      this.testimonialMap.set(id, { ...testimonial, id });
    });
    
    // Sample services
    const sampleServices = [
      {
        title: "Assisted Living",
        description: "Independent lifestyle with personalized assistance for daily activities in a supportive community.",
        features: ["Medication management", "Bathing and dressing assistance", "Mobility support"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        slug: "assisted-living",
        isActive: true
      },
      {
        title: "Memory Care",
        description: "Specialized care for those with Alzheimer's and dementia in a secure, engaging environment.",
        features: ["24/7 specialized supervision", "Cognitive stimulation activities", "Secure living environment"],
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        slug: "memory-care",
        isActive: true
      },
      {
        title: "Skilled Nursing",
        description: "24-hour medical care from licensed nurses and therapists for complex health needs.",
        features: ["Post-surgery recovery", "Chronic condition management", "Wound care"],
        image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        slug: "skilled-nursing",
        isActive: true
      },
      {
        title: "Rehabilitation",
        description: "Comprehensive therapy services to recover function and independence after illness or surgery.",
        features: ["Physical therapy", "Occupational therapy", "Speech therapy"],
        image: "https://images.unsplash.com/photo-1581056771107-24247a734e15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        slug: "rehabilitation",
        isActive: true
      },
      {
        title: "Respite Care",
        description: "Short-term care providing a break for family caregivers while ensuring quality care continues.",
        features: ["Flexible stays (days to weeks)", "Full access to amenities", "Personalized care plan"],
        image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        slug: "respite-care",
        isActive: true
      },
      {
        title: "Wellness Programs",
        description: "Comprehensive health and wellness initiatives that promote active, fulfilling senior living.",
        features: ["Fitness classes", "Nutrition counseling", "Mindfulness practices"],
        image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        slug: "wellness-programs",
        isActive: true
      }
    ];
    
    sampleServices.forEach(service => {
      const id = this.serviceId++;
      this.serviceMap.set(id, { ...service, id });
    });
    
    // Sample events
    const sampleEvents = [
      {
        title: "Live Jazz Night",
        description: "Join us for an evening of classic jazz performed by the Silver City Quartet in our main lounge.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        date: new Date("2023-05-15"),
        startTime: "19:00",
        endTime: "21:00",
        isActive: true
      },
      {
        title: "Cooking Demo",
        description: "Our executive chef will demonstrate Mediterranean cuisine techniques with tasting samples for all attendees.",
        image: "https://images.unsplash.com/photo-1585211969224-3e992986159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        date: new Date("2023-05-18"),
        startTime: "14:00",
        endTime: "15:30",
        isActive: true
      },
      {
        title: "Garden Club",
        description: "Participate in our seasonal planting in the community garden followed by refreshments on the terrace.",
        image: "https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80",
        date: new Date("2023-05-20"),
        startTime: "10:00",
        endTime: "11:30",
        isActive: true
      }
    ];
    
    sampleEvents.forEach(event => {
      const id = this.eventId++;
      this.eventMap.set(id, { ...event, id });
    });
  }
}

export const storage = new MemStorage();
