import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles } from 'src/auth/roles.decorators';
import { RegisterPurchaseDto } from './dto/register-purchase-dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private purchaseService: PurchasesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Client)
  @Post()
  async register(
    @Request() req,
    @Body() registerPurchaseDto: RegisterPurchaseDto,
  ) {
    await this.purchaseService.register(req.user.id, registerPurchaseDto);
  }

  @Roles(Role.Client, Role.Admin)
  @UseGuards(AuthGuard('jwt'))
  @Get('history')
  async findByUser(@Request() req) {
    return this.purchaseService.findByUserId(req.user.id);
  }
}
