import {Entity, model, property, belongsTo} from '@loopback/repository';
import {City} from './city.model';

@model({
  FK_ROOM_IDCITY: {
    name: 'fk_room_idCity',
    entity: 'City',
    entityKey: 'id',
    foreignkey: 'cityId',
  },
})
export class Room extends Entity {
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
  capacity: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @belongsTo(() => City, {name: 'roomCity'})
  cityId: number;

  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
