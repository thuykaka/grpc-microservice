import { Observable } from 'rxjs';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { HeroService } from 'providers';
import { Interfaces } from 'common-proto';

@Controller()
export class HeroController implements Interfaces.heropb.HeroServiceController {
  private logger = new Logger(HeroController.name);
  constructor(private heroService: HeroService) {}

  @GrpcMethod(Interfaces.heropb.HERO_SERVICE_NAME)
  findAll(_: Interfaces.heropb.EmptyReq) {
    return this.heroService.findAll();
  }

  @GrpcMethod(Interfaces.heropb.HERO_SERVICE_NAME)
  findOne(req: Interfaces.heropb.HeroByIdReq, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    this.logger.log(`findOne, metadata: ${JSON.stringify(metadata)}`);
    return this.heroService.findOne(req);
  }

  @GrpcStreamMethod(Interfaces.heropb.HERO_SERVICE_NAME)
  findMany(req$: Observable<Interfaces.heropb.HeroByIdReq>) {
    return this.heroService.findMany(req$);
  }
}
