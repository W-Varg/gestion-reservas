import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { SpaceType } from '@prisma/client';

export class CreateSpaceDto {
  @ApiProperty({ description: 'Nombre del espacio' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tipo de espacio',
    enum: SpaceType,
    example: SpaceType.SALON,
  })
  @IsNotEmpty()
  @IsEnum(SpaceType)
  type: SpaceType;

  @ApiProperty({ description: 'Capacidad del espacio' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({ description: 'Descripción del espacio', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
