import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ServicePlan} from './service-plan.model';

@model()
export class AdditionalService extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => ServicePlan, {name: 'principalService'})
  servicePlanId: number;

  constructor(data?: Partial<AdditionalService>) {
    super(data);
  }
}

export interface AdditionalServiceRelations {
  // describe navigational properties here
}

export type AdditionalServiceWithRelations = AdditionalService & AdditionalServiceRelations;
