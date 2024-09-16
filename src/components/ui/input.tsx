import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
  }
  

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,icon, ...props }, ref) => {
    return (
      <div className={`relative flex items-center`}>
      {icon && (
        <span className="absolute left-3 text-slate-500 flex items-center pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400 ",
          icon && "pl-9",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
