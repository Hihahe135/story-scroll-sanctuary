
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
}
