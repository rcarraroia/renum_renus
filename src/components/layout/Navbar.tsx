import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import RenumLogo from '@/components/RenumLogo';
import { useRenusChat } from '@/context/RenusChatContext';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Methodology', href: '#methodology' },
  { name: 'About', href: '#about' },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleScroll}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        className
      )}
    >
      {children}
    </a>
  );
};


const Navbar: React.FC = () => {
  const { openChat } = useRenusChat();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <RenumLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button 
            onClick={openChat} 
            className="bg-[#FF6B35] hover:bg-[#e55f30] text-white hidden md:inline-flex"
          >
            Chat with Renus
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-6">
                {navItems.map((item) => (
                  <NavLink key={item.name} href={item.href} onClick={() => document.getElementById('sheet-close')?.click()}>
                    {item.name}
                  </NavLink>
                ))}
                <Button 
                  onClick={() => { openChat(); document.getElementById('sheet-close')?.click(); }}
                  className="bg-[#FF6B35] hover:bg-[#e55f30] text-white w-full mt-4"
                >
                  Chat with Renus
                </Button>
              </div>
              <div id="sheet-close" className="hidden"></div> {/* Hidden element to simulate closing sheet */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;