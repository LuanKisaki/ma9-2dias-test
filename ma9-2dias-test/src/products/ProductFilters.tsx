type StatusFilter = "all" | "active" | "inactive";

type ProductFiltersProps = {
	categoryFilter: string;
	statusFilter: StatusFilter;
	minPriceFilter: number | "";
	maxPriceFilter: number | "";
	categoryOptions: string[];
	onCategoryChange: (value: string) => void;
	onStatusChange: (value: StatusFilter) => void;
	onMinPriceChange: (value: number | "") => void;
	onMaxPriceChange: (value: number | "") => void;
};

export function ProductFilters({
	categoryFilter,
	statusFilter,
	minPriceFilter,
	maxPriceFilter,
	categoryOptions,
	onCategoryChange,
	onStatusChange,
	onMinPriceChange,
	onMaxPriceChange,
}: ProductFiltersProps) {
	return (
		<section className="filters" style={{ marginBottom: "2rem" }}>
			<h2>Filtros</h2>

			<div className="filters__content">
				<select
					value={categoryFilter}
					onChange={(e) => onCategoryChange(e.target.value)}
				>
					<option value="">Todas as categorias</option>
					{categoryOptions.map((cat) => (
						<option key={cat} value={cat}>{cat}</option>
					))}
				</select>

				<select
					value={statusFilter}
					onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
				>
					<option value="all">Todos os status</option>
					<option value="active">Ativos</option>
					<option value="inactive">Inativos</option>
				</select>

				<input
					type="number"
					placeholder="Preço mínimo"
					value={minPriceFilter}
					min={0}
					onChange={(e) =>
						onMinPriceChange(e.target.value === "" ? "" : Number(e.target.value))
					}
				/>
				<span>até</span>
				<input
					type="number"
					placeholder="Preço máximo"
					value={maxPriceFilter}
					min={0}
					onChange={(e) =>
						onMaxPriceChange(e.target.value === "" ? "" : Number(e.target.value))
					}
				/>
			</div>
		</section>
	);
}