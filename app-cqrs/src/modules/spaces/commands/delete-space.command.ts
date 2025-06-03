import { ApiProperty } from '@nestjs/swagger';

export class DeleteSpaceCommand {
  @ApiProperty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
