import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import axios from "axios";

type AmountPackage = {
  name: string;
  code: string;
  pricebs: number;
  price: number;
};

type AmountStepProps = {
  selectedPackage: AmountPackage | null;
  onSelect: (amountPackage: AmountPackage) => void;
};

const AmountStep = ({ selectedPackage, onSelect }: AmountStepProps) => {
  const [amountOptions, setAmountOptions] = useState<AmountPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        if (Array.isArray(response.data)) {
          const sortedProducts = response.data.sort((a, b) => a.price - b.price);
          setAmountOptions(sortedProducts);
        } else {
          console.error("La respuesta de la API no es un arreglo válido:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getImageForDiamonds = (diamonds: number) => {
    if (diamonds <= 100) {
      return 'https://res.cloudinary.com/di0btw2pi/image/upload/v1743454059/DIAMANTE_hmwcv6.webp';
    } else if (diamonds >= 150 && diamonds <= 950) {
      return 'https://res.cloudinary.com/di0btw2pi/image/upload/v1743454059/DIAMANTES_FREE_wybnc6.webp';
    } else if (diamonds > 1000) {
      return 'https://res.cloudinary.com/di0btw2pi/image/upload/v1743454062/DIAMANTES_FREE_2_gcqyzu.webp';
    }
    return '';
  };

  // Función para extraer el valor numérico de los diamantes
  const extractDiamonds = (name: string): number => {
    const match = name.match(/([\d,.]+)\s*Diamantes/);
    if (match) {
      const cleanNumber = match[1].replace(/\./g, '').replace(/,/g, '.');
      return parseFloat(cleanNumber);
    }
    return 0; // Valor por defecto si no se encuentra el patrón
  };

  if (isLoading) {
    return <p className="text-white text-center">Cargando opciones...</p>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4">Selecciona el Monto de Recarga</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {amountOptions.map((option, index) => {
          const diamonds = extractDiamonds(option.name);

          return (
            <motion.div
              key={option.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option)}
              className={cn(
                "glass-card p-5 relative cursor-pointer overflow-hidden",
                selectedPackage?.name === option.name
                  ? "ring-2 ring-accent bg-accent/20"
                  : "hover:bg-white/10"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-10" />
              <div className="relative z-1 flex items-center">
                <div className="flex items-center">
                  <img
                    src={getImageForDiamonds(diamonds)}
                    alt="Diamante"
                    className="w-32 h-24"
                  />
                  <div className="ml-4"> {/* Aquí se agrega el margen izquierdo */}
                    <div className="font-bold text-white">
                      {option?.name.replace(/Free Fire\s*-?\s*([\d,.]+)\s*Diamantes\s*\+\s*([\d,.]+)\s*Bono/, "$1 + $2")}
                    </div>

                    <div
                      className={cn(
                        "text-2xl font-bold transition-colors",
                        selectedPackage?.name === option.name ? "text-accent" : "text-white"
                      )}
                    >
                      {option.pricebs.toLocaleString("es-VE", { style: "currency", currency: "VES" })}
                    </div>
                  </div>
                </div>

                {selectedPackage?.name === option.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-accent"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AmountStep;
