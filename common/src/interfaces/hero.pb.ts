/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero";

export interface Hero {
  id: number;
  name: string;
}

export interface GetHeroByIdReq {
  id: number;
}

export interface GetHeroByIdRes {
  status: string;
  error: string[];
  data: Hero | undefined;
}

export interface GetAllHeroReq {
}

export interface GetAllHeroRes {
  status: string;
  error: string[];
  data: Hero[];
}

export const HERO_PACKAGE_NAME = "hero";

export interface HeroServiceClient {
  findOne(request: GetHeroByIdReq, metadata: Metadata, ...rest: any): Observable<GetHeroByIdRes>;

  findAll(request: GetAllHeroReq, metadata: Metadata, ...rest: any): Observable<GetAllHeroRes>;

  findMany(request: Observable<GetHeroByIdReq>, metadata: Metadata, ...rest: any): Observable<GetHeroByIdRes>;
}

export interface HeroServiceController {
  findOne(
    request: GetHeroByIdReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetHeroByIdRes> | Observable<GetHeroByIdRes> | GetHeroByIdRes;

  findAll(
    request: GetAllHeroReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetAllHeroRes> | Observable<GetAllHeroRes> | GetAllHeroRes;

  findMany(request: Observable<GetHeroByIdReq>, metadata: Metadata, ...rest: any): Observable<GetHeroByIdRes>;
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
