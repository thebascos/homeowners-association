export interface CreateProductDTO {
  description: string;
  price: number;
  hoId: string;
}
export interface CreateOrderDTO {
  productId: string;
  quantity: number;
  amount: number;
  isPaid: boolean;
  id: string;
}

export interface EditProductDTO {
  description: string;
  price: number;
  status: ProductStatus;
}
export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD_OUT = 'SOLD OUT',
}
