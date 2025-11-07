import CreateBookForm from "@/components/books/CreateBook";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateBookPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Your API call here
      console.log("Form data:", formData);
      
      // After successful submission, navigate back to books list
      navigate("/");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
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
          <h1 className="text-xl font-bold text-foreground">Add New Book</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border shadow-sm">
        <CreateBookForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default CreateBookPage;