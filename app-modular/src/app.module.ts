import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EspaciosModule } from './modules/espacios/espacios.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { NotificacionesModule } from './modules/notificaciones/notificaciones.module';
import { DatabaseModule } from './common/database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/configurations/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UsuariosModule,
    EspaciosModule,
    ReservasModule,
    NotificacionesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
