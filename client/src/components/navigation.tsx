import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "projects", label: "Projects" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    smoothScrollTo(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full nav-backdrop z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold section-title">
            Asma Attique
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "text-neutral-600 hover:text-purple-600 transition-all duration-200 font-medium relative",
                  activeSection === item.href && "text-purple-600 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-purple-600 after:rounded-full"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-600 hover:text-purple-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "block w-full text-left px-3 py-2 text-neutral-600 hover:text-purple-600 transition-colors duration-200 font-medium",
                    activeSection === item.href && "text-purple-600"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
