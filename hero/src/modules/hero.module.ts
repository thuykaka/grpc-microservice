import { Module } from '@nestjs/common';
import { HeroController } from 'controllers';
import { HeroService } from 'providers';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
