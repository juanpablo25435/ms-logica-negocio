import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {ClientPlan} from './client-plan.model';
import {StatusBeneficiary} from './status-beneficiary.model';

@model()
export class Beneficiary extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'date',
    required: true,
  })
  registrationDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @belongsTo(() => ClientPlan)
  clientPlanId: number;

  @hasOne(() => StatusBeneficiary)
  statusBeneficiary: StatusBeneficiary;

  constructor(data?: Partial<Beneficiary>) {
    super(data);
  }
}

export interface BeneficiaryRelations {
  // describe navigational properties here
}

export type BeneficiaryWithRelations = Beneficiary & BeneficiaryRelations;
