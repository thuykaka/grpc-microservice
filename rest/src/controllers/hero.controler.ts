import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable, ReplaySubject, toArray } from 'rxjs';
import { Controller, Get, Inject, OnModuleInit, Param, Query } from '@nestjs/common';
import { Hero, HeroByIdReq, HeroServiceClient, HERO_SERVICE_NAME } from 'interfaces';

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
      const ids$ = new ReplaySubject<HeroByIdReq>();
      for (const id of idsArr) {
        ids$.next({ id: +id });
      }
      ids$.complete();
      const stream = this.heroService.findMany(ids$.asObservable(), new Metadata());
      return stream.pipe(toArray());
    }
    return (await lastValueFrom(this.heroService.findAll({}, new Metadata()))).heroes;
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id }, new Metadata());
  }
}
