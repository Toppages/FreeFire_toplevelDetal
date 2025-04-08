import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

type CompletedStepProps = {
  userId: string;
  selectedPackage: { name: string; code: string; pricebs: number } | null;
  createdAt: string;
  saleId: number;
};

const CompletedStep = ({ userId, selectedPackage, createdAt, saleId }: CompletedStepProps) => {
  const navigate = useNavigate();
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [pieces, setPieces] = useState(250);
  const [confettiActive, setConfettiActive] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (pieces === 0) {
      setConfettiActive(false); 
    }
  }, [pieces]);

  return (
    <div className="text-center animate-fade-in">
      {confettiActive && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={true}
          numberOfPieces={pieces}
          gravity={0.1}
          onConfettiComplete={() => setPieces((prevPieces) => prevPieces - 100)} 
        />
      )}
      <div className="glass-card p-10 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">¡Todo Listo! 🎉</h2>
        <p className="text-muted-foreground mb-6">Tu recarga fue exitosa🎉🎉</p>
        
        <div className="bg-muted/40 rounded-lg p-4 mb-6">
          <h3 className="text-white text-left font-medium mb-3">Detalles de la compra:</h3>
          <ul className="text-left space-y-2">
          <li className="text-muted-foreground">Id de la compra: <span className="text-white">{saleId}</span></li>
          <li className="text-muted-foreground">Fecha compra: <span className="text-white">{new Date(createdAt).toLocaleString()}</span></li>
            <li className="text-muted-foreground">ID de jugador: <span className="text-white">{userId}</span></li>
            {selectedPackage && (
              <>
                <li className="text-muted-foreground">Paquete: <span className="text-white">{selectedPackage.name}</span></li>
                <li className="text-muted-foreground">Precio: <span className="text-white">{selectedPackage.pricebs} BS</span></li>
              </>
            )}
          </ul>
        </div>
        
        <Button 
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-600 to-accent text-white font-medium rounded-xl"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default CompletedStep;
