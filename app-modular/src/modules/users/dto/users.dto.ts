import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  email?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  name?: string;
}
