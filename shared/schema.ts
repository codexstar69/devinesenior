import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  role: text("role").default("user"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role"),
  content: text("content").notNull(),
  image: text("image"),
  stars: integer("stars").default(5),
  isActive: boolean("is_active").default(true),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  slug: text("slug").notNull().unique(),
  features: text("features").array(),
  isActive: boolean("is_active").default(true),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  date: timestamp("date").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  isActive: boolean("is_active").default(true),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  role: true,
  content: true,
  image: true,
  stars: true,
  isActive: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  image: true,
  slug: true,
  features: true,
  isActive: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  image: true,
  date: true,
  startTime: true,
  endTime: true,
  isActive: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).pick({
  name: true,
  email: true,
  phone: true,
  inquiryType: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
