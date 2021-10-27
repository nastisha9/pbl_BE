import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { Marker } from './entities/marker.entity';
import { Model } from 'mongoose';
import { RecycleType } from './entities/recycleType.entity';

@Injectable()
export class MarkerService {
  constructor(
    @InjectModel('Marker') private readonly markerModel: Model<Marker>,
    @InjectModel('RecycleType') private readonly recycleTypeModel: Model<RecycleType>,
  ){}

  async create(createMarkerDto: CreateMarkerDto): Promise<Marker> {
    const newRecycleType = new this.recycleTypeModel({
      marker_color: createMarkerDto.marker_color,
      label: createMarkerDto.recycleTypeNames,
      description: createMarkerDto.description,
      icon: createMarkerDto.icon,
    })
    const newMarker = new this.markerModel({
      name: createMarkerDto.name,
      latitude: createMarkerDto.latitude,
      longitude: createMarkerDto.longitude,
      recycleType: newRecycleType
    })
    return await newMarker.save();
  }

  async findAll(): Promise<Marker[]> {
    return await this.markerModel.find().exec();
  }

  async findOne(id: number): Promise<Marker> {
    return await null;
  }

  update(id: number, updateMarkerDto: UpdateMarkerDto) {
    return `This action updates a #${id} marker`;
  }

  remove(id: number) {
    return `This action removes a #${id} marker`;
  }
}
