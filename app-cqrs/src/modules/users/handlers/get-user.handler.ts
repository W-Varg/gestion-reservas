import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../queries/get-user.query';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUserQuery) {
    const { id } = query;
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }
}
