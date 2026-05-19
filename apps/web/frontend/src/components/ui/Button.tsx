import "./Button.css";
import type { ReactNode } from "react";

interface Props {
  color: "primary" | "secondary" | "vote";
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  children?: ReactNode;
}

export default function Button({
  color,
  disabled = false,
  type = "button",
  onClick,
  children,
}: Props) {
  return (
    <button
      className={`btn-${color}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
