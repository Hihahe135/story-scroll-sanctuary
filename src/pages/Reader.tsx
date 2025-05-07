
import { useParams, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import BookReader from "@/components/BookReader";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { sampleBook } from "@/data/sampleBook";
import { useEffect, useState } from "react";
import { BookData } from "@/lib/types";
import { useAuth } from "@/lib/AuthContext";

// Sample additional books
const additionalBooks: Record<string, BookData> = {
  "great-gatsby": {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    chapters: [
      {
        title: "Chapter 1",
        content: [
          "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
          ""Whenever you feel like criticizing anyone," he told me, "just remember that all the people in this world haven't had the advantages that you've had."",
          "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought — frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth."
        ]
      },
      {
        title: "Chapter 2",
        content: [
          "About half way between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile, so as to shrink away from a certain desolate area of land. This is a valley of ashes — a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens; where ashes take the forms of houses and chimneys and rising smoke and, finally, with a transcendent effort, of men who move dimly and already crumbling through the powdery air. Occasionally a line of gray cars crawls along an invisible track, gives out a ghastly creak, and comes to rest, and immediately the ash-gray men swarm up with leaden spades and stir up an impenetrable cloud, which screens their obscure operations from your sight."
        ]
      }
    ]
  },
  "pride-and-prejudice": {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    chapters: [
      {
        title: "Chapter 1",
        content: [
          "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
          "However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
          ""My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?""
        ]
      },
      {
        title: "Chapter 2",
        content: [
          "Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid she had no knowledge of it. It was then disclosed in the following manner. Observing his second daughter employed in trimming a hat, he suddenly addressed her with:",
          ""I hope Mr. Bingley will like it, Lizzy."",
          ""We are not in a way to know what Mr. Bingley likes," said her mother resentfully, "since we are not to visit.""
        ]
      }
    ]
  }
};

const Reader = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<BookData | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // In a real app, we would fetch the book from an API
    // For this demo, we'll use our sample data
    if (bookId === "alice-in-wonderland") {
      setBook(sampleBook);
    } else if (bookId && bookId in additionalBooks) {
      setBook(additionalBooks[bookId]);
    } else {
      navigate("/library");
    }
  }, [bookId, navigate, user]);

  if (!book) {
    return <div className="min-h-screen flex items-center justify-center">Loading book...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/library")}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </div>
      
      <BookReader book={book} />
    </div>
  );
};

export default Reader;
