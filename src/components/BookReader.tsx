
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, ChevronLeft, ChevronRight, Menu, Settings, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BookContent from "./BookContent";
import ReaderControls from "./ReaderControls";
import TableOfContents from "./TableOfContents";
import { BookData } from "@/lib/types";

interface BookReaderProps {
  book: BookData;
}

const BookReader = ({ book }: BookReaderProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(2); // 0: Small, 1: Medium, 2: Default, 3: Large, 4: XL
  const [showControls, setShowControls] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const { toast } = useToast();

  const fontSizes = ["text-base", "text-lg", "text-xl", "text-2xl", "text-3xl"];

  useEffect(() => {
    // Save reading progress to localStorage
    localStorage.setItem("readingProgress", JSON.stringify({
      bookId: book.id,
      chapter: currentChapter
    }));
    
    // Save bookmarks
    localStorage.setItem("bookmarks", JSON.stringify({
      bookId: book.id,
      bookmarks: bookmarks
    }));
  }, [currentChapter, bookmarks, book.id]);

  useEffect(() => {
    // Load reading progress
    const savedProgress = localStorage.getItem("readingProgress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (progress.bookId === book.id) {
        setCurrentChapter(progress.chapter);
      }
    }
    
    // Load bookmarks
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      const bookmarksData = JSON.parse(savedBookmarks);
      if (bookmarksData.bookId === book.id) {
        setBookmarks(bookmarksData.bookmarks);
      }
    }
  }, [book.id]);

  const nextChapter = () => {
    if (currentChapter < book.chapters.length - 1) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentChapter(currentChapter + 1);
        setIsPageTurning(false);
      }, 300);
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentChapter(currentChapter - 1);
        setIsPageTurning(false);
      }, 300);
      window.scrollTo(0, 0);
    }
  };

  const toggleBookmark = () => {
    if (bookmarks.includes(currentChapter)) {
      setBookmarks(bookmarks.filter(b => b !== currentChapter));
      toast({
        description: "Bookmark removed.",
      });
    } else {
      setBookmarks([...bookmarks, currentChapter]);
      toast({
        description: "Bookmark added.",
      });
    }
  };

  const changeFontSize = (direction: 'increase' | 'decrease') => {
    setFontSize(prev => {
      if (direction === 'increase' && prev < fontSizes.length - 1) return prev + 1;
      if (direction === 'decrease' && prev > 0) return prev - 1;
      return prev;
    });
  };

  const goToChapter = (index: number) => {
    setCurrentChapter(index);
    setShowToc(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="reader-container">
      {showToc ? (
        <div className="fixed inset-0 bg-background z-50 overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold">Table of Contents</h2>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowToc(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <TableOfContents 
              chapters={book.chapters} 
              currentChapter={currentChapter} 
              goToChapter={goToChapter}
              bookmarks={bookmarks}
            />
          </div>
        </div>
      ) : (
        <>
          <div 
            className={`${isPageTurning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          >
            <BookContent 
              book={book} 
              currentChapter={currentChapter} 
              fontSizeClass={fontSizes[fontSize]}
            />
          </div>

          <div 
            className="fixed bottom-4 left-0 right-0 flex justify-center" 
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <ReaderControls 
              show={showControls}
              onPrev={prevChapter}
              onNext={nextChapter}
              onMenu={() => setShowToc(true)}
              onSettings={() => setShowControls(true)}
              onBookmark={toggleBookmark}
              isBookmarked={bookmarks.includes(currentChapter)}
              canGoPrev={currentChapter > 0}
              canGoNext={currentChapter < book.chapters.length - 1}
              increaseFontSize={() => changeFontSize('increase')}
              decreaseFontSize={() => changeFontSize('decrease')}
              currentFontSize={fontSize}
              maxFontSize={fontSizes.length - 1}
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentChapter + 1) / book.chapters.length) * 100}%`
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BookReader;
