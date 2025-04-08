import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  name: string
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className=" items-center justify-center w-full max-w-3xl mx-auto mb-10 px-4">
      <div className="w-full flex items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id || currentStep === 4;
          const isActive = currentStep === step.id;
          const isFinalStep = currentStep === 4;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              <div className="flex items-center w-full">
                {/* Línea antes */}
                {index > 0 && (
                  <div 
                    className={cn(
                      "h-1 flex-1 transition-all duration-700", 
                      isCompleted ? "bg-green-500" : "bg-muted"
                    )}
                  />
                )}
                
                {/* Círculo del paso */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-500 relative z-10",
                    isFinalStep
                      ? "bg-green-500 text-white shadow-md shadow-green-500/20"
                      : isCompleted 
                        ? "bg-green-500 text-white shadow-md shadow-green-500/20" 
                        : isActive
                          ? "bg-accent text-white ring-4 ring-accent/20 shadow-lg animate-pulse-soft" 
                          : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4" /> : <span>{step.id + 1}</span>}
                </div>
                
                {/* Línea después */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 transition-all duration-700",
                      isCompleted ? "bg-green-500" : "bg-muted"
                    )}
                  />
                )}
              </div>
              
              {/* Etiqueta del paso */}
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-500",
                    isFinalStep
                      ? "text-green-500 font-bold"
                      : isActive 
                        ? "text-white font-bold" 
                        : isCompleted 
                          ? "text-white" 
                          : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
