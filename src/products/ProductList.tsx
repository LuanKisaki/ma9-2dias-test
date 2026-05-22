import { useEffect, useState } from "react";
import { getProducts, deleteProduct, toggleActiveProduct, createProduct } from "../services/ProductService";
import type { Product } from "./products";
import { ProductForm } from "./ProductForm";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { Button } from "../components/Button";
import "./ProductList.scss";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
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
      const toggleProduct = await toggleActiveProduct(id, { ...product, active: !product.active });
      setProducts(products.map((p) => (p.id === id ? toggleProduct : p)));
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
      <header
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem"
        }}
      >
        <h1>Produtos</h1>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
          >
            Novo Produto
          </Button>
        )}
      </header>
      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
        />
      )}
      <ProductFilters
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        minPriceFilter={minPriceFilter}
        maxPriceFilter={maxPriceFilter}
        categoryOptions={categoryOptions}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onMinPriceChange={setMinPriceFilter}
        onMaxPriceChange={setMaxPriceFilter}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "start", margin: "0 2rem" }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleActive={handleToggleActive}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </main>
  );
}