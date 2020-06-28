import Entity from '../Entity';
import { SearchEngine } from '../../../enums/search/engine';
import { equals } from '../../../utils/common';
import User, { UserInterface } from '../account/User';

export interface QueryInterface {
  word: string;
  engine: SearchEngine;
  user?: UserInterface;
}

export default class Query implements Entity {
  public word!: string;
  public engine!: SearchEngine;
  public user?: User;

  public equal(other: Query): boolean {
    return equals(this, other);
  }

  public clone(): Query {
    const clone: Query = new Query();
    clone.word = this.word;
    clone.engine = this.engine;
    clone.user = this.user;
    return clone;
  }

  public toString(): string {
    return [
      this.word,
      this.engine,
      this.user?.id,
    ].join(',');
  }
}
