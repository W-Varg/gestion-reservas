import { Injectable } from '@nestjs/common';
import { Space, SpaceType } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';

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
