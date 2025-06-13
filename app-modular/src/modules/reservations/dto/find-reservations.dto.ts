import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FindReservationsDto {
  @ApiPropertyOptional({ description: 'ID del usuario para filtrar reservas', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({ description: 'ID del espacio para filtrar reservas', required: false })
  @IsOptional()
  @IsUUID()
  spaceId?: string;
}
