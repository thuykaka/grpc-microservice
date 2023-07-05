import { Observable } from 'rxjs';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { HeroService } from 'providers';
import { Interfaces } from 'common-proto';

@Controller()
export class HeroController implements Interfaces.HeroServiceController {
  private logger = new Logger(HeroController.name);
  constructor(private heroService: HeroService) {}

  @GrpcMethod(Interfaces.HERO_SERVICE_NAME)
  findAll(_: Interfaces.EmptyReq) {
    return this.heroService.findAll();
  }

  @GrpcMethod(Interfaces.HERO_SERVICE_NAME)
  findOne(req: Interfaces.HeroByIdReq, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    this.logger.log(`findOne, metadata: ${JSON.stringify(metadata)}`);
    return this.heroService.findOne(req);
  }

  @GrpcStreamMethod(Interfaces.HERO_SERVICE_NAME)
  findMany(req$: Observable<Interfaces.HeroByIdReq>) {
    return this.heroService.findMany(req$);
  }
}
