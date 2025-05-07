
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import UserAuth from "@/components/UserAuth";
import { useAuth } from "@/lib/AuthContext";
import { Book } from "lucide-react";

const Login = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/library");
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
      
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <Book className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-display font-bold">BookWorm</h1>
          <p className="text-muted-foreground mt-2">Your personal eBook library</p>
        </div>
        
        <div className="w-full max-w-md">
          <UserAuth />
        </div>
      </div>
    </div>
  );
};

export default Login;
