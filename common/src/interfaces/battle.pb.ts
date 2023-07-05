/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "battle";

export interface FindBattleByIdReq {
  id: number;
}

export interface FindBattleByIdRes {
  id: number;
  name: string;
  heroIds: number[];
  winner: number;
}

export interface EmptyReq {
}

export interface FindAllBattleRes {
  data: FindBattleByIdRes[];
}

export interface CreateBattleReq {
  id: number;
  name: string;
  heroIds: number[];
}

export interface CreateBattleRes {
  status: number;
  error: string;
  id: number;
}

export const BATTLE_PACKAGE_NAME = "battle";

export interface BattleServiceClient {
  findOne(request: FindBattleByIdReq, metadata: Metadata, ...rest: any): Observable<FindBattleByIdRes>;

  findAll(request: EmptyReq, metadata: Metadata, ...rest: any): Observable<FindAllBattleRes>;

  createBattle(request: CreateBattleReq, metadata: Metadata, ...rest: any): Observable<CreateBattleRes>;
}

export interface BattleServiceController {
  findOne(
    request: FindBattleByIdReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<FindBattleByIdRes> | Observable<FindBattleByIdRes> | FindBattleByIdRes;

  findAll(
    request: EmptyReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<FindAllBattleRes> | Observable<FindAllBattleRes> | FindAllBattleRes;

  createBattle(
    request: CreateBattleReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<CreateBattleRes> | Observable<CreateBattleRes> | CreateBattleRes;
}

export function BattleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "findAll", "createBattle"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BattleService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BattleService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const BATTLE_SERVICE_NAME = "BattleService";
