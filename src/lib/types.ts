
export interface Chapter {
  title: string;
  content: string[];
}

export interface BookData {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  chapters: Chapter[];
  format?: "text" | "pdf" | "epub";
  fileUrl?: string;
  description?: string;
  dateAdded?: string;
  lastRead?: string;
  readingProgress?: number; // percentage read
}

export interface Library {
  books: BookData[];
}

export interface UserBookProgress {
  bookId: string;
  chapter: number;
  position?: number; // scroll position within the chapter
  bookmarks: number[];
  lastRead: string;
}
