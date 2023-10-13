import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { EditUserDTO } from './dto/edit-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(user: LogInDTO) {
    const existingUser = await this.prisma.hO.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new NotFoundException('User does not exist');
    }

    if (user.password === existingUser.password) {
      return existingUser;
    } else {
      throw new UnauthorizedException('Wrong password!');
    }
  }

  public async validateUserById(email: string) {
    const user = await this.prisma.hO.findUnique({
      where: { email: email },
    });
    return user;
  }

  async generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async addUser(user: SignUpDTO) {
    const existingUser = await this.prisma.hO.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email address is already in use',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.prisma.hO.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        houseCode: user.houseCode,
      },
    });

    return newUser;
  }

  async updateUser(userId: string, user: EditUserDTO) {
    const existingUser = await this.prisma.hO.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const emailExists = await this.prisma.hO.findUnique({
      where: { email: user.email },
    });

    if (emailExists && emailExists.id !== userId) {
      throw new ConflictException('Email already exists');
    }
    if (user.name) {
      existingUser.name = user.name;
    }
    if (user.email) {
      existingUser.email = user.email;
    }
    if (user.password) {
      existingUser.password = user.password;
    }

    const updatedUser = await this.prisma.hO.update({
      where: { id: userId },
      data: existingUser,
    });

    return updatedUser;
  }

  async getTicketsByUserId(userId: string, isAdmin: boolean) {
    try {
      if (isAdmin) {
        // If the user is an admin, return all tickets with information about who created each ticket
        const tickets = await this.prisma.ticket.findMany({
          include: {
            ho: true, // Include the user who created the ticket (HO model)
          },
        });
        return tickets;
      } else {
        // If the user is not an admin, return tickets created by the user with information about who created each ticket
        const userTickets = await this.prisma.ticket.findMany({
          include: {
            ho: true, // Include the user who created the ticket (HO model)
          },
          where: {
            hoId: userId,
          },
        });
        return userTickets;
      }
    } catch (error) {
      throw new Error('An error occurred while fetching tickets.');
    }
  }
  async getAllUsers() {
    const regularUsers = await this.prisma.hO.findMany({
      where: {
        admin: false,
      },
    });
    return regularUsers;
  }

  async getInvoicesByUserId(hoId: string, isAdmin: boolean) {
    try {
      if (isAdmin) {
        const invoices = await this.prisma.invoice.findMany({
          include: {
            ho: true,
          },
        });
        return invoices;
      } else {
        const userInvoices = await this.prisma.invoice.findMany({
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
