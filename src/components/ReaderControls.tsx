
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Menu, 
  Settings, 
  ZoomIn, 
  ZoomOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReaderControlsProps {
  show: boolean;
  onPrev: () => void;
  onNext: () => void;
  onMenu: () => void;
  onSettings: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  currentFontSize: number;
  maxFontSize: number;
}

const ReaderControls = ({
  show,
  onPrev,
  onNext,
  onMenu,
  onSettings,
  onBookmark,
  isBookmarked,
  canGoPrev,
  canGoNext,
  increaseFontSize,
  decreaseFontSize,
  currentFontSize,
  maxFontSize
}: ReaderControlsProps) => {
  return (
    <div className={cn(
      "bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-full shadow-lg p-1 transition-all duration-300",
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}>
      <div className="flex items-center gap-1">
        <Button 
          size="icon" 
          variant="ghost" 
          className="controls-button" 
          onClick={onMenu}
        >
          <Menu size={20} />
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="controls-button" 
          onClick={decreaseFontSize} 
          disabled={currentFontSize === 0}
        >
          <ZoomOut size={20} />
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="controls-button" 
          onClick={increaseFontSize} 
          disabled={currentFontSize === maxFontSize}
        >
          <ZoomIn size={20} />
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="controls-button" 
          onClick={onBookmark}
        >
          <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="controls-button" 
          onClick={onPrev}
          disabled={!canGoPrev}
        >
          <ChevronLeft size={20} />
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost" 
          className="controls-button" 
          onClick={onNext}
          disabled={!canGoNext}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ReaderControls;
