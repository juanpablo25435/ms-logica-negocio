import {Entity, model, property, belongsTo} from '@loopback/repository';
import {City} from './city.model';

@model()
export class Garage extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantyBus: number;

  @belongsTo(() => City)
  cityId: number;

  constructor(data?: Partial<Garage>) {
    super(data);
  }
}

export interface GarageRelations {
  // describe navigational properties here
}

export type GarageWithRelations = Garage & GarageRelations;
