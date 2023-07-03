import { Global, Module } from '@nestjs/common';
import { HeroModule } from 'modules';

@Global()
@Module({
  imports: [HeroModule],
})
export class AppModule {}
