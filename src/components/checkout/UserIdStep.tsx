import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type UserIdStepProps = {
  userId: string;
  setUserId: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPlayerData: (data: { alerta: string; Nickname: string | null; mensaje: string } | null) => void;
  onBack: () => void;
};


const UserIdStep = ({ userId, setUserId, phone, setPhone, onSubmit, onPlayerData, onBack }: UserIdStepProps) => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [playerData, setPlayerData] = useState<{ alerta: string; Nickname: string | null; mensaje: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/validar/${userId}`);
      setPlayerData(response.data);
      onPlayerData(response.data);
    } catch (error) {
      setPlayerData({ alerta: "red", Nickname: null, mensaje: `ID de jugador ${userId} no existe` });
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(true);
    }
  };

const isValidPhone = (phone: string) => {
  return /^\d{11}$/.test(phone); // permite cualquier número de 9 dígitos
};

  const isFormValid = userId.trim() !== "" && isValidPhone(phone);

  const handleConfirm = () => {
    if (playerData?.alerta !== "green") {
      setShowConfirmDialog(false);
      return;
    }
    setShowConfirmDialog(false);
    onSubmit(new Event("submit") as unknown as React.FormEvent);
  };

  return (
    <div className="glass-card p-6 animate-fade-in transition-all duration-500 transform">
      <h2 className="text-xl font-bold text-white mb-6">Ingresar ID de Jugador</h2>
      <form onSubmit={handleVerify}>
        <label className="block text-sm font-medium text-muted-foreground mb-2">ID de jugador</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input-theme w-full mb-6"
          placeholder="Introduce tu ID"
          required
        />
        <label className="block text-sm font-medium text-muted-foreground mb-2">Teléfono de contacto (te enviearemos el comprobante a este numero)</label>
        
        {phone && !isValidPhone(phone) && (
          <p className="text-red-500 text-sm mb-4">Número inválido, Debe tener 11 dígitos.</p>
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
            disabled={isLoading || !isFormValid}
            className="bg-[#0c2a85] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            {isLoading ? "Verificando..." : "Verificar ID"}
          </Button>

        </Group>
      </form>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="glass-card border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Resultado de la Verificación</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isLoading ? "Verificando..." : "Aquí están los detalles del jugador"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {playerData ? (
              <div className={`rounded-lg p-4 mb-4 ${playerData.alerta === "green" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                {playerData.Nickname && <p className="text-muted-foreground">Apodo: <span className="text-white">{playerData.Nickname}</span></p>}
                <p className="text-muted-foreground">{playerData.mensaje}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">Esperando respuesta...</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cerrar
            </Button>
            {playerData?.alerta === "green" && (
              <Button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-blue-600 to-accent text-white"
              >
                Confirmar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserIdStep;