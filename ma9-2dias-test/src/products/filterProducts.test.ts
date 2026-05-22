import { describe, expect, it } from "vitest";
import { filterProducts } from "./filterProducts";
import type { Product } from "./products";

const products: Product[] = [
	{
		id: "10",
		name: "Notebook",
		category: "Eletrônicos",
		price: 3500.50,
		active: true,
	},
	{
		id: "20",
		name: "Camiseta",
		category: "Vestuário",
		price: 80,
		active: false,
	},
	{
		id: "30",
		name: "Mouse",
		category: "Eletrônicos",
		price: 120,
		active: true,
	},
];

describe("filterProducts", () => {
	it("deve filtrar os produtos por categoria", () => {
		const result = filterProducts(products, {
			category: "Eletrônicos",
			status: "all",
			minPrice: "",
			maxPrice: "",
		});

		expect(result).toHaveLength(2);
	});

	it("deve filtrar os produtos pelo status ativo", () => {
		const result = filterProducts(products, {
			category: "",
			status: "active",
			minPrice: "",
			maxPrice: "",
		});

		expect(result).toHaveLength(2);
	});

	it("deve filtrar os produtos por faixa de preço", () => {
		const result = filterProducts(products, {
			category: "",
			status: "all",
			minPrice: 100,
			maxPrice: 500,
		});

		expect(result).toHaveLength(1);
		expect(result[0].name).toBe("Mouse");
	});
});