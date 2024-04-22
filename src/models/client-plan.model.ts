import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Client} from './client.model';
import {Beneficiary} from './beneficiary.model';
import {City} from './city.model';

@model({
  settings: {
    foreignkeys: {
      FK_CLIENTPLAN_IDCLIENT: {
        name: 'fk_clientPlan_idClient',
        entity: 'Client',
        entityKey: 'id',
        foreignkey: 'clientId',
      },
      FK_CLIENTPLAN_IDBENEFICIARY: {
        name: 'fk_clientPlan_idBeneficiary',
        entity: 'Beneficiary',
        entityKey: 'id',
        foreignkey: 'beneficiaryId',
      },
    },
  },
})
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

  @belongsTo(() => City)
  cityId: number;

  constructor(data?: Partial<ClientPlan>) {
    super(data);
  }
}

export interface ClientPlanRelations {
  // describe navigational properties here
}

export type ClientPlanWithRelations = ClientPlan & ClientPlanRelations;
