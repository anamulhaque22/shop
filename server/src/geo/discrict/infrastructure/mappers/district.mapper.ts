import { District } from '../../domain/discrict';
import { DistrictEntity } from '../entities/district.entity';

export class DistrictMapper {
  static toDomain(raw: DistrictEntity): District {
    const district = new District();
    district.id = raw.id;
    district.name = raw.name;
    district.bnName = raw.bnName;
    return district;
  }

  static toPersistence(discrict: District): DistrictEntity {
    const districtEntity = new DistrictEntity();
    if (discrict.id) {
      districtEntity.id = discrict.id;
    }
    districtEntity.name = discrict.name;
    districtEntity.bnName = discrict.bnName;
    return districtEntity;
  }
}
