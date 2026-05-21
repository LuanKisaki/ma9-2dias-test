import "./Card.scss";
 
type CardProps = {
  children: React.ReactNode;
};

export function Card({
  children,
}: CardProps) {
  return (
    <article className="card">
      {children}
    </article>
  );
}