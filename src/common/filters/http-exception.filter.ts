import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    return response.status(exception.getStatus()).send({
      success: false,
      message: exception.message,
      errors:
        exception instanceof UnprocessableEntityException
          ? exception.getResponse()
          : undefined,
    });
  }
}
