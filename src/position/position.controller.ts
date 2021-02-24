import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CretePositionDto } from './dto/create-position.dto';

import { PositionService } from './position.service';

import { IPosition } from './interfaces/position.interface';

import { GetUser } from 'src/components/decorators/get-user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@ApiTags('positions')
@Controller('position')
@UseGuards(AuthGuard('jwt'))
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/all')
  async getAllPositions(): Promise<IPosition[]> {
    return this.positionService.getAll();
  }

  @Get('all/:userId')
  async getUserPositions(
    @Param() params: { userId: string },
  ): Promise<IPosition[]> {
    const { userId } = params;

    return this.positionService.getPositionsByUserId(userId);
  }

  @Get('/:id')
  async getPositionById(@Param() params: { id: string }): Promise<IPosition> {
    const { id: positionId } = params;

    return this.positionService.getPositionById(positionId);
  }

  @Post()
  async createPosition(
    @GetUser() user: IUser,
    @Body(new ValidationPipe()) createPositionDto: CretePositionDto,
  ) {
    return this.positionService.create(user._id, createPositionDto);
  }
}
