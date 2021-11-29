import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { Marker } from './entities/marker.entity';
import { Model } from 'mongoose';
import { string } from '@hapi/joi';

@Injectable()
export class MarkerService {
  constructor(
    @InjectModel('Marker') private readonly markerModel: Model<Marker>,
  ){}

  async create(createMarkerDto: CreateMarkerDto): Promise<Marker> {
    const newMarker = new this.markerModel({
    ...createMarkerDto
    })
    return await newMarker.save();
  }

  async findAll(): Promise<Marker[]> {
    return await this.markerModel.find().exec();
  }

  async findOneById(id: string): Promise<Marker> {
    return await this.markerModel.findById(id).exec();
  }

  async update(id: string, updateMarkerDto: UpdateMarkerDto): Promise<Marker> {
    return await this.markerModel.findByIdAndUpdate({_id: id}, updateMarkerDto).exec();
  }

  async remove(id: string): Promise<Marker> {
    return await this.markerModel.findByIdAndDelete(id).exec();
  }

}
