import Entity from '../Entity';
import { equals } from '../../../utils/common';
import User, { UserInterface } from '../account/User';
import { SearchEngine } from '../../../enums/search/engine';

export interface HistoryInterface {
  id: string;
  user: UserInterface;
  word: string;
  engine: SearchEngine;
  link: string;
  createdAt: number;
  updatedAt: number;
}

export default class History implements Entity {
  public id!: string;
  public user!: User;
  public word!: string;
  public engine!: SearchEngine;
  public link!: string;
  public createdAt: number = Date.now();
  public updatedAt: number = Date.now();

  public equal(other: History): boolean {
    return equals(this, other);
  }

  public clone(): History {
    const clone: History = new History();
    clone.id = this.id;
    clone.user = this.user;
    clone.word = this.word;
    clone.engine = this.engine;
    clone.link = this.link;
    clone.createdAt = this.createdAt;
    clone.updatedAt = this.updatedAt;
    return clone;
  }

  public toString(): string {
    return [
      this.id,
      this.user?.id,
      this.word,
      this.engine,
      this.link,
      this.createdAt,
      this.updatedAt,
    ].join(',');
  }
}
