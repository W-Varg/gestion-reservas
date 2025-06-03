import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUserQuery) {
    const { id } = query;

    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
