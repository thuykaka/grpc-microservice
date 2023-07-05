import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Battle, CreateBattleReq, CreateBattleRes, GetAllBattleReq, GetAllBattleRes, GetBattleByIdReq, GetBattleByIdRes } from 'common-proto/dist/interfaces/battle.pb';
import { HeroServiceClient, HERO_SERVICE_NAME } from 'common-proto/dist/interfaces/hero.pb';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BattleService implements OnModuleInit {
  private heroService: HeroServiceClient;
  private logger = new Logger(BattleService.name);

  private readonly items: Battle[] = [
    { id: 1, name: 'battle-1', heroIds: [1, 2], winner: 1 },
    { id: 2, name: 'battle-2', heroIds: [1, 2], winner: 2 },
  ];

  constructor(@Inject('HERO_PACKAGE') private readonly heroClient: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.heroClient.getService<HeroServiceClient>(HERO_SERVICE_NAME);
  }

  findOne(req: GetBattleByIdReq): GetBattleByIdRes {
    this.logger.log(`findOne req: ${JSON.stringify(req)}`);
    const battle = this.items.find(({ id }) => id === req.id);
    this.logger.log(`findOne res: ${JSON.stringify(battle)}`);
    if (!battle) {
      return {
        status: 'NOT_FOUND',
        error: [`not found battle-${req.id}`],
        data: null,
      };
    }

    return {
      status: 'OK',
      error: null,
      data: battle,
    };
  }

  findAll(): GetAllBattleRes {
    this.logger.log(`findAll req: {}`);
    const battles = this.items;
    this.logger.log(`findAll res: ${JSON.stringify(battles)}`);
    return {
      status: 'OK',
      error: null,
      data: battles,
    };
  }

  async createBattle(req: CreateBattleReq, metadata: Metadata): Promise<CreateBattleRes> {
    this.logger.log(`createBattle req: ${JSON.stringify(req)}, metadata: ${JSON.stringify(metadata)}`);

    if (this.items.find(i => i.id === req.id)) {
      return {
        status: 'CONFLICT',
        error: ['confict'],
        data: null,
      };
    }

    for (let heroId of req.heroIds) {
      const hero = await lastValueFrom(this.heroService.findOne({ id: +heroId }, new Metadata()));

      if (!hero.data) {
        return {
          status: 'NOT_EXIST',
          error: [`NOT EXIST HERO WITH ID: ${heroId}`],
          data: null,
        };
      }
    }

    const battle = {
      ...req,
      winner: 0,
    };

    const res: CreateBattleRes = {
      status: 'OK',
      error: null,
      data: battle,
    };

    this.items.push(battle);

    return res;
  }
}
