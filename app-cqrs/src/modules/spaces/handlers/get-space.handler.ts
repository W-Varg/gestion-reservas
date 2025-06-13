import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpaceQuery } from '../queries/get-space.query';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetSpaceQuery)
export class GetSpaceHandler implements IQueryHandler<GetSpaceQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetSpaceQuery) {
    const { id } = query;
    const space = await this.prisma.space.findUnique({
      where: { id },
    });

    if (!space) {
      throw new NotFoundException(`Espacio con ID ${id} no encontrado`);
    }

    return space;
  }
}
