import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CretePositionDto {
  @ApiProperty()
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly subTitle: string;

  @ApiProperty()
  readonly employment: string[];

  @ApiProperty()
  readonly salary: {
    from: number;
    to: number;
  };

  @ApiProperty()
  readonly isHot: boolean;

  @ApiProperty()
  @IsString()
  readonly currency: string;

  @ApiProperty()
  @IsNumber()
  readonly bonus: number;

  @ApiProperty()
  @IsString()
  readonly location: string;

  @ApiProperty()
  @IsString()
  readonly country: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
