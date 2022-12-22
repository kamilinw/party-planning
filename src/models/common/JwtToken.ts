import { UserRoles } from "../enums/UserRoles";

export class JwtToken {
  public exp: number;
  public sub: string;
  public role: UserRoles;

  constructor(id: string, role: UserRoles, exp: number) {
    this.sub = id;
    this.role = role;
    this.exp = exp;
  }
}
