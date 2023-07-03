import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Hero } from 'models/db';
import { GetHeroByIdReq } from 'models/req';

@Injectable()
export class HeroService {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe2' },
  ];

  findOne(req: GetHeroByIdReq) {
    return this.items.find(({ id }) => id === req.id);
  }

  findAll() {
    return { data: this.items };
  }

  findMany(req$: Observable<GetHeroByIdReq>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: GetHeroByIdReq) => {
      const item = this.findOne(heroById);
      hero$.next(item);
    };

    const onComplete = () => hero$.complete();

    req$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
