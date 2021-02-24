import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsEnum,
  IsIn,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  readonly avatar: string;
  readonly avatarId: string;

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
  @IsNotEmpty()
  @IsEnum(genderEnum)
  readonly gender: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly address: CreateAddressDto;

  readonly searchField: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly proffesion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly roles: Array<string>;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  readonly password: string;
}
