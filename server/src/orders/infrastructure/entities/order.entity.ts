import { ORDER_STATUS } from "src/orders/orders.enum";
import { EntityHelper } from "src/utils/entity-helper";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { UserInfoEntity } from "./user-info.entity";

@Entity({
  name: "orders",
})
export class OrderEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("numeric", { precision: 10, scale: 2 })
  totalAmount: number;

  @Column("numeric", { precision: 10, scale: 2 })
  shippingAmount: number;

  @Column({
    type: "enum",
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  })
  status: ORDER_STATUS;

  // @ManyToOne(() => AddressEntity)
  // billingAddress: AddressEntity;

  // @ManyToOne(() => AddressEntity)
  // shippingAddress: AddressEntity;

  // @ManyToOne(() => UserEntity, (user) => user.orders)
  // user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemEntity[];

  // @OneToMany(() => PaymentEntity, (payment) => payment.order, { cascade: true })
  // payments: PaymentEntity[];

  // @OneToOne(() => PaymentEntity, (payment) => payment.order, {
  //   cascade: true,
  // })
  // successPayment: PaymentEntity;

  @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.order)
  @JoinColumn()
  userInfo: UserInfoEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
