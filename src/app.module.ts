import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseProviderModule } from '@shared/providers';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerProviderModule } from './shared/providers';
import { LdapModule } from './shared/providers/ldap/ldap-provider.module';
import { LoginModule } from './login/login.module';
import { JwtMiddleware } from './auth/auth-middleware';
import { LogoutModule } from './logout/logout.module';
import { ConfigColumnsModule } from './config-columns/config-columns.module';
import { ManageEmailModule } from './manage-email/manage-email.module';
import { EmailAttachmentModule } from './email-attachment/email-attachment.module';
import { ManageUserModule } from './manage-user/manage-user.module';
import { ManageQueueModule } from './manage-queue/manage-queue.module';
import { AdfsProviderModule } from './shared/providers/adfs/adfs-provider.module';
import { ManageUserLocalModule } from './manage-user-local/manage-user-local.module';
import { ImportExcelModule } from './import-excel/import-excel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    DatabaseProviderModule,
    LoggerProviderModule,
    LdapModule,
    LoginModule,
    LogoutModule,
    ConfigColumnsModule,
    ManageEmailModule,
    EmailAttachmentModule,
    ManageUserModule,
    ManageQueueModule,
    AdfsProviderModule,
    ManageUserLocalModule,
    ImportExcelModule,
  ],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/api/login', method: RequestMethod.POST },
        { path: '/api/auth/refresh-token', method: RequestMethod.POST },
      ) // Exclude login route
      .forRoutes('*'); // Apply the middleware to all routes
  }
}