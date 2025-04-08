import axios from "axios";
import React, { useState } from "react";
import { Gem, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from '@mantine/core';
import { toast } from 'sonner';

const CopyButton = ({ text, format }: { text: string; format?: (text: string) => string }) => {
  const [, setCopied] = useState(false);

  const copyToClipboard = () => {
    const formattedText = format ? format(text) : text;
    navigator.clipboard.writeText(formattedText);
    toast.success("Copiado al portapapeles");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="ml-2 text-blue-400 hover:text-blue-600 transition"
    >
      <Copy size={15} color="#ffffff" />
    </button>
  );
};

type PaymentStepProps = {
  selectedPackage: { name: string, code: string, pricebs: number } | null;
  onSubmit: () => void;
  idNumber: string;
  onBack: () => void;
  phone: string;
  bank: string;
  reference: string;
  fechaPago: string;
  setIdNumber: (value: string) => void;
  setPhone: (value: string) => void;
  setBank: (value: string) => void;
  setReference: (value: string) => void;
  setFechaPago: (value: string) => void;
};

const PaymentStep = ({
  selectedPackage,
  onSubmit,
  idNumber,
  phone,
  bank,
  reference,
  fechaPago,
  setIdNumber,
  setPhone,
  setBank,
  setReference,
  setFechaPago,
  onBack
}: PaymentStepProps) => {


  const rif = "J-502785477";
  const celular = "0412-6425335";
  const banco = "Banco de Venezuela";

  const copyAllToClipboard = () => {
    const formattedRif = rif.replace("J-", "");
    const allText = `RIF: ${formattedRif}\nCelular: ${celular}\nBanco: ${banco}`;
    navigator.clipboard.writeText(allText);
    toast.success("Todos los datos copiados al portapapeles");
  };
  const banks = [
    { code: "0102", name: "BANCO DE VENEZUELA" },
    { code: "0156", name: "100% BANCO" },
    { code: "0172", name: "BANCAMIGA BANCO MICROFINANCIERO C A" },
    { code: "0114", name: "BANCARIBE" },
    { code: "0171", name: "BANCO ACTIVO" },
    { code: "0166", name: "BANCO AGRICOLA DE VENEZUELA" },
    { code: "0175", name: "BANCO BICENTENARIO DEL PUEBLO" },
    { code: "0128", name: "BANCO CARONI" },
    { code: "0163", name: "BANCO DEL TESORO" },
    { code: "0115", name: "BANCO EXTERIOR" },
    { code: "0151", name: "BANCO FONDO COMUN" },
    { code: "0173", name: "BANCO INTERNACIONAL DE DESARROLLO" },
    { code: "0105", name: "BANCO MERCANTIL" },
    { code: "0191", name: "BANCO NACIONAL DE CREDITO" },
    { code: "0138", name: "BANCO PLAZA" },
    { code: "0137", name: "BANCO SOFITASA" },
    { code: "0104", name: "BANCO VENEZOLANO DE CREDITO" },
    { code: "0168", name: "BANCRECER" },
    { code: "0134", name: "BANESCO" },
    { code: "0177", name: "BANFANB" },
    { code: "0146", name: "BANGENTE" },
    { code: "0174", name: "BANPLUS" },
    { code: "0108", name: "BBVA PROVINCIAL" },
    { code: "0157", name: "DELSUR BANCO UNIVERSAL" },
    { code: "0169", name: "MI BANCO" },
    { code: "0178", name: "N58 BANCO DIGITAL BANCO MICROFINANCIERO S A" }
  ];

  const bankOptions = banks.map((b) => ({
    value: b.code,
    label: `${b.code} - ${b.name}`,
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestData = {
      cedulaPagador: idNumber,
      telefonoPagador: phone,
      telefonoDestino: "04126425335",
      referencia: reference,
      fechaPago: fechaPago,
      importe: selectedPackage ? selectedPackage.pricebs.toFixed(2) : "0.00",
      bancoOrigen: bank,
      reqCed: false
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/process-payment`,
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.data?.code !== 1000) {
        const errorMessage = response.data.data?.message || "Ocurrió un error desconocido";
        if (errorMessage.includes("consulta realizada exitosamente")) {
          toast.error(errorMessage.replace("consulta realizada exitosamente", "").trim());
        } else {
          toast.error(errorMessage);
        }
      } else {
        console.log("Respuesta del backend:", response.data);
        onSubmit();
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.data?.message || error.message;
      toast.error(`Error en la solicitud: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-2">Procesar Pago</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 animate-fade-in flex flex-col" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl font-bold mb-4 text-white">Realiza el Pago</h2>
          <p className="text-muted-foreground">
            <span className="text-white font-medium">RIF:</span> {rif}
            <CopyButton text={rif} format={(text) => text.replace("J-", "")} />
          </p>
          <p className="text-muted-foreground">
            <span className="text-white font-medium">Celular:</span> {celular}
            <CopyButton text={celular} />
          </p>
          <p className="text-muted-foreground">
            <span className="text-white font-medium">Banco:</span> {banco}
            <CopyButton text={banco} />
          </p>
          <button
            onClick={copyAllToClipboard}
            className="mt-auto w-full bg-[#0c2a85] hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center gap-2"
          >
            <Copy size={18} color="#ffffff" />
            Copiar Todo
          </button>

        </div>

        <div className="glass-card p-4 animate-fade-in flex flex-col" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-bold mb-2 text-white">Confirmar Pedido</h2>
          <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block">Cédula del Titular</label>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full p-2 rounded bg-card text-white border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block">Teléfono del Titular</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 rounded bg-card text-white border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block">Fecha de Pago</label>
                <input
                  type="date"
                  value={fechaPago}
                  onChange={(e) => setFechaPago(e.target.value)}
                  className="w-full p-2 rounded bg-card text-white border border-gray-600"
                  required
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </div>
              <div>
                <label className="block">Referencia</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full p-2 rounded bg-card text-white border border-gray-600"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block">Banco Origen</label>
              <Select
                value={bank}
                searchable
                transition="pop-top-left"
                transitionDuration={80}
                transitionTimingFunction="ease"
                styles={() => ({
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: '#0c2a85',
                        color: 'white',
                      },
                    },
                  },
                })}
                mb={5}
                onChange={(selectedOption) => setBank(selectedOption)}
                data={bankOptions}
                placeholder="Seleccionar banco"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#0c2a85] mt-5 text-white px-4 py-2 rounded-xl mt-auto w-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verificando..." : "Verificar"}
            </Button>

          </form>
        </div>

        <div className="glass-card p-4 animate-fade-in flex flex-col" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-bold text-white">Detalles del Pedido</h2>
          <hr className="my-4 border-gray-600" />
          <div className="flex items-center gap-4">
            <Gem className="w-12 h-12 text-blue-400" />
            <div>
              <p className="font-bold text-white">Free Fire Diamantes</p>
              {selectedPackage ? (
                <p>
                  {selectedPackage?.name.replace(/Free Fire\s*-?\s*([\d,.]+)\s*Diamantes\s*\+\s*([\d,.]+)\s*Bono/, "$1 + $2")}
                </p>
              ) : (
                <p className="text-red-400">No seleccionado</p>
              )}
            </div>
          </div>
          <p className="mt-4 text-xl font-bold text-white">
            Total: <span className="text-green-400">
              {selectedPackage ? `${selectedPackage.pricebs.toFixed(2)} BS` : "No seleccionado"}
            </span>
          </p>
          <p className=" text-sm text-muted-foreground flex items-center justify-between">
            <span>
              Cualquier duda contacta con nosotros en{" "}
              <a href="https://wa.me/+XXXXXXX" className="text-green-400">wa.me/+XXXXXXX</a>
            </span>
            <img
              src="https://res.cloudinary.com/di0btw2pi/image/upload/v1743454125/Levelito_WHATSAPP_acyufj.png"
              alt="Diamante"
              className="w-32 -mt-8"
            />

          </p>

          <Button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-xl mt-auto w-full hover:bg-gray-700 transition-colors"
            onClick={onBack}
          >
            Volver
          </Button>
        </div>
      </div>

    </div>
  );
};

export default PaymentStep;