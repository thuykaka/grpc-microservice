/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero";

export interface HeroByIdReq {
  id: number;
}

export interface EmptyReq {
}

export interface Hero {
  id: number;
  name: string;
}

export interface Heroes {
  heroes: Hero[];
}

export const HERO_PACKAGE_NAME = "hero";

export interface HeroServiceClient {
  findOne(request: HeroByIdReq, metadata: Metadata, ...rest: any): Observable<Hero>;

  findAll(request: EmptyReq, metadata: Metadata, ...rest: any): Observable<Heroes>;

  findMany(request: Observable<HeroByIdReq>, metadata: Metadata, ...rest: any): Observable<Hero>;
}

export interface HeroServiceController {
  findOne(request: HeroByIdReq, metadata: Metadata, ...rest: any): Promise<Hero> | Observable<Hero> | Hero;

  findAll(request: EmptyReq, metadata: Metadata, ...rest: any): Promise<Heroes> | Observable<Heroes> | Heroes;

  findMany(request: Observable<HeroByIdReq>, metadata: Metadata, ...rest: any): Observable<Hero>;
}

export function HeroServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HeroService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["findMany"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HeroService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_SERVICE_NAME = "HeroService";
