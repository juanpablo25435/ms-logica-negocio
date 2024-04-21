import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Beneficiary} from './beneficiary.model';

@model()
export class StatusBeneficiary extends Entity {
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
    type: 'string',
    required: true,
  })
  details: string;

  @belongsTo(() => Beneficiary)
  beneficiaryId: number;

  constructor(data?: Partial<StatusBeneficiary>) {
    super(data);
  }
}

export interface StatusBeneficiaryRelations {
  // describe navigational properties here
}

export type StatusBeneficiaryWithRelations = StatusBeneficiary & StatusBeneficiaryRelations;
