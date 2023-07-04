import { Observable } from 'rxjs';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { HeroService } from 'providers';
import { EmptyReq, HeroByIdReq, HeroServiceController, HERO_SERVICE_NAME } from 'interfaces';

@Controller()
export class HeroController implements HeroServiceController {
  constructor(private heroService: HeroService) {}

  @GrpcMethod(HERO_SERVICE_NAME)
  findAll(req: EmptyReq) {
    return this.heroService.findAll();
  }

  @GrpcMethod(HERO_SERVICE_NAME)
  findOne(req: HeroByIdReq, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.heroService.findOne(req);
  }

  @GrpcStreamMethod(HERO_SERVICE_NAME)
  findMany(req$: Observable<HeroByIdReq>) {
    return this.heroService.findMany(req$);
  }
}
