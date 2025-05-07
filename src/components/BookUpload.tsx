
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export default function BookUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check if file is PDF or EPUB
      if (selectedFile.type === "application/pdf" || 
          selectedFile.name.endsWith('.epub') ||
          selectedFile.type === "text/plain") {
        setFile(selectedFile);
      } else {
        toast({
          variant: "destructive",
          description: "Please select a PDF, EPUB, or TXT file."
        });
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        variant: "destructive",
        description: "Please select a file to upload."
      });
      return;
    }

    // In a real app, this would upload the file to a server
    // For this demo, we'll simulate success
    setIsUploading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        description: "Book uploaded successfully!"
      });
      
      // Reset form
      setFile(null);
      setTitle("");
      setAuthor("");
      setDescription("");
      
      // In a real app, we would refresh the book list after upload
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error uploading file."
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 p-6 bg-paper rounded-lg shadow-md">
      <h2 className="text-2xl font-display font-bold mb-4">Upload New Book</h2>
      
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the book"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file">File (PDF, EPUB, or TXT)</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.epub,.txt"
          required
          className="cursor-pointer"
        />
        {file && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>
      
      <Button 
        type="submit" 
        disabled={isUploading || !file}
        className="w-full"
      >
        {isUploading ? (
          <span className="flex items-center justify-center">
            Uploading...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Upload className="mr-2 h-5 w-5" /> Upload Book
          </span>
        )}
      </Button>
    </form>
  );
}
