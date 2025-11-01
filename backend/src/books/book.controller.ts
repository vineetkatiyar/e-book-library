import { NextFunction, Request, Response } from "express";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "fs/promises";
import createHttpError from "http-errors";
import book from "./book.model";

const bookController = {
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, genre, description } = req.body;
      const files = req.files as { [key: string]: Express.Multer.File[] };

      if (!files?.coverImageUrl?.[0]) {
        return next(createHttpError(400, "Cover image is required"));
      }
      if (!files?.file?.[0]) {
        return next(createHttpError(400, "Book file is required"));
      }

      const coverImage = files.coverImageUrl[0];
      const bookFile = files.file[0];

      // Paths
      const uploadsDir = path.join(process.cwd(), "public", "data", "uploads");
      const coverFilePath = path.join(uploadsDir, coverImage.filename);
      const bookFilePath = path.join(uploadsDir, bookFile.filename);

      // Upload Cover Image
      const uploadedCover = await cloudinary.uploader.upload(coverFilePath, {
        folder: "book-covers",
        use_filename: true,
        resource_type: "image",
      });
      await fs.unlink(coverFilePath);

      // Upload Book File
      const uploadedBook = await cloudinary.uploader.upload(bookFilePath, {
        folder: "book-pdfs",
        use_filename: true,
        resource_type: "raw",
      });
      await fs.unlink(bookFilePath);

      // Create book in DB
      const newBook = await book.create({
        title,
        description,
        author: req.userId,
        genre,
        coverImageUrl: uploadedCover.secure_url,
        file: uploadedBook.secure_url,
      });

      res.status(201).json({
        message: "Book created successfully",
        book: newBook,
      });
    } catch (error) {
      console.error("Error creating book:", error);
      next(createHttpError(500, "Failed to create book"));
    }
  },

  async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, genre, description } = req.body;
      const bookId = req.params.id;
      const existingBook = await book.findById(bookId);
      if (!existingBook) {
        return next(createHttpError(404, "Book not found"));
      }

      if (existingBook.author.toString() !== req.userId) {
        return next(
          createHttpError(403, "You are not authorized to update this book"),
        );
      }

      const files = req.files as {
        [key: string]: Express.Multer.File[];
      };


      let updatedCoverImageUrl = existingBook.coverImageUrl;
      let updatedFileUrl = existingBook.file;

      if (files?.coverImageUrl?.[0]) {
        const coverImage = files.coverImageUrl[0];
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "data",
          "uploads",
        );
        const coverFilePath = path.join(uploadsDir, coverImage.filename);
        const uploadedCover = await cloudinary.uploader.upload(coverFilePath, {
          folder: "book-covers",
          use_filename: true,
          resource_type: "image",
        });
        await fs.unlink(coverFilePath);
        updatedCoverImageUrl = uploadedCover.secure_url;
      }

      if (files?.file?.[0]) {
        const bookFile = files.file[0];
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "data",
          "uploads",
        );
        const bookFilePath = path.join(uploadsDir, bookFile.filename);
        const uploadedBook = await cloudinary.uploader.upload(bookFilePath, {
          folder: "book-pdfs",
          use_filename: true,
          resource_type: "raw",
        });
        await fs.unlink(bookFilePath);
        updatedFileUrl = uploadedBook.secure_url;
      }

      existingBook.title = title || existingBook.title;
      existingBook.genre = genre || existingBook.genre;
      existingBook.description = description || existingBook.description;
      existingBook.coverImageUrl = updatedCoverImageUrl;
      existingBook.file = updatedFileUrl;

      const updatedBook = await existingBook.save();

      res.status(200).json({
        message: "Book updated successfully",
        book: updatedBook,
      });

    } catch (error) {
      console.log("Error updating book:", error);
      return next(createHttpError(500, "Failed to update book"));
    }
  },
};

export default bookController;
