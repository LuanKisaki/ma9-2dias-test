import { useEffect, useState } from "react";
import { getProducts } from "./services/ProductService";
import type { Product } from "./products/types";

function App() {
  const [products, setProducts] = useState<Product[]>([]); //valor inicial é um array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1 style={{marginBottom: "4rem"}}>Produtos</h1>

      {products.map((product) => (
      <div key={product.id} style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "300px",
              textAlign: "left"
            }}
            >
            <h2 style={{textAlign:"center"}}>{product.name}</h2>
            <p style={{ fontWeight: "bold" }}>Categoria: {product.category}</p>
            <p>Preço: R$ {product.price}</p>
            <p>Description: {product.description ? product.description : <i>O produto não possui descrição.</i>}</p>
            <p>Status: {product.active ? "Ativo" : "Inativo"}</p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default App;