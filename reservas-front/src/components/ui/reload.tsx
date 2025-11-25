import { Spinner } from "@/components/ui/spinner"
import { Item, ItemContent, ItemMedia, ItemTitle } from "./item"
import { cn } from "@/lib/utils"

interface ReloadProps {
  message?: string
  className?: string
}

export function Reload({ message = "Cargando datos...", className }: ReloadProps) {
  return (
    <div className={cn(
      "flex w-full max-w-sm flex-col gap-4 [--radius:1rem] justify-center items-center p-4", 
      className
    )}>
      <Item>
        <ItemMedia>
          <Spinner className="size-8" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{message}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}