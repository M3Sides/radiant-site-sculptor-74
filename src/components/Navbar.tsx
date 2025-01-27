import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-primary">MyNote</span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Notes</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Folders</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Archive</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-primary">
              Login
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Try for free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;