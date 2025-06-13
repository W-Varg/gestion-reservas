import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '../commands/login.command';
import { RegisterCommand } from '../commands/register.command';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  async login(@Body() loginCommand: LoginCommand) {
    return this.commandBus.execute(loginCommand);
  }

  @Public()
  @Post('register')
  async register(@Body() registerCommand: RegisterCommand) {
    return this.commandBus.execute(
      new RegisterCommand(registerCommand.email, registerCommand.password, registerCommand.name),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
