import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order-dto';
import { BadRequestException } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const ord = await this.ordersService.getById(id);
    if (!ord) throw new NotFoundException('Order not found');
    return ord;
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData).catch((err) => {
      throw new BadRequestException(err.message);
    });
  }
}
