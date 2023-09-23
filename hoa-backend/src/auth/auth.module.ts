import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SamMiole',
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
