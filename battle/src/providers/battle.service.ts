import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Interfaces } from 'common-proto';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class BattleService implements OnModuleInit {
  private heroService: Interfaces.heropb.HeroServiceClient;
  private logger = new Logger(BattleService.name);

  private readonly items: Interfaces.battlepb.FindBattleByIdRes[] = [
    { id: 1, name: 'battle-1', heroIds: [1, 2], winner: 1 },
    { id: 2, name: 'battle-2', heroIds: [1, 2], winner: 2 },
  ];

  constructor(@Inject('HERO_PACKAGE') private readonly heroClient: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.heroClient.getService<Interfaces.heropb.HeroServiceClient>(Interfaces.heropb.HERO_SERVICE_NAME);
  }

  findOne(
    req: Interfaces.battlepb.FindBattleByIdReq
  ): Promise<Interfaces.battlepb.FindBattleByIdRes> | Observable<Interfaces.battlepb.FindBattleByIdRes> | Interfaces.battlepb.FindBattleByIdRes {
    this.logger.log(`findOne req: ${JSON.stringify(req)}`);
    const res = this.items.find(({ id }) => id === req.id);
    this.logger.log(`findOne res: ${JSON.stringify(res)}`);
    return res;
  }

  findAll(): Promise<Interfaces.battlepb.FindAllBattleRes> | Observable<Interfaces.battlepb.FindAllBattleRes> | Interfaces.battlepb.FindAllBattleRes {
    this.logger.log(`findAll req: {}`);
    const res = this.items;
    this.logger.log(`findAll res: ${JSON.stringify(res)}`);
    return { data: res };
  }

  async createBattle(req: Interfaces.battlepb.CreateBattleReq, metadata: Metadata): Promise<Interfaces.battlepb.CreateBattleRes> {
    this.logger.log(`createBattle req: ${JSON.stringify(req)}, metadata: ${JSON.stringify(metadata)}`);

    if (this.items.find(i => i.id === req.id)) {
      return {
        status: 0,
        error: 'CONFLICT',
        id: null,
      };
    }

    for (let heroId of req.heroIds) {
      let hero;
      try {
        hero = await lastValueFrom(this.heroService.findOne({ id: +heroId }, new Metadata()));
      } catch (err) {}
      this.logger.log(`hero: ${JSON.stringify(hero)}`);
      if (!hero) {
        return {
          status: 0,
          error: `NOT EXIST HERO WITH ID: ${heroId}`,
          id: null,
        };
      }
    }
    
    const item: Interfaces.battlepb.CreateBattleRes = {
      status: 1,
      error: null,
      id: 3,
    };
    this.items.push({ ...req, winner: 0 });
    return item;
  }
}
