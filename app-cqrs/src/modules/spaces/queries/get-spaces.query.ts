import { ApiProperty } from '@nestjs/swagger';

export class GetSpacesQuery {
  @ApiProperty({ required: false })
  type?: string;

  constructor(type?: string) {
    this.type = type;
  }
}
