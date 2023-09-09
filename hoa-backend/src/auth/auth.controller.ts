import { Body, Controller, Post } from '@nestjs/common';
import { LogInDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: LogInDTO): Promise<boolean> {
    return await this.authservice.validateUser(loginDTO);
  }

  @Post('/signup')
  async signup(@Body() signupDTO: SignUpDTO): Promise<void> {
    return this.authservice.addUser(signupDTO);
  }
}
