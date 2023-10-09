import { Module } from '@nestjs/common';
import { AppliesService } from './applies.service';
import { AppliesController } from './applies.controller';

@Module({
  controllers: [AppliesController],
  providers: [AppliesService],
})
export class AppliesModule {}
