import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReservationStatus } from '@prisma/client';

export class UpdateReservationStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la reservación',
    enum: ReservationStatus,
    example: ReservationStatus.CONFIRMED
  })
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
} 