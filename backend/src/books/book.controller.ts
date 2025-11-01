import { NextFunction, Request, Response } from "express";
import path, { parse } from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "fs/promises";
import createHttpError from "http-errors";
import book from "./book.model";
import { deleteFromCloudinary } from "../utils/cloudinoryDelete";

interface GetAllBooksQuery {
  page?: string;
  limit?: string;
  genre?: string;
  search?: string;
}

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

  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.params.id;
      const existingBook = await book
        .findById(bookId)
        .populate("author", "name email");
      if (!existingBook) {
        return next(createHttpError(404, "Book not found"));
      }

      res.status(200).json({
        message: "Book fetched successfully",
        book: existingBook,
      });
    } catch (error) {
      console.log("Error fetching book by ID:", error);
      return next(createHttpError(500, "Failed to fetch book"));
    }
  },

  async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = "1",
        limit = "10",
        genre,
        search = "",
      } = req.query as GetAllBooksQuery;

      const query: any = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } }, // Case-insensitive search
          { description: { $regex: search, $options: "i" } },
        ];
      }

      if (genre) {
        query.genre = { $regex: genre, $options: "i" };
      }

      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        populate: { path: "author", select: "name email" },
        sort: { createdAt: -1 },
      };

      const result = await book.paginate(query, options);
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: {
          books: result.docs,
        },
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalBooks: result.totalDocs,
          booksPerPage: result.limit,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
          nextPage: result.nextPage,
          prevPage: result.prevPage,
        },
      });
    } catch (error) {
      console.log("Error fetching all books:", error);
      return next(createHttpError(500, "Failed to fetch books"));
    }
  },
  async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const bookId = req.params.id;
      const existingBook = await book.findById(bookId);
      
      if (!existingBook) {
        return next(createHttpError(404, "Book not found"));
      }
  
      // Authorization check
      if (existingBook.author.toString() !== req.userId) {
        return next(createHttpError(403, "Not authorized to delete this book"));
      }
  
      // Store URLs before deletion
      const { coverImageUrl, file } = existingBook;
  
      // Delete from database
      await book.findByIdAndDelete(bookId);
  
      // Delete from Cloudinary (fire and forget)
      if (coverImageUrl) deleteFromCloudinary(coverImageUrl);
      if (file) deleteFromCloudinary(file);
  
      res.status(200).json({
        message: "Book deleted successfully",
      });
      
    } catch (error) {
      console.log("Error deleting book:", error);
      return next(createHttpError(500, "Failed to delete book"));
    }
  },
};

export default bookController;
