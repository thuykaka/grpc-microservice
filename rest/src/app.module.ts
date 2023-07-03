import { Module } from '@nestjs/common';
import { HeroModule } from 'modules';

@Module({
  imports: [HeroModule],
})
export class AppModule {}
