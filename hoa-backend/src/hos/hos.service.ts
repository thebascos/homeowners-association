import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { InvoiceDTO } from 'src/auth/dto/invoice.dto';
import { CreateProductDTO, EditProductDTO } from 'src/auth/dto/product.dto';

@Injectable()
export class HosService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(ticket: CreateTicketDTO, hoId: string): Promise<any> {
    try {
      const newTicket = await this.prismaService.ticket.create({
        data: {
          description: ticket.description,
          category: ticket.category,
          hoId: hoId,
          createdAt: ticket.createdAt,
        },
      });
      return newTicket;
    } catch (error) {
      throw new Error('Failed to create a ticket');
    }
  }

  async updateTicket(ticketId: string, ticket: CreateTicketDTO): Promise<any> {
    try {
      const updatedTicket = await this.prismaService.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          description: ticket.description,
          category: ticket.category,
          status: ticket.status,
          createdAt: ticket.createdAt,
          resolution: ticket.resolution,
        },
      });
      return updatedTicket;
    } catch (error) {
      throw new Error('Failed to update ticket. Please try again later.');
    }
  }

  async getTicketsByUserId(userId: string) {
    try {
      const tickets = await this.prismaService.ticket.findMany({
        include: {
          ho: true,
        },
        where: {
          hoId: userId,
        },
      });
      return tickets;
    } catch (error) {
      throw new Error('Error fetching tickets.');
    }
  }
  async createInvoice(invoice: InvoiceDTO): Promise<any> {
    const newInvoice = await this.prismaService.invoice.create({
      data: {
        hoId: invoice.hoId,
        invoiceName: invoice.invoiceName,
        amount: invoice.amount,
      },
    });
    return newInvoice;
  }

  async editInvoice(
    invoiceId: string,
    updatedInvoiceData: Partial<InvoiceDTO>,
  ): Promise<InvoiceDTO | null> {
    // Find the existing invoice by ID
    const existingInvoice = await this.prismaService.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!existingInvoice) {
      // Invoice not found
      return null;
    }

    // Update the existing invoice with the new data
    const updatedInvoice = await this.prismaService.invoice.update({
      where: { id: invoiceId },
      data: updatedInvoiceData,
    });

    return updatedInvoice;
  }

  async getInvoicesByUserId(hoId: string, isAdmin: boolean) {
    try {
      if (isAdmin) {
        const invoices = await this.prismaService.invoice.findMany({
          include: {
            ho: true,
          },
        });
        return invoices;
      } else {
        const userInvoices = await this.prismaService.invoice.findMany({
          include: {
            ho: true,
          },
          where: {
            hoId: hoId,
          },
        });
        return userInvoices;
      }
    } catch (error) {
      throw new Error('An error occurred while fetching invoices.');
    }
  }

  async createProduct(product: CreateProductDTO, hoId: string): Promise<any> {
    const newProduct = await this.prismaService.product.create({
      data: {
        description: product.description,
        price: product.price,
        hoId: hoId,
      },
    });
    return newProduct;
  }

  async getProducts(hoId: string, allProducts?: boolean): Promise<any[]> {
    let products: any[];

    if (allProducts) {
      // Get all products
      products = await this.prismaService.product.findMany();
    } else {
      // Get products for a specific user
      products = await this.prismaService.product.findMany({
        where: {
          hoId: hoId,
        },
      });
    }
    console.log(products);
    return products;
  }
  async editProduct(
    productId: string,
    editProductDTO: EditProductDTO,
  ): Promise<any> {
    try {
      // Update the product
      const updatedProduct = await this.prismaService.product.update({
        where: {
          id: productId,
        },
        data: {
          description: editProductDTO.description,
          price: editProductDTO.price,
          status: editProductDTO.status,
        },
      });

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error editing product: ${error}`);
    }
  }
}
