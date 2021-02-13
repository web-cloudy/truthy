import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SanitizeUser } from '../decorators/sanitize-user.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.addUser(createUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  signIn(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @UseGuards(AuthGuard())
  @Get('/profile')
  @SanitizeUser()
  getProfile(@GetUser() user: User) {
    return user;
  }
}
