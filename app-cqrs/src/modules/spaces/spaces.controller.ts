import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateSpaceCommand } from './commands/create-space.command';
import { UpdateSpaceCommand } from './commands/update-space.command';
import { DeleteSpaceCommand } from './commands/delete-space.command';
import { GetSpaceQuery } from './queries/get-space.query';
import { GetSpacesQuery } from './queries/get-spaces.query';
import { GetSpaceAvailabilityQuery } from './queries/get-space-availability.query';
import { SpaceDto } from './dto/space.dto';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// @UseGuards(JwtAuthGuard)

@ApiBearerAuth()
@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new space' })
  @ApiResponse({ status: 201, description: 'Space created successfully', type: SpaceDto })
  async create(@Body() createSpaceDto: CreateSpaceCommand): Promise<SpaceDto> {
    return this.commandBus.execute(createSpaceDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a space' })
  @ApiResponse({ status: 200, description: 'Space updated successfully', type: SpaceDto })
  async update(
    @Param('id') id: string,
    @Body() updateSpaceDto: Partial<CreateSpaceCommand>,
  ): Promise<SpaceDto> {
    const { name, description, capacity, type } = updateSpaceDto;
    return this.commandBus.execute(new CreateSpaceCommand());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a space' })
  @ApiResponse({ status: 200, description: 'Space deleted successfully', type: SpaceDto })
  async remove(@Param('id') id: string): Promise<SpaceDto> {
    return this.commandBus.execute(new DeleteSpaceCommand(id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un espacio por ID' })
  @ApiResponse({ status: 200, description: 'Espacio encontrado' })
  @ApiResponse({ status: 404, description: 'Espacio no encontrado' })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetSpaceQuery());
  }

  @Get()
  @ApiOperation({ summary: 'Get all spaces' })
  @ApiResponse({ status: 200, description: 'List of spaces', type: [SpaceDto] })
  async findAll(@Query('type') type?: string): Promise<SpaceDto[]> {
    return this.queryBus.execute(new GetSpacesQuery(type));
  }

  @Get(':id/availability')
  @ApiOperation({ summary: 'Check space availability' })
  @ApiResponse({ status: 200, description: 'Space availability information' })
  async checkAvailability(
    @Param('id') id: string,
    @Query('date') date: string,
  ): Promise<{ available: boolean; availableSlots: string[] }> {
    return this.queryBus.execute(new GetSpaceAvailabilityQuery(id, date));
  }
}
