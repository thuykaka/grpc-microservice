import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Observable, of } from 'rxjs';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { GetHeroByIdReq } from 'models/req';
import { HeroService } from 'providers';
import { Controller } from '@nestjs/common';

@Controller()
export class HeroController {
  constructor(private heroService: HeroService) {}

  @GrpcMethod('HeroService')
  findAll() {
    return this.heroService.findAll();
  }

  @GrpcMethod('HeroService')
  findOne(req: GetHeroByIdReq, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.heroService.findOne(req);
  }

  @GrpcStreamMethod('HeroService')
  findMany(req$: Observable<GetHeroByIdReq>) {
    return this.heroService.findMany(req$);
  }
}
