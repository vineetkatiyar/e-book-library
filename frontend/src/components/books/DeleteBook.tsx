import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Book } from "@/axios/bookApi";

interface DeleteBookModalProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteBookModal = ({
  book,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteBookModalProps) => {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm book-text">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-600">
            Confirm Delete
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{book.title}</strong>?  
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
