import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-56 h-56 mb-8">
        <div className="absolute inset-0 bg-note-yellow shadow-lg transform -rotate-12 animate-note-bounce">
          <div className="p-4 text-primary/70">
            <p className="font-bold text-xl mb-3 border-b border-primary/20">Ideas</p>
            <p className="text-gray-400 text-lg mb-3 border-b border-primary/20">Sketches</p>
            <p className="font-bold text-xl mb-3">Memories</p>
          </div>
        </div>
      </div>
      
      <div className="text-center max-w-2xl">
        <p className="text-gray-600 text-sm mb-6">
          Write, draw, and organize your thoughts in one simple app.
        </p>
        
        <Button 
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transform transition-transform hover:scale-105"
        >
          <PenLine className="mr-2 h-3.5 w-3.5" />
          Create new note
        </Button>
      </div>
    </div>
  );
};

export default Hero;