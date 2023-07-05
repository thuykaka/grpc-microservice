import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { Interfaces } from 'common-proto';
import { lastValueFrom } from 'rxjs';

@Controller('battle')
export class BattleController implements OnModuleInit {
  private battleService: Interfaces.battlepb.BattleServiceClient;
  constructor(@Inject('BATTLE_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.battleService = this.client.getService<Interfaces.battlepb.BattleServiceClient>(Interfaces.battlepb.BATTLE_SERVICE_NAME);
  }

  @Get()
  async getAll() {
    const data = await lastValueFrom(this.battleService.findAll({}, new Metadata()));
    return data.data;
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
