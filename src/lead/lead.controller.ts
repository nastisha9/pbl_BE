import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { IUser } from 'src/user/interfaces/user.interface';
import { roleEnum } from 'src/user/enums/role.enum';

import { GetUser } from 'src/components/decorators/get-user.decorator';
import { Roles } from 'src/components/decorators/roles.decorator';
import { RolesGuard } from 'src/components/guards/roles.guard';

import { CreateProfileDto } from './dto/create-profile.dto';
import { LeadService } from './lead.service';

@ApiTags('lead')
@Controller('lead')
@UseGuards(AuthGuard('jwt'))
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post('/profile')
  @Roles(roleEnum.lead)
  @UseGuards(RolesGuard)
  async createProfile(
    @GetUser() user: IUser,
    @Body(new ValidationPipe()) createProfileDto: CreateProfileDto,
  ) {
    return this.leadService.createProfile(user._id, createProfileDto);
  }
}
