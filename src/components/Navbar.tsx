import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-lg font-bold text-primary-foreground">MyNote</span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">Notes</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">Folders</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-foreground transition-colors">Archive</a>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-sm">
              Login
            </Button>
            <Button className="text-sm">
              Try for free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;