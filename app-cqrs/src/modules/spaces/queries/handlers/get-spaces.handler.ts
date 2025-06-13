import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpacesQuery } from '../get-spaces.query';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetSpacesQuery)
export class GetSpacesHandler implements IQueryHandler<GetSpacesQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetSpacesQuery) {
    const { type } = query;

    return this.prisma.space.findMany({
      where: type ? { name: { contains: type } } : undefined,
    });
  }
}
