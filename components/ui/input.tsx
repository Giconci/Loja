import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

// ✅ Definimos uma interface para os props
export interface InputProps extends React.ComponentProps<"input"> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      
      <input
        ref={ref}              // ✅ agora o RHF consegue controlar o campo
        type={type}
        data-slot="input"
        className={cn("...", className)}
        {...props}             // ✅ garante que onChange, value, etc. sejam passados
      />
    )
  }
)

Input.displayName = "Input"   // ✅ boa prática para debug

export { Input }
