import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 bg-note-yellow shadow-lg transform -rotate-12 animate-note-bounce">
          <div className="p-6 text-primary/70">
            <p className="font-bold text-2xl mb-2">Ideas</p>
            <p className="text-gray-400 text-xl mb-2">Sketches</p>
            <p className="font-bold text-2xl mb-2">Memories</p>
            <p className="text-gray-400 text-xl">Thoughts</p>
          </div>
        </div>
      </div>
      
      <div className="text-center max-w-2xl">
        <p className="text-gray-600 text-lg mb-8">
          Write, draw, and organize your thoughts in one simple app.
        </p>
        
        <Button 
          size="lg"
          className="bg-primary text-white hover:bg-primary/90 transform transition-transform hover:scale-105"
        >
          <PenLine className="mr-2 h-4 w-4" />
          Create new note
        </Button>
      </div>
    </div>
  );
};

export default Hero;