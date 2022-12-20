import { UserRoles } from "../enums/UserRoles";

export class JwtToken {
  public sub: string;
  public role: UserRoles;

  constructor(id: string, role: UserRoles) {
    this.sub = id;
    this.role = role;
  }
}
