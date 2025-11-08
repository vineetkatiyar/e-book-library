// src/components/books/bookSchema.ts
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  
  bookAuthor: z.string()
    .min(2, "Author name must be at least 2 characters")
    .max(50, "Author name must be less than 50 characters")
    .trim(),
  
  genre: z.string()
    .min(2, "Genre is required")
    .max(30, "Genre must be less than 30 characters")
    .trim(),
  
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .or(z.literal('')),
  
  coverImageUrl: z.instanceof(File, { message: "Cover image is required" })
    .refine((file) => file.size <= 10 * 1024 * 1024, "Cover image must be less than 10MB")
    .refine((file) => file.type.startsWith('image/'), "Please select an image file"),
  
  file: z.instanceof(File, { message: "Book PDF is required" })
    .refine((file) => file.size <= 50 * 1024 * 1024, "PDF must be less than 50MB")
    .refine((file) => file.type === 'application/pdf', "Please select a PDF file"),
});

export type BookFormData = z.infer<typeof bookSchema>;

export const updateBookSchema = z.object({
  title: z.string().min(2).optional(),
  bookAuthor: z.string().min(2).optional(),
  genre: z.string().min(1).optional(),
  description: z.string().optional(),
  coverImageUrl: z.instanceof(File).optional(), 
  file: z.instanceof(File).optional(),           
});

export type UpdateBookFormData = z.infer<typeof updateBookSchema>;