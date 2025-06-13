import { IsUUID } from 'class-validator';

export class GetReservationQuery {
  @IsUUID()
  id: string;
}
