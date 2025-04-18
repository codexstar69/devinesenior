import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "../shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { isAuthenticated } from "./middleware/auth";
import { sendEmail } from "./mail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Services API
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Events API
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Contact form submission
  app.post("/api/inquiries", async (req, res) => {
    let inquiry;
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      inquiry = await storage.createInquiry(inquiryData);

      try {
        // Send confirmation email to user
        await sendEmail({
          to: inquiryData.email,
          subject: 'Thank you for contacting Devine Senior Living',
          text: `Dear ${inquiryData.name},\n\nThank you for reaching out to us. We have received your inquiry and will get back to you shortly.\n\nBest regards,\nDevine Senior Living Team`,
          html: `<p>Dear ${inquiryData.name},</p><p>Thank you for reaching out to us. We have received your inquiry and will get back to you shortly.</p><p>Best regards,<br>Devine Senior Living Team</p>`
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }

      try {
        // Send notification to admin
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'admin@example.com',
          subject: 'New Contact Form Submission',
          text: `New inquiry from ${inquiryData.name}\nEmail: ${inquiryData.email}\nPhone: ${inquiryData.phone || 'N/A'}\nMessage: ${inquiryData.message || 'N/A'}`,
          html: `<h3>New inquiry from ${inquiryData.name}</h3><p>Email: ${inquiryData.email}</p><p>Phone: ${inquiryData.phone || 'N/A'}</p><p>Message: ${inquiryData.message || 'N/A'}</p>`
        });
      } catch (adminEmailError) {
        console.error('Failed to send admin notification email:', adminEmailError);
      }
      
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: fromZodError(error).message 
        });
      }
      console.error('Failed to process inquiry:', error);
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  app.post("/api/guide-download", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      try {
        await sendEmail({
          to: email,
          subject: 'Your Senior Care Options Guide',
          text: 'Thank you for requesting our Senior Care Options Guide. Please find the download link below.',
          html: `
            <h2>Thank you for requesting our Senior Care Options Guide</h2>
            <p>You can download your guide using the link below:</p>
            <p><a href="${process.env.GUIDE_PDF_URL || '#' /* Add a more robust fallback or error if missing */}">Download Senior Care Guide</a></p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          `
        });
        res.status(200).json({ message: "Guide email sent successfully" });
      } catch (emailError) {
        console.error('Error sending guide email:', emailError);
        res.status(500).json({ message: "Failed to send guide email" });
      }
    } catch (error) {
      console.error('Error processing guide download request:', error);
      res.status(500).json({ message: "Failed to send guide" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
