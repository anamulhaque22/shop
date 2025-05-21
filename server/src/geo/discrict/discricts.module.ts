import { Module } from '@nestjs/common';
import { DistrictsController } from './discricts.controller';

import { DistrictsService } from './discricts.service';
import { DistrictPersistenceModule } from './infrastructure/district-persistence.module';

@Module({
  imports: [DistrictPersistenceModule],
  controllers: [DistrictsController],
  providers: [DistrictsService],
})
export class DistrictsModule {}
