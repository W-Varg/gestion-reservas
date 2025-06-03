import { ApiProperty } from '@nestjs/swagger';

export class CreateSpaceCommand {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  location: string;

  constructor(name: string, description: string, capacity: number, location: string) {
    this.name = name;
    this.description = description;
    this.capacity = capacity;
    this.location = location;
  }
}
