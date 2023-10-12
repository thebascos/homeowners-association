import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly authservice: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getUserInfo(@Request() req) {
    const user = req.user;
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/tickets')
  async getTickets(@Request() req) {
    return await this.authservice.getTicketsByUserId(
      req.user.id,
      req.user.admin,
    );
  }
}
