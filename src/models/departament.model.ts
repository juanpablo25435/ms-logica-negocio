import {Entity, model, property, hasMany} from '@loopback/repository';
import {City} from './city.model';

@model()
export class Departament extends Entity {
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

  @hasMany(() => City)
  cities: City[];

  constructor(data?: Partial<Departament>) {
    super(data);
  }
}

export interface DepartamentRelations {
  // describe navigational properties here
}

export type DepartamentWithRelations = Departament & DepartamentRelations;
