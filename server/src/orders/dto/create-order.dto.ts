import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class Color {
  @IsNumber()
  id: number;
}

class Size {
  @IsNumber()
  id: number;
}

export class CreateAddressDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  fullAddress: string;

  @IsOptional()
  orderNote: string;
}

class OrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Size)
  size: Size;

  @IsObject()
  @ValidateNested()
  @Type(() => Color)
  color: Color;
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  shippingAmount: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  billingAddress: CreateAddressDto;
}
