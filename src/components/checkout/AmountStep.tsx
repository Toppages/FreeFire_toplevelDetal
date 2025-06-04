import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import axios from "axios";

type AmountPackage = {
  name: string;
  price: number;
  descuento: number | null;
};

type AmountStepProps = {
  selectedPackage: AmountPackage | null;
  onSelect: (amountPackage: AmountPackage) => void;
};

const AmountStep = ({ selectedPackage, onSelect }: AmountStepProps) => {
  const [amountOptions, setAmountOptions] = useState<AmountPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchProductsAndRate = async () => {
      try {
        const productsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/1/subproduct-prices/6`
        );

        const rateRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/exchange-rate/current/ves`
        );

        const currentRate = rateRes.data?.currentRate || 1;
        setExchangeRate(currentRate);

        if (Array.isArray(productsRes.data.subproductPrices)) {
          const sorted = productsRes.data.subproductPrices.sort((a, b) => a.price - b.price);
          setAmountOptions(sorted);
        } else {
          console.error("Respuesta inválida de productos:", productsRes.data);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsAndRate();

    const interval = setInterval(fetchProductsAndRate, 10000);

    return () => clearInterval(interval);
  }, []);


  const getImageForDiamonds = (diamonds: number) => {
    if (diamonds <= 100) return 'https://res.cloudinary.com/di0btw2pi/image/upload/v1743454059/DIAMANTE_hmwcv6.webp';
    if (diamonds >= 150 && diamonds <= 950) return 'https://res.cloudinary.com/di0btw2pi/image/upload/v1743454059/DIAMANTES_FREE_wybnc6.webp';
    if (diamonds > 1000) return 'https://res.cloudinary.com/di0btw2pi/image/upload/v1743454062/DIAMANTES_FREE_2_gcqyzu.webp';
    return '';
  };

  const extractDiamonds = (name: string): number => {
    const match = name.match(/([\d,.]+)\s*Diamantes/);
    if (match) {
      const cleanNumber = match[1].replace(/\./g, '').replace(/,/g, '.');
      return parseFloat(cleanNumber);
    }
    return 0;
  };

  if (isLoading || exchangeRate === null) {
    return <p className="text-white text-center">Cargando opciones...</p>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4">Selecciona el Monto de Recarga</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {amountOptions.map((option, index) => {
          const diamonds = extractDiamonds(option.name);
          const priceVES = option.price * exchangeRate;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
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
              <div className="relative z-1 flex flex-row items-center space-x-4">
                <img
                  src={getImageForDiamonds(diamonds)}
                  alt="Diamante"
                  className="w-32 h-24 object-contain"
                />

                <div className="flex flex-col space-y-1">
                  <div className="font-bold text-white">{option.name}</div>

                  <div
                    className={cn(
                      "text-xl font-bold transition-colors",
                      option.descuento ? "text-yellow-400" : "text-green-400"
                    )}
                  >
                    {priceVES.toLocaleString("es-VE", {
                      style: "currency",
                      currency: "VES",
                      minimumFractionDigits: 2,
                    })}
                  </div>


                  {option.descuento && (
                    <div className="text-sm text-yellow-400 font-medium">
                      Descuento: {option.descuento}%
                    </div>
                  )}
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