import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SpacesModule } from './modules/spaces/spaces.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import configuration from './common/configurations/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 'tu_clave_secreta_jwt_muy_segura',
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SpacesModule,
    ReservationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
