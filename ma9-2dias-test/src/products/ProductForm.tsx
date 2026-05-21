import { useState } from "react";
import type { Product } from "./products"; // Importa o tipo Product do arquivo products.ts para ser usado na definição do tipo ProductFormProps e no estado do formulário.
import { Button } from "../components/Button";

type ProductFormProps = {
  onSubmit: (data: Omit<Product, "id">) => Promise<void>; // Promise<void> indica que a função onSubmit é assíncrona e não retorna nenhum valor. O tipo Omit<Product, "id"> é usado para indicar que o objeto de dados passado para onSubmit deve ter todas as propriedades do tipo Product, exceto a propriedade id.
  onCancel: () => void; //
};

export function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) { // React.SyntheticEvent é um tipo genérico para eventos em React. Ele é usado aqui para tipar o evento de submissão do formulário.
    e.preventDefault();

    if (!name.trim() || !category.trim() || !price) {
      alert("Preencha nome, categoria e preço do produto.");
      return;
    }

    setIsSaving(true);

    await onSubmit({ name, category, price, active, description })
      .then(() => {
        setName("");
        setCategory("");
        setPrice(0);
        setActive(true);
        setDescription("");
      })
      .catch(() => setError("Erro ao salvar o produto."))
      .finally(() => setIsSaving(false));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "320px",
          padding: "1rem",
          border: "1px solid aquamarine",
          borderRadius: "var(--border-radius)"
        }}
      >
        <h2>Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Status do produto
        </label>
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSaving}
          variant="primary"
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
        <Button 
          onClick={onCancel} 
          variant="danger"
        >
          Cancelar
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
