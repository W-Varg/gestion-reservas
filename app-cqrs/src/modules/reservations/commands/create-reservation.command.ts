export class CreateReservationCommand {
  constructor(
    public readonly userId: string,
    public readonly spaceId: string,
    public readonly date: Date,
    public readonly startTime: Date,
    public readonly endTime: Date,
  ) {}
}
