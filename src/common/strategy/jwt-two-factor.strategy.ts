import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StatusCodesList } from '../../common/constants/status-codes-list.constants';
import { CustomHttpException } from '../../exception/custom-http.exception';
import { JwtPayloadDto } from '../../auth/dto/jwt-payload.dto';
import { UserEntity } from '../../auth/entity/user.entity';
import { UserRepository } from '../../auth/user.repository';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor'
) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        }
      ]),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    });
  }

  async validate(payload: JwtPayloadDto): Promise<UserEntity> {
    const { isTwoFAAuthenticated, sub } = payload;
    const user = await this.userRepository.findOne(Number(sub), {
      relations: ['role', 'role.permission']
    });
    if (!user.isTwoFAEnabled) {
      return user;
    }
    if (isTwoFAAuthenticated) {
      return user;
    }
    throw new CustomHttpException(
      'otpRequired',
      HttpStatus.FORBIDDEN,
      StatusCodesList.OtpRequired
    );
  }
}
