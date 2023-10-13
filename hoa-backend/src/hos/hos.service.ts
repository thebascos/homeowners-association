import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { InvoiceDTO } from 'src/auth/dto/invoice.dto';

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
}
