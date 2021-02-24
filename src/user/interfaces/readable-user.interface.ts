export interface IReadableUser {
  readonly email: string;
  readonly userName: string;
  status: string;
  readonly roles: Array<string>;
  acessToken: string;
}
