import { ApiProperty } from '@nestjs/swagger';

export class GetSpaceAvailabilityQuery {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: string;

  constructor(id: string, date: string) {
    this.id = id;
    this.date = date;
  }
}
