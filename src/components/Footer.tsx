
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Github, Mail, MessageCircle } from "lucide-react";
import logo from '../assets/toplevel blanco.png';

const Footer = () => {
  return (
    <footer className="relative bg-card/80 backdrop-blur-md border-t border-white/10 py-10 mt-16">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="mb-4">
              <img src={logo} alt="Top Level Logo" className="h-16" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
              Centro de recargas  Free Fire. Recarga diamantes de manera segura y rápida.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/toplevelgamesve" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/toplevelgames_?igsh=MTRxemJqNG5wMW1zdA==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
           
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-muted-foreground hover:text-white transition-colors">
                  Recargar
                </Link>
              </li>
             
              <li>
                <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-accent" />
                <a href="mailto:soporte.toplevelstore@gmail.com" className="text-muted-foreground hover:text-white transition-colors">
                soporte.toplevelstore@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-accent" />
                <a href="https://wa.me/573224234790" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                  WhatsApp de Soporte
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-sm text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Top Level. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
