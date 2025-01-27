import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-56 h-56 mb-8">
        <div className="absolute inset-0 bg-[#f9ed4a] shadow-lg transform -rotate-12 animate-note-bounce">
          <div className="absolute top-2 right-2">
            <svg className="w-8 h-auto text-[#f9ed4a]" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round"></path>
              <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round"></path>
              <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round"></path>
            </svg>
          </div>
          <div className="p-4 text-black text-center">
            <p className="font-bold text-xl mb-3 border-b border-black/20">Ideas</p>
            <p className="text-black/70 text-lg mb-3 border-b border-black/20">Sketches</p>
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