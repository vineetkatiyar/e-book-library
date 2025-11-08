import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookFormData } from "@/lib/validator/bookSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, FileText, Image } from "lucide-react";

interface CreateBookFormProps {
  onSubmit: (formData: FormData) => void | Promise<void>;
  onCancel: () => void;
}

const CreateBookForm = ({ onSubmit, onCancel }: CreateBookFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      bookAuthor: "",
      genre: "",
      description: "",
    },
  });

  const coverImage = watch("coverImageUrl");
  const bookFile = watch("file");

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("Image must be < 10MB");
        return;
      }
      setValue("coverImageUrl", file);
    }
  };

  const handleBookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please select a PDF file");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert("PDF must be < 50MB");
        return;
      }
      setValue("file", file);
    }
  };

  const removeCoverImage = () => setValue("coverImageUrl", undefined as any);
  const removeBookFile = () => setValue("file", undefined as any);

  const onValidSubmit = async (data: BookFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("bookAuthor", data.bookAuthor);
    formData.append("genre", data.genre);
    formData.append("description", data.description || "");
    formData.append("coverImageUrl", data.coverImageUrl);
    formData.append("file", data.file);

    await onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookAuthor">Author *</Label>
              <Input
                id="bookAuthor"
                {...register("bookAuthor")}
                placeholder="Enter author name"
              />
              {errors.bookAuthor && (
                <p className="text-sm text-red-500">
                  {errors.bookAuthor.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Input
                id="genre"
                {...register("genre")}
                placeholder="Enter genre"
              />
              {errors.genre && (
                <p className="text-sm text-red-500">{errors.genre.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={4}
              placeholder="Enter book description"
            />
          </div>

          {/* Files */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Image */}
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
                {!coverImage ? (
                  <label htmlFor="coverImage" className="cursor-pointer block">
                    <Image className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      Upload Cover Image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <Image className="h-8 w-8 text-green-500" />
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
                      Remove
                    </Button>
                  </div>
                )}
              </div>
              {errors.coverImageUrl && (
                <p className="text-sm text-red-500">
                  {errors.coverImageUrl.message}
                </p>
              )}
            </div>

            {/* PDF Upload */}
            <div className="space-y-2">
              <Label htmlFor="bookFile">Book File (PDF) *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="bookFile"
                  accept=".pdf"
                  onChange={handleBookFileChange}
                  className="hidden"
                />
                {!bookFile ? (
                  <label htmlFor="bookFile" className="cursor-pointer block">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      Upload PDF File
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF files up to 50MB
                    </p>
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="h-8 w-8 text-green-500" />
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
                      Remove
                    </Button>
                  </div>
                )}
              </div>
              {errors.file && (
                <p className="text-sm text-red-500">{errors.file.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-24">
              {isSubmitting ? (
                "Creating..."
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" /> Create Book
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBookForm;
