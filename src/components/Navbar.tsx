  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import logo from '../assets/TOPLEVEL TITULO.png';

  const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 10;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [scrolled]);

    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-2  flex justify-center">
          <div className="flex items-center justify-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-16 md:h-20 lg:h-24" />
            </Link>
          </div>
        </div>
      </header>
    );
  };

  export default Navbar;
