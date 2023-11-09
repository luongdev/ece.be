import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LdapService } from './ldap-provider.service';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [LdapService],
    exports: [LdapService]
})

export class LdapModule { }
