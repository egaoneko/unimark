import Entity from '../../domain/entities/Entity';

export default interface ValueMapper<S, T extends Entity> {
  toEntity(value: S): T;
}