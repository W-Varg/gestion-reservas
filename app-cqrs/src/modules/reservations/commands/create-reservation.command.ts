import { IsUUID, IsISO8601, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationCommand {
  @ApiProperty({
    description: 'ID del usuario que realiza la reserva',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID del espacio reservado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  spaceId: string;

  @ApiProperty({
    description: 'Fecha y hora de inicio de la reserva',
    example: '2024-03-20T10:00:00Z',
  })
  @IsISO8601()
  startTime: string;

  @ApiProperty({
    description: 'Fecha y hora de fin de la reserva',
    example: '2024-03-20T11:00:00Z',
  })
  @IsISO8601()
  endTime: string;

  @ApiProperty({
    description: 'Notas adicionales sobre la reserva',
    example: 'Cliente VIP, requiere atención especial',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  constructor(userId: string, spaceId: string, startTime: string, endTime: string, notes?: string) {
    this.userId = userId;
    this.spaceId = spaceId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.notes = notes;
  }
}
