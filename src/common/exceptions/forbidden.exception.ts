import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(text: string) {
    super(`Forbidden: ${text}`, HttpStatus.FORBIDDEN);
  }
}
