
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookData } from "@/lib/types";
import { sampleBook } from "@/data/sampleBook";
import { Book, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample library data with additional books
const sampleLibrary: BookData[] = [
  sampleBook,
  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    chapters: [
      {
        title: "Chapter 1",
        content: ["In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since."]
      }
    ],
    format: "text",
    description: "A classic novel about wealth, love, and the American Dream",
    dateAdded: "2025-05-01",
    readingProgress: 30
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    chapters: [
      {
        title: "Chapter 1",
        content: ["It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."]
      }
    ],
    format: "epub",
    description: "A romantic novel following Elizabeth Bennet's journey",
    dateAdded: "2025-05-03",
    readingProgress: 45
  }
];

export default function BookLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookData[]>(sampleLibrary);
  const navigate = useNavigate();

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenBook = (bookId: string) => {
    navigate(`/read/${bookId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-4 sm:mb-0">My Library</h1>
        <div className="w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <Book className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try a different search term" : "Start by adding books to your library"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div 
              key={book.id}
              className="bg-paper border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleOpenBook(book.id)}
            >
              <div className="aspect-[3/4] bg-muted relative">
                {book.coverImage ? (
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Book className="h-1/3 w-1/3 text-muted-foreground" />
                  </div>
                )}
                {book.readingProgress && book.readingProgress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${book.readingProgress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-lg line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                {book.description && (
                  <p className="text-sm line-clamp-2 mb-2">{book.description}</p>
                )}
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{book.format || "text"}</span>
                  {book.readingProgress ? (
                    <span className="flex items-center">
                      <Bookmark className="h-3 w-3 mr-1 inline" /> 
                      {book.readingProgress}% complete
                    </span>
                  ) : (
                    <span>Not started</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
