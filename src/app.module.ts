import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { configModule } from './configure.root';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TokenModule,
    MailModule,
    PositionModule,
    PositionModule,
  ],
})
export class AppModule {}
