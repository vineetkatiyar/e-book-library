import BookList from "@/components/books/BookList";

const BooksPage = () => {

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Book List</h1>
          <p className="text-muted-foreground mt-2">
            Manage all books in your library
          </p>
        </div>
      </div>
      <BookList />
    </div>
  );
};

export default BooksPage;