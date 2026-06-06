import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionType, setActionType] = useState<'comprar' | 'rentar'>('comprar');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/mapa?query=${encodeURIComponent(searchQuery)}&action=${actionType}`);
  };

  return (
    <header className="relative w-full h-[100vh] overflow-hidden flex items-center px-6 md:px-12 bg-[#FAF7F2]">
      {/* Background Image with elegant slow zoom and parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[120%] bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
            transform: `translateY(${scrollY * 0.2}px) scale(1.02)`,
          }}
        />
        {/* Sleek luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B18]/70 via-[#1E1B18]/45 to-transparent z-1" />
      </div>

      {/* Editorial Content */}
      <div className="relative z-10 w-full luxury-container flex flex-col justify-center h-full max-w-4xl pt-20">
        <div className="space-y-4">
          <span 
            className={`inline-block font-italiana text-xs uppercase tracking-[0.4em] text-white/60 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Asesor Demo • ASESOR INMOBILIARIO
          </span>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight drop-shadow-md">
            <span
              className={`block transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              Arquitectura
            </span>
            <span
              className={`block italic font-light ml-0 md:ml-16 text-white/90 transition-all duration-1000 delay-450 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              que trasciende.
            </span>
          </h1>

          <p 
            className={`max-w-xl font-sans text-sm md:text-base font-light text-white/85 leading-relaxed tracking-wide transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Propiedades exclusivas seleccionadas bajo una curaduría de lujo, pensadas para quienes aprecian la armonía de los espacios y la inversión inteligente.
          </p>
        </div>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearch}
          className={`mt-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-2 rounded-3xl md:rounded-full flex flex-col md:flex-row gap-3 md:gap-2 max-w-2xl w-full shadow-elegant transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Action Toggle (Comprar / Rentar) */}
          <div className="flex bg-white/15 rounded-full p-1 border border-white/10 justify-center shrink-0">
            <button
              type="button"
              onClick={() => setActionType('comprar')}
              className={`flex-1 md:flex-initial px-6 py-2.5 md:py-2 rounded-full text-xs font-sans uppercase tracking-widest font-bold transition-all duration-300 ${
                actionType === 'comprar'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => setActionType('rentar')}
              className={`flex-1 md:flex-initial px-6 py-2.5 md:py-2 rounded-full text-xs font-sans uppercase tracking-widest font-bold transition-all duration-300 ${
                actionType === 'rentar'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Rentar
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center bg-white/95 rounded-full px-5 py-3 md:py-2 border border-white/10">
            <Search className="w-4 h-4 text-neutral-600 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ciudad, Zona, Colonia..."
              className="bg-transparent w-full outline-none text-[#1E1B18] placeholder-neutral-500 font-sans text-xs md:text-sm tracking-wide"
            />
          </div>

          <button 
            type="submit"
            className="w-full md:w-auto px-8 py-3.5 md:py-2 rounded-full bg-black text-white font-sans uppercase text-[10px] tracking-widest hover:bg-neutral-900 active:scale-95 transition-all duration-300 shadow-md font-bold shrink-0"
          >
            Explorar
          </button>
        </form>
      </div>
    </header>
  );
};

export default HeroSection;
