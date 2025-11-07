import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import DeleteBookModal from "./DeleteBook";
import { useBookList } from "@/hooks/useBookList";
import { useState } from "react";
import type { Book } from "@/axios/bookApi";
import ViewBookModal from "./book";
import { useDeleteBook } from "@/hooks/useDeleteBook";

const BookList = () => {
  const navigate = useNavigate();
  const [viewingBook, setViewingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const { data: books = [], isLoading, isError } = useBookList();

  const { mutate: doDeleteBook, isPending: isDeleting } = useDeleteBook();

  if (isLoading)
    return (
      <div className="p-6 text-center text-gray-500">Loading books...</div>
    );
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">Failed to fetch books.</div>
    );

  console.log("books", books);
  const handleCreateBook = () => navigate("/books/create");
  const handleEditBook = (book: Book) => navigate(`/books/edit/${book._id}`);
  const handleViewBook = (book: Book) => setViewingBook(book);
  const handleDeleteBook = (bookId: string) => {
    doDeleteBook(bookId, {
      onSuccess: () => {
        setDeletingBook(null);
      },
    });
  };

  return (
    <div className="w-full max-w-full book-text">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between w-full">
          <div>
            <CardTitle>All Books</CardTitle>
            <p className="text-sm book-text mt-1">
              Total {books.length} books in your library
            </p>
          </div>
          <Button onClick={handleCreateBook}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Button>
        </CardHeader>
        <CardContent className="w-full p-0">
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px] book-text">
                    Cover Image
                  </TableHead>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="min-w-[150px]">Author</TableHead>
                  <TableHead className="min-w-[120px]">Genre</TableHead>
                  <TableHead className="min-w-[120px]">
                    Published Date
                  </TableHead>
                  <TableHead className="min-w-[150px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/80x120?text=No+Image";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {book.title}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {book.bookAuthor}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{book.genre}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          title="View Book"
                          onClick={() => handleViewBook(book)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Edit Book"
                          onClick={() => handleEditBook(book)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          title="Delete Book"
                          onClick={() => setDeletingBook(book)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {books.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No books found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first book to the library.
              </p>
              <Button onClick={handleCreateBook}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Book
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ViewBookModal
        book={viewingBook}
        open={!!viewingBook}
        onOpenChange={(open) => !open && setViewingBook(null)}
      />

      <DeleteBookModal
        book={deletingBook}
        open={!!deletingBook}
        onOpenChange={(open) => !open && setDeletingBook(null)}
        onConfirm={() => deletingBook && handleDeleteBook(deletingBook._id)}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default BookList;
