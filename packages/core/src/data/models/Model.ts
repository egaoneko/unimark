import Entity from '../../domain/entities/Entity';

export interface Model {
  toEntity(): Entity;
}