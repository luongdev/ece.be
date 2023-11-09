import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseBase } from './http.response';
import { UserFriendlyError } from '../error/user-friendly.error';

@Catch()
export class HttpStatusFilter implements ExceptionFilter {

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
  }

  catch(exception: Error, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const errors = [];
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof UserFriendlyError) {
      httpStatus = exception.httpStatus;
      errors.push({
        code: exception.code,
        message: exception.message,
      });
    } else if (exception instanceof BadRequestException) {
      httpStatus = exception.getStatus();

      const responseEx = exception.getResponse().valueOf();
      if (responseEx['message'] instanceof Array) {
        for (const msg of responseEx['message']) {
          errors.push({ code: 'BAD_REQUEST', message: msg });
        }
      } else {
        errors.push({ code: 'BAD_REQUEST', message: responseEx['message'] });
      }
    } else if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();

      const responseEx = exception.getResponse().valueOf();
      if (responseEx['message'] instanceof Array) {
        for (const msg of responseEx['message']) {
          errors.push({ code: 'INTERNAL_SERVER_ERROR', message: msg });
        }
      } else {
        errors.push({ code: 'INTERNAL_SERVER_ERROR', message: responseEx['message'] });
      }
    }

    httpAdapter.reply(ctx.getResponse(), ({
      success: false,
      errors,
    } as ResponseBase<any>), httpStatus);
  }

}
