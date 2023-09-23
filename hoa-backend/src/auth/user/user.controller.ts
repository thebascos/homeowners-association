import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getUserInfo(@Request() req) {
    const user = req.user;
    return user;
  }
}
