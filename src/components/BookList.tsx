import { Book } from "../types";

interface BookListProps {
    books: Book[];
    selectedBookId: number;
    onBookSelect: (bookId: number) => void;
  }
  
  export const BookList = ({ books, selectedBookId, onBookSelect }: BookListProps) => {
    return (
      <div className="flex gap-1 flex-wrap">
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => onBookSelect(book.id)}
            className={`px-4 py-1 text-sm border ${
              selectedBookId === book.id
                ? 'bg-teal-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {book.title}
          </button>
        ))}
      </div>
    );
  };