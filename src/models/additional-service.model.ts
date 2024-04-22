import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ServicePlan} from './service-plan.model';
import {Plan} from './plan.model';

@model({
  settings: {
    foreignkeys: {
      FK_ADDITIONALSERVICE_IDSERVICEPLAN: {
        name: 'fk_additionalService_idServicePlan',
        entity: 'ServicePlan',
        entityKey: 'id',
        foreignkey: 'servicePlanId',
      },
      FK_ADDITIONALSERVICE_IDPLAN: {
        name: 'fk_additionalService_idPlan',
        entity: 'Plan',
        entityKey: 'id',
        foreignkey: 'planId',
      },
    },
  },
})
export class AdditionalService extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => ServicePlan, {name: 'principalService'})
  servicePlanId: number;

  @belongsTo(() => Plan)
  planId: number;

  constructor(data?: Partial<AdditionalService>) {
    super(data);
  }
}

export interface AdditionalServiceRelations {
  // describe navigational properties here
}

export type AdditionalServiceWithRelations = AdditionalService & AdditionalServiceRelations;
