import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Beneficiary} from './beneficiary.model';

@model()
export class RoomBooking extends Entity {
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
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @belongsTo(() => Beneficiary)
  beneficiaryId: number;

  constructor(data?: Partial<RoomBooking>) {
    super(data);
  }
}

export interface RoomBookingRelations {
  // describe navigational properties here
}

export type RoomBookingWithRelations = RoomBooking & RoomBookingRelations;
