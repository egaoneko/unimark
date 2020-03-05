import Entity from '../../domain/entities/Entity';

export default interface JSONMapper<S, T extends Entity> {
  toJSON(entity: T): S;

  toEntity(json: S): T;
}