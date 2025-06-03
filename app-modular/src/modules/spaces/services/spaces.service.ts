import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services/prisma.service';
import { Space, SpaceType } from '@prisma/client';

@Injectable()
export class SpacesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Space[]> {
    return this.prisma.space.findMany();
  }

  async findOne(id: string): Promise<Space | null> {
    return this.prisma.space.findUnique({
      where: { id },
    });
  }

  async findByType(type: SpaceType): Promise<Space[]> {
    return this.prisma.space.findMany({
      where: { type },
    });
  }

  async create(data: {
    name: string;
    type: SpaceType;
    capacity: number;
    description?: string;
  }): Promise<Space> {
    return this.prisma.space.create({
      data,
    });
  }

  async update(id: string, data: Partial<Space>): Promise<Space> {
    return this.prisma.space.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Space> {
    return this.prisma.space.delete({
      where: { id },
    });
  }
}
