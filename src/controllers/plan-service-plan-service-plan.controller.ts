import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PlanServicePlan,
  ServicePlan,
} from '../models';
import {PlanServicePlanRepository} from '../repositories';

export class PlanServicePlanServicePlanController {
  constructor(
    @repository(PlanServicePlanRepository)
    public planServicePlanRepository: PlanServicePlanRepository,
  ) { }

  @get('/plan-service-plans/{id}/service-plan', {
    responses: {
      '200': {
        description: 'ServicePlan belonging to PlanServicePlan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicePlan),
          },
        },
      },
    },
  })
  async getServicePlan(
    @param.path.number('id') id: typeof PlanServicePlan.prototype.id,
  ): Promise<ServicePlan> {
    return this.planServicePlanRepository.includedService(id);
  }
}
