import {
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
      // console.log(existingUser.email);
      return existingUser;
    } else {
      throw new UnauthorizedException('Wrong password!');
    }
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
      data: { name: user.name, email: user.email, password: user.password },
    });

    return newUser;
  }
}
