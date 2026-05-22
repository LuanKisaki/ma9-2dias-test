import { describe, expect, it, vi } from "vitest";
import { createProduct } from "../services/ProductService";

describe("createProduct", () => {
	it("deve criar um novo produto", async () => {
		const mockProduct = {
			name: "Mouse",
			category: "Eletrônicos",
			price: 120,
			active: true,
		};
		const createdProduct = {
			id: 1,
			...mockProduct,
		};
		globalThis.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => createdProduct,
		});
		const result = await createProduct(mockProduct);
		expect(result.id).toBe(1);
		expect(result.name).toBe("Mouse");
		expect(globalThis.fetch).toHaveBeenCalledOnce();
	});
});