import { HttpStatus } from '@nestjs/common';

export class UserFriendlyError extends Error {

  code: string;
  httpStatus: HttpStatus = HttpStatus.BAD_REQUEST;

  constructor(code: string, message?: string, httpStatus?: HttpStatus) {
    super(message);

    if (code) this.code = code;
    if (httpStatus) this.httpStatus = httpStatus;
  }
}
