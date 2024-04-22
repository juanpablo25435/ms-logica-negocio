import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {ServicePlan} from './service-plan.model';

@model({
  settings: {
    foreignkeys: {
      FK_PLANSERVICEPLAN_IDPLAN: {
        name: 'fk_PLANSERVICEPLAN_idPlan',
        entity: 'Plan',
        entityKey: 'id',
        foreignkey: 'planId',
      },
      FK_PLANSERVICEPLAN_IDSERVICEPLAN: {
        name: 'fk_PLANSERVICEPLAN_idServicePlan',
        entity: 'ServicePlan',
        entityKey: 'id',
        foreignkey: 'servicePlanId',
      },
    },
  },
})
export class PlanServicePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Plan, {name: 'includedPlan'})
  planId: number;

  @belongsTo(() => ServicePlan, {name: 'includedService'})
  servicePlanId: number;

  constructor(data?: Partial<PlanServicePlan>) {
    super(data);
  }
}

export interface PlanServicePlanRelations {
  // describe navigational properties here
}

export type PlanServicePlanWithRelations = PlanServicePlan & PlanServicePlanRelations;
