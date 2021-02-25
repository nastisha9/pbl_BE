import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProfile } from './interfaces/profile.interface';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<IProfile>,
  ) {}

  async createProfile(
    uId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<IProfile> {
    const profile = new this.profileModel({
      ...createProfileDto,
      uId,
    });

    return await profile.save();
  }
}
