import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDTO } from './dto/create-ticket.dto';

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
        },
      });
      return newTicket;
    } catch (error) {
      throw new Error('Failed to create a ticket');
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
      throw new Error('na log out or something?');
    }
  }
}
