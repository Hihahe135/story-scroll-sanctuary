
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/lib/AuthContext";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate("/library");
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </div>
      
      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-4">
            <Book className="h-16 w-16" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">BookWorm</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your personal eBook library - read anywhere, anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate("/login")}
              className="font-medium"
            >
              Get Started
            </Button>
          </div>
          
          <p className="mt-8 text-muted-foreground text-sm">
            Manage your personal library, upload books, and enjoy a comfortable reading experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
