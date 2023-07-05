import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Interfaces } from 'common-proto';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: Interfaces.battlepb.BATTLE_PACKAGE_NAME, // ['hero', 'hero2']
    protoPath: join(__dirname, '../node_modules/common-proto/dist/proto/battle.proto'), // ['./hero/hero.proto', './hero/hero2.proto'],
    url: 'localhost:5001',
  },
};
