import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Book } from "@/axios/bookApi";
import { Download, User, Calendar, BookOpen } from "lucide-react";

interface ViewBookModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewBookModal = ({ book, open, onOpenChange }: ViewBookModalProps) => {
  if (!book) return null;

  const handleOpenDrive = () => {
    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(book.file)}&embedded=true`;
    window.open(googleViewerUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden">
        {/* Header Section */}
        <DialogHeader className="bg-gray-100 dark:bg-gray-900 p-6 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {book.title}
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 book-text">
          {/* Left Side – Cover */}
          <div className="flex justify-center items-start">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="w-48 h-64 object-cover rounded-xl shadow-md border"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/200x300?text=No+Image";
              }}
            />
          </div>

          {/* Right Side – Book Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Book Details
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />{" "}
                  <span className="font-medium">{book.bookAuthor}</span>
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />{" "}
                  <Badge variant="secondary" className="text-sm">
                    {book.genre}
                  </Badge>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />{" "}
                  {new Date(book.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {book.description}
                </p>
              </div>
            )}

            {/* Download Button */}
            <div className="pt-4">
              <Button
                onClick={handleOpenDrive}
                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-gray-700 dark:text-gray-300"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBookModal;
