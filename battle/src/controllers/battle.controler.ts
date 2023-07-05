import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BattleServiceController, BATTLE_SERVICE_NAME, CreateBattleReq, GetAllBattleReq, GetBattleByIdReq } from 'common-proto/dist/interfaces/battle.pb';
import { BattleService } from 'providers';

@Controller()
export class BattleController implements BattleServiceController {
  constructor(private battleService: BattleService) {}

  @GrpcMethod(BATTLE_SERVICE_NAME)
  findOne(req: GetBattleByIdReq) {
    return this.battleService.findOne(req);
  }

  @GrpcMethod(BATTLE_SERVICE_NAME)
  findAll(_: GetAllBattleReq) {
    return this.battleService.findAll();
  }

  @GrpcMethod(BATTLE_SERVICE_NAME)
  createBattle(req: CreateBattleReq, metadata: Metadata) {
    return this.battleService.createBattle(req, metadata);
  }
}
