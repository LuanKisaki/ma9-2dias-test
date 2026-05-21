import { Card } from "../components/Card";
import { Button } from "../components/Button";
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
    <Card>
      <div className="card__content">
        <h2>{product.name}</h2>
        <p>
          <strong>Categoria:</strong>
          {product.category}
        </p>
        <p>Preço: R$ {product.price.toFixed(2)}</p>
        <p>Status: {product.active ? "Ativo" : "Inativo"}</p>
        <p>
          Descrição:{" "}
          {product.description ? product.description : <i>O produto não possui descrição.</i>}
        </p>
      </div>

      <div className="card__actions" style={{ display: "flex", flexDirection: "column", gap: ".5rem", justifyContent: "center" }}>

        <Button
          onClick={() => onToggleActive(product.id)}
          variant={product.active ? "warning" : "primary"}
        >
          {product.active ? "Desativar" : "Ativar"}
        </Button>

        <Button
          onClick={() => onDelete(product.id)}
          variant="danger"
        >
          Excluir
        </Button>
      </div>
    </Card>
  );
}