import { Reload } from "./ui/reload";

interface LoadingOverlayProps {
  children: React.ReactNode;
  isLoading: boolean;
  message?: string;
}

export function LoadingOverlay({ children, isLoading, message }: LoadingOverlayProps) {
  return (
    <div className="relative">
      
      {children}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/70 z-50">
          <Reload message={message} /> {/* Tu indicador de carga centrado */}
        </div>
      )}
    </div>
  );
}