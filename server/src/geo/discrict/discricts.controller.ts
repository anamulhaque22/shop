import { Controller, Get } from '@nestjs/common';

import { DistrictsService } from './discricts.service';
import { District } from './domain/discrict';

@Controller({
  path: 'districts',
  version: '1',
})
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  async getAllDistricts(): Promise<District[]> {
    return this.districtsService.findAll();
  }

  @Get('import')
  async importDistricts(): Promise<void> {
    return this.districtsService.importDistricts();
  }
}
