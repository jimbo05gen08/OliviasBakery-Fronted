export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
}

export interface ProductItemCart {
  product: Product;
  quantity: number;
}
