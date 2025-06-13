import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { SpaceType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpaceCommand {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  capacity?: number;

  @IsEnum(SpaceType)
  @IsOptional()
  @ApiProperty({ required: false })
  type?: SpaceType;

  constructor(
    id: string,
    name?: string,
    description?: string,
    capacity?: number,
    type?: SpaceType,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.capacity = capacity;
    this.type = type;
  }
}
