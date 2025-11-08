// src/components/books/UpdateBookForm.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, FileText, Image, Save } from "lucide-react";
import type { Book } from "@/axios/bookApi";

interface UpdateBookFormProps {
  book: Book;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

const UpdateBookForm = ({ book, onSubmit, onCancel }: UpdateBookFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    bookAuthor: "",
    genre: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCoverUrl, setCurrentCoverUrl] = useState(book.coverImageUrl);

  // Initialize form with book data
  useEffect(() => {
    setFormData({
      title: book.title,
      bookAuthor: book.bookAuthor,
      genre: book.genre,
      description: book.description || "",
    });
    setCurrentCoverUrl(book.coverImageUrl);
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("bookAuthor", formData.bookAuthor);
      submitData.append("genre", formData.genre);
      submitData.append("description", formData.description);

      if (coverImage) {
        submitData.append("coverImageUrl", coverImage);
      }

      if (bookFile) {
        submitData.append("file", bookFile);
      }

      await onSubmit(submitData);
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setCoverImage(file);

      // Create preview URL for new image
      const previewUrl = URL.createObjectURL(file);
      setCurrentCoverUrl(previewUrl);
    }
  };

  const handleBookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate PDF file type
      if (file.type !== "application/pdf") {
        alert("Please select a PDF file");
        return;
      }
      setBookFile(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCurrentCoverUrl(book.coverImageUrl); // Reset to original cover
  };

  const removeBookFile = () => {
    setBookFile(null);
  };

  const hasChanges = () => {
    return (
      formData.title !== book.title ||
      formData.bookAuthor !== book.bookAuthor ||
      formData.genre !== book.genre ||
      formData.description !== (book.description || "") ||
      coverImage !== null ||
      bookFile !== null
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Book Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="bookAuthor">Author *</Label>
              <Input
                id="bookAuthor"
                value={formData.bookAuthor}
                onChange={(e) =>
                  setFormData({ ...formData, bookAuthor: e.target.value })
                }
                required
                placeholder="Enter author name"
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
                required
                placeholder="Enter genre"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter book description"
              rows={4}
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <div className="space-y-3">
                {/* Current Cover Preview */}
                {currentCoverUrl && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Current Cover:</p>
                    <img
                      src={currentCoverUrl}
                      alt="Current cover"
                      className="mx-auto h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                  />
                  {!coverImage ? (
                    <label
                      htmlFor="coverImage"
                      className="cursor-pointer block"
                    >
                      <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700">
                        Change Cover Image
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, JPEG up to 10MB
                      </p>
                    </label>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3">
                        <Image className="h-6 w-6 text-green-500" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">
                            {coverImage.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(coverImage.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeCoverImage}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove New Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Book PDF Upload */}
            <div className="space-y-2">
              <Label htmlFor="bookFile">Book File (PDF)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="bookFile"
                  type="file"
                  accept=".pdf"
                  onChange={handleBookFileChange}
                  className="hidden"
                />
                {!bookFile ? (
                  <label htmlFor="bookFile" className="cursor-pointer block">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      Change PDF File
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF files up to 50MB
                    </p>
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-6 w-6 text-green-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {bookFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(bookFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeBookFile}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove New File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!hasChanges() || isSubmitting}
              className="min-w-24"
            >
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Book
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateBookForm;
