import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Interfaces } from 'common-proto';
import { BattleController } from 'controllers';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BATTLE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: Interfaces.battlepb.BATTLE_PACKAGE_NAME, // ['hero', 'hero2']
          protoPath: join(__dirname, '../../node_modules/common-proto/dist/proto/battle.proto'), // ['./hero/hero.proto', './hero/hero2.proto'],
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [BattleController],
})
export class BattleModule {}
