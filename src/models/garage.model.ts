import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {City} from './city.model';
import {Bus} from './bus.model';

@model({
  FK_GARAGE_IDCITY: {
    name: 'fk_garage_idCity',
    entity: 'City',
    entityKey: 'id',
    foreignkey: 'cityId',
  },
})
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

  @hasMany(() => Bus)
  buses: Bus[];

  constructor(data?: Partial<Garage>) {
    super(data);
  }
}

export interface GarageRelations {
  // describe navigational properties here
}

export type GarageWithRelations = Garage & GarageRelations;
