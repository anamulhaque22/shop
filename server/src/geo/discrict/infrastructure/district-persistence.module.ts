import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscrictRepository } from './category.repositoty';
import { DistrictEntity } from './entities/district.entity';
import { DiscrictRepositoryImpl } from './repositories/district.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictEntity])],
  providers: [
    {
      provide: DiscrictRepository,
      useClass: DiscrictRepositoryImpl,
    },
  ],
  exports: [DiscrictRepository],
})
export class DistrictPersistenceModule {}
