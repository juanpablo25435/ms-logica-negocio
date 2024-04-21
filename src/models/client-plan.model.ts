import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Client} from './client.model';
import {Beneficiary} from './beneficiary.model';

@model()
export class ClientPlan extends Entity {
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
  price: number;

  @property({
    type: 'date',
    required: true,
  })
  datePurchase: string;

  @property({
    type: 'number',
    required: true,
  })
  quantityBeneficiary: number;

  @belongsTo(() => Client, {name: 'plan'})
  clientId: number;

  @hasMany(() => Beneficiary)
  beneficiaries: Beneficiary[];

  constructor(data?: Partial<ClientPlan>) {
    super(data);
  }
}

export interface ClientPlanRelations {
  // describe navigational properties here
}

export type ClientPlanWithRelations = ClientPlan & ClientPlanRelations;
