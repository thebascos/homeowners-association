import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport-config';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'imong mama',
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
