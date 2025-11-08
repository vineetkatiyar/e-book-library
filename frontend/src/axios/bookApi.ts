import axiosApi from "./axiosApi";

export interface Book {
  _id: string;
  title: string;
  description?: string;
  bookAuthor: string;
  genre: string;
  coverImageUrl: string;
  file: string;
  createdAt: Date;
  updatedAt: string;
  author?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface GetBooksResponse {
  success: boolean;
  message: string;
  data: {
    books: Book[];
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalBooks: number;
    booksPerPage: number;
  };
}

export const getBooks = async (): Promise<Book[]> => {
  const res = await axiosApi.get<GetBooksResponse>("/books");
  return res.data.data.books;
};

export const getBook = async (id: string): Promise<Book> => {
  const res = await axiosApi.get<Book>(`/books/${id}`);
  return res.data;
};

export const deleteBook = async (id: string): Promise<void> => {
 const res = await axiosApi.delete(`/books/${id}`);
  return res.data;
};

export const createBook = async (data: FormData): Promise<Book> => {
  const res = await axiosApi.post<Book>("/books", data);
  return res.data;
};

