import { Book } from "@/types/BookTypes";
import BookCard from "./bookCard";

export default async function BookList() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/books`);
    if (!res.ok) {
      throw new Error("Failed to fetch book data");
    }
    const data = await res.json();
    const books = data?.data?.books || [];

    return (
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book: Book) => <BookCard key={book._id} {...book} />)
        ) : (
          <p className="text-center text-gray-500">No books found.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return (
      <div className="text-center text-red-500 mt-8">
        Failed to load books. Please try again later.
      </div>
    );
  }
}
