import { Module } from '@nestjs/common';
import { HeroModule, BattleModule } from 'modules';

@Module({
  imports: [HeroModule, BattleModule],
})
export class AppModule {}
