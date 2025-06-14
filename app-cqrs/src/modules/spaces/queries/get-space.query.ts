import { IsUUID } from 'class-validator';

export class GetSpaceQuery {
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
