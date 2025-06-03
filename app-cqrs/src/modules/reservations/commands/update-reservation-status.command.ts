export class UpdateReservationStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: string,
  ) {}
}
