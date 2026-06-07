import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1E1B18] text-[#FAF7F2] pt-24 pb-12 px-6 md:px-12 border-t border-[#EADFCE]/10">
      <div className="luxury-container max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Logo Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="flex items-start gap-3 select-none group inline-block">
              <div className="flex flex-col items-start justify-center">
                {/* SVG Logo Techo Minimalista */}
                <svg 
                  className="w-12 h-6 text-[#FAF7F2]/90 transition-transform duration-500 group-hover:scale-105" 
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
                <span className="font-serif tracking-[0.25em] text-[10px] md:text-[11px] font-bold text-[#FAF7F2] leading-none mt-1">
                  Asesor Demo
                </span>
                <span className="font-script text-base md:text-lg text-neutral-400 leading-none -mt-0.5 tracking-normal">
                  Asesor inmobiliario
                </span>
              </div>
            </Link>
            
            <p className="font-sans text-xs md:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
              Curaduría inmobiliaria boutique de alta gama. Conectando residencias que inspiran con personas que valoran la armonía de los espacios y la arquitectura de autor.
            </p>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-sans font-semibold text-xs tracking-widest uppercase text-white font-bold">
              Contacto
            </h4>
            <div className="space-y-3 font-sans text-xs md:text-sm font-light text-neutral-300">
              <a href="tel:5210000000000" className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <Phone className="w-4 h-4 text-neutral-400" />
                <span>521 000 000 0000</span>
              </a>
              <a href="mailto:Asesor Demo@cbfconnect.com" className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>contacto@Asesor Democontreras.com</span>
              </a>
            </div>
          </div>

          {/* Socials Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-sans font-semibold text-xs tracking-widest uppercase text-white font-bold">
              Siguenos
            </h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 text-[10px] text-neutral-500 uppercase tracking-widest flex flex-col sm:flex-row justify-between gap-4">
          <span>© 2026 Asesor Demo • TODOS LOS DERECHOS RESERVADOS</span>
          <span>Aviso de Privacidad & Términos</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
