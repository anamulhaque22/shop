import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "districts",
})
export class DistrictEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  divisionId: number;

  @Column()
  name: string;

  @Column({ name: "bn_name" })
  bnName: string;
}
