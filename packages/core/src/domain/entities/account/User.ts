import Entity from '../Entity';
import { Role } from '../../../enums/account';

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  role: Role;
  photo?: string;
}

export default class User implements Entity {
  public photo?: string;

  constructor(
    public id: string,
    public email: string,
    public name: string,
    public role: Role,
  ) {
  }

  public equal(other: User): boolean {
    if (!this.id || !other.id) {
      return false;
    }

    return this.id === other.id;
  }

  public clone(): User {
    const clone: User = new User(this.id, this.email, this.name, this.role);
    clone.photo = this.photo;
    return clone;
  }

  public toString(): string {
    return [
      this.id,
      this.email,
      this.name,
      this.role,
    ].join(',');
  }
}
