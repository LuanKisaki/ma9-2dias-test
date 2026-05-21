import { useEffect, useState } from "react";
import { getProducts, deleteProduct, ToggleActiveProduct, createProduct } from "./services/ProductService";
import type { Product } from "./products/products";
import { ProductForm } from "./products/ProductForm";

function App() {
  const [products, setProducts] = useState<Product[]>([]); //valor inicial é um array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) {
      return;
    }
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      setError("Erro ao deletar o produto.");
    }
  };
  
  const handleToggleActive = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    try {
      const ToggleProduct = await ToggleActiveProduct(id, { ...product, active: !product.active });
      setProducts(products.map((p) => (p.id === id ? ToggleProduct : p)));
    } catch {
      setError("Erro ao atualizar o produto.");
    }
  };

  const handleCreateProduct = async (product: Omit<Product, "id">) => {
    try {
      const createdProduct = await createProduct(product);
      setProducts([...products, createdProduct]);
      setShowForm(false);
    } catch {
      setError("Erro ao criar o produto.");
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  if (error) return <p>{error}</p>;

  return (
    <main>
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem"
        }}
        
      >
        <h1 style={{marginBottom: "4rem"}}>Produtos</h1>


      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "0.5rem 1rem",
            marginBottom: "2rem",
            backgroundColor: "rgba(89, 89, 89, 0.2)",
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: "#0081c2",
            cursor: "pointer",
            fontSize: "14px",
            height: "fit-content"
          }}
          >
          Novo Produto
        </button>
      )}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      {products.map((product) => (
      <div key={product.id} style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              borderStyle: "solid",
              borderWidth: "thin", 
              borderColor: "#ccc",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "300px",
              textAlign: "left",
              minHeight: "200px",
            }}
            >
            <h2 style={{textAlign:"center"}}>{product.name}</h2>
            <p style={{ fontWeight: "bold" }}>Categoria: {product.category}</p>
            <p>Preço: R$ {product.price}</p>
            <p>Status: {product.active ? "Ativo" : "Inativo"}</p>
            <p>Description: {product.description ? product.description : <i>O produto não possui descrição.</i>}</p>
            <button
              onClick={() => handleToggleActive(product.id)}
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
              onClick={() => handleDeleteProduct(product.id)}
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
      ))}
    </main>
  );
}

export default App;