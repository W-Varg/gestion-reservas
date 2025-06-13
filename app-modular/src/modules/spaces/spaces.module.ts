import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { PrismaService } from '../../common/database/prisma.service';
import { SpacesService } from './spaces.service';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService, PrismaService],
  exports: [SpacesService],
})
export class SpacesModule {}
