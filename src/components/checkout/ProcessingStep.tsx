import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Image } from '@mantine/core';
import axios from "axios";

type ProcessingStepProps = {
  userId: string;
  selectedPackage: {
    price: number;
    name: string;
    code: string;
    descuento: number | null;
  } | null;
  idNumber: string;
  phone: string;
  bank: string;
  reference: string;
  fechaPago: string;
  nickname: string;
goToNextStep: (saleData: any) => void;
};

const ProcessingStep = ({
  userId,
  selectedPackage,
  idNumber,
  phone,
  bank,
  reference,
  fechaPago,
  nickname,
  goToNextStep
}: ProcessingStepProps) => {
  const [progress, setProgress] = useState(0);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [isRedemptionCompleted, setIsRedemptionCompleted] = useState(false);
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      const next = prev + 10;
      if (next >= 100) {
        clearInterval(interval);
        setIsRedemptionCompleted(true); // ← ¡Aquí se activa el createSale!
      }
      return next;
    });
  }, 300); // puedes ajustar la velocidad aquí

  return () => clearInterval(interval); // limpieza del intervalo
}, []);

useEffect(() => {
  const createSale = async () => {
    try {
      if (!selectedPackage) return;

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sales`, {
        handle: 'freefire_toplevel',
        productName: "Free fire",
        subProduct: selectedPackage.name,
        quantity: 1,
        totalPrice: selectedPackage.price,
        currency: "VES",
        payreference: reference,
        mensaje: `id: ${userId} nombre de usuario: ${nickname}`,
        clientNumber: phone,
        Mybank: "Banco de venezuela"
      });

      const saleData = response.data;
goToNextStep(saleData);
    } catch (err) {
      console.error("Error creando la venta:", err);
      setError("Ocurrió un error al registrar la venta. Intente nuevamente.");
    }
  };

  if (isRedemptionCompleted && progress >= 100) {
    createSale();
  }
}, [isRedemptionCompleted, progress]);




  if (error) {
    return (
      <div className="text-center animate-fade-in">
        <div className="glass-card p-10">
          <h2 className="text-2xl font-bold text-white">Recarga en Proceso</h2>
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="mr-4 mb-4">
                <div>Comuniquese con nuestro soporte técnico</div>
              </div>
              <Image
                radius="md"
                width={400}
                mt={-40}
                height={270}
                src="https://res.cloudinary.com/di0btw2pi/image/upload/v1743454096/Levelito_ERROR_IZQ_hdpnhj.png"
                alt="Error"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center animate-fade-in">
      <div className="glass-card p-10 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Procesando Tu Recarga</h2>

        <div className="flex justify-center mb-6">
          <Loader2 className="w-12 h-12 text-accent animate-spin" />
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-accent h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-left space-y-2 mb-4">
          {statusMessages.map((message, index) => (
            <div key={index} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-muted-foreground">{message}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted/40 rounded-lg p-4 mb-6">
          <h3 className="text-white text-left font-medium mb-2">Detalles de la compra:</h3>
          <ul className="text-left space-y-1">
            <li className="text-muted-foreground">
              <span className="text-white">{userId}</span>
              {nickname && <p className="text-white">Apodo: {nickname}</p>}
            </li>
            {selectedPackage && (
              <>
                <li className="text-muted-foreground">Paquete: <span className="text-white">{selectedPackage.name}</span></li>
                <li className="text-muted-foreground">Precio: <span className="text-white">{selectedPackage.price} BS</span></li>
              </>
            )}
            <li className="text-muted-foreground">Cédula: <span className="text-white">{idNumber}</span></li>
            <li className="text-muted-foreground">Teléfono: <span className="text-white">{phone}</span></li>
            <li className="text-muted-foreground">Banco: <span className="text-white">{bank}</span></li>
            <li className="text-muted-foreground">Referencia: <span className="text-white">{reference}</span></li>
            <li className="text-muted-foreground">Fecha de pago: <span className="text-white">{fechaPago}</span></li>
          </ul>
        </div>

        <p className="text-muted-foreground text-sm mt-4">
          Por favor, no cierres esta ventana mientras procesamos tu pedido
        </p>
      </div>
    </div>
  );
};

export default ProcessingStep;