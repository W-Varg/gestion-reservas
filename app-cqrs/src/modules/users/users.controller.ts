import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';
import { GetUserQuery } from './queries/get-user.query';
import { GetUsersQuery } from './queries/get-users.query';
import { User } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserCommand): Promise<User> {
    return this.commandBus.execute(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserCommand>,
  ): Promise<User> {
    return this.commandBus.execute(
      new UpdateUserCommand(
        id,
        updateUserDto.email,
        updateUserDto.name,
        updateUserDto.password,
        updateUserDto.role,
      ),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Get()
  async findAll(@Query('skip') skip?: number, @Query('take') take?: number): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery(skip, take));
  }
}
