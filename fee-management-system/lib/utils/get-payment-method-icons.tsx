import { Banknote, CreditCard, Globe, Wallet } from "lucide-react";

export const getMethodIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case "cash":
      return <Banknote className="w-3 h-3 mr-1" />;
    case "card":
      return <CreditCard className="w-3 h-3 mr-1" />;
    case "online":
      return <Globe className="w-3 h-3 mr-1" />;
    case "bank":
      return <Wallet className="w-3 h-3 mr-1" />;
    default:
      return <CreditCard className="w-3 h-3 mr-1" />;
  }
};
