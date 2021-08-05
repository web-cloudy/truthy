import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionTitleList } from '../common/constants/exception-title-list.constants';
import { StatusCodesList } from '../common/constants/status-codes-list.constants';

export class NotFoundException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || ExceptionTitleList.NotFound,
        code: code || StatusCodesList.NotFound,
        statusCode: HttpStatus.NOT_FOUND,
        error: true,
      },
      HttpStatus.NOT_FOUND
    );
  }
}
