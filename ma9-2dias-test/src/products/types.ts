export type Product = {
  id: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  active: boolean;
};

export type ProductFormData = Omit<Product, "id"> // Omit é um tipo utilitário do TypeScript que constrói um tipo omitindo as propriedades especificadas de outro tipo. Neste caso, estamos criando um novo tipo ProductFormData que tem todas as propriedades do tipo Product, exceto a propriedade id.