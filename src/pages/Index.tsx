import logo from '../assets/Frre logo.png';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRightIcon, ShieldCheckIcon, ZapIcon, Gift } from "lucide-react";
import Footer from '../components/Footer';

const FreeFireLogo = () => (
  <img
    src={logo}
    alt="Free Fire Logo"
    className="w-40 h-auto animate-float object-contain"
  />
);

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/di0btw2pi/image/upload/v1743454096/fondo_pagina_imep77.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "20px",
      }}
    >
      {!isMobile && (
        <>
          <motion.img
            src='https://res.cloudinary.com/di0btw2pi/image/upload/v1743454060/Levelito_DER_fa3kvw.png'
            alt="Levelito"
            className="absolute left-0 top-0 z-10"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
            style={{ width: '30%', height: 'auto' }}
          />

          <motion.img
            src='https://res.cloudinary.com/di0btw2pi/image/upload/v1743454069/Luqueta_waifu2x_art_noise3_scale_xvezdm.png'
            alt="Levelito"
            className="absolute right-0 top-0 z-10"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 210, y: 30, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
            style={{ width: '50%', height: 'auto' }}
          />
        </>
      )}

      <section className="relative pt-32 overflow-hidden page-transition">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Centro de recargas
              </h1>
              <div className="my-8 flex justify-center">
                <FreeFireLogo />
              </div>
              <p className="text text-lg mb-8 max-w-2xl">
                Recarga diamantes para tu juego favorito de manera segura, rápida y con métodos de pago locales.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6">
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary bg-gradient-to-r from-[#020024] to-[#0c2a85] w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>Recargar Ahora</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ShieldCheckIcon className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm text">100% Seguro</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-400/20 flex items-center justify-center">
                    <ZapIcon className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm text">Entrega Instantánea</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-sm text">Bonos Exclusivos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
