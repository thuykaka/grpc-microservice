import { Controller, Get, Inject, OnModuleInit, Param, Query } from '@nestjs/common';
import { Observable, ReplaySubject, toArray } from 'rxjs';
import { Hero } from 'models/db';
import { GetHeroByIdReq } from 'models/req';
import { ClientGrpc } from '@nestjs/microservices';

interface HeroService {
  findOne(data: GetHeroByIdReq): Promise<Hero>;
  findAll(data: any): Promise<{ data: Hero[] }>;
  findMany(upstream: Observable<GetHeroByIdReq>): Observable<Hero>;
}

@Controller('hero')
export class HeroController implements OnModuleInit {
  private heroService: HeroService;
  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get()
  getAll(@Query('ids') ids?: string) {
    if (ids) {
      const idsArr = ids.split(',');
      const ids$ = new ReplaySubject<GetHeroByIdReq>();
      for (const id of idsArr) {
        ids$.next({ id: +id });
      }
      ids$.complete();

      const stream = this.heroService.findMany(ids$.asObservable());
      return stream.pipe(toArray());
    }
    return this.heroService.findAll({});
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.heroService.findOne({ id: +id });
  }
}
