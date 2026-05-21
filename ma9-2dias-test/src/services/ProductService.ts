import type { Product } from "../products/products";

const API_URL = "http://localhost:3004/products";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar produto");
  }
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product), // JSON.stringify é usado para converter o objeto product em uma string JSON, que é o formato esperado pelo servidor para os dados enviados no corpo da requisição POST. O método fetch envia essa requisição para o endpoint API_URL, que é onde os produtos são gerenciados no backend.
  });

  if (!res.ok) {
    throw new Error("Erro ao criar produto");
  }
  return res.json();
}

export async function ToggleActiveProduct(id: string, product: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar produto");
  }
  return res.json();
}