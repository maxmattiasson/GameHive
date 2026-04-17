import "./Button.css"
import type { ReactNode } from "react"

interface Props {
    color: "primary" | "secondary",
    disabled?: boolean,
    type?: "submit" | "reset" | "button",
    children?: ReactNode,
}

export default function Button({color, disabled = false, type = "button", children}: Props) {
    return(
        <button 
            className={`btn-${color}`} 
            disabled={disabled} 
            type={type}>
            {children}
        </button>
    )
}