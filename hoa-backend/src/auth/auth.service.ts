import { Injectable } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  public async validateUser(user: LogInDTO) {
    const existingUser = await this.prisma.hO.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      // User with the provided email does not exist
      return false; // or throw an error if you prefer
    }
    if (user.password === existingUser.password) {
      return true; // Password is correct, return the user object
    } else {
      return false; // Password is incorrect
    }
  }
  public async addUser(user: SignUpDTO) {
    if (user.password.length < 6 && !user.name) {
      throw new Error('dapat greater than six choy aysig binogo');
    }
    await this.prisma.hO.create({
      data: { name: user.name, email: user.email, password: user.password },
    });
  }
  public findUser(id: string) {
    this.prisma.hO.findUnique({ where: { id } });
  }
}
