
import React from "react";
import { BookData } from "@/lib/types";

interface BookContentProps {
  book: BookData;
  currentChapter: number;
  fontSizeClass: string;
}

const BookContent = ({ book, currentChapter, fontSizeClass }: BookContentProps) => {
  const chapter = book.chapters[currentChapter];
  
  if (!chapter) {
    return <div className="book-page">Chapter not found</div>;
  }

  return (
    <div className={`book-page ${fontSizeClass}`}>
      {currentChapter === 0 && (
        <div className="mb-16 pt-8">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {book.author}</p>
        </div>
      )}
      
      <h2 className="chapter-heading">
        {chapter.title}
      </h2>
      
      <div>
        {chapter.content.map((paragraph, idx) => (
          <p key={idx} className="book-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BookContent;
