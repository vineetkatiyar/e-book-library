import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book } from "@/components/books/BookList";
import UpdateBookForm from "@/components/books/UpdateBook";

const UpdateBookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch book data based on ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch(`/api/books/${id}`);
        // const bookData = await response.json();
        
        // Mock data for demonstration
        const mockBook: Book = {
          id: Number(id),
          title: "The Great Gatsby",
          bookAuthor: "F. Scott Fitzgerald",
          coverImageUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400",
          genre: "Fiction",
          publishedDate: "1925-04-10",
          description: "A classic novel about the American Dream"
        };
        
        setBook(mockBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Your API call here for updating book
      console.log("Update form data:", formData);
      console.log("Book ID:", id);
      
      // After successful update, navigate back to books list
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading book data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Book Not Found</h2>
          <p className="text-gray-600 mt-2">The book you're trying to edit doesn't exist.</p>
          <Button onClick={handleCancel} className="mt-4">
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 book-text">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Edit Book</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border shadow-sm">
        <UpdateBookForm
          book={book} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default UpdateBookPage;