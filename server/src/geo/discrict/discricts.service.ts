import { Injectable } from '@nestjs/common';
import { District } from './domain/discrict';
import { DiscrictRepository } from './infrastructure/category.repositoty';

@Injectable()
export class DistrictsService {
  constructor(private readonly districtRepository: DiscrictRepository) {}

  async findAll(): Promise<District[]> {
    return this.districtRepository.findAll();
  }

  async importDistricts(): Promise<void> {
    return this.districtRepository.importDistricts();
  }
}
