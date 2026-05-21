import { useEffect, useState } from "react";
import { getProducts, deleteProduct, ToggleActiveProduct, createProduct } from "./services/ProductService";
import type { Product } from "./products/products";
import { ProductForm } from "./products/ProductForm";

function App() {
  const [products, setProducts] = useState<Product[]>([]); //valor inicial é um array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [minPriceFilter, setMinPriceFilter] = useState<number | "">("");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | "">("");

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

  const categoryOptions = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = products.filter((product) => {
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    if (statusFilter === "active" && !product.active) {
      return false;
    }
    if (statusFilter === "inactive" && product.active) {
      return false;
    }
    if (minPriceFilter !== "" && product.price < minPriceFilter) {
      return false;
    }
    if (maxPriceFilter !== "" && product.price > maxPriceFilter) {
      return false;
    }
    return true;
  });

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
        <h1 style={{ marginBottom: "4rem" }}>Produtos</h1>


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

      <section style={{ marginBottom: "2rem" }}>
        <h2>Filtros</h2>
        <div style={{ display: "flex", gap: "1rem", margin: "0 2rem" }}>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">Todas as categorias</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}>
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>

          <input
            type="number"
            placeholder="Preço mínimo"
            value={minPriceFilter}
            min={0}
            onChange={(event) =>
              setMinPriceFilter(
                event.target.value === ""
                  ? ""
                  : Number(event.target.value) // O operador ternário é usado aqui para permitir que o campo de preço mínimo seja limpo (definindo-o como uma string vazia) ou atualizado com um valor numérico. Se o usuário apagar o valor, o filtro de preço mínimo será desativado, permitindo que todos os produtos sejam exibidos independentemente do preço. Caso contrário, o valor digitado será convertido para um número e usado como filtro para mostrar apenas os produtos com preço igual ou superior a esse valor.
              )
            }
          />
          <span>até</span>
          <input
            type="number"
            placeholder="Preço máximo"
            value={maxPriceFilter}
            min={0}
            onChange={(event) =>
              setMaxPriceFilter(
                event.target.value === ""
                  ? ""
                  : Number(event.target.value)
              )
            }
          />
        </div>
      </section>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
        />
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {filteredProducts.map((product) => (

          <div key={product.id} className="card">
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", justifyContent: "center", height: "100%" }}>
              <h2 style={{ textAlign: "center" }}>{product.name}</h2>
              <p style={{ fontWeight: "bold" }}>Categoria: {product.category}</p>
              <p>Preço: R$ {product.price.toFixed(2)}</p>
              <p>Status: {product.active ? "Ativo" : "Inativo"}</p>
              <p>Description: {product.description ? product.description : <i>O produto não possui descrição.</i>}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", justifyContent: "center" }}>
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
      </div>
    </main>
  );
}

export default App;