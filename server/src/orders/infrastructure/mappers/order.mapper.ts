import { Order, OrderItem } from 'src/orders/domain/order';
import { ORDER_STATUS } from 'src/orders/orders.enum';
import { ProductEntity } from 'src/products/infrastructure/entities/product.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderEntity } from '../entities/order.entity';
import { UserInfoEntity } from '../entities/user-info.entity';

export class OrderMapper {
  static toDomain(entity: OrderEntity): Order {
    const orderItems = entity.orderItems.map((orderItem) => {
      const item = new OrderItem();
      item.productId = orderItem.id;
      item.quantity = orderItem.quantity;
      item.price = orderItem.price;
      return item;
    });

    // const shippingAddress = AddressMapper.toDomain(entity.shippingAddress);
    // const billingAddress = AddressMapper.toDomain(entity.billingAddress);

    const order = new Order();
    order.id = entity.id;
    // order.user = entity.user;
    order.orderItems = orderItems;
    order.totalAmount = entity.totalAmount;
    // order.billingAddress = billingAddress;
    // order.shippingAddress = shippingAddress;

    return order;
  }

  static toPersistence(domain: Order): OrderEntity {
    // const userEntity = new UserEntity();
    // if (domain.user?.id) {
    //   userEntity.id = domain.user.id;
    // }

    // if (domain.billingAddress && domain.billingAddress.id) {
    //   billingAddress.id = domain.billingAddress.id;
    // }

    const userInfo = new UserInfoEntity();
    userInfo.name = domain.billingAddress?.name;
    userInfo.phone = domain.billingAddress?.phone;
    userInfo.city = domain.billingAddress?.city;
    userInfo.fullAddress = domain.billingAddress?.fullAddress;
    userInfo.orderNote = domain.billingAddress?.orderNote;

    const items = domain.orderItems.map((item) => {
      const orderItem = new OrderItemEntity();
      orderItem.quantity = item.quantity;
      orderItem.price = item.price * item.quantity;
      orderItem.size = item.size;
      orderItem.color = item.color;
      orderItem.colorCode = item.colorCode;
      orderItem.product = new ProductEntity();
      orderItem.product.id = item.productId;
      return orderItem;
    });

    const order = new OrderEntity();

    if (domain.id && typeof domain.id === 'number') {
      order.id = domain.id;
    }

    order.shippingAmount = domain?.shippingAmount;

    order.totalAmount = domain.totalAmount;
    order.status = ORDER_STATUS[domain.status];
    // order.billingAddress = billingAddress;
    // order.shippingAddress = shippingAddress;
    // order.user = userEntity;
    order.orderItems = items;

    return order;
  }
}
