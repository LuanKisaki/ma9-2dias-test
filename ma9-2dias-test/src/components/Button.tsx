import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "warning" | "danger";
};

export function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}