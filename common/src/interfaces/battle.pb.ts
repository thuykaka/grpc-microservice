/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "battle";

export interface Battle {
  id: number;
  name: string;
  heroIds: number[];
  winner: number;
}

export interface GetBattleByIdReq {
  id: number;
}

export interface GetBattleByIdRes {
  status: string;
  error: string[];
  data: Battle | undefined;
}

export interface GetAllBattleReq {
}

export interface GetAllBattleRes {
  status: string;
  error: string[];
  data: Battle[];
}

export interface CreateBattleReq {
  id: number;
  name: string;
  heroIds: number[];
}

export interface CreateBattleRes {
  status: string;
  error: string[];
  data: Battle | undefined;
}

export const BATTLE_PACKAGE_NAME = "battle";

export interface BattleServiceClient {
  findOne(request: GetBattleByIdReq, metadata: Metadata, ...rest: any): Observable<GetBattleByIdRes>;

  findAll(request: GetAllBattleReq, metadata: Metadata, ...rest: any): Observable<GetAllBattleRes>;

  createBattle(request: CreateBattleReq, metadata: Metadata, ...rest: any): Observable<CreateBattleRes>;
}

export interface BattleServiceController {
  findOne(
    request: GetBattleByIdReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetBattleByIdRes> | Observable<GetBattleByIdRes> | GetBattleByIdRes;

  findAll(
    request: GetAllBattleReq,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetAllBattleRes> | Observable<GetAllBattleRes> | GetAllBattleRes;

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
