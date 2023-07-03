import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { HeroController } from 'controllers';
import { grpcClientOptions } from 'grpc-client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [HeroController],
})
export class HeroModule {}
