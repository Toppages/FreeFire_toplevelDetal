
import { DiamondIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

type RechargeCardProps = {
  amount: number;
  diamonds: string;
  bonus?: number;
  selected: boolean;
  onSelect: () => void;
  bestValue?: boolean;
};

const RechargeCard = ({
  amount,
  diamonds,
  bonus = 0,
  selected,
  onSelect,
  bestValue = false,
}: RechargeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
    className={`glass-card card-hover p-1 relative ${
      selected 
        ? "ring-2 ring-accent bg-accent/20" 
        : "bg-card/80"
    }`}
    onClick={onSelect}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    
    
    <div className="flex flex-col items-center space-y-2"> 
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
        selected ? "bg-accent" : "bg-card"
      } transition-all duration-300`}>
        {selected ? (
          <CheckIcon className="w-5 h-5 text-white" /> 
        ) : (
          <DiamondIcon className="w-5 h-5 text-accent" />
        )}
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center space-x-1">
          <DiamondIcon className="w-3 h-3 text-blue-400" /> 
          <span className="font-bold text-sm text-white">{diamonds}</span>
        </div>
        
        {bonus > 0 && (
          <div className="mt-1 text-xs text-green-400 font-medium">
            +{bonus} Bonus
          </div>
        )}
        
        <div className={`mt-2 font-bold ${
          selected ? "text-white" : "text-muted-foreground"
        } transition-all duration-300`}>
          {amount.toFixed(2)} BS
        </div>
      </div>
    </div>
    
    <div 
      className={`absolute inset-0 bg-white/5 rounded-2xl opacity-0 ${
        isHovered && !selected ? "opacity-100" : "opacity-0"
      } transition-all duration-300`} 
    />
  </div>
  
  );
};

export default RechargeCard;
