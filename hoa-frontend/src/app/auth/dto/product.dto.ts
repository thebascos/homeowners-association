export interface CreateProductDTO {
  description: string;
  price: number;
  hoId: string;
}
export interface ProductDTO {
  description: string;
  price: number;
  status: ProductStatus;
  ho: {
    houseCode: string;
  };
  id: string;
  editing: boolean;
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
