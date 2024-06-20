import {Entity, model, property, belongsTo} from '@loopback/repository';
import {FuneralService} from './funeral-service.model';
import {Client} from './client.model';

@model()
export class Review extends Entity {
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
  comments: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @belongsTo(() => FuneralService)
  funeralServiceId: number;

  @belongsTo(() => Client)
  clientId: number;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
