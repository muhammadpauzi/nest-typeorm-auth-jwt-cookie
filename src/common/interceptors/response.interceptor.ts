import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  RESPONSE_FLAT,
  RESPONSE_MESSAGE_METADATA,
} from '../decorators/response.decorator';
import { Reflector } from '@nestjs/core';

export type Response<T> = {
  success: boolean;
  data: T;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      //   map((res: unknown) => this.responseHandler(res, context)),
      //   catchError((err: HttpException) =>
      //     throwError(() => this.errorHandler(err, context)),
      //   ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    // const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;
    // response.status(status).send({
    //   success: false,
    //   message: exception.message,
    // });
  }

  responseHandler(res: any, context: ExecutionContext) {
    // use this if needed
    // const message = this.reflector.get<string>(
    //   RESPONSE_MESSAGE_METADATA,
    //   context.getHandler(),
    // );

    // const isFlat = this.reflector.get<boolean>(
    //   RESPONSE_FLAT,
    //   context.getHandler(),
    // );

    return {
      success: true,
      data: res,
    };
  }
}
