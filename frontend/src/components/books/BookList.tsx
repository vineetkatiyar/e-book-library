import { useState } from "react";
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

export interface Book {
  id: number;
  title: string;
  bookAuthor: string;
  coverImageUrl: string;
  genre: string;
  publishedDate: string;
  description: string;
}

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "The Great Gatsby",
      bookAuthor: "F. Scott Fitzgerald",
      coverImageUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400",
      genre: "Fiction",
      publishedDate: "1925-04-10",
      description: "A classic novel about the American Dream"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      bookAuthor: "Harper Lee",
      coverImageUrl: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400",
      genre: "Fiction",
      publishedDate: "1960-07-11",
      description: "A novel about racial inequality and moral growth"
    },
  ]);

  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  const handleDeleteBook = (bookId: number) => {
    setBooks(books.filter((book) => book.id !== bookId));
    setDeletingBook(null);
  };

  const handleCreateBook = () => {
    navigate("/books/create");
  };

  const handleEditBook = (book: Book) => {
    navigate(`/books/edit/${book.id}`);
  };

  const handleViewBook = (book: Book) => {
    // You can create a view page or use a modal for viewing
    console.log("View book:", book);
    // navigate(`/books/view/${book.id}`);
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      Fiction: "bg-blue-100 text-blue-800",
      Science: "bg-green-100 text-green-800",
      Romance: "bg-pink-100 text-pink-800",
      Mystery: "bg-purple-100 text-purple-800",
      Biography: "bg-yellow-100 text-yellow-800",
      History: "bg-red-100 text-red-800",
    };
    return colors[genre] || "bg-gray-100 text-gray-800";
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
                  <TableHead className="min-w-[120px] book-text">Cover Image</TableHead>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="min-w-[150px]">Author</TableHead>
                  <TableHead className="min-w-[120px]">Genre</TableHead>
                  <TableHead className="min-w-[120px]">Published Date</TableHead>
                  <TableHead className="min-w-[150px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                        <img 
                          src={book.coverImageUrl} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/80x120?text=No+Image";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {book.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{book.bookAuthor}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getGenreColor(book.genre)}>
                        {book.genre}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(book.publishedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewBook(book)}
                          title="View Book"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBook(book)}
                          title="Edit Book"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeletingBook(book)}
                          title="Delete Book"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first book to the library.</p>
              <Button onClick={handleCreateBook}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Book
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Only keep Delete Modal */}
      {deletingBook && (
        <DeleteBookModal
          book={deletingBook}
          open={!!deletingBook}
          onOpenChange={(open) => !open && setDeletingBook(null)}
          onConfirm={() => handleDeleteBook(deletingBook.id)}
        />
      )}
    </div>
  );
};

export default BookList;