export class LoginCommand {
  constructor(
    public readonly emailOrUsername: string,
    public readonly password: string
  ) {}
}
