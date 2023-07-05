import { Injectable, Logger } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { GetAllHeroRes, GetHeroByIdReq, GetHeroByIdRes, Hero } from 'common-proto/dist/interfaces/hero.pb';

@Injectable()
export class HeroService {
  private logger = new Logger(HeroService.name);
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Max' },
  ];

  findOne(req: GetHeroByIdReq): GetHeroByIdRes {
    this.logger.log(`findOne req: ${JSON.stringify(req)}`);
    const hero = this.items.find(({ id }) => id === req.id);
    this.logger.log(`findOne res: ${JSON.stringify(hero)}`);

    if (!hero) {
      return {
        status: 'NOT_FOUND',
        error: [`not found hero-${req.id}`],
        data: null,
      };
    }

    return {
      status: 'OK',
      error: null,
      data: hero,
    };
  }

  findAll(): GetAllHeroRes {
    this.logger.log(`findAll req: {}`);
    const heroes = this.items;
    this.logger.log(`findAll res: ${JSON.stringify(heroes)}`);
    return {
      status: 'OK',
      error: null,
      data: heroes,
    };
  }

  findMany(req$: Observable<GetHeroByIdReq>): Observable<GetHeroByIdRes> {
    const hero$ = new Subject<GetHeroByIdRes>();
    return hero$.asObservable();
  }
}
