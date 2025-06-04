// Checkout.tsx
import { useState, useEffect } from "react";
import StepIndicator from "../components/StepIndicator";
import UserIdStep from "../components/checkout/UserIdStep";
import AmountStep from "../components/checkout/AmountStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ProcessingStep from "../components/checkout/ProcessingStep";
import CompletedStep from "../components/checkout/CompletedStep";

const Checkout = () => {
  const [active, setActive] = useState(0);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
const [saleData, setSaleData] = useState<any>(null); // o define un tipo si prefieres

  const [nickname, setNickname] = useState<string | null>(null);
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [reference, setReference] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    code: string;
    price: number;
    descuento: number | null;
  } | null>(null);

  const [pin, setPin] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Retroceder de paso
  const prevStep = () => {
    setActive((current) => {
      const newStep = Math.max(current - 1, 0);
      if (newStep === 0) {
        setSelectedPackage(null);
      }
      return newStep;
    });
  };

  // Avanzar de paso
  const nextStep = () => setActive((current) => Math.min(current + 1, 4));

  // Avanzar con datos de venta
const goToNextStep = (data: any) => {
  setSaleData(data);
  setActive((prev) => Math.min(prev + 1, 4));
};


  // Subida del ID de usuario
  const handleUserIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      nextStep();
      setIsLoading(false);
    }, 800);
  };

  // Datos del jugador
  const handlePlayerData = (data: { Nickname: string | null }) => {
    setNickname(data.Nickname);
  };

  // Selección del paquete de recarga
  const handleAmountSelect = (amountPackage: { name: string; code: string; price: number; descuento: number | null }) => {
    setSelectedPackage(amountPackage);
    nextStep();
  };

  // Envío del formulario de pago
  const handlePaymentSubmit = () => {
    nextStep();
  };

  // Pasos del checkout
  const steps = [
    { id: 0, name: "Monto" },
    { id: 1, name: "Usuario" },
    { id: 2, name: "Pago" },
    { id: 3, name: "Validar" },
    { id: 4, name: "Completado" }
  ];

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-r from-[#020024] to-[#090979]">
      <div className="container mt-15 px-6">
        <StepIndicator steps={steps} currentStep={active} />

        {active === 0 && (
          <AmountStep
            selectedPackage={selectedPackage}
            onSelect={handleAmountSelect}
          />
        )}

{active === 1 && (
  <UserIdStep
    userId={userId}
    setUserId={setUserId}
    phone={phone}
    setPhone={setPhone}
    onSubmit={handleUserIdSubmit}
    onPlayerData={handlePlayerData}
    onBack={prevStep}
  />
)}


         {active === 2 && (
          <PaymentStep
            selectedPackage={selectedPackage}
            onSubmit={handlePaymentSubmit}
            onBack={prevStep}
            idNumber={idNumber}
            bank={bank}
            reference={reference}
            fechaPago={fechaPago}
            setIdNumber={setIdNumber}
            setBank={setBank}
            setReference={setReference}
            setFechaPago={setFechaPago}
            setPin={setPin}
          />
        )}

        {active === 3 && (
          <ProcessingStep
            userId={userId}
            selectedPackage={selectedPackage}
            idNumber={idNumber}
            phone={phone}
            bank={bank}
            reference={reference}
            fechaPago={fechaPago}
            nickname={nickname}
            goToNextStep={goToNextStep}
          />
        )}

        {active === 4 && saleData && (
  <CompletedStep saleData={saleData} />
)}

      </div>
    </div>
  );
};

export default Checkout;
