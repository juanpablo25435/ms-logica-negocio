import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departament} from './departament.model';
import {Garage} from './garage.model';
import {Room} from './room.model';

@model()
export class City extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Departament)
  departamentId: number;

  @hasMany(() => Garage)
  garages: Garage[];

  @hasMany(() => Room)
  rooms: Room[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
