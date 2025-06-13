import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpaceQuery } from '../get-space.query';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@QueryHandler(GetSpaceQuery)
export class GetSpaceHandler implements IQueryHandler<GetSpaceQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetSpaceQuery) {
    const { id } = query;

    const space = await this.prisma.space.findUnique({
      where: { id },
    });

    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }

    return space;
  }
}
