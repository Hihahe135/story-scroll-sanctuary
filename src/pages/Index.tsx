
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import BookReader from "@/components/BookReader";
import { sampleBook } from "@/data/sampleBook";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </div>
      
      <BookReader book={sampleBook} />
    </div>
  );
};

export default Index;
