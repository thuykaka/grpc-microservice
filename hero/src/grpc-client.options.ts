import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Interfaces } from 'common-proto';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: Interfaces.heropb.HERO_PACKAGE_NAME, // ['hero', 'hero2']
    protoPath: join(__dirname, '../node_modules/common-proto/dist/proto/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto'],
    url: 'localhost:5000',
  },
};
