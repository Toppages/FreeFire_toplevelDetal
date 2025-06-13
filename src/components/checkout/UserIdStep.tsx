import React from "react";
import { Button } from "@/components/ui/button";
import { Group } from "@mantine/core";

type UserIdStepProps = {
  userId: string;
  setUserId: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPlayerData: (data: { alerta: string; Nickname: string | null; mensaje: string }) => void;
  onBack: () => void;
};

const UserIdStep = ({ userId, setUserId, phone, setPhone, onSubmit, onPlayerData, onBack }: UserIdStepProps) => {
  const isValidPhone = (phone: string) => /^\d{11}$/.test(phone);
  const isFormValid = userId.trim() !== "" && isValidPhone(phone);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Se envía un nickname "por confirmar"
    onPlayerData({ alerta: "gray", Nickname: null, mensaje: "Por confirmar" });
    onSubmit(e);
  };

  return (
    <div className="glass-card p-6 animate-fade-in transition-all duration-500 transform">
      <h2 className="text-xl font-bold text-white mb-6">Ingresar ID de Jugador</h2>
      <form onSubmit={handleNext}>
        <label className="block text-sm font-medium text-muted-foreground mb-2">ID de jugador</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input-theme w-full mb-6"
          placeholder="Introduce tu ID"
          required
        />

        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Teléfono de contacto (te enviaremos el comprobante a este número)
        </label>
        {phone && !isValidPhone(phone) && (
          <p className="text-red-500 text-sm mb-4">Número inválido. Debe tener 11 dígitos.</p>
        )}
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setPhone(onlyNumbers);
          }}
          className="input-theme w-full mb-6"
          placeholder="Ej: 04141234567"
          maxLength={11}
          required
        />

        <Group position="right">
          <Button variant="outline" onClick={onBack}>Volver</Button>
          <Button
            type="submit"
            disabled={!isFormValid}
            className="bg-[#0c2a85] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Continuar
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default UserIdStep;
