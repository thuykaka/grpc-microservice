import { Observable } from 'rxjs';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { GetAllHeroReq, GetHeroByIdReq, HeroServiceController, HERO_SERVICE_NAME } from 'common-proto/dist/interfaces/hero.pb';
import { HeroService } from 'providers';

@Controller()
export class HeroController implements HeroServiceController {
  private logger = new Logger(HeroController.name);
  constructor(private heroService: HeroService) {}

  @GrpcMethod(HERO_SERVICE_NAME)
  findAll(_: GetAllHeroReq) {
    return this.heroService.findAll();
  }

  @GrpcMethod(HERO_SERVICE_NAME)
  findOne(req: GetHeroByIdReq, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    this.logger.log(`findOne, metadata: ${JSON.stringify(metadata)}`);
    return this.heroService.findOne(req);
  }

  @GrpcStreamMethod(HERO_SERVICE_NAME)
  findMany(req$: Observable<GetHeroByIdReq>) {
    return this.heroService.findMany(req$);
  }
}
