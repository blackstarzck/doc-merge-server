import { BadRequestException, CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, finalize, tap } from "rxjs";
import { DataSource, QueryFailedError } from "typeorm";

@Injectable()
export class TransationInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    req.queryRunner = qr;

    return next.handle().pipe(
      catchError(async (e) => {
        await qr.rollbackTransaction();
        console.log("에러메시지입니다 → ", e);
        if (e instanceof QueryFailedError) {
          throw new BadRequestException("잘못된 입력값입니다: " + e.message);
        }
        throw new InternalServerErrorException("서버 오류 발생");
      }),
      finalize(() => {
        qr.commitTransaction()
          .then(() => qr.release())
          .catch((e) => console.log("Transaction commit/release error: ", e));
      }),
    );
  }
}
