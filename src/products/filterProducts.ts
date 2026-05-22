import type { Product } from "./products";

export type StatusFilter = "all" | "active" | "inactive";

export type ProductFilters = {
  category: string;
  status: StatusFilter;
  minPrice: number | "";
  maxPrice: number | "";
};

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    const matchesCategory =
      !filters.category || product.category === filters.category;

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" && product.active) ||
      (filters.status === "inactive" && !product.active);

    const matchesMinPrice =
      filters.minPrice === "" || product.price >= filters.minPrice;

    const matchesMaxPrice =
      filters.maxPrice === "" || product.price <= filters.maxPrice;

    return (
      matchesCategory &&
      matchesStatus &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
}