import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateBookForm from "@/components/books/UpdateBook";
import { useUpdateBook } from "@/hooks/useUpdateBook";
import { useGetBookById } from "@/hooks/useGetBookById";

const UpdateBookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: book, isLoading, isError } = useGetBookById(id as string);

  const { mutateAsync, isPending } = useUpdateBook();

  const handleSubmit = async (formData: FormData) => {
    try {
      if (!id) {
        throw new Error("Book ID is required");
      }
      await mutateAsync({ id, data: formData });
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
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

  if (isError || !book) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Book Not Found</h2>
          <p className="text-gray-600 mt-2">
            The book you're trying to edit doesn't exist.
          </p>
          <Button onClick={handleCancel} className="mt-4">
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  console.log("Book data:", book);

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
