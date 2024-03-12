import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdfsOAuth2StrategyService } from './adfs-provider.service';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [AdfsOAuth2StrategyService],
    exports: [AdfsOAuth2StrategyService]
})

export class AdfsProviderModule { }
