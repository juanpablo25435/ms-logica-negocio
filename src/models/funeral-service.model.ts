import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Beneficiary} from './beneficiary.model';
import {City} from './city.model';
import {Client} from './client.model';
import {Review} from './review.model';

@model()
export class FuneralService extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  entryDatetime: string;

  @property({
    type: 'date',
    required: true,
  })
  exitDatetime: string;

  @property({
    type: 'boolean',
    required: true,
  })
  traditionalBurial: boolean;

  @property({
    type: 'boolean',
    default: true,
  })
  active?: boolean;
  @property({
    type: 'string',
    default: true,
  })
  randomCode?: string;

  @belongsTo(() => Beneficiary)
  beneficiaryId: number;

  @belongsTo(() => Client)
  clientId: number;

  @belongsTo(() => City)
  cityId: number;

  @hasMany(() => Review)
  reviews: Review[];

  constructor(data?: Partial<FuneralService>) {
    super(data);
  }
}

export interface FuneralServiceRelations {
  // describe navigational properties here
}

export type FuneralServiceWithRelations = FuneralService & FuneralServiceRelations;
