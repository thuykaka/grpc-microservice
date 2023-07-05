import { Injectable, Logger } from '@nestjs/common';
import { Interfaces } from 'common-proto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class HeroService {
  private logger = new Logger(HeroService.name);
  private readonly items: Interfaces.heropb.Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe2' },
    { id: 3, name: 'Doe3' },
  ];

  findOne(req: Interfaces.heropb.HeroByIdReq): Promise<Interfaces.heropb.Hero> | Observable<Interfaces.heropb.Hero> | Interfaces.heropb.Hero {
    this.logger.log(`findOne req: ${JSON.stringify(req)}`);
    const res = this.items.find(({ id }) => id === req.id);
    this.logger.log(`findOne res: ${JSON.stringify(res)}`);
    return res;
  }

  findAll(): Promise<Interfaces.heropb.Heroes> | Observable<Interfaces.heropb.Heroes> | Interfaces.heropb.Heroes {
    this.logger.log(`findAll req: {}`);
    const res = this.items;
    this.logger.log(`findAll res: ${JSON.stringify(res)}`);
    return { heroes: res };
  }

  findMany(req$: Observable<Interfaces.heropb.HeroByIdReq>): Observable<Interfaces.heropb.Hero> {
    const hero$ = new Subject<Interfaces.heropb.Hero>();

    const onNext = (heroById: Interfaces.heropb.HeroByIdReq) => {
      const item = this.findOne(heroById);
      hero$.next(item as Interfaces.heropb.Hero);
    };

    const onComplete = () => hero$.complete();

    req$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
