import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

type CompletedStepProps = {
  saleData: any;
};



const CompletedStep = ({ saleData }: CompletedStepProps) => {
  const navigate = useNavigate();
  const {
    saleId,
    userHandle,
    productName,
    subProduct,
    totalPrice,
    totalCurrency,
    currency,
    status,
    payreference,
    mensaje,
    clientNumber,
    Mybank,
    createdAt
  } = saleData;


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
        <h2 className="text-2xl font-bold text-white mb-4">Compra realizada🎉</h2>
        <p className="text-muted-foreground mb-6">Su recarga será procesada en unos momentos</p>

        <div className="bg-muted/40 rounded-lg p-4 mb-6">
          <h3 className="text-white text-left font-medium mb-3">Detalles de la compra:</h3>
          <ul className="text-left space-y-2">
            <li className="text-muted-foreground">ID de compra: <span className="text-white">{saleId.toString().padStart(5, "0")}</span></li>
            <li className="text-muted-foreground">Producto: <span className="text-white">{productName} {subProduct}</span></li>
            <li className="text-muted-foreground">
              Total : <span className="text-white">
                {Math.round(totalCurrency).toLocaleString("es-VE", {
                  style: "currency",
                  currency: "VES",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </span>
            </li>

            <li className="text-muted-foreground">Referencia: <span className="text-white">{payreference}</span></li>
            <li className="text-muted-foreground">Fecha: <span className="text-white">{new Date(createdAt).toLocaleString()}</span></li>
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