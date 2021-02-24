import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { SignOptions } from 'jsonwebtoken';

import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { MailService } from 'src/mail/mail.service';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { SignInDto } from './dto/signin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

import { statusEnum } from 'src/user/enums/status.enum';
import { userSensitiveFieldsEnum } from 'src/user/enums/protected-fields.enum';

import { IUser } from 'src/user/interfaces/user.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { ChangePasswordDto } from './dto/change-password.dto';

import moment = require('moment');

@Injectable()
export class AuthService {
  private readonly clienAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clienAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto);
    await this.sendConfirmation(user);
    return true;
  }

  async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== statusEnum.active) {
        throw new MethodNotAllowedException();
      }

      const token = await this.signUser(user);

      const readableUser = user.toObject() as Partial<IReadableUser>;
      readableUser.acessToken = token;

      return _.omit<any>(
        readableUser,
        Object.values(userSensitiveFieldsEnum),
      ) as IReadableUser;
    }

    throw new BadRequestException();
  }

  async signUser(user: IUser, withStatusCheck = true): Promise<string> {
    if (withStatusCheck && user.status !== statusEnum.active) {
      throw new MethodNotAllowedException();
    }

    const tokenPayload: ITokenPayload = {
      _id: user._id,
      status: user.status,
      roles: user.roles,
    };

    const token = await this.generateToken(tokenPayload);
    const expireAt = moment().add(1, 'day').toISOString();

    await this.saveToken({
      token,
      expireAt,
      uId: user._id,
    });

    return token;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const password = await this.userService.hashPassword(changePasswordDto._id);

    await this.userService.update(userId, { password });
    await this.tokenService.deleteAll(userId);
    return true;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    const token = await this.signIn(user);
    const forgotLink = `${this.clienAppUrl}/auth/forgotPassword?token=${token}`;

    await this.mailService.send({
      from: this.configService.get<string>('JS_CODE_MAIL'),
      to: user.email,
      subject: 'Forgot Password',
      html: `
          <h3>Hello ${user.firstName}!</h3>
          <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
      `,
    });
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.find(data.id);

    await this.tokenService.delete(data.id, token);

    if (user && user.status == statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }

    throw new BadRequestException('Confirmation error');
  }

  async sendConfirmation(user: IUser) {
    const token = await this.signUser(user, false);
    const confirmLink = `${this.clienAppUrl}/auth/confirm?token=${token}`;

    await this.mailService.send({
      from: this.configService.get<string>('JS_CODE_MAIL'),
      to: user.email,
      subject: 'Verify User',
      html: `
        <h3>Hello ${user.firstName}!</h3>
        <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
      `,
    });
  }

  private async generateToken(
    data: ITokenPayload,
    options?: SignOptions,
  ): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token) as ITokenPayload;
      const tokenExists = await this.tokenService.exists(data._id, token);

      if (tokenExists) {
        return data;
      }

      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto);
    return userToken;
  }
}
