import { Global, Module } from '@nestjs/common';
import { BattleModule } from 'modules';

@Global()
@Module({
  imports: [BattleModule],
})
export class AppModule {}
