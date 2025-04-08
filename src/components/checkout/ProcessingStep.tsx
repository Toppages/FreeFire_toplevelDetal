import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Image } from '@mantine/core';
type ProcessingStepProps = {
  userId: string;
  selectedPackage: {
    price: number; name: string; code: string; pricebs: number
  } | null;
  idNumber: string;
  phone: string;
  bank: string;
  reference: string;
  fechaPago: string;
  nickname: string;
  goToNextStep: (createdAt?: string, saleId?: number) => void;
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
  const [user, setUser] = useState<any>(null);
  const [pinData, setPinData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [saleResponse, setSaleResponse] = useState<any>(null);
  const [isRedemptionCompleted, setIsRedemptionCompleted] = useState(false);

  useEffect(() => {
    const fetchUserAndPin = async () => {
      try {
        setStatusMessages(["Conectando con los servidores..."]);

        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/user/topleveldetal`);
        setUser(userResponse.data);

        setStatusMessages((prev) => [...prev, "Verificando información..."]);

        if (selectedPackage) {
          setStatusMessages((prev) => [...prev, "Recibiendo la información del juego..."]);

          const pinResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${selectedPackage.code}/pin`);
          setPinData(pinResponse.data);

          setStatusMessages((prev) => [...prev, "Información recibida exitosamente. Procesando PIN...", "Redimiendo PIN..."]);

          const scrapeResponse = await axios.get(`${import.meta.env.VITE_API_URL}/redimir`, {
            params: {
              GameAccountId: userId,
              'hpws-pin': pinResponse.data.pin.pin_id,
              'product-code': selectedPackage.code
            }
          });

          if (scrapeResponse.status !== 200 || !scrapeResponse.data.success) {
            const errorMsg = scrapeResponse.data.message || "Ocurrió un error en el proceso.";

            if (errorMsg.includes("PIN ya ha sido utilizado")) {
              setError("Este PIN ya fue utilizado. Intenta con otro.");
            } else {
              setError(errorMsg);
              await axios.post(`${import.meta.env.VITE_API_URL}/products/add-pins-without-deduction`, {
                code: selectedPackage.code,
                pins: [{ pin_id: pinResponse.data.pin.pin_id }]
              });
            }
            return;
          }

          setStatusMessages((prev) => [...prev, "PIN canjeado exitosamente.", "Aplicando recarga...", "¡Todo listo! Redirigiendo..."]);

          setIsRedemptionCompleted(true); 
        }
      } catch (err) {
        setError("No se pudo procesar la información.");
      }
    };

    fetchUserAndPin();

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, 150);

    return () => clearInterval(interval);
  }, [userId, selectedPackage]);

  useEffect(() => {
    if (isRedemptionCompleted) {
      const makeSale = async () => {
        try {
          if (isNaN(user.saldo) || isNaN(selectedPackage.price)) {
            setError("El saldo o el precio no son válidos.");
            return;
          }
  
          const saleData = {
            user: {
              handle: user.handle,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            playerId: userId,
            totalOriginalPrice: selectedPackage.price,
            nickname: nickname,
            quantity: 1,
            price: selectedPackage.price,
            product: selectedPackage.code,
            productName: selectedPackage.name,
            totalPrice: selectedPackage.price,
            moneydisp: user.saldo,
            status: "completado",
            order_id: `ORD-${Date.now()}`,
            pins: [{ serial: pinData.pin.pin_id, key: "DEFAULT_KEY", usado: false, productName: selectedPackage.name }],
            bank: bank,
            reference: reference,
            fechaPago: fechaPago,
            phone: phone,
          };
  
          const saleResponse = await axios.post(`${import.meta.env.VITE_API_URL}/salesdetal`, saleData);
          setSaleResponse(saleResponse.data);
  
          setStatusMessages((prev) => [...prev, "Venta completada."]);
  
          goToNextStep(saleResponse.data.sale.created_at, saleResponse.data.sale.saleId);
        } catch (err) {
          setError("Error al procesar la venta.");
        }
      };
  
      makeSale();
    }
  }, [isRedemptionCompleted, user, pinData, selectedPackage, userId, nickname, goToNextStep]);

  if (error.includes("Error al procesar la venta") || error.includes("No se pudo procesar la información.")) {
    return (
      <div className="text-center animate-fade-in">
  <div className="glass-card p-10">
    <h2 className="text-2xl font-bold text-white ">Recarga en Proceso</h2>
    <div className="flex justify-center mb-6">
      <div className="flex items-center">
        <div className="mr-4 mb-4">
          <div>Comuniquese con nuestro soporte tecnico</div>
        </div>
      <Image
        radius="md"
        width={400}
        mt={-40}
        height={270}
        src="https://res.cloudinary.com/di0btw2pi/image/upload/v1743454096/Levelito_ERROR_IZQ_hdpnhj.png"
        alt="Random unsplash image"
      />
      </div>
    </div>
  </div>
</div>

    
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
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
                <li className="text-muted-foreground">Precio: <span className="text-white">{selectedPackage.pricebs} BS</span></li>
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
