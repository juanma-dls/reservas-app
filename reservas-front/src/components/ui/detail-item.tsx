// @/components/ui/detail-item.tsx (Sugerido)
import { type HTMLAttributes, type ReactNode } from "react";

interface DetailItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children?: ReactNode;
  value?: string;
}

export function DetailItem({ label, children, value, className, ...props }: DetailItemProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`} {...props}>
      <dt className="text-sm font-medium text-foreground">
        {label}
      </dt>
      <dd className="text-base font-semibold text-foreground">
        {value || children}
      </dd>
    </div>
  );
}