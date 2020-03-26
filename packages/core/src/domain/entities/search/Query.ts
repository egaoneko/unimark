import Entity from '../Entity';
import { SearchEngine } from '../../../enums/search/engine';
import { equals } from '../../../utils/common';

export interface QueryInterface {
  query: string;
  engine: SearchEngine;
}

export default class Query implements Entity {
  public word!: string;
  public engine!: SearchEngine;

  public equal(other: Query): boolean {
    return equals(this, other);
  }

  public clone(): Query {
    const clone: Query = new Query();
    clone.word = this.word;
    clone.engine = this.engine;
    return clone;
  }

  public toString(): string {
    return [
      this.word,
      this.engine,
    ].join(',');
  }
}
