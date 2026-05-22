import type { Product } from "./products";

const BASE_URL = "http://localhost:3004/products";

export async function createProduct(
	product: Omit<Product, "id">
) {
	const response = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	});
	if (!response.ok) {
		throw new Error("Erro ao criar produto");
	}
	return response.json();
}