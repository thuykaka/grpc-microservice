import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { BattleServiceClient, BATTLE_SERVICE_NAME } from 'common-proto/dist/interfaces/battle.pb';

@Controller('battle')
export class BattleController implements OnModuleInit {
  private battleService: BattleServiceClient;
  constructor(@Inject('BATTLE_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.battleService = this.client.getService<BattleServiceClient>(BATTLE_SERVICE_NAME);
  }

  @Get()
  async getAll() {
    return this.battleService.findAll({}, new Metadata());
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.battleService.findOne({ id: +id }, new Metadata());
  }

  @Post()
  createBattle(@Body() body) {
    return this.battleService.createBattle(body, new Metadata());
  }
}
