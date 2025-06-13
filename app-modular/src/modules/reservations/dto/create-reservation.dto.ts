import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la reserva',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID del espacio reservado',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  spaceId: string;

  @ApiProperty({
    description: 'Fecha y hora de inicio de la reserva',
    example: '2024-03-20T10:00:00Z'
  })
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    description: 'Fecha y hora de fin de la reserva',
    example: '2024-03-20T11:00:00Z'
  })
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    description: 'Notas adicionales sobre la reserva',
    example: 'Cliente VIP, requiere atención especial'
  })
  @IsString()
  notes?: string;
}

export class UpdateReservationDto extends CreateReservationDto {}
