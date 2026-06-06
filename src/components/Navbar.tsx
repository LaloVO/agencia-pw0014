import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mapa', label: 'Explorar Mapa' },
    { href: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center px-4 py-4 md:px-6">
      <nav
        className={`w-full max-w-[92%] md:max-w-[88%] flex justify-between items-center transition-all duration-500 px-6 py-3 md:px-10 ${
          isScrolled || !isHomePage
            ? 'rounded-full bg-white/35 backdrop-blur-xl border border-white/25 shadow-elegant mt-2'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Brand Custom Logo Signature */}
        <Link to="/" className="flex items-center gap-3 z-50 select-none group">
          <div className="flex flex-col items-center justify-center text-center">
            {/* SVG Logo Techo Minimalista */}
            <svg 
              className="w-12 h-6 text-foreground/80 transition-transform duration-500 group-hover:scale-105" 
              viewBox="0 0 120 40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M 40 24 L 40 14 L 45 14 L 45 20" />
              <path d="M 25 32 L 60 11 L 95 32" />
              <path d="M 70 12 L 90 22" />
            </svg>
            <span className="font-serif tracking-[0.25em] text-[10px] md:text-[11px] font-bold text-foreground leading-none mt-1">
              Asesor Demo
            </span>
            <span className="font-script text-base md:text-lg text-primary leading-none -mt-0.5 tracking-normal">
              Asesor inmobiliario
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-sans font-semibold items-center text-foreground/90">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="hover:text-primary transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button: Teléfono Premium */}
        <div className="hidden md:flex items-center">
          <a
            href="tel:8448699388"
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm text-xs font-sans tracking-wider"
          >
            <Phone className="w-3 h-3 text-primary group-hover:text-white" />
            <span className="font-bold">844 869 9388</span>
          </a>
        </div>

        {/* Mobile Menu Open Button */}
        {!isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-foreground p-1 hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay (Rendered outside the navbar capsule wrapper with dedicated close button) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-background/98 backdrop-blur-xl z-[999] flex flex-col items-center justify-center gap-8 animate-fade-in px-6">
          {/* Dedicated Close Button inside the overlay */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-4 text-foreground hover:text-neutral-500 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Logo brand in the overlay */}
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <svg 
              className="w-12 h-6 text-foreground/80 mb-2" 
              viewBox="0 0 120 40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M 40 24 L 40 14 L 45 14 L 45 20" />
              <path d="M 25 32 L 60 11 L 95 32" />
              <path d="M 70 12 L 90 22" />
            </svg>
            <span className="font-serif tracking-[0.25em] text-[10px] font-bold text-foreground leading-none">
              Asesor Demo
            </span>
            <span className="font-script text-base text-neutral-500 leading-none mt-1">
              Asesor inmobiliario
            </span>
          </div>

          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl text-foreground hover:text-neutral-500 transition-colors uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="tel:8448699388"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-black bg-black text-white hover:bg-neutral-800 transition-all duration-300 text-sm font-sans font-bold tracking-wider mt-4"
          >
            <Phone className="w-4 h-4" />
            <span>844 869 9388</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
