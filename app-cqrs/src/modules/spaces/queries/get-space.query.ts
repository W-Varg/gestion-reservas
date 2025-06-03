import { ApiProperty } from '@nestjs/swagger';

export class GetSpaceQuery {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
