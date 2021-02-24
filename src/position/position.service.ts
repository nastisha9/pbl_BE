import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPosition } from './interfaces/position.interface';

import { CretePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel('Position') private readonly positionModel: Model<IPosition>,
  ) {}

  async create(
    uId: string,
    createPositionDto: CretePositionDto,
  ): Promise<IPosition> {
    const position = new this.positionModel({
      ...createPositionDto,
      uId,
    });

    return await position.save();
  }

  getAll(): Promise<IPosition[]> {
    return this.positionModel.find({});
  }

  getPositionById(positionId: string): Promise<IPosition> {
    return this.positionModel.findById(positionId);
  }

  getPositionsByUserId(userId: string): Promise<IPosition[]> {
    return this.positionModel.find({ uId: userId });
  }
}
