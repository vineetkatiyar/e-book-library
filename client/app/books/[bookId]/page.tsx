import Image from "next/image";
import DownloadButton from "@/components/downloadButton";
import { Book } from "@/types/BookTypes";

interface ApiResponse {
  message: string;
  book: Book;
}

export default async function BookDetails({
  params,
}: {
  params: { bookId: string };
}) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/books/${params.bookId}`
    );

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      return (
        <div className="text-center mt-10 text-red-500">
          Failed to load book details. Status: {res.status}
        </div>
      );
    }

    const data: ApiResponse = await res.json();
    console.log("API Response:", data);

    if (!data.book) {
      return (
        <div className="text-center mt-10 text-gray-500">Book not found.</div>
      );
    }

    const book = data.book;

    return (
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start book-text">
        {/* LEFT SIDE */}
        <div>
          <h1 className="md:text-3xl text-xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-4">by {book.author.name}</p>
          <p className="text-gray-800 leading-relaxed mb-6">
            {book.description}
          </p>
          <DownloadButton fileUrl={book.file} />
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
          <Image
            src={book.coverImageUrl}
            alt={book.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading book details. Please try again later.
      </div>
    );
  }
}
