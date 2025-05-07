
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // For demo purposes, we'll just parse the token
        // In a real app, you'd validate with the server
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: userData.userId,
          email: userData.email,
          name: userData.name
        });
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      // For demo, we'll simulate a successful login
      const token = generateDemoToken({ userId: "user123", email });
      localStorage.setItem("authToken", token);
      
      setUser({
        id: "user123",
        email: email
      });
      
      toast({
        description: "Login successful!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Invalid email or password"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      // For demo, we'll simulate a successful registration
      const token = generateDemoToken({ userId: "user123", email, name });
      localStorage.setItem("authToken", token);
      
      setUser({
        id: "user123",
        email,
        name
      });
      
      toast({
        description: "Registration successful!"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Registration failed"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    toast({
      description: "You've been logged out"
    });
  };

  // Helper function to generate a demo JWT token
  const generateDemoToken = (payload: object) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const content = btoa(JSON.stringify({ ...payload, exp: Date.now() + 86400000 }));
    const signature = btoa("demo-signature");
    return `${header}.${content}.${signature}`;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
