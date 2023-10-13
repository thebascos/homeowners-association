export interface InvoiceDTO {
  hoId: string;
  invoiceName: string;
  amount: number;
}
export interface GetInvoiceDTO {
  invoiceName: string;
  amount: number;
  ho: {
    houseCode: string;
  };
}
