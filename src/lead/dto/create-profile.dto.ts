import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsEnum,
} from 'class-validator';

import { levelEnum } from '../enums/lead-level.enum';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly dateOfbirth: Date;

  @ApiProperty()
  readonly salary: { from: number; to: number };

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly skills: string[];

  @ApiProperty()
  @IsString()
  @IsEnum(levelEnum)
  readonly level: string;
}
