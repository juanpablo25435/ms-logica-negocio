import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {City} from './city.model';
import {ClientPlan} from './client-plan.model';

@model({
  settings: {
    foreignkeys: {
      FK_CLIENT_IDCLIENTPLAN: {
        name: 'fk_client_idClientPlan',
        entity: 'ClientPlan',
        entityKey: 'id',
        foreignkey: 'clientPlanId',
      },
      FK_CLIENT_IDCITY: {
        name: 'fk_client_idCity',
        entity: 'City',
        entityKey: 'id',
        foreignkey: 'cityId',
      },
    },
  },
})
export class Client extends Entity {
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
  identification: number;

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
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  registrationDate: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: false,
  })
  photo: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @hasOne(() => ClientPlan)
  clientPlan: ClientPlan;

  @belongsTo(() => City)
  cityId: number;

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
