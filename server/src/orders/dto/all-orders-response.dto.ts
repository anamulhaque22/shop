import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';

export class AllOrdersResponseDto {
  @IsNumber()
  id: number;

  @IsObject()
  userInfo: {
    id: number;
    name: string;
    phone: string;
    city: string;
    fullAddress: string;
    orderNote: string;
  };

  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;

  // @IsString()
  // payment: Pick<Payment, 'id' | 'status'>;

  @IsDate()
  createdAt: Date;
}
