import {
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameAlreadyExist implements ValidatorConstraintInterface {
  constructor(protected readonly authService: AuthService) {}

  async validate(text: string) {
    const user = await this.authService.findBy('username', text);
    return !user;
  }
}
