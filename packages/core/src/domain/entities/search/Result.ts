import Entity from '../Entity';
import { equals } from '../../../utils/common';

export interface ResultInterface {
  content: string;
}

export default class Result implements Entity {
  public content!: string;

  public equal(other: Result): boolean {
    return equals(this, other);
  }

  public clone(): Result {
    const clone: Result = new Result();
    clone.content = this.content;
    return clone;
  }

  public toString(): string {
    return [
      this.content,
    ].join(',');
  }
}
