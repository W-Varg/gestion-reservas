import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '../commands/login.command';
import { RegisterCommand } from '../commands/register.command';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
import { Request as ExpressRequest } from 'express';

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('login')
  login(@Body() loginCommand: LoginCommand) {
    return this.commandBus.execute(new LoginCommand(loginCommand.email, loginCommand.password));
  }

  @Public()
  @Post('register')
  register(@Body() registerCommand: RegisterCommand) {
    return this.commandBus.execute(
      new RegisterCommand(registerCommand.email, registerCommand.password, registerCommand.name),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req?.user;
  }
}
