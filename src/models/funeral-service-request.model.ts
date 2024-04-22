import {Entity, model, property} from '@loopback/repository';

@model()
export class FuneralServiceRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
  })
  beneficiaryId: string;

  @property({
    type: 'string',
    required: true,
  })
  bodyLocation: string;

  @property({
    type: 'string',
    required: true,
  })
  checkInTime: string;

  @property({
    type: 'string',
    required: true,
  })
  checkOutTime: string;


  constructor(data?: Partial<FuneralServiceRequest>) {
    super(data);
  }
}

export interface FuneralServiceRequestRelations {
  // describe navigational properties here
}

export type FuneralServiceRequestWithRelations = FuneralServiceRequest & FuneralServiceRequestRelations;
