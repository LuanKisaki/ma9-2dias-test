import type { Product } from "./products";

type ProductCardProps = {
  product: Product;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ProductCard({
  product,
  onToggleActive,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="card">
      <div className="card__content">
        <h2>{product.name}</h2>
        <p><strong>Categoria:</strong> {product.category}</p>
        <p>Preço: R$ {product.price.toFixed(2)}</p>
        <p>Status: {product.active ? "Ativo" : "Inativo"}</p>
        <p>
          Descrição:{" "}
          {product.description ? product.description : <i>O produto não possui descrição.</i>}
        </p>
      </div>

      <div className="card__actions" style={{ display: "flex", flexDirection: "column", gap: ".5rem", justifyContent: "center" }}>
        <button 
          onClick={() => onToggleActive(product.id)}
          style={{
                  marginTop: "auto",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(89, 89, 89, 0.2)",
                  borderStyle: "solid",
                  borderWidth: "thin",
                  borderColor: product.active ? "#ffbb33" : "#0081c2",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
        >
          {product.active ? "Desativar" : "Ativar"}
        </button>

        <button 
          onClick={() => onDelete(product.id)}
          style={{
                  marginTop: "auto",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(89, 89, 89, 0.2)",
                  borderStyle: "solid",
                  borderWidth: "thin",
                  borderColor: "#ff4444",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}