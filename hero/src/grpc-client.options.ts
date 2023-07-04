import { ClientOptions, Transport } from '@nestjs/microservices';
import { HERO_PACKAGE_NAME } from 'interfaces';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: HERO_PACKAGE_NAME, // ['hero', 'hero2']
    protoPath: join(__dirname, './proto/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto'],
    url: 'localhost:5000',
  },
};
