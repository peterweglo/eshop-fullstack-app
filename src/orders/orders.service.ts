import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order-dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        orderItems: true,
      },
    });
  }

  public getById(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
  }
  public deleteById(id: string): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(orderData: CreateOrderDTO): Promise<Order> {
    const { products, ...otherData } = orderData;
    try {
      const order = await this.prismaService.order.create({
        data: {
          ...otherData,
          orderItems: {
            createMany: {
              data: products.map((product) => ({
                productId: product.productId,
                name: product.name,
                quantity: product.quantity,
              })),
            },
          },
        },
      });
      return order;
    } catch (error) {
      throw new BadRequestException('Unable to create order: ' + error.message);
    }
  }
}
