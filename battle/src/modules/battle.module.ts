import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Interfaces } from 'common-proto';
import { BattleController } from 'controllers';
import { join } from 'path';
import { BattleService } from 'providers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: Interfaces.heropb.HERO_PACKAGE_NAME, // ['hero', 'hero2']
          protoPath: join(__dirname, '../../node_modules/common-proto/dist/proto/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto'],
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
