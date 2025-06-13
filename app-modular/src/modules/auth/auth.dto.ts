import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}
