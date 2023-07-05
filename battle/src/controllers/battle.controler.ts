import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BattleService } from 'providers';
import { Interfaces } from 'common-proto';

@Controller()
export class BattleController implements Interfaces.battlepb.BattleServiceController {
  constructor(private battleService: BattleService) {}

  @GrpcMethod(Interfaces.battlepb.BATTLE_SERVICE_NAME)
  findOne(req: Interfaces.battlepb.FindBattleByIdReq) {
    return this.battleService.findOne(req);
  }

  @GrpcMethod(Interfaces.battlepb.BATTLE_SERVICE_NAME)
  findAll(_: Interfaces.battlepb.EmptyReq) {
    return this.battleService.findAll();
  }

  @GrpcMethod(Interfaces.battlepb.BATTLE_SERVICE_NAME)
  createBattle(req: Interfaces.battlepb.CreateBattleReq, metadata: Metadata) {
    return this.battleService.createBattle(req, metadata);
  }
}
