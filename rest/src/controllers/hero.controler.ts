import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, ReplaySubject, toArray } from 'rxjs';
import { Controller, Get, Inject, OnModuleInit, Param, Query } from '@nestjs/common';
import { GetHeroByIdReq, HeroServiceClient, HERO_SERVICE_NAME } from 'common-proto/dist/interfaces/hero.pb';

@Controller('hero')
export class HeroController implements OnModuleInit {
  private heroService: HeroServiceClient;
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroServiceClient>(HERO_SERVICE_NAME);
  }

  @Get()
  async getAll(@Query('ids') ids?: string) {
    if (ids) {
      const idsArr = ids.split(',');
      const ids$ = new ReplaySubject<GetHeroByIdReq>();
      for (const id of idsArr) {
        ids$.next({ id: +id });
      }
      ids$.complete();
      const stream = this.heroService.findMany(ids$.asObservable(), new Metadata());
      return stream.pipe(toArray());
    }
    return this.heroService.findAll({}, new Metadata());
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.heroService.findOne({ id: +id }, new Metadata());
  }
}
