import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<Bus>) {
    super(data);
  }
}

export interface BusRelations {
  // describe navigational properties here
}

export type BusWithRelations = Bus & BusRelations;
