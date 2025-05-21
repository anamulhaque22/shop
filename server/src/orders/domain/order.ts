import { CreateAddressDto } from '../dto/create-order.dto';

export class OrderItem {
  id?: number;
  productId: number;
  quantity: number;
  price?: number; // order pleaceing time price will be null and after validation it will be set from product price
  size: string;
  color: string;
  colorCode: string;
}

export class Order {
  id: number;
  // user: User;
  orderItems: OrderItem[];
  totalAmount: number;
  shippingAmount: number;
  billingAddress: CreateAddressDto;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
