import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { MailModule } from 'src/mail/mail.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { configModule } from '../configure.root';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    TokenModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'MySuperSecretString',
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
