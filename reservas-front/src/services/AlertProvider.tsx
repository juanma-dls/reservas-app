import { createContext, useContext, useState, useEffect, type JSX } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertData {
  type: AlertType;
  title?: string;
  message?: string;
  duration?: number;
}

interface AlertContextType {
  alert: AlertData | null;
  setAlert: (data: AlertData | null) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const typeStyles: Record<AlertType, string> = {
  success: "bg-[#d1fae5] text-[#065f46]",
  error:   "bg-[#fee2e2] text-[#991b1b]",
  info:    "bg-[#dbeafe] text-[#1e3a8a]",
  warning: "bg-[#fef3c7] text-[#92400e]",
};

const typeIcons: Record<AlertType, JSX.Element> = {
  success: <CheckCircle2 className="w-5 h-5 flex-shrink-0" />,
  error: <XCircle className="w-5 h-5 flex-shrink-0" />,
  info: <Info className="w-5 h-5 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertData | null>(null);

  useEffect(() => {
    if (!alert?.duration) return;
    const timer = setTimeout(() => setAlert(null), alert.duration);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <div className="
          fixed top-4 z-[9999] pointer-events-none 
          w-full px-4 flex justify-center
          md:w-auto md:right-4 md:left-auto md:justify-end
        "
      >
        {alert && (
          <div className="pointer-events-auto animate-fade-in-down shadow-xl rounded-lg">
            <Alert className={`${typeStyles[alert.type]} border-none shadow-xl p-4`}>
              {typeIcons[alert.type]}
              <div className="min-w-0">
                {alert.title && (
                  <AlertTitle className="line-clamp-1">
                    {alert.title}
                  </AlertTitle>
                )}
                {alert.message && (
                  <AlertDescription className="mt-1 break-words">
                    {alert.message}
                  </AlertDescription>
                )}
              </div>
            </Alert>
          </div>
        )}
      </div>

      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
}
