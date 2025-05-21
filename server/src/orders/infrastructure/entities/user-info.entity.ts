import { EntityHelper } from "src/utils/entity-helper";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity({
  name: "user_info",
})
export class UserInfoEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  phone: string;

  @Column({
    type: "varchar",
  })
  city: string;

  @Column({
    type: "varchar",
  })
  fullAddress: string;

  @Column({
    type: "varchar",
  })
  orderNote: string;

  @OneToOne(() => OrderEntity, (order) => order.userInfo, {
    cascade: true,
    onDelete: "CASCADE",
  })
  order: OrderEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
