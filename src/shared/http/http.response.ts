import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface ResponseBase<T> {
  success: boolean;
  errors?: { code?: string, message?: string; }[];
  message?: string;
  data?: T;
  totalData?: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseBase<T> | string> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseBase<T> | string> {
    return next
      .handle()
      .pipe(
        map(data => {
          if (data['raw']) return data['raw'];

          return ({
            code: HttpStatus.OK,
            success: true,
            data: data && data.listData ? data.listData : data,
            totalData: data && data.totalData ? data.totalData : undefined,
          } as ResponseBase<any>);
        })
      );
  }
}
