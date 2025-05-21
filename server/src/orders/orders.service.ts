import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { QueryRunnerFactory } from 'src/database/query-runner-factory';

import { ProductsService } from 'src/products/products.service';

import { User } from 'src/users/domain/user';
import { UsersService } from 'src/users/users.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Order } from './domain/order';
import { AllOrdersResponseDto } from './dto/all-orders-response.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto, SortOrderDto } from './dto/query-orders.dto';
import { OrderRepository } from './infrastructure/order.repository';
import { ORDER_STATUS } from './orders.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,

    private readonly queryRunnerFactory: QueryRunnerFactory,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<Order> {
    // const user = await this.userService.findById(data.userId);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    // checking the product quantity and product variation like size and color and size quantity, color quantity is available or not
    const products = await this.orderItemsValidation(data.orderItems);

    //calculating the total amount
    const totalAmount: number = this.calculateTotalAmount(
      data.orderItems,
      products,
    );

    let newOrderItems = data.orderItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: products.find((p) => p.id === item.productId).sellPrice,
        size: products
          .find((p) => p.id === item.productId)
          .sizes.find((s) => s.id === item.size.id).name,

        color: products
          .find((p) => p.id === item.productId)
          .productInfo.find((info) => info.id === item.color.id).colorName,
        colorCode: products
          .find((p) => p.id === item.productId)
          .productInfo.find((info) => info.id === item.color.id).colorCode,
      };
    });

    const queryRunner = this.queryRunnerFactory.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.orderRepo.createOrder(
        {
          ...data,
          status: ORDER_STATUS.PENDING,
          totalAmount,
          orderItems: newOrderItems,
          billingAddress: {
            name: data.billingAddress.name,
            phone: data.billingAddress.phone,
            city: data.billingAddress.city,
            fullAddress: data.billingAddress.fullAddress,
            orderNote: data.billingAddress.orderNote,
          },
        },
        queryRunner,
      );

      if (order) {
        for (const product of products) {
          // updating the product quantity
          product.quantity -= data.orderItems.find(
            (item) => item.productId === product.id,
          ).quantity;

          // updating the product stock for color and size
          const orderdProduct = data.orderItems.find(
            (oi) => oi.productId === product.id,
          );

          const productInfo = product.productInfo.find(
            (pf) => pf.id === orderdProduct.color.id,
          );
          const size = product.sizes.find(
            (s) => s.id === orderdProduct.size.id,
          );

          productInfo.colorSizeWiseQuantity[size.name.toLowerCase()] -=
            orderdProduct.quantity;

          productInfo.colorWiseQuantity -= orderdProduct.quantity;

          await this.orderRepo.updateProductStock(
            product.id,
            {
              ...product,
              quantity: product.quantity,
              productInfo: product.productInfo,
            },
            queryRunner,
          );
        }
      }

      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      console.log('Error in creating order:', error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Order processing failed');
    } finally {
      await queryRunner.release();
    }
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    filterOptions?: FilterOrderDto | null;
    sortOptions?: SortOrderDto[] | null;
    search?: string | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AllOrdersResponseDto[]> {
    // if (Number(user.role.id) === Number(RoleEnum.user)) {
    //   return this.orderRepo.findManyWithPagination({
    //     filterOptions,
    //     sortOptions,
    //     search,
    //     paginationOptions,
    //   });
    // }
    // if the user is admin then return all the orders
    return this.orderRepo.findManyWithPagination({
      filterOptions,
      sortOptions,
      search,
      paginationOptions,
    });
  }

  async findOne(id: Order['id'], user: { id: User['id']; role: User['role'] }) {
    const result = await this.orderRepo.findOne(id, user);
    if (!result) {
      throw new NotFoundException(`Order not found with id: ${id}`);
    }
    return result;
  }

  async updateOrderStatus(
    id: Order['id'],
    orderStatus: ORDER_STATUS,
    user: { id: User['id']; role: User['role'] },
  ): Promise<void> {
    const order = await this.orderRepo.findOne(id, user);
    if (!order) {
      throw new NotFoundException(`Order not found with id: ${id}`);
    }
    let data = await this.orderRepo.updateOrderStatus(id, {
      status: orderStatus,
    });
    return;
  }

  calculateTotalAmount(orderItems, products) {
    let totalAmount = 0;
    orderItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      totalAmount += product.sellPrice * item.quantity;
    });

    return totalAmount;
  }

  async orderItemsValidation(orderItems) {
    const products = await Promise.all(
      orderItems.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);

        if (!product) {
          throw new NotFoundException(
            `Product not found with id: ${item.productId}`,
          );
        }

        if (product.quantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product id: ${item.productId}`,
          );
        }

        const isSizeExits = product.sizes.filter(
          (size) => size.id === item.size?.id,
        );

        if (!isSizeExits.length) {
          throw new BadRequestException(
            `Size not found for product id: ${item.productId}`,
          );
        }

        const colorExits = product.productInfo.filter(
          (info) => info.id === item.color?.id,
        );

        if (!colorExits.length) {
          throw new BadRequestException(
            `Color not found for product id: ${item.productId}`,
          );
        }

        if (
          colorExits[0]?.colorSizeWiseQuantity[
            isSizeExits[0].name.toLowerCase()
          ] < item.quantity
        ) {
          throw new BadRequestException(
            `Insufficient stock for color: ${colorExits[0]?.colorCode} and product id: ${item.productId}`,
          );
        }

        return product;
      }),
    );

    return products;
  }
}
