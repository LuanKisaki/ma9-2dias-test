import type { Product } from "../products/types";

const API_URL = "http://localhost:3004/products";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Erro ao buscar produtos");
    }

    return res.json();
}