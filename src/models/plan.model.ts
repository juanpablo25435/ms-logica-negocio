import {Entity, model, property, hasMany} from '@loopback/repository';
import {PlanServicePlan} from './plan-service-plan.model';

@model()
export class Plan extends Entity {
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
    type: 'string',
    required: true,
  })
  details: string;

  @property({
    type: 'number',
    required: true,
  })
  monthlyPayment: number;

  @hasMany(() => PlanServicePlan)
  includedServices: PlanServicePlan[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
