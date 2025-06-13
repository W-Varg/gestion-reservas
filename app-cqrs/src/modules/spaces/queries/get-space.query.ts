import { IsUUID } from 'class-validator';

export class GetSpaceQuery {
  @IsUUID()
  id: string;
}
