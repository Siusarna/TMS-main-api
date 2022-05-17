import {
  Body,
  Controller,
  Get, Header,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateShipmentDto } from './dtos/create-shipment.dto';
import { ShipmentService } from './shipment.service';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Version('1')
  @Post()
  @UseGuards(AuthGuard)
  createShipment(@Request() req, @Body() data: CreateShipmentDto) {
    return this.shipmentService.createShipment(req.user.id, data, req.headers.authorization);
  }

  @Version('1')
  @Get()
  @UseGuards(AuthGuard)
  getShipment(@Request() req) {
    return this.shipmentService.getShipments(req.user.id);
  }

  @Version('1')
  @Get('tracking')
  @UseGuards(AuthGuard)
  getShipmentsForTracking(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    data: PaginationDto,
  ) {
    return this.shipmentService.getShipmentsForTracking(data);
  }

  @Version('1')
  @Post('tracking')
  @UseGuards(AuthGuard)
  trackShipment(
    @Request() req,
    @Query('trackingNumber')
      trackingNumber: string,
  ) {
    return this.shipmentService.trackShipment(req.user.id, trackingNumber, req.headers.authorization);
  }
}
