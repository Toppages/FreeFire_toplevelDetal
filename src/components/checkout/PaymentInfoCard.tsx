import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@mantine/core";

const CopyButton = ({ text, format }: { text: string; format?: (text: string) => string }) => {
  const copyToClipboard = () => {
    const formattedText = format ? format(text) : text;
    navigator.clipboard.writeText(formattedText);
    toast.success("Copiado al portapapeles");
  };

  return (
    <button onClick={copyToClipboard} className="ml-2 text-blue-400 hover:text-blue-600 transition">
      <Copy size={15} color="#ffffff" />
    </button>
  );
};

export const PaymentInfoCard = () => {
  const rif = "J-502785477";
  const celular = "0412-6425335";
  const banco = "Banco de Venezuela";

  const copyAllToClipboard = () => {
    const formattedRif = rif.replace("J-", "");
    const allText = `RIF: ${formattedRif}\nCelular: ${celular}\nBanco: ${banco}`;
    navigator.clipboard.writeText(allText);
    toast.success("Todos los datos copiados al portapapeles");
  };

  return (
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
        className="mt-auto w-full mb-6 bg-[#0c2a85] hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center gap-2"
      >
        <Copy size={18} color="#ffffff" />
        Copiar Todo
      </button>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 200 }}>
          <Image
            radius="md"
            src="https://res.cloudinary.com/di0btw2pi/image/upload/v1744397620/ESCANEA_Y_PAGA_TEXT_yx4hc6.png"
            alt="Texto escanear"
          />
        </div>
        <div style={{ width: 280 }}>
          <Image
            radius="md"
            src="https://res.cloudinary.com/di0btw2pi/image/upload/v1744397624/QR_hbecgx.png"
            alt="Código QR"
          />
        </div>
      </div>
    </div>
  );
};
