
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Monitoring", path: "/monitoring" },
    { name: "Recycling", path: "/recycling" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-6 z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo in corner - updated positioning */}
        <Link to="/" className="flex items-center">
          <span className="text-primary font-bold text-xl">SMART E-WASTE</span>
        </Link>

        {/* Desktop Menu - moved to center */}
        <div className="hidden md:flex space-x-6 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Empty div to balance the flex layout */}
        <div className="hidden md:block">
          {/* This empty div helps maintain the layout balance */}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-md z-50 animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-primary font-medium transition-colors py-2 px-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
