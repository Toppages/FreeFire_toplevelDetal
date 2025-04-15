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
  const [saleData, setSaleData] = useState<{ createdAt: string; saleId: number } | null>(null);

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
    pricebs: number;
    price: number;
  } | null>(null);

  const [pin, setPin] = useState<string | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const prevStep = () => {
    setActive((current) => {
      const newStep = Math.max(current - 1, 0);
      if (newStep === 0) {
        setSelectedPackage(null);
      }
      return newStep;
    });
  };


  const nextStep = () => setActive((current) => Math.min(current + 1, 4));
  const goToNextStep = (createdAt?: string, saleId?: number) => {
    if (createdAt && saleId) {
      setSaleData({ createdAt, saleId });
    }
    setActive((prev) => Math.min(prev + 1, 4));
  };

  const handleUserIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      nextStep();
      setIsLoading(false);
    }, 800);
  };
  const handlePlayerData = (data: { Nickname: string | null }) => {
    setNickname(data.Nickname);
  };
  const handleAmountSelect = (amountPackage: { name: string, code: string, pricebs: number, price: number }) => {
    setSelectedPackage(amountPackage);
    nextStep();
  };

  const handlePaymentSubmit = () => {
    nextStep();

  };

  const steps = [
    { id: 0, name: "Monto" },
    { id: 1, name: "Usario" },
    { id: 2, name: "Pago" },
    { id: 3, name: "Validar" },
    { id: 4, name: "Completado" }
  ];

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-r from-[#020024] to-[#0c2a85]">



      <div className="container  mt-15  px-6">
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
            phone={phone}
            bank={bank}
            reference={reference}
            fechaPago={fechaPago}
            setIdNumber={setIdNumber}
            setPhone={setPhone}
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
            pin={pin}
          />
        )}



        {active === 4 && saleData && (
          <CompletedStep
            userId={userId}
            selectedPackage={selectedPackage}
            createdAt={saleData.createdAt}
            saleId={saleData.saleId}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;