import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpaceCommand {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  capacity?: number;

  @ApiProperty({ required: false })
  location?: string;

  constructor(
    id: string,
    name?: string,
    description?: string,
    capacity?: number,
    location?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.capacity = capacity;
    this.location = location;
  }
}
