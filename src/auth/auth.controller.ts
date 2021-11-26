import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { IUser } from 'src/user/interfaces/user.interface';

import { GetUser } from 'src/components/decorators/get-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<boolean> {
    console.warn('USER__', createUserDto);
    return this.authService.signUp(createUserDto);
  }

  @Get('/confirm')
  async confirm(
    @Query(new ValidationPipe()) query: ConfirmAccountDto,
  ): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @Post('/signIn')
  async signIn(
    @Body(new ValidationPipe())
    signInDto: SignInDto,
  ): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/forgotPassword')
  async forgotPassword(
    @Body(new ValidationPipe())
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch('/changePassword')
  @UseGuards(AuthGuard())
  async changePassword(
    @GetUser() user: IUser,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(user._id, changePasswordDto);
  }
}
