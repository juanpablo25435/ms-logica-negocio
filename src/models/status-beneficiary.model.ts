import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Beneficiary} from './beneficiary.model';

@model({
  settings: {
    foreignkeys: {
      FK_STATUSBENEFICIARY_IDBENEFICIARY: {
        name: 'fk_statusBeneficiary_idBeneficiary',
        entity: 'Benefuary',
        entityKey: 'id',
        foreignkey: 'beneficiaryId',
      },
    },
  },
})
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
