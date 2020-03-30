import Entity from '../Entity';
import { equals } from '../../../utils/common';

export interface ResultInterface {
  link: string;
  content: string[];
}

export default class Result implements Entity {
  public link!: string;
  public content!: string[];

  public equal(other: Result): boolean {
    return equals(this, other);
  }

  public clone(): Result {
    const clone: Result = new Result();
    clone.link = this.link;
    clone.content = this.content;
    return clone;
  }

  public toString(): string {
    return [
      this.link,
      this.content,
    ].join(',');
  }
}
