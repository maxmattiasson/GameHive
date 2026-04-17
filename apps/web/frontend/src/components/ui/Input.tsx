import type { ChangeEvent } from "react"
import "./input.css"

interface Props {
  type?: "text" | "email" | "password" | "number" | "search"
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
}

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
  autoComplete,
}: Props) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  )
}
