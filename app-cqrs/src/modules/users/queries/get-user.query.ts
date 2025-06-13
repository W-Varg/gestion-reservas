import { IsUUID } from 'class-validator';

export class GetUserQuery {
  @IsUUID()
  id: string;
}
