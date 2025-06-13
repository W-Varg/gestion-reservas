import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from './controllers/auth.controller';
import { LoginHandler } from './handlers/login.handler';
import { RegisterHandler } from './handlers/register.handler';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginHandler, RegisterHandler, JwtStrategy],
})
export class AuthModule {}
