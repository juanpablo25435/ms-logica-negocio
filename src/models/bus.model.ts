import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Garage} from './garage.model';

@model({
  FK_BUS_IDGARAGE: {
    name: 'fk_bus_idGarage',
    entity: 'Garage',
    entityKey: 'id',
    foreignkey: 'garageId',
  },
})
export class Bus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @belongsTo(() => Garage)
  garageId: number;

  constructor(data?: Partial<Bus>) {
    super(data);
  }
}

export interface BusRelations {
  // describe navigational properties here
}

export type BusWithRelations = Bus & BusRelations;
