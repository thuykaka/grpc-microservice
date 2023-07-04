import { Injectable, Logger } from '@nestjs/common';
import { Hero, HeroByIdReq, Heroes } from 'interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class HeroService {
  private logger = new Logger(HeroService.name);
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe2' },
    { id: 3, name: 'Doe3' },
  ];

  findOne(req: HeroByIdReq): Promise<Hero> | Observable<Hero> | Hero {
    this.logger.log(`findOne req: ${JSON.stringify(req)}`);
    const res = this.items.find(({ id }) => id === req.id);
    this.logger.log(`findOne res: ${JSON.stringify(res)}`);
    return res;
  }

  findAll(): Promise<Heroes> | Observable<Heroes> | Heroes {
    this.logger.log(`findAll req: {}`);
    const res = this.items;
    this.logger.log(`findAll res: ${JSON.stringify(res)}`);
    return { heroes: res };
  }

  findMany(req$: Observable<HeroByIdReq>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroByIdReq) => {
      const item = this.findOne(heroById);
      hero$.next(item as Hero);
    };

    const onComplete = () => hero$.complete();

    req$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
