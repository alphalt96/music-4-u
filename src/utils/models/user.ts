export class User {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly email: string,
    private readonly image: string,
    private readonly password?: string
  ) {}
}
