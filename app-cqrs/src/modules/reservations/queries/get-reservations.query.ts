export class GetReservationsQuery {
  constructor(
    public readonly userId?: string,
    public readonly spaceId?: string,
    public readonly status?: string,
  ) {}
}
