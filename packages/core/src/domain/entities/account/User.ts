import Entity from '../Entity';
import { Role } from '../../../enums/account/user';
import { equals } from '../../../utils/common';

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  role: Role;
  photo?: string;
}

export default class User implements Entity {
  public id!: string;
  public email!: string;
  public name!: string;
  public role!: Role;
  public photo?: string;

  public equal(other: User): boolean {
    return equals(this, other);
  }

  public clone(): User {
    const clone: User = new User();
    clone.id = this.id;
    clone.email = this.email;
    clone.name = this.name;
    clone.role = this.role;
    clone.photo = this.photo;
    return clone;
  }

  public toString(): string {
    return [
      this.id,
      this.email,
      this.name,
      this.role,
      this.photo,
    ].join(',');
  }
}
