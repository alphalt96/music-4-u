export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly email?: string,
    readonly image?: string,
    readonly password?: string
  ) {}
}
