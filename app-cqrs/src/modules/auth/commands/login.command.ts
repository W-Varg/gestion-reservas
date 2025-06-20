import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCommand {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
