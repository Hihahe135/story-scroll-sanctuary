
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import BookUpload from "@/components/BookUpload";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Book, ChevronLeft } from "lucide-react";

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Book className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-display font-semibold">BookWorm</h1>
          </div>
          
          <ModeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/library")}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Button>
        
        <div className="max-w-lg mx-auto">
          <BookUpload />
        </div>
      </main>
    </div>
  );
};

export default Upload;
