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
    ManageEmailModule
  ],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/api/login', method: RequestMethod.POST }
      ) // Exclude login route
      .forRoutes('*'); // Apply the middleware to all routes
  }
}