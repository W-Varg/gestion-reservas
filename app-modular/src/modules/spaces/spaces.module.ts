import { Module } from '@nestjs/common';
import { SpacesController } from './controllers/spaces.controller';
import { SpacesService } from './services/spaces.service';
import { PrismaService } from '../../shared/services/prisma.service';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService, PrismaService],
  exports: [SpacesService],
})
export class SpacesModule {}
