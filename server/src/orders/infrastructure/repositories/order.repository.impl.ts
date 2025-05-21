import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/domain/order';
import { AllOrdersResponseDto } from 'src/orders/dto/all-orders-response.dto';
import { OrderDetailsResponseDto } from 'src/orders/dto/order-details-reponse.dto';
import { FilterOrderDto, SortOrderDto } from 'src/orders/dto/query-orders.dto';
import { ORDER_STATUS } from 'src/orders/orders.enum';

import { Product } from 'src/products/domain/product';
import { ProductEntity } from 'src/products/infrastructure/entities/product.entity';
import { ProductMapper } from 'src/products/infrastructure/mappers/product.mapper';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/domain/user';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, ILike, QueryRunner, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { UserInfoEntity } from '../entities/user-info.entity';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,

    @InjectRepository(UserInfoEntity)
    private readonly userInfoRepo: Repository<UserInfoEntity>,
  ) {}

  async createOrder(order: Order, queryRunner: QueryRunner): Promise<Order> {
    const persistenceEntity = OrderMapper.toPersistence(order);

    const userInfo = await queryRunner.manager.save(
      this.userInfoRepo.create({
        name: order?.billingAddress?.name,
        phone: order?.billingAddress?.phone,
        city: order?.billingAddress?.city,
        fullAddress: order?.billingAddress?.fullAddress,
        orderNote: order?.billingAddress?.orderNote,
      }),
    );

    const entity = await queryRunner.manager.save(
      this.orderRepo.create({
        ...persistenceEntity,
        userInfo: userInfo,
      }),
    );

    return OrderMapper.toDomain(entity);
  }

  async updateProductStock(
    id: Product['id'],
    data: Partial<Product>,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const clonedPayload = { ...data };
    const product = await queryRunner.manager.findOne(ProductEntity, {
      where: { id },
    });

    await queryRunner.manager.save(ProductEntity, {
      ...ProductMapper.toPersistence({
        ...ProductMapper.toDomain(product),
        ...clonedPayload,
      }),
    });
  }

  async findManyWithPagination({
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
    const baseCondition: FindOptionsWhere<OrderEntity> = {};
    if (filterOptions?.status) baseCondition.status = filterOptions.status;

    const where: FindOptionsWhere<OrderEntity>[] = [];

    if (search) {
      where.push(
        { ...baseCondition, userInfo: { name: ILike(`%${search}%`) } },
        { ...baseCondition, userInfo: { phone: ILike(`%${search}%`) } },
      );
    }

    where.push(baseCondition);

    console.log('where', where);
    const entities = await this.orderRepo.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (acc, sort) => ({ ...acc, [sort.orderBy]: sort.order }),
        {},
      ),
      relations: {
        userInfo: true,
        orderItems: true,
      },
    });

    return entities.map((e) => ({
      id: e.id,
      status: e.status,
      userInfo: {
        id: e.userInfo.id,
        name: e.userInfo.name,
        phone: e.userInfo.phone,
        city: e.userInfo.city,
        fullAddress: e.userInfo.fullAddress,
        orderNote: e.userInfo.orderNote,
      },
      totalAmount: e.totalAmount,
      createdAt: e.createdAt,
      // payment: {
      // id: e.successPayment.id,
      // status: e.successPayment.status,
      // },
    }));
  }

  async findOne(
    id: Order['id'],
    user: {
      id: User['id'];
      role: User['role'];
    },
  ): Promise<NullableType<OrderDetailsResponseDto>> {
    let entity;

    if (Number(user.role.id) === Number(RoleEnum.admin)) {
      entity = await this.orderRepo.findOne({
        where: {
          id: Number(id),
        },

        relations: {
          userInfo: true,
          orderItems: {
            product: true,
          },
        },
      });
    }

    return entity
      ? {
          id: entity.id,
          totalAmount: entity.totalAmount,
          shippingAmount: entity.shippingAmount,
          userInfo: {
            id: entity.userInfo.id,
            name: entity.userInfo.name,
            phone: entity.userInfo.phone,
            city: entity.userInfo.city,
            fullAddress: entity.userInfo.fullAddress,
            orderNote: entity.userInfo.orderNote,
          },
          createdAt: entity.createdAt,
          status: entity.status,
          updatedAt: entity.updatedAt,

          // user: entity.user,
          orderItems: entity.orderItems.map((oi) => ({
            id: oi.id,
            color: oi.color,
            colorCode: oi.colorCode,
            price: oi.price,
            quantity: oi.quantity,
            size: oi.size,
            product: {
              id: oi.product.id,
              images: oi.product.images,
              title: oi.product.title,
              description: oi.product.description,
            },
          })),
        }
      : null;
  }

  async updateOrder(id: Order['id'], data: Partial<Order>): Promise<Order> {
    const clonedPayload = { ...data };
    const order = await this.orderRepo.findOne({
      where: { id },
    });

    const entity = await this.orderRepo.save(
      this.orderRepo.create(
        OrderMapper.toPersistence({
          ...OrderMapper.toDomain(order),
          ...clonedPayload,
        }),
      ),
    );

    return OrderMapper.toDomain(entity);
  }
  async updateOrderStatus(
    id: Order['id'],
    data: {
      status: ORDER_STATUS;
    },
  ): Promise<boolean> {
    const order = await this.orderRepo.findOne({
      where: { id },
    });

    const result = await this.orderRepo.save(
      this.orderRepo.create({
        ...order,
        status: data.status,
      }),
    );
    return result ? true : false;
  }
}
