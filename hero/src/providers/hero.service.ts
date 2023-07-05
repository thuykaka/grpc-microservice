import { Injectable, Logger } from '@nestjs/common';
import { Interfaces } from 'common-proto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class HeroService {
  private logger = new Logger(HeroService.name);
  private readonly items: Interfaces.Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe2' },
    { id: 3, name: 'Doe3' },
  ];

  findOne(req: Interfaces.HeroByIdReq): Promise<Interfaces.Hero> | Observable<Interfaces.Hero> | Interfaces.Hero {
    this.logger.log(`findOne req: ${JSON.stringify(req)}`);
    const res = this.items.find(({ id }) => id === req.id);
    this.logger.log(`findOne res: ${JSON.stringify(res)}`);
    return res;
  }

  findAll(): Promise<Interfaces.Heroes> | Observable<Interfaces.Heroes> | Interfaces.Heroes {
    this.logger.log(`findAll req: {}`);
    const res = this.items;
    this.logger.log(`findAll res: ${JSON.stringify(res)}`);
    return { heroes: res };
  }

  findMany(req$: Observable<Interfaces.HeroByIdReq>): Observable<Interfaces.Hero> {
    const hero$ = new Subject<Interfaces.Hero>();

    const onNext = (heroById: Interfaces.HeroByIdReq) => {
      const item = this.findOne(heroById);
      hero$.next(item as Interfaces.Hero);
    };

    const onComplete = () => hero$.complete();

    req$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
