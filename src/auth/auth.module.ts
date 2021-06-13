import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { UniqueValidatorPipe } from '../common/pipes/unique-validator.pipe';
import { MailModule } from '../mail/mail.module';
import * as Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const jwtConfig = config.get('jwt');
const throttleConfig = config.get('throttle.login');
const redisConfig = config.get('queue');

const LoginThrottleFactory = {
  provide: 'LOGIN_THROTTLE',
  useFactory: () => {
    const redisClient = new Redis({
      enableOfflineQueue: false,
      host: redisConfig.host,
      port: redisConfig.port
    });

    return new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: throttleConfig.prefix,
      points: throttleConfig.limit,
      duration: 60 * 60 * 24 * 30, // Store number for 30 days since first fail
      blockDuration: throttleConfig.blockDuration
    });
  }
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forFeature([UserRepository]),
    MailModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UniqueValidatorPipe,
    LoginThrottleFactory
  ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
