import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { HosService } from './hos.service';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { InvoiceDTO } from 'src/auth/dto/invoice.dto';
import { Stripe } from 'stripe';

@Controller('hos')
export class HosController {
  constructor(private readonly hoservice: HosService) {}

  @Get('/:id')
  getho(@Param('id') id: string): string {
    if (id === '90348589347895789347587e4') {
      return 'princh buang';
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-ticket')
  createTicket(@Body() ticketData: CreateTicketDTO, @Request() req): void {
    this.hoservice.createTicket(ticketData, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/tickets')
  async getTickets(@Request() req) {
    return await this.hoservice.getTicketsByUserId(req.user.id);
  }

  @Put('/ticket/:id')
  async updateTicket(
    @Param('id') id: string,
    @Body() ticketData: CreateTicketDTO,
  ): Promise<any> {
    return this.hoservice.updateTicket(id, ticketData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-invoice')
  async createInvoice(@Body() invoiceData: InvoiceDTO) {
    return await this.hoservice.createInvoice(invoiceData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/invoice')
  async getInvoices(@Request() req) {
    return await this.hoservice.getInvoicesByUserId(
      req.user.id,
      req.user.admin,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create-checkout-session')
  async createCheckoutSession(@Body() invoice: InvoiceDTO) {
    try {
      // Initialize the Stripe client with your secret key
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16',
      });

      // Fetch the invoice details based on paymentData or invoice ID
      if (!invoice) {
        return { error: 'Invoice not found' };
      }

      // Create a Checkout Session with the invoice details
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'php',
              product_data: {
                name: invoice.invoiceName,
              },
              unit_amount: invoice.amount * 100, // Convert the amount to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4200/home/bills',
        cancel_url: 'http://localhost:4200/home/bills',
      });

      // Call the editInvoice service to update the invoice status to 'true'
      const updatedInvoice = await this.hoservice.editInvoice(invoice.id, {
        paid: true,
      });

      if (!updatedInvoice) {
        return { error: 'Invoice not found' };
      }

      return { checkoutSessionId: session.id };
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for proper error handling middleware to catch
    }
  }
}
