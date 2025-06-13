import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { SpaceType } from '@prisma/client';

export class CreateSpaceCommand {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  capacity: number;

  @IsEnum(SpaceType)
  type: SpaceType;
}
