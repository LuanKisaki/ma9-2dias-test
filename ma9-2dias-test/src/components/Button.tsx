import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "warning" | "danger";
};

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}