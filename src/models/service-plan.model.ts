import {Entity, model, property, hasMany} from '@loopback/repository';
import {PlanServicePlan} from './plan-service-plan.model';
import {AdditionalService} from './additional-service.model';

@model()
export class ServicePlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @hasMany(() => PlanServicePlan)
  servicePlanIncluded: PlanServicePlan[];

  @hasMany(() => AdditionalService)
  additionalServices: AdditionalService[];

  constructor(data?: Partial<ServicePlan>) {
    super(data);
  }
}

export interface ServicePlanRelations {
  // describe navigational properties here
}

export type ServicePlanWithRelations = ServicePlan & ServicePlanRelations;
