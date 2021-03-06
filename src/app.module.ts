import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { configModule } from './configure.root';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { PositionModule } from './position/position.module';
import { LeadModule } from './lead/lead.module';
import { MarkerModule } from './marker/marker.module';

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
    LeadModule,
    MarkerModule,
  ],
})
export class AppModule {}
