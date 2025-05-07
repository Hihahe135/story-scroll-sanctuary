
import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Chapter } from "@/lib/types";

interface TableOfContentsProps {
  chapters: Chapter[];
  currentChapter: number;
  goToChapter: (index: number) => void;
  bookmarks: number[];
}

const TableOfContents = ({
  chapters,
  currentChapter,
  goToChapter,
  bookmarks
}: TableOfContentsProps) => {
  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Chapters</h3>
        <div className="space-y-1">
          {chapters.map((chapter, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between"
            >
              <Button
                variant={currentChapter === index ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2 px-3"
                onClick={() => goToChapter(index)}
              >
                <span className="mr-2 text-muted-foreground">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                {chapter.title}
              </Button>
              
              {bookmarks.includes(index) && (
                <Bookmark className="h-4 w-4 text-primary mr-2" fill="currentColor" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {bookmarks.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Bookmarks</h3>
          <div className="space-y-1">
            {bookmarks.map(index => (
              <Button
                key={index}
                variant={currentChapter === index ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2 px-3"
                onClick={() => goToChapter(index)}
              >
                <Bookmark className="h-4 w-4 mr-2" fill="currentColor" />
                {chapters[index].title}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOfContents;
