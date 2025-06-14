import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSpacesQuery } from '../queries/get-all-spaces.query';
import { PrismaService } from '../../../prisma/prisma.service';

@QueryHandler(GetAllSpacesQuery)
export class GetAllSpacesHandler implements IQueryHandler<GetAllSpacesQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return this.prisma.space.findMany();
  }
}
