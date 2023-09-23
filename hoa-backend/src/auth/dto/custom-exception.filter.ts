import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException, UnauthorizedException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(
    exception: NotFoundException | UnauthorizedException | HttpException,

    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({ message });
  }
}
