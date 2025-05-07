
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import BookLibrary from "@/components/BookLibrary";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Book, Upload, LogOut } from "lucide-react";

const Library = () => {
  const { user, logout } = useAuth();
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
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/upload")}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            
            <ModeToggle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <BookLibrary />
      </main>
    </div>
  );
};

export default Library;
