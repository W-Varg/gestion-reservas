import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class FindReservationsDto {
  @ApiProperty({
    description: 'ID del usuario para filtrar reservas',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    description: 'ID del espacio para filtrar reservas',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsUUID()
  spaceId?: string;

  @ApiProperty({
    description: 'Fecha de inicio para filtrar reservas',
    example: '2024-03-20T00:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    description: 'Fecha de fin para filtrar reservas',
    example: '2024-03-21T23:59:59Z',
    required: false
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
